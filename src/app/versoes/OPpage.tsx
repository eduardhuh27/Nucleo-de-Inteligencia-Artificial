import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans text-[#2C2D41]">
      
      {/* 1. Top Header (Redesenhado e mais compacto) */}
      {/* <header className="w-full bg-white border-b border-[#B2B5E0]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          
          {/* Logotipo Centralizado com nova geometria (Círculo em vez de polígono) 
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#B2B5E0] rounded-full flex items-center justify-center text-[#2C2D41] font-serif font-bold text-2xl shadow-sm">
              n
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-[#2C2D41] tracking-tight leading-none">
                NIA
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#B2B5E0]">
                Inteligência Artificial
              </span>
            </div>
          </div>

          {/* Ações e Parceiro 
          <div className="flex items-center gap-6">
            <button aria-label="Buscar" className="p-2 bg-[#F8F9FA] rounded-full text-[#2C2D41] hover:bg-[#C5ADC5] hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <div className="hidden sm:block px-4 py-1 border-2 border-[#C5ADC5] rounded-full">
              <span className="text-sm font-black text-[#2C2D41] tracking-tight">NIA</span>
            </div>
          </div>
        </div>
      </header> */}

      {/* 2. Navigation Bar (Cores invertidas e espaçamento solto) */}
        {/* <nav className="w-full bg-[#2C2D41] shadow-md relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-4 text-sm font-semibold text-[#B2B5E0]">
              <li><Link href="/" className="text-white hover:text-[#C5ADC5] transition-colors">Início</Link></li>
              <li><Link href="/diretorio" className="hover:text-white transition-colors">Diretório</Link></li>
              <li><Link href="/acervo" className="hover:text-white transition-colors">Acervo</Link></li>
              <li><Link href="/indicadores" className="hover:text-white transition-colors">Indicadores</Link></li>
              <li><Link href="/colaborar" className="hover:text-white transition-colors">Colaborar</Link></li>
              <li><Link href="/sobre" className="hover:text-white transition-colors">Sobre</Link></li>
            </ul>
          </div>
        </nav> */}

      {/* 3. Seção de Introdução (Movida para o topo, fonte Serif, layout centralizado) */}
      <section className="w-full py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#2C2D41] mb-8 leading-tight">
            Núcleo de Inteligência Artificial <br/> do Brasil
          </h1>
          <p className="text-lg md:text-xl text-[#2C2D41]/80 leading-relaxed font-light">
            Nosso propósito é mapear, registrar e prover informações abertas sobre os avanços das tecnologias habilitadoras da <strong>IA</strong>, desenvolvendo análises críticas sobre a sua adoção e os seus principais impactos no tecido social brasileiro.
          </p>
        </div>
      </section>

      {/* 4. Hero Banner (Agora é um bloco contido tipo "Pílula", sem carrossel) */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-[#C5ADC5] to-[#B2B5E0] rounded-[3rem] p-12 md:p-24 text-center shadow-lg relative overflow-hidden">
          
          {/* Elementos decorativos abstratos no fundo do banner */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full mix-blend-overlay blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#2C2D41] rounded-full mix-blend-overlay blur-3xl"></div>
          </div>

          <h2 className="relative z-10 text-4xl md:text-6xl font-black text-[#2C2D41] tracking-tighter drop-shadow-sm">
            Ecossistema de IA no Brasil
          </h2>
          <p className="relative z-10 mt-6 text-xl text-[#2C2D41]/90 font-medium max-w-2xl mx-auto">
            Transparência, dados abertos e colaboração institucional.
          </p>
        </div>
      </section>

      {/* 5. Seção de Destaques (Layout Assimétrico e Cores Pasteis) */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Card 1: Maior (7 colunas), Azul Aço */}
          <div className="lg:col-span-7 bg-[#B2B5E0] p-10 md:p-14 rounded-3xl shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-serif font-bold mb-6 text-[#2C2D41]">
                Diretório e Indicadores
              </h3>
              <p className="mb-6 text-[#2C2D41]/90 text-lg leading-relaxed">
                Reunimos os principais indicadores e mapeamos o ecossistema brasileiro de ponta a ponta. Explore nossos dados sobre:
              </p>
              <ul className="space-y-4 text-[#2C2D41] text-lg mb-10 font-medium">
                <li className="flex items-start gap-3">
                  <span className="text-[#C5ADC5] text-2xl leading-none">✦</span>
                  Uso e adoção da IA na educação, setor corporativo e saúde pública.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C5ADC5] text-2xl leading-none">✦</span>
                  Volume de produção de conhecimento e artigos acadêmicos.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C5ADC5] text-2xl leading-none">✦</span>
                  Centros de capacitação tecnológica.
                </li>
              </ul>
            </div>
            <Link href="/indicadores" className="inline-flex items-center justify-center px-8 py-4 bg-[#2C2D41] text-white font-bold rounded-xl hover:bg-gray-800 transition-all self-start shadow-md">
              Acessar Indicadores
            </Link>
          </div>

          {/* Card 2: Menor (5 colunas), Roxo Pastel */}
          <div className="lg:col-span-5 bg-[#C5ADC5] p-10 md:p-14 rounded-3xl shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-serif font-bold mb-6 text-[#2C2D41]">
                Acervo Aberto
              </h3>
              <p className="mb-8 text-[#2C2D41]/90 text-lg leading-relaxed">
                Nosso banco de soluções organiza as iniciativas da sociedade, aproxima desafios tecnológicos do setor público e fomenta o compartilhamento de código, teses e inovações.
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              <Link href="/acervo" className="w-full text-center px-8 py-4 bg-white text-[#2C2D41] font-bold rounded-xl hover:bg-gray-50 transition-all shadow-sm">
                Explorar o Acervo
              </Link>
              <Link href="/colaborar" className="w-full text-center px-8 py-4 border-2 border-[#2C2D41] text-[#2C2D41] font-bold rounded-xl hover:bg-[#2C2D41] hover:text-white transition-all">
                Submeter Projeto
              </Link>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}