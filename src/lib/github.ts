import 'server-only'; // Garante que este arquivo nunca vaze para o bundle do cliente

export interface GitHubRepoStats {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

export async function getRepoStats(owner: string, repo: string): Promise<GitHubRepoStats | null> {
  // A variável de ambiente DEVE ser GITHUB_API_TOKEN (sem NEXT_PUBLIC_)
  const token = process.env.GITHUB_API_TOKEN;

  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        // Injeta o token apenas se ele existir (útil para desenvolvimento local sem token)
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      // ISR: O Next.js fará o cache do resultado e revalidará a cada 1 hora (3600 segundos)
      // Isso protege a cota da sua API do GitHub.
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(`Erro ao buscar repo ${owner}/${repo}: Status ${res.status}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error(`Falha na requisição para ${owner}/${repo}:`, error);
    return null;
  }
}