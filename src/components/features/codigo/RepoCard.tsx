import { GitHubRepoStats } from '@/lib/github';

export function RepoCard({ repo }: { repo: GitHubRepoStats }) {
  return (
    <div className="flex flex-col bg-white border border-[#B2B5E0]/30 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 h-full">
      <div className="flex justify-between items-start mb-4 gap-4">
        <h3 className="text-2xl font-serif font-bold text-[#2C2D41] leading-tight break-words">
          {repo.name}
        </h3>
        
        {/* Badge da Linguagem Principal */}
        {repo.language && (
          <span className="shrink-0 inline-block px-4 py-1 text-xs font-bold text-[#2C2D41] bg-[#C5ADC5]/30 rounded-full uppercase tracking-wider border border-[#C5ADC5]/50">
            {repo.language}
          </span>
        )}
      </div>

      <p className="text-[#2C2D41]/80 text-base mb-8 flex-grow line-clamp-3 leading-relaxed">
        {repo.description || 'Nenhuma descrição fornecida pelo autor do repositório.'}
      </p>

      {/* Rodapé com Métricas e Link */}
      <div className="mt-auto pt-6 border-t border-[#B2B5E0]/20 flex items-center justify-between">
        <div className="flex gap-4 text-sm font-bold text-[#2C2D41]">
          <span className="flex items-center gap-1.5" title="Estrelas">
            <span className="text-[#C5ADC5] text-lg leading-none">★</span> {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1.5" title="Forks">
            <span className="text-[#B2B5E0] text-lg leading-none flex items-center">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.5a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path></svg>
            </span> 
            {repo.forks_count}
          </span>
        </div>

        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-5 py-2 text-sm font-bold text-[#2C2D41] border-2 border-[#2C2D41] hover:bg-[#2C2D41] hover:text-white rounded-xl transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-[#2C2D41]"
        >
          Acessar ↗
        </a>
      </div>
    </div>
  );
}