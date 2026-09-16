export const metadata = {
  title: 'Política de Privacidade | NIA',
};

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] font-sans text-[#2C2D41] py-12">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Container padronizado */}
        <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-sm border border-[#B2B5E0]/30">
          
          {/* Cabeçalho isolado do prose para maior controle visual */}
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#2C2D41] mb-2 leading-tight">
            Política de Privacidade e Proteção de Dados
          </h1>
          <p className="text-xs text-[#2C2D41]/60 font-bold uppercase tracking-wide mb-10 pb-6 border-b border-[#B2B5E0]/30">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>

          <div className="prose max-w-none 
            prose-headings:font-serif prose-headings:font-bold prose-headings:text-[#2C2D41] prose-headings:mt-8 prose-headings:mb-4
            prose-p:text-[#2C2D41]/80 prose-p:leading-relaxed prose-p:mb-4
            prose-strong:text-[#2C2D41] prose-strong:font-bold
            prose-ul:text-[#2C2D41]/80 prose-li:marker:text-[#C5ADC5] prose-ul:mb-6">
            
            <h2>1. Identificação do Controlador</h2>
            <p>O Núcleo de Inteligência Artificial (NIA) atua como controlador dos dados pessoais coletados neste portal no âmbito de suas pesquisas e serviços abertos.</p>

            <h2>2. Dados Coletados e Finalidade (Minimização)</h2>
            <ul>
              <li><strong>Dados de Navegação (Cookies):</strong> Endereço IP, tempo de sessão, páginas visitadas (mediante consentimento). Finalidade: Análise de métricas para melhoria do portal.</li>
              <li><strong>Dados de Submissão (Formulário):</strong> Nome/Instituição, e-mail de contato, URLs submetidas. Finalidade: Curadoria acadêmica e comunicação sobre o status da submissão.</li>
            </ul>

            <h2>3. Base Legal para o Tratamento</h2>
            <p>O processamento ocorre com base no <strong>Consentimento</strong> (Art. 7º, I da LGPD) fornecido livremente ao aceitar os cookies ou ao enviar formulários de colaboração.</p>

            <h2>4. Armazenamento e Segurança (Privacy by Design)</h2>
            <p>Os dados são armazenados em infraestrutura de nuvem com criptografia em trânsito e em repouso. O banco de dados (Supabase) utiliza políticas restritas de segurança a nível de linha (RLS).</p>

            <h2>5. Direitos do Titular (Política de Retratação)</h2>
            <p>De acordo com o Art. 18 da LGPD, você tem o direito de solicitar a qualquer momento:</p>
            <ul>
              <li>A confirmação e o acesso aos seus dados processados pelo NIA.</li>
              <li>A correção de dados incompletos ou desatualizados.</li>
              <li>A <strong>revogação do consentimento</strong> e a <strong>exclusão dos dados</strong> fornecidos (ex: solicitar a remoção de um documento submetido do Acervo).</li>
            </ul>

            <h2>6. Contato do Encarregado de Dados (DPO)</h2>
            <p>Para exercer seus direitos de retratação ou tirar dúvidas sobre esta política, entre em contato através do e-mail: <strong>dpo@nia.org.br</strong>.</p>
          </div>
          <div className="mb-4">
            <a href="/" className="text-[#B2B5E0] hover:text-[#2C2D41] font-semibold text-sm transition-colors flex items-center gap-2">
              <span>&larr;</span> Voltar para o Início
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}