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
  const token = process.env.GITHUB_API_TOKEN?.trim();

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'NIA-Observatorio',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    let res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers,
      next: { revalidate: 3600 },
    });

    // Resiliência contra credenciais inválidas/expiradas:
    // Se o GitHub recusar o token com 401 (Bad Credentials), tenta de forma anônima para não quebrar a UI
    if (res.status === 401 && token) {
      console.warn(`[GitHub API] Token fornecido retornou 401 (Bad credentials). Realizando fallback público para ${owner}/${repo}...`);
      res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'NIA-Observatorio',
        },
        next: { revalidate: 3600 },
      });
    }

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