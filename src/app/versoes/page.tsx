import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catálogo de Versões de Layout | NIA',
  description: 'Explore as diferentes opções de design e conceitos de interface desenvolvidos para o Observatório NIA.',
};

export default function VersoesPage() {
  const versoes = [
    {
      slug: '/',
      tag: 'Oficial • Ativa',
      title: 'Versão Oficial do Observatório',
      descricao: 'Layout institucional consolidado com Hero de impacto, Bento Box analítico, métricas dinâmicas do Supabase e terminal simulado com dados reais do GitHub.',
      destaques: ['Bento Box Grid', 'Terminal GitHub em tempo real', 'Identidade Roxo Pastel & Azul Aço institucional'],
      badgeColor: 'bg-[#2C2D41] text-white',
    },
    {
      slug: '/versoes/op2',
      tag: 'Conceito Editorial',
      title: 'Versão Alternativa — Opção 2',
      descricao: 'Abordagem focada em narrativa visual e formas orgânicas, com arte geométrica abstrata em camadas de cores e ênfase na fluidez de leitura.',
      destaques: ['Hero com formas fluídas', 'Grid de módulos simplificado', 'Estilo editorial acadêmico'],
      badgeColor: 'bg-[#C5ADC5] text-[#2C2D41]',
    },
    {
      slug: '/versoes/op3',
      tag: 'Conceito Analítico',
      title: 'Versão Alternativa — Opção 3',
      descricao: 'Proposta focada em dashboards e densidade de informação científica, com cards de navegação rápida e visualização sintética.',
      destaques: ['Cards compactos de métricas', 'Foco em ferramentas de busca', 'Estrutura técnica para pesquisadores'],
      badgeColor: 'bg-[#B2B5E0] text-[#2C2D41]',
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8F9FA] font-sans text-[#2C2D41] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb dinâmico */}
        <Breadcrumb />

        {/* 1. Hero da Página de Versões */}
        <section className="bg-white rounded-[2.5rem] shadow-sm border border-[#B2B5E0]/30 p-8 md:p-12 mt-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#C5ADC5]/20 border border-[#C5ADC5]/40 rounded-full text-xs font-bold text-[#2C2D41] uppercase tracking-widest mb-6">
              <span>Laboratório de Interface & UX</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#2C2D41] leading-tight mb-4">
              Versões e Conceitos de Layout
            </h1>
            <p className="text-lg text-[#2C2D41]/80 font-light leading-relaxed">
              Durante o processo de concepção do portal <strong>NIA</strong>, foram desenvolvidas diferentes propostas visuais e de arquitetura de informação. Aqui você pode navegar por cada uma das versões preservadas.
            </p>
          </div>
        </section>

        {/* 2. Grid de Versões */}
        <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {versoes.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-3xl border border-[#B2B5E0]/30 p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${item.badgeColor}`}>
                  {item.tag}
                </span>
                <h3 className="text-xl font-serif font-bold text-[#2C2D41] mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-[#2C2D41]/80 font-light leading-relaxed mb-6">
                  {item.descricao}
                </p>

                <div className="space-y-2 mb-8 pt-4 border-t border-[#B2B5E0]/20">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2C2D41]/60 block">Destaques:</span>
                  {item.destaques.map((destaque, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-[#2C2D41]/80">
                      <span className="text-[#C5ADC5]">✦</span>
                      <span>{destaque}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={item.slug}
                className="w-full py-3 px-4 bg-[#2C2D41] hover:bg-[#B2B5E0] hover:text-[#2C2D41] text-white font-bold rounded-xl text-center text-sm transition-colors shadow-sm block"
              >
                Navegar nesta Versão &rarr;
              </Link>
            </div>
          ))}
        </section>

      </div>
    </main>
  );
}
