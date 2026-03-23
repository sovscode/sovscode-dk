import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { Members } from "@/components/members"
import { Footer } from "@/components/footer"
import { getOrgRepos, getAllContributors, getOrgStats, inferRepoStatus } from "@/lib/github"

export default async function Home() {
  // Fetch all GitHub data at build time
  const [repos, contributors, stats] = await Promise.all([
    getOrgRepos(),
    getAllContributors(),
    getOrgStats(),
  ])

  // Build status map for repos
  const statuses = repos.reduce(
    (acc, repo) => {
      acc[repo.name] = inferRepoStatus(repo)
      return acc
    },
    {} as Record<string, "active" | "beta" | "dev">
  )

  return (
    <div className="relative min-h-screen bg-background">
      {/* CRT scanline overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-[0.03]" />
      
      {/* CRT flicker effect */}
      <div className="pointer-events-none fixed inset-0 z-50 animate-pulse opacity-[0.01]" 
           style={{ animationDuration: "0.1s" }} />

      <Header />
      <main>
        <Hero stats={stats} />
        <Projects repos={repos} statuses={statuses} />
        <Members contributors={contributors} />
      </main>
      <Footer />
    </div>
  )
}
