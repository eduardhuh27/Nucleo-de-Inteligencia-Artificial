import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';

export const metadata = {
  title: 'Diretrizes de Integridade de Conteúdo | NIA-UFRJ',
  description: 'Regras técnicas e processuais para a manutenção da legalidade e transparência do portal.',
};

export default function IntegridadePage() {
  // 1. Busca o caminho exato do arquivo na raiz do projeto
  const filePath = path.join(process.cwd(), 'CONTENT_INTEGRITY.md');
  
  // 2. Lê o conteúdo do arquivo como texto (UTF-8)
  let content = '';
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error("Erro ao ler o arquivo Markdown:", error);
    content = '# Erro\nNão foi possível carregar as diretrizes no momento.';
  }

  return (
    <main className="min-h-screen bg-[#F8F9FA] font-sans text-[#2C2D41] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Container estilizado com nossa borda arredondada e padding balanceado */}
        <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-sm border border-[#B2B5E0]/30">
          
          {/* 
            Sobrescrevemos o comportamento padrão do Typography plugin 
            para injetar nossa paleta e a fonte serifada nos títulos.
          */}
          <article className="prose max-w-none 
            prose-headings:font-serif prose-headings:font-bold prose-headings:text-[#2C2D41] 
            prose-p:text-[#2C2D41]/80 prose-p:leading-relaxed 
            prose-a:text-[#2C2D41] prose-a:font-bold hover:prose-a:text-[#B2B5E0] prose-a:transition-colors
            prose-strong:text-[#2C2D41] prose-strong:font-bold
            prose-ul:text-[#2C2D41]/80 prose-li:marker:text-[#C5ADC5]
            prose-hr:border-[#B2B5E0]/30">
            <ReactMarkdown>
              {content}
            </ReactMarkdown>
          </article>
          <div className="mb-4">
            <a href="/" className="text-[#B2B5E0] hover:text-[#2C2D41] font-semibold text-sm transition-colors flex items-center gap-2">
              <span>&larr;</span> Voltar para o Início
            </a>
          </div>
        </div>
      </div>
    </main>
  );
} 