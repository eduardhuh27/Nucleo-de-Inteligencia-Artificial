import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false, // Desativa source maps em produção
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'seu-projeto.supabase.co' }],
  },
  
  // Injeção de Security Headers obrigatórios
  async headers() {
    return [
      {
        // Aplica os cabeçalhos em absolutamente todas as rotas do portal
        source: '/(.*)',
        headers: [
          {
            // Força o navegador a sempre usar HTTPS pelos próximos 2 anos
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            // Previne o portal de ser embutido em iframes maliciosos (Clickjacking)
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            // Impede o navegador de tentar adivinhar o MIME type de arquivos (MIME Sniffing)
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            // Ativa o filtro XSS nativo de navegadores legados (bloqueando a renderização se ataque detectado)
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            // Controla a quantidade de informações da URL enviadas quando o usuário clica em um link externo
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          }
        ],
      },
    ];
  },
};

export default nextConfig;