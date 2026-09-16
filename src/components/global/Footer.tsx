import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // Wrapper do Rodapé com o tom escuro institucional e borda sutil
    <footer className="bg-[#2C2D41] border-t border-[#B2B5E0]/20 text-[#B2B5E0]/80 py-16 mt-auto font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grade Principal de Conteúdo em 4 Colunas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10 border-b border-[#B2B5E0]/10 pb-10">
          
          {/* Coluna 1: Identidade Institucional */}
          <div className="pr-4">
            <div className="flex items-center gap-3 mb-5">
              <div 
                className="w-11 h-11 bg-[#B2B5E0] flex items-center justify-center text-[#2C2D41] font-serif font-bold text-2xl pb-0.5 shadow-inner clip-hexagon flex-shrink-0"
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
              >
                n
              </div>
              <span className="text-2xl font-serif font-bold text-[#B2B5E0] tracking-tight">NIA</span>
            </div>
            
            <p className="text-sm text-[#B2B5E0]/70 leading-relaxed mb-5 font-light">
              Núcleo de Inteligência Artificial. 
              Mapeamento transparente, ético e de código aberto do ecossistema de IA no Brasil.
            </p>
            
            <p className="text-xs font-bold uppercase tracking-wider text-[#C5ADC5]">
              Iniciativa acadêmica e de pesquisa aberta.
            </p>
          </div>

          {/* Coluna 2: Links do Projeto e Módulos Principais */}
          <div>
            <h3 className="text-[#C5ADC5] font-bold mb-5 uppercase text-sm tracking-wider">Módulos do Portal</h3>
            <ul className="space-y-3 text-sm font-medium">
              {[
                { label: 'Equipe e Pesquisadores', href: '/sobre' },
                { label: 'Metodologia de Coleta', href: '/metodologia' },
                { label: 'Diretório de Iniciativas', href: '/diretorio' },
                { label: 'Acervo Acadêmico', href: '/acervo' },
                { label: 'Hub de Códigos & Modelos', href: '/codigo' },
                { label: 'Canal Colaborar', href: '/colaborar' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Versões e Conceitos Preservados */}
          <div>
            <h3 className="text-[#C5ADC5] font-bold mb-5 uppercase text-sm tracking-wider">Versões de Layout</h3>
            <ul className="space-y-3 text-sm font-medium">
              {[
                { label: 'Versão Oficial (Ativa)', href: '/' },
                { label: 'Versão Alternativa (Opção 2)', href: '/versoes/op2' },
                { label: 'Versão Alternativa (Opção 3)', href: '/versoes/op3' },
                { label: 'Catálogo de Todas as Versões', href: '/versoes' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors flex items-center gap-1.5">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4: Compliance e Legal */}
          <div>
            <h3 className="text-[#C5ADC5] font-bold mb-5 uppercase text-sm tracking-wider">Compliance & Legal</h3>
            <ul className="space-y-3 text-sm font-medium">
              {[
                { label: 'Política de Privacidade (LGPD)', href: '/privacidade' },
                { label: 'Termos de Uso e CC BY 4.0', href: '/termos' },
                { label: 'Diretrizes de Conteúdo', href: '/integridade' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-[#B2B5E0]/10">
                <a href="mailto:dpo@nia.org.br" className="hover:text-white transition-colors flex items-center gap-1.5 text-xs text-[#C5ADC5]">
                  Contato de Dados (DPO) <span>&rarr;</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Direitos Autorais e Avisos do Sistema */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-[#B2B5E0]/50 font-light gap-3">
          <p>
            &copy; {currentYear} Núcleo de Inteligência Artificial (NIA). Todos os direitos reservados.
          </p>
          <p className="mt-2 md:mt-0 italic">
            Os dados apresentados são para fins de pesquisa e transparência pública.
          </p>
        </div>
        
      </div>
    </footer>
  );
}