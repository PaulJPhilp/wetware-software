/**
 * GitHub API utilities for fetching repository information
 */

export interface GitHubRepo {
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
}

/**
 * Fetch GitHub repository information including star count
 * @param owner - Repository owner (e.g., "PaulJPhilp")
 * @param repo - Repository name (e.g., "EffectPatterns")
 * @returns Repository data or null if fetch fails
 */
export async function fetchGitHubRepo(
  owner: string,
  repo: string,
): Promise<GitHubRepo | null> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };

    // Use GitHub token if available for higher rate limits
    const token = process.env.GITHUB_TOKEN;
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers,
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`GitHub repo not found: ${owner}/${repo}`);
        return null;
      }
      if (response.status === 403) {
        const resetTime = response.headers.get("x-ratelimit-reset");
        const resetDate = resetTime ? new Date(parseInt(resetTime) * 1000).toLocaleTimeString() : "unknown";
        console.warn(`GitHub API rate limit exceeded for ${owner}/${repo}. Resets at ${resetDate}`);
        return null;
      }
      console.error(`GitHub API error for ${owner}/${repo}: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data as GitHubRepo;
  } catch (error) {
    console.error(`Failed to fetch GitHub repo ${owner}/${repo}:`, error);
    return null;
  }
}

/**
 * Fetch star count for a GitHub repository
 * @param owner - Repository owner
 * @param repo - Repository name
 * @returns Star count or null if fetch fails
 */
export async function fetchGitHubStars(owner: string, repo: string): Promise<number | null> {
  const repoData = await fetchGitHubRepo(owner, repo);
  return repoData?.stargazers_count ?? null;
}

/**
 * Fetch star counts for multiple repositories
 * @param repos - Array of repository paths in format "owner/repo"
 * @returns Record mapping repo paths to star counts
 */
export async function fetchMultipleRepoStars(
  repos: string[],
): Promise<Record<string, number | null>> {
  const results = await Promise.all(
    repos.map(async (repoPath) => {
      const [owner, repo] = repoPath.split("/");
      if (!owner || !repo) {
        console.error(`Invalid repo path: ${repoPath}`);
        return [repoPath, null] as const;
      }

      const stars = await fetchGitHubStars(owner, repo);
      return [repoPath, stars] as const;
    }),
  );

  return Object.fromEntries(results);
}

/**
 * Parse GitHub repo URL to extract owner and repo name
 * @param url - GitHub repository URL
 * @returns Object with owner and repo, or null if invalid
 */
export function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  try {
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) return null;

    const [, owner, repo] = match;
    // Remove .git suffix if present
    const cleanRepo = repo?.replace(/\.git$/, "");

    if (!owner || !cleanRepo) return null;

    return { owner, repo: cleanRepo };
  } catch {
    return null;
  }
}
