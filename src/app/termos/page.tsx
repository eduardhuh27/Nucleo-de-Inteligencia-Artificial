import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termos de Uso | NIA',
  description: 'Termos de uso, diretrizes de citação acadêmica e políticas de dados abertos do portal NIA.',
};

export default function TermosPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] font-sans text-[#2C2D41] py-12">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Container padronizado */}
        <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-sm border border-[#B2B5E0]/30">
          
          <div className="mb-4">
            <Link 
              href="/" 
              className="text-[#B2B5E0] hover:text-[#2C2D41] font-semibold text-sm transition-colors flex items-center gap-2"
            >
              <span>&larr;</span> Voltar para o Início
            </Link>
          </div>

          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#2C2D41] mb-2 leading-tight">
            Termos de Uso e Licenciamento
          </h1>
          <p className="text-xs text-[#2C2D41]/60 font-bold uppercase tracking-wide mb-10 pb-6 border-b border-[#B2B5E0]/30">
            Última atualização: {new Date().toLocaleDateString('pt-BR')} • Observatório de Inteligência Artificial
          </p>

          <div className="prose max-w-none 
            prose-headings:font-serif prose-headings:font-bold prose-headings:text-[#2C2D41] prose-headings:mt-8 prose-headings:mb-4
            prose-p:text-[#2C2D41]/80 prose-p:leading-relaxed prose-p:mb-4
            prose-strong:text-[#2C2D41] prose-strong:font-bold
            prose-ul:text-[#2C2D41]/80 prose-li:marker:text-[#C5ADC5] prose-ul:mb-6">
            
            <h2>1. Natureza Acadêmica e Propósito Público</h2>
            <p>
              O portal do <strong>Núcleo de Inteligência Artificial (NIA)</strong> é uma iniciativa acadêmica e de pesquisa aberta sem fins lucrativos desenvolvida com o objetivo de catalogar, analisar e promover o ecossistema brasileiro de Inteligência Artificial, incentivando a pesquisa científica, a transparência pública e a inovação tecnológica responsável.
            </p>

            <h2>2. Licenciamento de Conteúdo e Dados Abertos</h2>
            <p>
              Em consonância com os princípios da Ciência Aberta, as análises, sínteses analíticas e metadados produzidos diretamente pela equipe do NIA são disponibilizados sob a licença <strong>Creative Commons Attribution 4.0 International (CC BY 4.0)</strong>, salvo disposição em contrário explícita.
            </p>
            <p>
              Isso significa que você tem a liberdade de compartilhar, copiar e redistribuir o material em qualquer suporte ou formato, desde que forneça o devido crédito acadêmico ao NIA.
            </p>

            <h2>3. Diretrizes de Citação Científica</h2>
            <p>
              Para citar dados, relatórios ou informações obtidas a partir deste observatório em publicações científicas ou produções técnicas, utilize o seguinte padrão:
            </p>
            <div className="bg-[#F8F9FA] p-4 rounded-xl border border-[#B2B5E0]/30 text-xs font-mono text-[#2C2D41] not-prose mb-6">
              NÚCLEO DE INTELIGÊNCIA ARTIFICIAL (NIA). Observatório de Inteligência Artificial no Brasil. {new Date().getFullYear()}. Disponível em: &lt;https://nia.org.br&gt;.
            </div>

            <h2>4. Submissões Comunitárias e Responsabilidade</h2>
            <p>
              Ao submeter projetos, repositórios ou publicações através do canal <strong>Colaborar</strong> ou do <strong>Acervo</strong>, o usuário declara e garante que:
            </p>
            <ul>
              <li>Possui os direitos necessários ou autorização para submissão dos links, metadados e arquivos enviados;</li>
              <li>O material submetido respeita a legislação vigente, a integridade ética da pesquisa científica e a Lei Geral de Proteção de Dados Pessoais (LGPD);</li>
              <li>O material não contém código malicioso, dados sigilosos não autorizados ou declarações difamatórias.</li>
            </ul>

            <h2>5. Curadoria e Moderação</h2>
            <p>
              O NIA reserva-se o direito de recusar, editar metadados ou despublicar qualquer item submetido que não cumpra os critérios metodológicos de rigor científico ou as diretrizes de integridade da iniciativa.
            </p>

            <h2>6. Isenção de Garantias</h2>
            <p>
              As informações disponibilizadas neste portal são fornecidas &ldquo;no estado em que se encontram&rdquo; para propósitos estritamente educacionais, científicos e de transparência. Embora a equipe de curadoria do NIA empregue os melhores esforços para assegurar a acurácia dos dados, o observatório não se responsabiliza por decisões comerciais ou operacionais tomadas com base nas informações aqui publicadas.
            </p>

            <h2>7. Alterações destes Termos</h2>
            <p>
              O NIA poderá revisar estes termos a qualquer momento para refletir melhorias no portal ou atualizações normativas e legislativas. O uso continuado da plataforma após eventuais alterações constitui ciência dos novos termos.
            </p>
          </div>

          <div className="mt-10 pt-6 border-t border-[#B2B5E0]/20 flex justify-between items-center text-sm">
            <Link href="/" className="text-[#2C2D41] hover:text-[#C5ADC5] font-semibold transition-colors">
              &larr; Página Principal
            </Link>
            <Link href="/privacidade" className="text-[#2C2D41] hover:text-[#C5ADC5] font-semibold transition-colors">
              Política de Privacidade (LGPD) &rarr;
            </Link>
          </div>

        </div>
      </article>
    </main>
  );
}
