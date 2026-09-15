import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function Opcao3Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Busca do Supabase os documentos reais aprovados no Acervo
  const { data: acervoData } = await supabase
    .from('acervo')
    .select('id, titulo, tipo_documento')
    .order('data_publicacao', { ascending: false })
    .limit(2);

  const formatDocType = (tipo: string) => {
    const tipos: Record<string, string> = {
      relatorio: 'Relatório',
      tese: 'Tese Acadêmica',
      guia_regulatorio: 'Guia Regulatório',
      artigo_cientifico: 'Artigo Científico',
      documento_referencia: 'Documento de Referência',
    };
    return tipos[tipo] || tipo;
  };

  const ultimosDocs = (acervoData && acervoData.length > 0)
    ? acervoData
    : [
        {
          id: 'b6c08a68-49a7-4f0d-8af9-671cda1c97ec',
          titulo: 'Guia de Adoção de IA no Setor Público',
          tipo_documento: 'guia_regulatorio',
        },
        {
          id: '7a17e6cc-30d7-4e6b-98e8-00604baef8cc',
          titulo: 'Análise de Redes Neurais em Grafos',
          tipo_documento: 'tese',
        },
      ];

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-[#2C2D41] font-sans pb-20">
      {/* 1. HERO SECTION: Impacto Institucional */}
      <section className="bg-white border-b border-[#B2B5E0]/30 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div 
            className="w-24 h-24 bg-[#B2B5E0] flex items-center justify-center text-[#2C2D41] font-serif font-bold text-5xl mb-8 shadow-xl clip-hexagon"
            style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
          >
            n
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-extrabold tracking-tight text-[#2C2D41] mb-6">
            Núcleo de Inteligência Artificial <br className="hidden md:block" />
            <span className="text-[#2C2D41]">da UFRJ</span>
          </h1>
          <p className="mt-4 text-xl text-[#2C2D41]/80 max-w-3xl mb-10 leading-relaxed font-light">
            A referência aberta, acadêmica e institucional sobre dados, adoção tecnológica e 
            código de Inteligência Artificial no ecossistema brasileiro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
            <Link 
              href="/diretorio"
              className="px-8 py-4 bg-[#2C2D41] hover:bg-[#B2B5E0] hover:text-[#2C2D41] text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg text-lg flex items-center justify-center gap-2"
            >
              Explorar Diretório
            </Link>
            <Link 
              href="/acervo"
              className="px-8 py-4 bg-white border-2 border-[#2C2D41] text-[#2C2D41] hover:bg-[#2C2D41] hover:text-white font-bold rounded-xl transition-all shadow-sm text-lg flex items-center justify-center gap-2"
            >
              Consultar Acervo
            </Link>
          </div>
        </div>
      </section>

      {/* 2. NÚMEROS DE TRAÇÃO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-[#2C2D41] rounded-2xl shadow-xl border border-[#B2B5E0]/20 p-8 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#B2B5E0]/20">
          <div className="text-center pt-4 md:pt-0">
            <p className="text-[#B2B5E0] font-medium mb-1 uppercase tracking-wider text-sm">Empresas Mapeadas</p>
            <p className="text-4xl font-extrabold text-white">~~<span className="text-[#C5ADC5]">+</span></p>
          </div>
          <div className="text-center pt-8 md:pt-0">
            <p className="text-[#B2B5E0] font-medium mb-1 uppercase tracking-wider text-sm">Documentos Curados</p>
            <p className="text-4xl font-extrabold text-white">~~<span className="text-[#C5ADC5]">+</span></p>
          </div>
          <div className="text-center pt-8 md:pt-0">
            <p className="text-[#B2B5E0] font-medium mb-1 uppercase tracking-wider text-sm">Centros de Pesquisa</p>
            <p className="text-4xl font-extrabold text-white">~~</p>
          </div>
        </div>
      </section>

      {/* 3. BENTO BOX GRID: Dashboards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex items-center justify-between mb-8 border-b border-[#B2B5E0]/30 pb-4">
          <h2 className="text-2xl font-serif font-bold text-[#2C2D41]">Panorama da IA no Brasil</h2>
          <span className="text-sm font-bold text-[#2C2D41] bg-[#B2B5E0]/30 px-3 py-1 rounded-full">Atualizado hoje</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
          
          {/* Gráfico 1: Saúde */}
          <div className="col-span-1 lg:col-span-2 bg-white rounded-3xl p-8 border border-[#B2B5E0]/30 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="p-2 bg-[#C5ADC5]/20 text-[#2C2D41] rounded-lg">🏥</span>
                <h3 className="text-lg font-serif font-bold text-[#2C2D41]">Adoção de IA no Setor de Saúde</h3>
              </div>
              <p className="text-[#2C2D41]/70 text-sm mb-6 font-light">Crescimento de iniciativas e startups HealthTech (2019-2024)</p>
            </div>
            
            <div className="flex items-end justify-between gap-2 h-48 w-full mt-auto border-b border-[#B2B5E0]/20 pb-2">
              {[
                { year: '2019', height: 'h-[20%]', color: 'bg-[#B2B5E0]/60' },
                { year: '2020', height: 'h-[35%]', color: 'bg-[#B2B5E0]' },
                { year: '2021', height: 'h-[45%]', color: 'bg-[#C5ADC5]/60' },
                { year: '2022', height: 'h-[60%]', color: 'bg-[#C5ADC5]' },
                { year: '2023', height: 'h-[80%]', color: 'bg-[#C5ADC5]' },
                { year: '2024', height: 'h-[100%]', color: 'bg-[#2C2D41]', isMax: true },
              ].map((bar, i) => (
                <div key={i} className="flex flex-col items-center w-full group">
                  <div className={`w-full max-w-[40px] rounded-t-md ${bar.color} ${bar.height} transition-all duration-500 group-hover:brightness-110 relative`}>
                    {bar.isMax && (
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#2C2D41] text-white text-xs font-bold px-2 py-1 rounded">Destaque</span>
                    )}
                  </div>
                  <span className="text-xs text-[#2C2D41]/60 mt-3 font-medium">{bar.year}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Destaque Acervo */}
          <div className="col-span-1 bg-gradient-to-br from-[#2C2D41] to-[#3a3b54] rounded-3xl p-8 border border-[#B2B5E0]/20 shadow-sm text-white flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="p-2 bg-white/10 text-white rounded-lg">📚</span>
                <h3 className="text-lg font-serif font-bold text-white">Últimos no Acervo</h3>
              </div>
              <div className="space-y-4">
                {ultimosDocs.map((doc) => (
                  <Link 
                    key={doc.id}
                    href={`/acervo/${doc.id}`}
                    className="block bg-white/10 p-4 rounded-xl border border-white/5 hover:bg-white/20 transition-all group"
                  >
                    <p className="text-sm font-semibold line-clamp-1 group-hover:text-[#C5ADC5] transition-colors">
                      {doc.titulo}
                    </p>
                    <p className="text-xs text-[#B2B5E0] mt-1 flex items-center justify-between">
                      <span>{formatDocType(doc.tipo_documento)}</span>
                      <span className="group-hover:translate-x-1 transition-transform font-bold text-[#C5ADC5]">→</span>
                    </p>
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/acervo" className="mt-6 text-sm font-bold text-[#B2B5E0] hover:text-[#C5ADC5] flex items-center justify-between group transition-colors">
              Ir para o Acervo Completo
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* Gráfico 2: Educação */}
          <div className="col-span-1 bg-white rounded-3xl p-8 border border-[#B2B5E0]/30 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 bg-[#C5ADC5]/20 text-[#2C2D41] rounded-lg">🎓</span>
              <h3 className="text-lg font-serif font-bold text-[#2C2D41]">IA na Educação</h3>
            </div>
            <p className="text-[#2C2D41]/70 text-sm mb-6 font-light">Mapeamento de ferramentas por etapa</p>
            
            <div className="space-y-5">
              {[
                { label: 'Ensino Superior', value: '~~%', width: 'w-[78%]' },
                { label: 'Ensino Médio', value: '~~%', width: 'w-[45%]' },
                { label: 'Ensino Básico', value: '~~%', width: 'w-[12%]' },
                { label: 'Cursos Técnicos', value: '~~%', width: 'w-[64%]' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-[#2C2D41]/80">{stat.label}</span>
                    <span className="font-bold text-[#2C2D41]">{stat.value}</span>
                  </div>
                  <div className="w-full bg-[#F8F9FA] border border-[#B2B5E0]/20 rounded-full h-2.5">
                    <div className={`bg-[#C5ADC5] h-2.5 rounded-full ${stat.width}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Diretório CTA */}
          <div className="col-span-1 lg:col-span-2 bg-white rounded-3xl p-8 border border-[#B2B5E0]/30 shadow-sm flex flex-col md:flex-row items-center gap-8 hover:shadow-md transition-shadow">
            <div className="flex-1">
              <span className="inline-block px-3 py-1 bg-[#B2B5E0]/30 text-[#2C2D41] text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                Catálogo Vivo
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#2C2D41] mb-3">Conheça os atores do Ecossistema</h3>
              <p className="text-[#2C2D41]/80 mb-6 font-light leading-relaxed">
                Nosso diretório mapeia startups, empresas, centros de pesquisa e iniciativas do setor público moldando o futuro da IA.
              </p>
              <Link href="/diretorio" className="inline-flex px-6 py-3 bg-[#2C2D41] hover:bg-[#B2B5E0] hover:text-[#2C2D41] text-white font-bold rounded-xl transition-all shadow-sm">
                Pesquisar no Diretório
              </Link>
            </div>
            <div className="w-full md:w-1/3 grid grid-cols-3 gap-3">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="aspect-square bg-[#F8F9FA] border border-[#B2B5E0]/20 rounded-xl flex items-center justify-center shadow-inner">
                  <div className={`w-8 h-8 rounded-full opacity-30 ${i % 2 === 0 ? 'bg-[#C5ADC5]' : 'bg-[#B2B5E0]'}`}></div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4. SEÇÃO: Governança e Participação */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-10">
        <div className="flex items-center justify-between mb-6 border-b border-[#B2B5E0]/30 pb-2">
          <h2 className="text-xl font-serif font-bold text-[#2C2D41]">Governança e Participação</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <Link href="/colaborar" className="bg-white p-6 rounded-2xl border border-[#B2B5E0]/30 shadow-sm hover:shadow-md hover:border-[#C5ADC5] transition-all group flex flex-col items-start">
            <div className="w-12 h-12 bg-[#C5ADC5]/20 text-[#2C2D41] rounded-xl flex items-center justify-center text-xl mb-4 group-hover:bg-[#2C2D41] group-hover:text-white transition-colors">
              ✦
            </div>
            <h3 className="font-serif font-bold text-[#2C2D41] mb-2">Colaborar</h3>
            <p className="text-sm text-[#2C2D41]/70 leading-relaxed font-light">
              Envie relatórios, teses e documentos para a nossa fila de curadoria.
            </p>
          </Link>
          
          {user && (
            <Link href="/admin/curadoria" className="bg-white p-6 rounded-2xl border border-[#B2B5E0]/30 shadow-sm hover:shadow-md hover:border-[#C5ADC5] transition-all group flex flex-col items-start">
              <div className="w-12 h-12 bg-[#C5ADC5]/20 text-[#2C2D41] rounded-xl flex items-center justify-center text-xl mb-4 group-hover:bg-[#2C2D41] group-hover:text-white transition-colors">
                ⚙️
              </div>
              <h3 className="font-serif font-bold text-[#2C2D41] mb-2">Curadoria (Admin)</h3>
              <p className="text-sm text-[#2C2D41]/70 leading-relaxed font-light">
                Painel administrativo para revisão e aprovação de submissões.
              </p>
            </Link>
          )}

          <Link href="/integridade" className="bg-white p-6 rounded-2xl border border-[#B2B5E0]/30 shadow-sm hover:shadow-md hover:border-[#C5ADC5] transition-all group flex flex-col items-start">
            <div className="w-12 h-12 bg-[#C5ADC5]/20 text-[#2C2D41] rounded-xl flex items-center justify-center text-xl mb-4 group-hover:bg-[#2C2D41] group-hover:text-white transition-colors">
              ⚖️
            </div>
            <h3 className="font-serif font-bold text-[#2C2D41] mb-2">Integridade</h3>
            <p className="text-sm text-[#2C2D41]/70 leading-relaxed font-light">
              Conheça nossas regras contra fake reviews e metodologias de dados.
            </p>
          </Link>

          <Link href="/privacidade" className="bg-white p-6 rounded-2xl border border-[#B2B5E0]/30 shadow-sm hover:shadow-md hover:border-[#C5ADC5] transition-all group flex flex-col items-start">
            <div className="w-12 h-12 bg-[#C5ADC5]/20 text-[#2C2D41] rounded-xl flex items-center justify-center text-xl mb-4 group-hover:bg-[#2C2D41] group-hover:text-white transition-colors">
              🔒
            </div>
            <h3 className="font-serif font-bold text-[#2C2D41] mb-2">Privacidade</h3>
            <p className="text-sm text-[#2C2D41]/70 leading-relaxed font-light">
              Nossa adequação à LGPD e como tratamos seus cookies e dados.
            </p>
          </Link>

        </div>
      </section>

    </main>
  );
}
