import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Metodologia de Coleta e Curadoria | NIA-UFRJ',
  description: 'Conheça os critérios científicos, rigor metodológico e etapas de curadoria humana do Observatório NIA-UFRJ.',
};

export default function MetodologiaPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] font-sans text-[#2C2D41] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb dinâmico */}
        <Breadcrumb />

        {/* 1. Hero Institucional da Metodologia */}
        <section className="bg-white rounded-[2.5rem] shadow-sm border border-[#B2B5E0]/30 p-8 md:p-14 mt-4 relative overflow-hidden">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#C5ADC5]/20 border border-[#C5ADC5]/40 rounded-full text-xs font-bold text-[#2C2D41] uppercase tracking-widest mb-6">
              <span>Transparência Científica & Rigor</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#2C2D41] leading-tight mb-6">
              Metodologia do Observatório
            </h1>
            <p className="text-lg md:text-xl text-[#2C2D41]/80 font-light leading-relaxed">
              Como o <strong>NIA-UFRJ</strong> coleta, audita, categoriza e disponibiliza informações fidedignas sobre a Inteligência Artificial brasileira para a sociedade, academia e indústria.
            </p>
          </div>
        </section>

        {/* 2. O Ciclo de Curadoria em 4 Etapas */}
        <section className="mt-12">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2C2D41] mb-2">
              O Ciclo de Vida do Dado no NIA-UFRJ
            </h2>
            <p className="text-base text-[#2C2D41]/70 max-w-2xl font-light">
              Nenhuma entrada é publicada de forma automatizada sem verificação humana e validação acadêmica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="bg-white p-8 rounded-3xl border border-[#B2B5E0]/30 shadow-sm flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#2C2D41] text-white font-serif font-bold text-lg mb-6">
                  1
                </div>
                <h3 className="text-xl font-serif font-bold text-[#2C2D41] mb-3">
                  Varredura e Mineração Ativa
                </h3>
                <p className="text-[#2C2D41]/80 font-light leading-relaxed text-sm mb-4">
                  Nossos pesquisadores monitoram ativamente repositórios de código aberto (GitHub, Hugging Face), periódicos científicos (SciELO, IEEE, arXiv), bases de dados governamentais e registros de patentes para identificar avanços brasileiros genuínos em IA.
                </p>
                <div className="p-3 bg-[#F8F9FA] rounded-xl text-xs text-[#2C2D41]/70 border border-[#B2B5E0]/20">
                  <strong>Foco:</strong> Repositórios com tags relevantes ao ecossistema nacional e artigos com afiliações brasileiras.
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#B2B5E0]/30 shadow-sm flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#2C2D41] text-white font-serif font-bold text-lg mb-6">
                  2
                </div>
                <h3 className="text-xl font-serif font-bold text-[#2C2D41] mb-3">
                  Submissão Aberta com Consentimento
                </h3>
                <p className="text-[#2C2D41]/80 font-light leading-relaxed text-sm mb-4">
                  Através dos canais de submissão da plataforma, pesquisadores, desenvolvedores e empreendedores submetem suas iniciativas preenchendo termos de consentimento e minimização em conformidade direta com a LGPD.
                </p>
                <div className="p-3 bg-[#F8F9FA] rounded-xl text-xs text-[#2C2D41]/70 border border-[#B2B5E0]/20">
                  <strong>Rastreabilidade:</strong> Armazenamento seguro de metadados no Supabase com isolamento de autorização (RLS).
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#B2B5E0]/30 shadow-sm flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#2C2D41] text-white font-serif font-bold text-lg mb-6">
                  3
                </div>
                <h3 className="text-xl font-serif font-bold text-[#2C2D41] mb-3">
                  Curadoria Humana & Síntese em 4 Blocos
                </h3>
                <p className="text-[#2C2D41]/80 font-light leading-relaxed text-sm mb-4">
                  Antes da aprovação no painel administrativo, o material é analisado e estruturado segundo o framework de 4 blocos analíticos estabelecido no plano do Observatório:
                </p>
                <ul className="text-xs space-y-1.5 text-[#2C2D41]/80 list-disc list-inside">
                  <li><strong>Destaques:</strong> Síntese executiva do impacto e da contribuição.</li>
                  <li><strong>Observações:</strong> Limitações metodológicas, escopo e premissas.</li>
                  <li><strong>Achados:</strong> Evidências técnicas, métricas e resultados empíricos.</li>
                  <li><strong>Conclusões:</strong> Implicações para a comunidade e políticas públicas.</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#B2B5E0]/30 shadow-sm flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#2C2D41] text-white font-serif font-bold text-lg mb-6">
                  4
                </div>
                <h3 className="text-xl font-serif font-bold text-[#2C2D41] mb-3">
                  Indexação Aberta e Citabilidade
                </h3>
                <p className="text-[#2C2D41]/80 font-light leading-relaxed text-sm mb-4">
                  Os documentos e repositórios aprovados são integrados ao Diretório e ao Acervo Aberto. Cada documento recebe identificador persistente e metadados estruturados para citação em trabalhos acadêmicos.
                </p>
                <div className="p-3 bg-[#F8F9FA] rounded-xl text-xs text-[#2C2D41]/70 border border-[#B2B5E0]/20">
                  <strong>Padrão:</strong> Licença CC BY 4.0 para metadados e livre acesso universal.
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 3. Taxonomia de Entidades do Diretório */}
        <section className="mt-14 bg-white rounded-[2.5rem] border border-[#B2B5E0]/30 p-8 md:p-12 shadow-sm">
          <div className="max-w-3xl mb-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2C2D41] mb-3">
              Taxonomia e Categorização
            </h2>
            <p className="text-base text-[#2C2D41]/70 font-light leading-relaxed">
              O ecossistema é catalogado sob categorias taxonômicas padronizadas para viabilizar consultas cruzadas:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-[#B2B5E0]/20">
              <span className="text-xs font-bold text-[#2C2D41] bg-[#B2B5E0]/30 px-3 py-1 rounded-full uppercase tracking-wider">Startup</span>
              <p className="text-sm text-[#2C2D41]/80 mt-3 font-light">
                Empresas emergentes inovadoras baseadas em tecnologia com modelos escaláveis focadas em produtos de IA.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-[#B2B5E0]/20">
              <span className="text-xs font-bold text-[#2C2D41] bg-[#B2B5E0]/30 px-3 py-1 rounded-full uppercase tracking-wider">Centro de Pesquisa</span>
              <p className="text-sm text-[#2C2D41]/80 mt-3 font-light">
                Laboratórios universitários, institutos de ciência e tecnologia (ICTs) e núcleos acadêmicos dedicados à P&D.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-[#B2B5E0]/20">
              <span className="text-xs font-bold text-[#2C2D41] bg-[#B2B5E0]/30 px-3 py-1 rounded-full uppercase tracking-wider">Iniciativa Pública</span>
              <p className="text-sm text-[#2C2D41]/80 mt-3 font-light">
                Órgãos governamentais, autarquias e programas de estado com implementação ou governança de IA.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-[#B2B5E0]/20">
              <span className="text-xs font-bold text-[#2C2D41] bg-[#B2B5E0]/30 px-3 py-1 rounded-full uppercase tracking-wider">Empresa</span>
              <p className="text-sm text-[#2C2D41]/80 mt-3 font-light">
                Organizações consolidadas de mercado com centros dedicados de inovação e adoção tecnológica em IA.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-[#B2B5E0]/20">
              <span className="text-xs font-bold text-[#2C2D41] bg-[#B2B5E0]/30 px-3 py-1 rounded-full uppercase tracking-wider">ONG</span>
              <p className="text-sm text-[#2C2D41]/80 mt-3 font-light">
                Organizações da sociedade civil atuando em ética algorítmica, inclusão digital e direitos fundamentais.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-[#B2B5E0]/20">
              <span className="text-xs font-bold text-[#2C2D41] bg-[#C5ADC5]/30 px-3 py-1 rounded-full uppercase tracking-wider">Hub de Códigos</span>
              <p className="text-sm text-[#2C2D41]/80 mt-3 font-light">
                Repositórios auditados com foco em datasets em português, modelos pré-treinados e bibliotecas abertas.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Call to Action Institucional */}
        <section className="mt-14 text-center">
          <div className="bg-[#2C2D41] rounded-3xl p-8 md:p-12 text-white shadow-xl">
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">
              Contribua com os Dados do Observatório
            </h3>
            <p className="text-[#B2B5E0] max-w-xl mx-auto mb-8 font-light text-base">
              Conhece uma iniciativa, artigo ou repositório relevante para o ecossistema brasileiro? Submeta para a avaliação da nossa equipe de curadoria.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/colaborar"
                className="px-8 py-3.5 bg-white text-[#2C2D41] hover:bg-[#B2B5E0] font-bold rounded-xl transition-colors shadow-sm text-sm"
              >
                Submeter Iniciativa
              </Link>
              <Link
                href="/diretorio"
                className="px-8 py-3.5 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#2C2D41] font-bold rounded-xl transition-colors text-sm"
              >
                Explorar Diretório
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
