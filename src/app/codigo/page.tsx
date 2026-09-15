import { createClient } from '@/lib/supabase/server';
import { getRepoStats, type GitHubRepoStats } from '@/lib/github';
import { RepoCard } from '@/components/features/codigo/RepoCard';
// Importação do novo formulário de submissão
import { SubmitRepoForm } from '@/components/features/codigo/SubmitRepoForm';

export const revalidate = 3600; 

export default async function HubCodigoPage() {
  const supabase = await createClient();

  // 1. Busca os registros APROVADOS no banco de dados
  const { data: dbRepos, error } = await supabase
    .from('repositorios')
    .select('owner, repo')
    .eq('status', 'aprovado'); // Filtrando apenas os que passaram pela curadoria

  if (error) {
    console.error("Erro Supabase:", error.message, error.hint, error.details);
  }

  // 2. Dispara requisições simultâneas para o GitHub usando Promise.all
  let githubRepos: GitHubRepoStats[] = [];
  
  if (dbRepos && dbRepos.length > 0) {
    const promises = dbRepos.map(dbRepo => getRepoStats(dbRepo.owner, dbRepo.repo));
    const results = await Promise.all(promises);
    
    githubRepos = results.filter((repo): repo is GitHubRepoStats => repo !== null);
  }

  // Ordena por quantidade de estrelas
  githubRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);

  return (
    <main className="min-h-screen bg-[#F8F9FA] font-sans text-[#2C2D41] py-16 flex flex-col gap-16">
      
      {/* SEÇÃO PRINCIPAL: Catálogo de Repositórios */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Cabeçalho da Página */}
        <div className="mb-12 border-b border-[#B2B5E0]/30 pb-8 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2C2D41] tracking-tight flex items-center justify-center md:justify-start gap-4">
            <span 
              className="w-12 h-12 bg-[#B2B5E0] flex items-center justify-center text-[#2C2D41] font-serif font-bold text-2xl shadow-sm clip-hexagon"
              style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
            >
              {'</>'}
            </span>
            Hub de Código IA
          </h1>
          <p className="mt-6 text-lg md:text-xl text-[#2C2D41]/80 max-w-3xl mx-auto md:mx-0 leading-relaxed font-light">
            Repositórios, frameworks e bibliotecas desenvolvidos ou amplamente utilizados 
            pela comunidade acadêmica e ecossistema brasileiro de Inteligência Artificial.
          </p>
        </div>

        {/* Grade de Repositórios */}
        {githubRepos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {githubRepos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center bg-white border-2 border-dashed border-[#B2B5E0]/50 rounded-[3rem] py-24 px-6 text-center shadow-sm">
            <div className="w-20 h-20 bg-[#C5ADC5]/20 text-[#2C2D41] rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner">
              ⚙️
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#2C2D41] mb-3">Nenhum repositório aprovado</h3>
            <p className="text-[#2C2D41]/70 max-w-md text-lg">
              Estamos atualizando nosso catálogo. Seja o primeiro a sugerir uma ferramenta abaixo!
            </p>
          </div>
        )}
      </section>

      {/* SEÇÃO DE COLABORAÇÃO: Formulário de Submissão */}
      <section className="bg-white border-t border-[#B2B5E0]/30 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SubmitRepoForm />
        </div>
      </section>

    </main>
  );
}