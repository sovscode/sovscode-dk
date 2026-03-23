import { Github } from "lucide-react"
import type { GitHubContributor } from "@/lib/github"

interface MembersProps {
  contributors: GitHubContributor[]
}

export function Members({ contributors }: MembersProps) {
  // Get max contributions for progress bar scaling
  const maxContributions = contributors.length > 0 
    ? Math.max(...contributors.map((c) => c.contributions))
    : 1

  return (
    <section id="members" className="border-t border-border px-4 py-16 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-bold text-primary md:text-3xl">
            {">"} contributors/
          </h2>
          <p className="text-sm text-muted-foreground">
            The humans behind the code
          </p>
        </div>

        {/* Members list - terminal style */}
        <div className="border border-border bg-card">
          {/* Terminal header */}
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <span className="text-xs text-muted-foreground">
              ~/sovscode/CONTRIBUTORS.md
            </span>
            <span className="ml-auto text-xs text-muted-foreground">
              {contributors.length} contributors
            </span>
          </div>

          {/* Table header */}
          <div className="hidden border-b border-border px-4 py-2 text-xs text-muted-foreground md:grid md:grid-cols-4">
            <span>USER</span>
            <span>HANDLE</span>
            <span className="text-right">COMMITS</span>
            <span className="text-right">LINK</span>
          </div>

          {/* Members rows */}
          {contributors.length > 0 ? (
            contributors.map((member, index) => (
              <div
                key={member.login}
                className={`group grid gap-2 px-4 py-3 transition-colors hover:bg-secondary md:grid-cols-4 md:items-center md:gap-0 ${
                  index !== contributors.length - 1 ? "border-b border-border" : ""
                }`}
              >
                {/* Avatar */}
                <div className="flex items-center gap-3">
                  <img
                    src={member.avatar_url}
                    alt={member.login}
                    className="h-8 w-8 border border-border"
                  />
                  <span className="text-sm text-foreground md:hidden">
                    @{member.login}
                  </span>
                </div>

                {/* Handle */}
                <div className="hidden items-center gap-2 md:flex">
                  <span className="text-muted-foreground">$</span>
                  <span className="font-bold text-primary">@{member.login}</span>
                </div>

                {/* Commits */}
                <div className="flex items-center gap-2 md:justify-end">
                  <div className="h-1.5 w-20 overflow-hidden bg-secondary">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{
                        width: `${(member.contributions / maxContributions) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {member.contributions}
                  </span>
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 md:justify-end">
                  <a
                    href={member.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-8 text-center text-muted-foreground">
              Loading contributors...
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
