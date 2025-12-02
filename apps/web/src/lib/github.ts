/**
 * GitHub API utilities for fetching repository information
 */

// Regex patterns for GitHub URL parsing and version parsing
const GITHUB_URL_REGEX = /github\.com\/([^/]+)\/([^/]+)/;
const GIT_SUFFIX_REGEX = /\.git$/;
const VERSION_PREFIX_REGEX = /^v/;
const SEMVER_REGEX = /^(\d+)\.(\d+)\.(\d+)/;

export type GitHubRepo = {
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
};

/**
 * Fetch GitHub repository information including star count
 * @param owner - Repository owner (e.g., "PaulJPhilp")
 * @param repo - Repository name (e.g., "EffectPatterns")
 * @returns Repository data or null if fetch fails
 */
export async function fetchGitHubRepo(owner: string, repo: string): Promise<GitHubRepo | null> {
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
        const resetDate = resetTime
          ? new Date(Number.parseInt(resetTime, 10) * 1000).toLocaleTimeString()
          : "unknown";
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
  repos: string[]
): Promise<Record<string, number | null>> {
  const results = await Promise.all(
    repos.map(async (repoPath) => {
      const [owner, repo] = repoPath.split("/");
      if (!(owner && repo)) {
        console.error(`Invalid repo path: ${repoPath}`);
        return [repoPath, null] as const;
      }

      const stars = await fetchGitHubStars(owner, repo);
      return [repoPath, stars] as const;
    })
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
    const match = url.match(GITHUB_URL_REGEX);
    if (!match) {
      return null;
    }

    const [, owner, repo] = match;
    if (owner === undefined || repo === undefined) {
      return null;
    }

    // Remove .git suffix if present
    const cleanRepo = repo.replace(GIT_SUFFIX_REGEX, "");

    return { owner, repo: cleanRepo };
  } catch {
    return null;
  }
}

/**
 * GitHub Release data structure
 */
export type GitHubRelease = {
  tag_name: string;
  name: string | null;
  body: string | null;
  published_at: string;
  prerelease: boolean;
  draft: boolean;
};

/**
 * Release information for "What's New" display
 */
export type RecentReleaseInfo = {
  version: string;
  name: string | null;
  body: string | null;
  publishedAt: string;
  isMajor: boolean;
  isMinor: boolean;
};

/**
 * Fetch the latest releases from a GitHub repository
 * @param owner - Repository owner (e.g., "PaulJPhilp")
 * @param repo - Repository name (e.g., "effect-json")
 * @param limit - Maximum number of releases to fetch (default: 10)
 * @returns Array of releases or null if fetch fails
 */
export async function fetchGitHubReleases(
  owner: string,
  repo: string,
  limit = 10
): Promise<GitHubRelease[] | null> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };

    // Use GitHub token if available for higher rate limits
    const token = process.env.GITHUB_TOKEN;
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/releases?per_page=${limit}`,
      {
        headers,
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`GitHub releases not found: ${owner}/${repo}`);
        return null;
      }
      if (response.status === 403) {
        const resetTime = response.headers.get("x-ratelimit-reset");
        const resetDate = resetTime
          ? new Date(Number.parseInt(resetTime, 10) * 1000).toLocaleTimeString()
          : "unknown";
        console.warn(`GitHub API rate limit exceeded for ${owner}/${repo}. Resets at ${resetDate}`);
        return null;
      }
      console.error(`GitHub API error for ${owner}/${repo}: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data as GitHubRelease[];
  } catch (error) {
    console.error(`Failed to fetch GitHub releases ${owner}/${repo}:`, error);
    return null;
  }
}

/**
 * Parse semantic version string (e.g., "v1.2.3" or "1.2.3")
 * @param version - Version string
 * @returns Object with major, minor, patch, or null if invalid
 */
function parseSemVer(version: string): { major: number; minor: number; patch: number } | null {
  // Remove 'v' prefix if present
  const cleanVersion = version.replace(VERSION_PREFIX_REGEX, "");
  const match = cleanVersion.match(SEMVER_REGEX);
  if (!match) {
    return null;
  }

  const [, majorStr, minorStr, patchStr] = match;
  if (majorStr === undefined || minorStr === undefined || patchStr === undefined) {
    return null;
  }

  return {
    major: Number.parseInt(majorStr, 10),
    minor: Number.parseInt(minorStr, 10),
    patch: Number.parseInt(patchStr, 10),
  };
}

/**
 * Check if a release is a major or minor version (not patch)
 * @param version - Version string
 * @returns Object indicating if it's major or minor
 */
function isMajorOrMinorRelease(version: string): {
  isMajor: boolean;
  isMinor: boolean;
} {
  const parsed = parseSemVer(version);
  if (!parsed) {
    return { isMajor: false, isMinor: false };
  }

  // Major: patch is 0 and minor is 0 (e.g., 2.0.0)
  // Minor: patch is 0 but minor is not 0 (e.g., 1.2.0)
  const isMajor = parsed.patch === 0 && parsed.minor === 0;
  const isMinor = parsed.patch === 0 && parsed.minor !== 0;

  return { isMajor, isMinor };
}

/**
 * Check if a date is within the past week
 * @param dateString - ISO date string
 * @returns True if within past week
 */
function isWithinPastWeek(dateString: string): boolean {
  const releaseDate = new Date(dateString);
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  return releaseDate >= weekAgo;
}

/**
 * Get the most recent major or minor release within the past week
 * @param owner - Repository owner
 * @param repo - Repository name
 * @returns Recent release info or null if none found
 */
export async function getRecentMajorOrMinorRelease(
  owner: string,
  repo: string
): Promise<RecentReleaseInfo | null> {
  const releases = await fetchGitHubReleases(owner, repo, 20);
  if (!releases || releases.length === 0) {
    return null;
  }

  // Filter for non-draft, non-prerelease releases within the past week
  const recentReleases = releases.filter(
    (release) => !(release.draft || release.prerelease) && isWithinPastWeek(release.published_at)
  );

  // Find the first major or minor release
  for (const release of recentReleases) {
    const { isMajor, isMinor } = isMajorOrMinorRelease(release.tag_name);
    if (isMajor || isMinor) {
      return {
        version: release.tag_name,
        name: release.name,
        body: release.body,
        publishedAt: release.published_at,
        isMajor,
        isMinor,
      };
    }
  }

  return null;
}
