import { createClient } from '@/lib/supabase/server';
import { DirectoryCard, DirectoryItem } from '@/components/features/diretorio/DirectoryCard';
import { DirectoryFilter } from '@/components/features/diretorio/DirectoryFilter';

// 1. O Next.js 15 agora exige que a tipagem englobe uma Promise
type SearchParams = Promise<{
  q?: string;
  tipo?: string;
}>;

export const revalidate = 0;

export default async function DiretorioPage(props: {
  searchParams: SearchParams; // Passamos a tipagem da Promise aqui
}) {
  // 2. Desempacotamos os parâmetros com await ANTES de usá-los
  const searchParams = await props.searchParams;
  
  const supabase = await createClient();
  
  // 3. Agora podemos acessar normalmente
  const q = searchParams?.q || '';
  const tipo = searchParams?.tipo || '';

  // Inicia a query baseada no RLS
  let query = supabase
    .from('diretorio')
    .select('*')
    .order('nome', { ascending: true });

  // Aplica filtros se existirem na URL
  if (tipo) {
    query = query.eq('tipo_entidade', tipo);
  }
  
  if (q) {
    // Busca no nome OU na descrição usando a sintaxe OR do PostgREST
    query = query.or(`nome.ilike.%${q}%,descricao.ilike.%${q}%`);
  }

  // Executa o fetch no SERVIDOR (seguro e rápido)
  const { data: diretorio, error } = await query;

  if (error) {
    console.error("Erro ao buscar diretório:", error);
  }

  return (
    <main className="min-h-screen bg-[#F8F9FA] font-sans text-[#2C2D41] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header do Módulo */}
        <div className="mb-12 border-b border-[#B2B5E0]/30 pb-8 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2C2D41] tracking-tight flex items-center justify-center md:justify-start gap-4">
            
            Diretório IA Brasil
          </h1>
          <p className="mt-6 text-lg md:text-xl text-[#2C2D41]/80 max-w-3xl mx-auto md:mx-0 leading-relaxed font-light">
            Catálogo aberto do ecossistema de Inteligência Artificial. Descubra empresas, 
            centros de pesquisa e iniciativas moldando o futuro da tecnologia no país.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar de Filtros (Client Component) */}
          <aside className="w-full lg:w-1/4 flex-shrink-0">
            <DirectoryFilter />
          </aside>

          {/* Grid de Resultados (Server Rendered) */}
          <div className="w-full lg:w-3/4">
            {diretorio && diretorio.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {diretorio.map((item) => (
                  <DirectoryCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              // Empty State (Estado Vazio) 
              <div className="flex flex-col items-center justify-center bg-white border-2 border-dashed border-[#B2B5E0]/50 rounded-[3rem] py-24 px-6 text-center shadow-sm">
                <div className="w-20 h-20 bg-[#C5ADC5]/20 text-[#2C2D41] rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner">
                  🔍
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#2C2D41] mb-3">Nenhum resultado encontrado</h3>
                <p className="text-[#2C2D41]/70 max-w-md text-lg">
                  Tente ajustar seus filtros ou termo de busca.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}