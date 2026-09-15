'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Breadcrumb() {
  const pathname = usePathname();
  
  // Remove espaços vazios gerados pelo split na URL
  const paths = pathname.split('/').filter(Boolean);

  // Se estivermos na página inicial, não renderizamos o breadcrumb
  if (paths.length === 0) return null;

  return (
    <nav aria-label="Navegação estrutural (Breadcrumb)" className="w-full py-4 mb-4 font-sans">
      <ol className="flex items-center space-x-2 text-sm text-[#2C2D41]/70 flex-wrap">
        {/* Link Fixo para a Home */}
        <li>
          <Link 
            href="/" 
            className="font-bold hover:text-[#C5ADC5] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C5ADC5] rounded"
          >
            Home
          </Link>
        </li>

        {/* Geração Dinâmica das Rotas */}
        {paths.map((path, index) => {
          // Constrói a URL acumulativa (ex: /acervo, depois /acervo/123)
          const href = `/${paths.slice(0, index + 1).join('/')}`;
          const isLast = index === paths.length - 1;
          
          // Formatação limpa do texto: "guia-regulatorio" vira "Guia regulatorio"
          // Se for um ID do Supabase (UUID longo), podemos substituir por "Detalhes"
          const isUUID = path.length > 20 && path.includes('-');
          const label = isUUID 
            ? 'Detalhes do Documento' 
            : path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');

          return (
            <li key={path} className="flex items-center space-x-2">
              {/* Separador com a cor Azul Aço */}
              <span className="text-[#B2B5E0] font-bold select-none" aria-hidden="true">
                /
              </span>
              {isLast ? (
                // A página atual não deve ser um link e recebe aria-current="page" para acessibilidade
                <span 
                  className="text-[#2C2D41] font-bold" 
                  aria-current="page"
                >
                  {label}
                </span>
              ) : (
                <Link 
                  href={href} 
                  className="font-bold hover:text-[#C5ADC5] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C5ADC5] rounded"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}