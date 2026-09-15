import { createClient } from '@/lib/supabase/server';
import { DocumentCard, DocumentItem } from '@/components/features/acervo/DocumentCard';
import { AcervoFilter } from '@/components/features/acervo/AcervoFilter';

// Tipagem de Promise exigida pelas rotas dinâmicas do Next.js 15
type SearchParams = Promise<{
  q?: string;
  tipo?: string;
}>;

export const revalidate = 0; // Impede cache agressivo, garantindo dados sempre vivos

export default async function AcervoPage(props: {
  searchParams: SearchParams;
}) {
  // Desempacotamento seguro dos parâmetros
  const searchParams = await props.searchParams;
  const q = searchParams?.q || '';
  const tipo = searchParams?.tipo || '';

  // Inicialização do client Supabase no servidor
  const supabase = await createClient();

  // Montagem da query
  let query = supabase
    .from('acervo')
    .select('*')
    .order('data_publicacao', { ascending: false }); // Exibe os mais recentes primeiro

  // Aplicação dos filtros dinâmicos
  if (tipo) {
    query = query.eq('tipo_documento', tipo);
  }
  
  if (q) {
    // Busca abrangente: encontra o termo no título OU no autor
    query = query.or(`titulo.ilike.%${q}%,autor.ilike.%${q}%`);
  }

  const { data: acervo, error } = await query;

  if (error) {
    console.error("Erro ao buscar documentos no acervo:", error);
  }

  return (
    <main className="min-h-screen bg-[#F8F9FA] font-sans text-[#2C2D41] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Página */}
        <div className="mb-12 border-b border-[#B2B5E0]/30 pb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2C2D41] tracking-tight flex items-center gap-4">
            Acervo Aberto
          </h1>
          <p className="mt-6 text-lg md:text-xl text-[#2C2D41]/80 max-w-3xl leading-relaxed font-light">
            Navegue pela nossa biblioteca oficial. Consulte teses, guias regulatórios, 
            relatórios e artigos fundamentais para o desenvolvimento da Inteligência Artificial no Brasil.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar de Filtros (Client-side interactivity) */}
          <aside className="w-full lg:w-1/4 flex-shrink-0">
            <AcervoFilter />
          </aside>

          {/* Grid de Resultados (Server-side rendered) */}
          <div className="w-full lg:w-3/4">
            {acervo && acervo.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {acervo.map((item: DocumentItem) => (
                    <DocumentCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
                // Empty State
                <div className="flex flex-col items-center justify-center bg-white border-2 border-dashed border-[#B2B5E0]/50 rounded-[3rem] py-24 px-6 text-center shadow-sm">
                <div className="w-20 h-20 bg-[#C5ADC5]/20 text-[#2C2D41] rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner">
                  📚
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#2C2D41] mb-3">Nenhum documento encontrado</h3>
                <p className="text-[#2C2D41]/70 max-w-md text-lg">
                  Não encontramos nenhum material correspondente aos filtros aplicados. 
                  Tente remover alguns filtros ou buscar por outros termos.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}