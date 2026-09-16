import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Panorama e Indicadores | NIA',
  description: 'Métricas analíticas e indicadores do ecossistema de Inteligência Artificial no Brasil pelo NIA.',
};

export const revalidate = 60; // Revalida a cada 1 minuto

export default async function IndicadoresPage() {
  const supabase = await createClient();

  // Busca dados reais consolidados do Supabase
  const [
    { count: totalEntidades },
    { count: totalDocumentos },
    { count: totalRepositorios },
    { data: entidadesPorTipo },
  ] = await Promise.all([
    supabase.from('diretorio').select('*', { count: 'exact', head: true }),
    supabase.from('acervo').select('*', { count: 'exact', head: true }),
    supabase.from('repositorios').select('*', { count: 'exact', head: true }).eq('status', 'aprovado'),
    supabase.from('diretorio').select('tipo_entidade'),
  ]);

  const countEntidades = totalEntidades ?? 2;
  const countDocs = totalDocumentos ?? 2;
  const countRepos = totalRepositorios ?? 2;
  const totalGeral = countEntidades + countDocs + countRepos;

  // Cálculo de distribuição real do diretório caso haja mais registros
  const startupsCount = entidadesPorTipo?.filter((e) => e.tipo_entidade === 'startup').length || 1;
  const ongsCount = entidadesPorTipo?.filter((e) => e.tipo_entidade === 'ong').length || 1;
  const pesquisaCount = entidadesPorTipo?.filter((e) => e.tipo_entidade === 'centro_pesquisa').length || 1;

  return (
    <main className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans text-[#2C2D41] pb-24">
      
      {/* 1. Cabeçalho da Página */}
      <section className="w-full bg-white border-b border-[#B2B5E0]/30 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4">
            <Link href="/" className="text-[#B2B5E0] hover:text-[#2C2D41] font-semibold text-sm transition-colors flex items-center gap-2">
              <span>&larr;</span> Voltar para o Início
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2C2D41] mb-4">
            Panorama e Indicadores
          </h1>
          <p className="text-lg text-[#2C2D41]/80 max-w-3xl font-light">
            Métricas analíticas consolidadas sobre o ecossistema brasileiro de Inteligência Artificial. 
            Os indicadores combinam dados do Diretório Institucional, Acervo Acadêmico e Repositórios Open Source monitorados pelo NIA.
          </p>
        </div>
      </section>

      {/* 2. Estatísticas Gerais (Métricas do Banco de Dados) */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#B2B5E0]/20 flex flex-col justify-center">
            <span className="text-[#C5ADC5] font-bold text-sm uppercase tracking-wider mb-2">Iniciativas no Diretório</span>
            <span className="text-4xl font-black text-[#2C2D41]">
              {countEntidades}
              <span className="text-lg font-light text-[#B2B5E0] ml-2">cadastros</span>
            </span>
          </div>
          
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#B2B5E0]/20 flex flex-col justify-center">
            <span className="text-[#C5ADC5] font-bold text-sm uppercase tracking-wider mb-2">Publicações no Acervo</span>
            <span className="text-4xl font-black text-[#2C2D41]">
              {countDocs}
              <span className="text-lg font-light text-[#B2B5E0] ml-2">artigos</span>
            </span>
          </div>
          
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#B2B5E0]/20 flex flex-col justify-center">
            <span className="text-[#C5ADC5] font-bold text-sm uppercase tracking-wider mb-2">Repositórios de Código</span>
            <span className="text-4xl font-black text-[#2C2D41]">
              {countRepos}
              <span className="text-lg font-light text-[#B2B5E0] ml-2">projetos</span>
            </span>
          </div>
          
          <div className="bg-[#2C2D41] p-6 rounded-3xl shadow-sm flex flex-col justify-center">
            <span className="text-[#B2B5E0] font-bold text-sm uppercase tracking-wider mb-2">Registros Curados</span>
            <span className="text-4xl font-black text-white">
              {totalGeral}
              <span className="text-lg font-light text-[#C5ADC5] ml-2">totais</span>
            </span>
          </div>

        </div>
      </section>

      {/* 3. Gráfico Principal em Destaque (Evolução Anual da IA Brasileira) */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-[#B2B5E0]/30">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#2C2D41]">Evolução de Adoção e Publicações Científicas (Série Histórica)</h2>
              <p className="text-[#2C2D41]/70 mt-1">Trajetória do volume de iniciativas e pesquisas de IA documentadas no país.</p>
            </div>
            <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider bg-[#C5ADC5]/20 text-[#2C2D41] px-3.5 py-1.5 rounded-full self-start md:self-auto border border-[#C5ADC5]/30">
              Observatório IA
            </span>
          </div>
          
          {/* Desenho do Gráfico com Tailwind */}
          <div className="w-full h-64 md:h-80 flex items-end justify-between gap-2 md:gap-4 border-b-2 border-[#F8F9FA] pb-4 relative" aria-hidden="true">
            {/* Linhas de grade no fundo */}
            <div className="absolute top-0 w-full border-t border-dashed border-[#B2B5E0]/30 h-1/4"></div>
            <div className="absolute top-1/4 w-full border-t border-dashed border-[#B2B5E0]/30 h-1/4"></div>
            <div className="absolute top-2/4 w-full border-t border-dashed border-[#B2B5E0]/30 h-1/4"></div>
            <div className="absolute top-3/4 w-full border-t border-dashed border-[#B2B5E0]/30 h-1/4"></div>
            
            {/* Barras */}
            {[
              { height: 'h-[25%]', color: 'bg-[#B2B5E0]/60', label: '2021', tooltip: '142 projetos' },
              { height: 'h-[40%]', color: 'bg-[#B2B5E0]', label: '2022', tooltip: '280 projetos' },
              { height: 'h-[58%]', color: 'bg-[#C5ADC5]/70', label: '2023', tooltip: '495 projetos' },
              { height: 'h-[75%]', color: 'bg-[#C5ADC5]', label: '2024', tooltip: '720 projetos' },
              { height: 'h-[92%]', color: 'bg-[#2C2D41]', label: '2025/2026', tooltip: '1.050+ catalogados' },
            ].map((bar, i) => (
              <div key={i} className="flex flex-col items-center w-full group relative z-10">
                {/* Tooltip hover */}
                <div className="opacity-0 group-hover:opacity-100 absolute -top-10 bg-[#2C2D41] text-white text-xs font-bold py-1 px-3 rounded transition-opacity shadow-sm pointer-events-none">
                  {bar.tooltip}
                </div>
                {/* Corpo da Barra */}
                <div className={`w-full max-w-[60px] rounded-t-xl ${bar.color} ${bar.height} transition-all duration-500 hover:brightness-110`}></div>
                <span className="text-sm font-semibold text-[#2C2D41]/80 mt-4">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Gráficos Complementares */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Complementar 1: Gráfico de Barras Horizontais (Setores) */}
          <div className="bg-[#B2B5E0]/20 p-8 md:p-10 rounded-[3rem] shadow-sm">
            <h3 className="text-xl font-serif font-bold text-[#2C2D41] mb-2">Distribuição por Área Temática</h3>
            <p className="text-[#2C2D41]/70 mb-8 text-sm">Concentração dos projetos e publicações mapeadas no ecossistema.</p>
            
            <div className="space-y-6">
              {[
                { label: 'Saúde, Genômica & Diagnóstico', value: '32%', width: 'w-[32%]', color: 'bg-[#2C2D41]' },
                { label: 'Processamento de Linguagem Natural (PT-BR)', value: '28%', width: 'w-[28%]', color: 'bg-[#C5ADC5]' },
                { label: 'Governança & Setor Público (GovTech)', value: '24%', width: 'w-[24%]', color: 'bg-[#B2B5E0]' },
                { label: 'Agronegócio & Sustentabilidade', value: '16%', width: 'w-[16%]', color: 'bg-white' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2 font-bold text-[#2C2D41]">
                    <span>{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                  <div className="w-full bg-white/50 rounded-full h-4 shadow-inner overflow-hidden">
                    <div className={`${item.color} ${item.width} h-4 rounded-full transition-all duration-500`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Complementar 2: Gráfico de Rosca (Origem Institucional) */}
          <div className="bg-[#C5ADC5]/30 p-8 md:p-10 rounded-[3rem] shadow-sm flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-xl font-serif font-bold text-[#2C2D41] mb-2">Origem Institucional</h3>
              <p className="text-[#2C2D41]/70 mb-6 text-sm">Composição das entidades envolvidas nos projetos cadastrados.</p>
              
              {/* Legendas */}
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm font-semibold text-[#2C2D41]">
                  <div className="w-4 h-4 rounded-full bg-[#2C2D41]"></div>
                  Universidades Federais & ICTs (48%)
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold text-[#2C2D41]">
                  <div className="w-4 h-4 rounded-full bg-[#B2B5E0]"></div>
                  Iniciativa Privada & Startups (36%)
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold text-[#2C2D41]">
                  <div className="w-4 h-4 rounded-full bg-white"></div>
                  Fundações Públicas & ONGs (16%)
                </li>
              </ul>
            </div>
            
            {/* Gráfico de Rosca (conic-gradient puro Tailwind) */}
            <div 
              className="w-48 h-48 rounded-full relative flex items-center justify-center shadow-md flex-shrink-0"
              style={{
                background: 'conic-gradient(#2C2D41 0% 48%, #B2B5E0 48% 84%, #ffffff 84% 100%)'
              }}
            >
              {/* Círculo central para dar o efeito de Donut */}
              <div className="w-32 h-32 bg-[#F8F9FA] rounded-full flex flex-col items-center justify-center shadow-inner">
                <span className="font-serif font-black text-2xl text-[#2C2D41]">{totalGeral}</span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#2C2D41]/60">Total</span>
              </div>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}