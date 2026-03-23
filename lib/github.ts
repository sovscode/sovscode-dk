const GITHUB_ORG = "sovscode"
const GITHUB_API = "https://api.github.com"

export interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  stargazers_count: number
  forks_count: number
  open_issues_count: number
  language: string | null
  license: { spdx_id: string } | null
  updated_at: string
  archived: boolean
  topics: string[]
}

export interface GitHubContributor {
  login: string
  avatar_url: string
  html_url: string
  contributions: number
}

export interface OrgStats {
  totalRepos: number
  totalStars: number
  totalContributors: number
  languages: string[]
}

async function fetchGitHub<T>(endpoint: string): Promise<T | null> {
  try {
    const res = await fetch(`${GITHUB_API}${endpoint}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        // Add token if available for higher rate limits
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        }),
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!res.ok) {
      console.error(`GitHub API error: ${res.status} for ${endpoint}`)
      return null
    }

    return res.json()
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error)
    return null
  }
}

export async function getOrgRepos(): Promise<GitHubRepo[]> {
  const repos = await fetchGitHub<GitHubRepo[]>(
    `/orgs/${GITHUB_ORG}/repos?sort=updated&per_page=100`
  )
  
  if (!repos) return []
  
  // Filter out archived repos and sort by stars
  return repos
    .filter((repo) => !repo.archived)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
}

export async function getRepoContributors(
  repoName: string
): Promise<GitHubContributor[]> {
  const contributors = await fetchGitHub<GitHubContributor[]>(
    `/repos/${GITHUB_ORG}/${repoName}/contributors?per_page=100`
  )
  
  return contributors || []
}

export async function getAllContributors(): Promise<GitHubContributor[]> {
  const repos = await getOrgRepos()
  const contributorMap = new Map<string, GitHubContributor>()

  // Fetch contributors from all repos in parallel
  const allContributors = await Promise.all(
    repos.map((repo) => getRepoContributors(repo.name))
  )

  // Merge contributors, summing contributions
  for (const repoContributors of allContributors) {
    for (const contributor of repoContributors) {
      const existing = contributorMap.get(contributor.login)
      if (existing) {
        existing.contributions += contributor.contributions
      } else {
        contributorMap.set(contributor.login, { ...contributor })
      }
    }
  }

  // Sort by total contributions
  return Array.from(contributorMap.values()).sort(
    (a, b) => b.contributions - a.contributions
  )
}

export async function getOrgStats(): Promise<OrgStats> {
  const repos = await getOrgRepos()
  const contributors = await getAllContributors()

  const languages = new Set<string>()
  let totalStars = 0

  for (const repo of repos) {
    totalStars += repo.stargazers_count
    if (repo.language) {
      languages.add(repo.language)
    }
  }

  return {
    totalRepos: repos.length,
    totalStars,
    totalContributors: contributors.length,
    languages: Array.from(languages),
  }
}

// Infer status from repo metadata
export function inferRepoStatus(repo: GitHubRepo): "active" | "beta" | "dev" {
  const topics = repo.topics.map((t) => t.toLowerCase())
  
  if (topics.includes("beta") || topics.includes("wip")) return "beta"
  if (topics.includes("experimental") || topics.includes("dev")) return "dev"
  
  // Check if updated recently (within last 30 days)
  const lastUpdate = new Date(repo.updated_at)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  
  if (lastUpdate > thirtyDaysAgo) return "active"
  
  return "active" // Default to active for public repos
}
