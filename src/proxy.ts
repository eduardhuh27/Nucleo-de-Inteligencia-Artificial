import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Inicializa o Redis com proteção contra ausência de variáveis de ambiente
const redis = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

// Permite 10 requisições por minuto por IP para prevenir abusos/spam
const ratelimit = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.slidingWindow(10, '1 m'),
    })
  : null;

/**
 * Convenção oficial do Next.js 16+: Proxy (antigo middleware)
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  // 1. RATE LIMITING (Requisições POST públicas como formulários)
  if (request.method === 'POST' && ratelimit) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? '127.0.0.1';
    try {
      const { success, limit, remaining, reset } = await ratelimit.limit(`ratelimit_${ip}`);
      if (!success) {
        return new NextResponse('Limite de requisições excedido. Por favor, aguarde antes de tentar novamente.', {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString(),
          },
        });
      }
    } catch (error) {
      console.warn('Alerta: Erro transiente no Rate Limiting (Upstash):', error);
        // Não bloqueia a requisição legítima caso o Redis esteja indisponível temporariamente
    }
  }

  // 2. SINCRONIZAÇÃO DE SESSÃO E COOKIES (Supabase SSR)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // 3. PROTEÇÃO DE ROTAS ADMINISTRATIVAS
  const pathname = request.nextUrl.pathname;
  const isProtected = pathname.startsWith('/admin') || pathname.startsWith('/acervo/novo');

  if (isProtected && !user) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Intercepta:
     * - Rotas de administração e publicação (/admin, /acervo/novo)
     * - Todas as rotas de requisição, excluindo arquivos estáticos e assets
     */
    '/admin/:path*',
    '/acervo/novo',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};