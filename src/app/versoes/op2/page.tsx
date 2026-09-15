import Link from 'next/link';

export default function Opcao2Page() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] text-[#2C2D41] font-sans">
      
      {/* 1. Hero Section Aprimorada */}
      <section className="relative overflow-hidden bg-white border-b border-[#B2B5E0]/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Texto e CTAs */}
          <div className="z-10">
            <h1 className="text-4xl lg:text-5xl font-serif font-extrabold tracking-tight text-[#2C2D41] mb-6">
              A Referência Institucional sobre <span className="text-[#2C2D41]">Inteligência Artificial</span> no Brasil
            </h1>
            <p className="text-lg text-[#2C2D41]/80 mb-8 max-w-lg leading-relaxed font-light">
              O Núcleo de Inteligência Artificial da UFRJ conecta pesquisa acadêmica, setor público e privado, oferecendo dados abertos, código e diretrizes sobre a adoção de IA no país.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/diretorio" 
                className="inline-flex justify-center items-center px-6 py-3 bg-[#2C2D41] text-white font-bold rounded-xl shadow-md hover:bg-[#B2B5E0] hover:text-[#2C2D41] transition-colors"
              >
                Explorar Diretório
              </Link>
              <Link 
                href="/acervo" 
                className="inline-flex justify-center items-center px-6 py-3 bg-white text-[#2C2D41] font-bold rounded-xl border-2 border-[#2C2D41] shadow-sm hover:bg-[#2C2D41] hover:text-white transition-colors"
              >
                Consultar Acervo
              </Link>
            </div>
          </div>

          {/* Arte Abstrata / Geométrica usando Tailwind */}
          <div className="relative hidden lg:flex justify-center items-center h-full">
            <div className="absolute w-72 h-72 bg-[#C5ADC5] rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
            <div className="absolute w-72 h-72 bg-[#B2B5E0] rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000 transform translate-x-12 -translate-y-8"></div>
            <div className="absolute w-72 h-72 bg-[#C5ADC5]/60 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000 transform -translate-x-8 translate-y-12"></div>
            {/* Hexágono estilizado representando o logo */}
            <div 
              className="relative z-10 w-48 h-48 bg-gradient-to-br from-[#2C2D41] to-[#3a3b54] rounded-3xl rotate-12 shadow-2xl flex items-center justify-center opacity-90 clip-hexagon"
              style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
            >
              <span className="text-[#B2B5E0] text-8xl font-serif font-bold -rotate-12 select-none">n</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 space-y-16">
        
        {/* 2. Cards de Indicadores (Métricas Rápidas) */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-[#2C2D41] mb-6">Impacto do Ecossistema</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-2xl border border-[#B2B5E0]/30 shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-[#C5ADC5]/20 text-[#2C2D41] rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
              </div>
              <div>
                <p className="text-sm font-medium text-[#2C2D41]/60">Empresas Mapeadas</p>
                <p className="text-2xl font-bold text-[#2C2D41]">120+</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-2xl border border-[#B2B5E0]/30 shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-[#C5ADC5]/20 text-[#2C2D41] rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              </div>
              <div>
                <p className="text-sm font-medium text-[#2C2D41]/60">Documentos no Acervo</p>
                <p className="text-2xl font-bold text-[#2C2D41]">350+</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-2xl border border-[#B2B5E0]/30 shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-[#C5ADC5]/20 text-[#2C2D41] rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
              </div>
              <div>
                <p className="text-sm font-medium text-[#2C2D41]/60">Centros de Pesquisa</p>
                <p className="text-2xl font-bold text-[#2C2D41]">45</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-6 rounded-2xl border border-[#B2B5E0]/30 shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-[#C5ADC5]/20 text-[#2C2D41] rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
              </div>
              <div>
                <p className="text-sm font-medium text-[#2C2D41]/60">Repositórios de Código</p>
                <p className="text-2xl font-bold text-[#2C2D41]">80+</p>
              </div>
            </div>

          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 3. Painel de Gráficos Simulados (Panorama da IA) */}
          <section className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-[#B2B5E0]/30 p-8">
            <h3 className="text-xl font-serif font-bold text-[#2C2D41] mb-6 border-b border-[#B2B5E0]/20 pb-4">Panorama da IA no Brasil</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-medium text-[#2C2D41]/80 mb-2">
                  <span>Startups de IA</span>
                  <span className="font-bold text-[#2C2D41]">45%</span>
                </div>
                <div className="w-full bg-[#F8F9FA] rounded-full h-3 border border-[#B2B5E0]/20">
                  <div className="bg-[#2C2D41] h-3 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm font-medium text-[#2C2D41]/80 mb-2">
                  <span>Centros de Pesquisa Acadêmica</span>
                  <span className="font-bold text-[#2C2D41]">30%</span>
                </div>
                <div className="w-full bg-[#F8F9FA] rounded-full h-3 border border-[#B2B5E0]/20">
                  <div className="bg-[#C5ADC5] h-3 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-medium text-[#2C2D41]/80 mb-2">
                  <span>Iniciativas do Setor Público</span>
                  <span className="font-bold text-[#2C2D41]">15%</span>
                </div>
                <div className="w-full bg-[#F8F9FA] rounded-full h-3 border border-[#B2B5E0]/20">
                  <div className="bg-[#B2B5E0] h-3 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-medium text-[#2C2D41]/80 mb-2">
                  <span>Grandes Corporações (Tech)</span>
                  <span className="font-bold text-[#2C2D41]">10%</span>
                </div>
                <div className="w-full bg-[#F8F9FA] rounded-full h-3 border border-[#B2B5E0]/20">
                  <div className="bg-[#B2B5E0]/60 h-3 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Acesso Rápido / Últimas Adições */}
          <section className="bg-white rounded-3xl shadow-sm border border-[#B2B5E0]/30 p-8">
            <h3 className="text-xl font-serif font-bold text-[#2C2D41] mb-6 border-b border-[#B2B5E0]/20 pb-4">Últimas Atualizações</h3>
            
            <ul className="space-y-5">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-2.5 h-2.5 mt-2 rounded-full bg-[#2C2D41] mr-3"></span>
                <div>
                  <p className="text-sm font-semibold text-[#2C2D41]">Mapeamento de Cursos Superiores</p>
                  <p className="text-xs text-[#2C2D41]/60 mt-1">Adicionado ao Acervo • Há 2 dias</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-2.5 h-2.5 mt-2 rounded-full bg-[#C5ADC5] mr-3"></span>
                <div>
                  <p className="text-sm font-semibold text-[#2C2D41]">Nova API de Dados do Governo</p>
                  <p className="text-xs text-[#2C2D41]/60 mt-1">Adicionado ao Diretório • Há 5 dias</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-2.5 h-2.5 mt-2 rounded-full bg-[#B2B5E0] mr-3"></span>
                <div>
                  <p className="text-sm font-semibold text-[#2C2D41]">Guia Regulatório de IA v1.2</p>
                  <p className="text-xs text-[#2C2D41]/60 mt-1">Adicionado ao Acervo • Há 1 semana</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-2.5 h-2.5 mt-2 rounded-full bg-[#B2B5E0]/60 mr-3"></span>
                <div>
                  <p className="text-sm font-semibold text-[#2C2D41]">Laboratório de Visão Computacional</p>
                  <p className="text-xs text-[#2C2D41]/60 mt-1">Adicionado ao Diretório • Há 1 semana</p>
                </div>
              </li>
            </ul>
            
            <div className="mt-8">
              <Link href="/colaborar" className="text-sm font-bold text-[#2C2D41] hover:text-[#C5ADC5] transition-colors flex items-center">
                Sugerir uma iniciativa
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </Link>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
