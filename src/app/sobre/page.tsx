import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre o Projeto | NIA',
  description: 'Conheça o Núcleo de Inteligência Artificial: compromisso público, metodologia de coleta de dados e equipe.',
};

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] font-sans text-[#2C2D41] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb dinâmico */}
        <Breadcrumb />

        {/* 1. Hero Institucional */}
        <section className="bg-white rounded-[2.5rem] shadow-sm border border-[#B2B5E0]/30 p-8 md:p-14 mt-4 text-center md:text-left relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-8 justify-between relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#C5ADC5]/20 border border-[#C5ADC5]/40 rounded-full text-xs font-bold text-[#2C2D41] uppercase tracking-widest mb-6">
                <span>Iniciativa Acadêmica Institucional</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#2C2D41] leading-tight mb-6">
                Núcleo de Inteligência Artificial
              </h1>
              <p className="text-lg md:text-xl text-[#2C2D41]/80 font-light leading-relaxed">
                O <strong>NIA</strong> é a referência aberta e institucional sobre adoção, dados e código de Inteligência Artificial no Brasil, conectando a vanguarda da pesquisa científica universitária, as demandas do setor público e o dinamismo do setor produtivo sob rigor metodológico e transparência.
              </p>
            </div>

            {/* Emblema Hexagonal Oficial */}
            <div className="shrink-0 flex flex-col items-center gap-3">
              <div 
                className="w-28 h-28 bg-[#B2B5E0] flex items-center justify-center text-[#2C2D41] font-serif font-bold text-6xl shadow-xl clip-hexagon"
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
              >
                n
              </div>
              <span className="text-xs font-bold tracking-widest text-[#2C2D41]/60 uppercase">
                Observatório IA
              </span>
            </div>
          </div>
        </section>

        {/* 2. Pilares de Atuação */}
        <section className="mt-12">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2C2D41] mb-2">
              Pilares e Compromisso Público
            </h2>
            <p className="text-base text-[#2C2D41]/70 max-w-2xl font-light">
              Nossa missão é pautada pelo interesse coletivo, transparência científica e soberania tecnológica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white p-8 rounded-3xl border border-[#B2B5E0]/30 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#C5ADC5]/20 text-[#2C2D41] flex items-center justify-center text-2xl mb-6 shadow-xs">
                  📊
                </div>
                <h3 className="text-xl font-serif font-bold text-[#2C2D41] mb-3">
                  Ciência Aberta & Dados Citáveis
                </h3>
                <p className="text-[#2C2D41]/80 font-light leading-relaxed text-sm">
                  Disponibilizamos não apenas relatórios e gráficos, mas bases de dados abertas e auditáveis para que pesquisadores e formuladores de políticas possam embasar suas decisões.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#B2B5E0]/30 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#C5ADC5]/20 text-[#2C2D41] flex items-center justify-center text-2xl mb-6 shadow-xs">
                  ⚖️
                </div>
                <h3 className="text-xl font-serif font-bold text-[#2C2D41] mb-3">
                  Ética e Impacto Social
                </h3>
                <p className="text-[#2C2D41]/80 font-light leading-relaxed text-sm">
                  Acompanhamos a evolução normativa e os impactos sociotécnicos dos sistemas algorítmicos no Brasil, promovendo o debate sobre governança responsável e direitos fundamentais.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#B2B5E0]/30 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#C5ADC5]/20 text-[#2C2D41] flex items-center justify-center text-2xl mb-6 shadow-xs">
                  🌐
                </div>
                <h3 className="text-xl font-serif font-bold text-[#2C2D41] mb-3">
                  Conexão Tripla Hélice
                </h3>
                <p className="text-[#2C2D41]/80 font-light leading-relaxed text-sm">
                  Integramos academia, governo e empresas em uma rede colaborativa voltada à resolução de problemas complexos nacionais através da Inteligência Artificial.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* 3. Metodologia de Coleta e Curadoria */}
        <section className="mt-14 bg-white rounded-[2.5rem] border border-[#B2B5E0]/30 p-8 md:p-12 shadow-sm">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#2C2D41] uppercase tracking-wider mb-3">
              <span className="text-[#C5ADC5]">✦</span>
              <span>Rigor e Transparência</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2C2D41] mb-4">
              Metodologia de Coleta e Curadoria
            </h2>
            <p className="text-base text-[#2C2D41]/70 font-light leading-relaxed">
              Para garantir que as informações do portal representem com fidelidade o ecossistema brasileiro de IA, adotamos um processo contínuo e rigoroso em etapas estruturadas:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-[#B2B5E0]/20">
              <span className="text-xs font-bold text-[#2C2D41] uppercase tracking-wider block mb-2">
                <span className="text-[#C5ADC5]">✦</span> Etapa 1
              </span>
              <h4 className="font-bold text-lg text-[#2C2D41] mb-2">Mapeamento e Varredura Ativa</h4>
              <p className="text-sm text-[#2C2D41]/80 leading-relaxed font-light">
                Monitoramento contínuo de publicações acadêmicas, registros de propriedade intelectual, repositórios de código aberto (GitHub, Hugging Face) e dados públicos governamentais sobre iniciativas de IA.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-[#B2B5E0]/20">
              <span className="text-xs font-bold text-[#2C2D41] uppercase tracking-wider block mb-2">
                <span className="text-[#C5ADC5]">✦</span> Etapa 2
              </span>
              <h4 className="font-bold text-lg text-[#2C2D41] mb-2">Submissão Aberta com Consentimento</h4>
              <p className="text-sm text-[#2C2D41]/80 leading-relaxed font-light">
                A comunidade acadêmica e empresarial pode submeter projetos, teses e repositórios diretamente pelo canal Colaborar, com estrita observância à LGPD e integridade de conteúdo.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-[#B2B5E0]/20">
              <span className="text-xs font-bold text-[#2C2D41] uppercase tracking-wider block mb-2">
                <span className="text-[#C5ADC5]">✦</span> Etapa 3
              </span>
              <h4 className="font-bold text-lg text-[#2C2D41] mb-2">Revisão por Pares & Curadoria Humana</h4>
              <p className="text-sm text-[#2C2D41]/80 leading-relaxed font-light">
                Nenhum dado é publicado automaticamente sem auditoria prévia. Pesquisadores e especialistas validam os links, analisam a relevância técnica e sintetizam os quatro blocos essenciais: Destaques, Observações, Achados e Conclusões.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-[#B2B5E0]/20">
              <span className="text-xs font-bold text-[#2C2D41] uppercase tracking-wider block mb-2">
                <span className="text-[#C5ADC5]">✦</span> Etapa 4
              </span>
              <h4 className="font-bold text-lg text-[#2C2D41] mb-2">Indexação e Dados Abertos</h4>
              <p className="text-sm text-[#2C2D41]/80 leading-relaxed font-light">
                Os registros homologados são catalogados no Diretório e no Acervo Aberto, ficando acessíveis para consulta, filtragem dinâmica e download em formatos abertos pela comunidade.
              </p>
            </div>

          </div>
        </section>

        {/* 4. Equipe e Governança */}
        <section className="mt-14">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2C2D41] mb-2">
              Equipe e Governança
            </h2>
            <p className="text-base text-[#2C2D41]/70 max-w-2xl font-light">
              O projeto congrega pesquisadores, docentes e especialistas dedicados ao avanço ético e transparente da tecnologia.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-[#B2B5E0]/30 p-8 md:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h3 className="text-xl font-serif font-bold text-[#2C2D41] mb-3">
                Interdisciplinaridade e Excelência
              </h3>
              <p className="text-[#2C2D41]/80 text-sm leading-relaxed font-light mb-4">
                A iniciativa conta com a colaboração de pesquisadores nas áreas de Ciência da Computação, Engenharia de Sistemas, Ciências Humanas, Sociais Aplicadas e Direito Digital.
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-[#2C2D41]/80">
                Observatório de Inteligência Artificial • Brasil
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Link
                href="/colaborar"
                className="px-6 py-3.5 bg-[#2C2D41] hover:bg-[#B2B5E0] hover:text-[#2C2D41] text-white font-bold rounded-xl text-center transition-colors shadow-sm text-sm"
              >
                Submeter Iniciativa
              </Link>
              <Link
                href="/diretorio"
                className="px-6 py-3.5 bg-white border-2 border-[#2C2D41] text-[#2C2D41] hover:bg-[#2C2D41] hover:text-white font-bold rounded-xl text-center transition-colors text-sm"
              >
                Ver Diretório
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
