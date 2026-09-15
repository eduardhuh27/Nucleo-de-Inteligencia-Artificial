import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { CurationCard, type PendingDocument } from '@/components/features/admin/CurationCard';
import { PendingRepoCard } from '@/components/features/curadoria/PendingRepoCard';
import { aprovarDocumento } from '@/app/actions/curadoriaActions'; 

interface Repositorio {
  id: string;
  owner: string;
  repo: string;
  created_at: string;
}

// Para páginas de admin, não fazemos cache para ver as pendências em tempo real
export const revalidate = 0;

export default async function CuradoriaPage() {
  const supabase = await createClient();

  // Defesa em profundidade: Bloqueia acesso de usuários não autenticados
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login?redirectTo=/admin/curadoria');
  }

  // ======================================================================
  // 1. Busca e Tipagem de DOCUMENTOS (Conserta o erro da imagem)
  // ======================================================================
  const { data: docsData, error: docsError } = await supabase
    .from('documentos') // Substitua pelo nome correto da sua tabela de documentos
    .select('*')
    .eq('status', 'pendente');
  
  // O "as Documento[]" avisa ao TS exatamente o que tem dentro do array.
  // O "|| []" garante que nunca será null, permitindo usar o .map() com segurança.
  const documentosPendentes = (docsData as PendingDocument[]) || [];


  // ======================================================================
  // 2. Busca e Tipagem de REPOSITÓRIOS (Nova Feature de Códigos)
  // ======================================================================
  const { data: reposData, error: reposError } = await supabase
    .from('repositorios')
    .select('*')
    .eq('status', 'pendente');
    
  const repositoriosPendentes = (reposData as Repositorio[]) || [];

  return (
    <main className="min-h-screen bg-[#F8F9FA] font-sans text-[#2C2D41] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 border-b border-[#B2B5E0]/30 pb-8">
          <h1 className="text-4xl font-serif font-bold text-[#2C2D41] tracking-tight">
            Painel de Curadoria
          </h1>
          <p className="mt-4 text-[#2C2D41]/70">
            Gerencie as submissões públicas pendentes de aprovação antes que elas entrem no portal oficial.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* COLUNA ESQUERDA: Documentos */}
          <section>
            <h2 className="text-2xl font-serif font-bold text-[#2C2D41] mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-[#C5ADC5]/30 rounded-full flex items-center justify-center text-[#2C2D41] text-sm">📄</span>
              Documentos ({documentosPendentes.length})
            </h2>
            
            <div className="space-y-6">
              {documentosPendentes.length > 0 ? (
                documentosPendentes.map((doc) => (
                  // O TypeScript agora sabe que 'doc' é do tipo 'Documento'
                  <CurationCard key={doc.id} doc={doc} />
                ))
              ) : (
                <div className="p-8 text-center border border-dashed border-[#B2B5E0]/50 rounded-[2rem] bg-white text-[#2C2D41]/50 font-bold">
                  Nenhum documento pendente.
                </div>
              )}
            </div>
          </section>

          {/* COLUNA DIREITA: Repositórios de Código */}
          <section>
            <h2 className="text-2xl font-serif font-bold text-[#2C2D41] mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-[#B2B5E0]/30 rounded-full flex items-center justify-center text-[#2C2D41] text-sm">💻</span>
              Repositórios ({repositoriosPendentes.length})
            </h2>
            
            <div className="space-y-6">
              {repositoriosPendentes.length > 0 ? (
                repositoriosPendentes.map((repo) => (
                  <PendingRepoCard 
                    key={repo.id} 
                    item={repo} 
                    // Passa a Server Action para o componente cliente
                    onAudit={aprovarDocumento} 
                  />
                ))
              ) : (
                <div className="p-8 text-center border border-dashed border-[#B2B5E0]/50 rounded-[2rem] bg-white text-[#2C2D41]/50 font-bold">
                  Nenhum repositório pendente.
                </div>
              )}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}