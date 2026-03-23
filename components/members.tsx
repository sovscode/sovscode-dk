import { Github, Linkedin, Mail } from "lucide-react"

const members = [
  {
    handle: "alice",
    name: "Alice Chen",
    role: "ML & AI",
    commits: 847,
    github: "https://github.com",
  },
  {
    handle: "bob",
    name: "Bob Martinez",
    role: "Systems & Rust",
    commits: 623,
    github: "https://github.com",
  },
  {
    handle: "charlie",
    name: "Charlie Kim",
    role: "Backend & DBs",
    commits: 512,
    github: "https://github.com",
  },
  {
    handle: "diana",
    name: "Diana Patel",
    role: "Frontend & Viz",
    commits: 445,
    github: "https://github.com",
  },
  {
    handle: "eve",
    name: "Eve Johnson",
    role: "Compilers & Low-level",
    commits: 389,
    github: "https://github.com",
  },
  {
    handle: "frank",
    name: "Frank Liu",
    role: "Mobile & iOS",
    commits: 301,
    github: "https://github.com",
  },
]

export function Members() {
  return (
    <section id="members" className="border-t border-border px-4 py-16 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-bold text-primary md:text-3xl">
            {">"} members/
          </h2>
          <p className="text-sm text-muted-foreground">
            The humans behind the code
          </p>
        </div>

        {/* Members list - terminal style */}
        <div className="rounded border border-border bg-card">
          {/* Terminal header */}
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="h-2.5 w-2.5 rounded-full bg-destructive" />
            <div className="h-2.5 w-2.5 rounded-full bg-chart-4" />
            <div className="h-2.5 w-2.5 rounded-full bg-primary" />
            <span className="ml-2 text-xs text-muted-foreground">
              ~/sovscode/CONTRIBUTORS.md
            </span>
          </div>

          {/* Table header */}
          <div className="hidden border-b border-border px-4 py-2 text-xs text-muted-foreground md:grid md:grid-cols-5">
            <span>HANDLE</span>
            <span>NAME</span>
            <span>FOCUS</span>
            <span className="text-right">COMMITS</span>
            <span className="text-right">LINKS</span>
          </div>

          {/* Members rows */}
          {members.map((member, index) => (
            <div
              key={member.handle}
              className={`group grid gap-2 px-4 py-3 transition-colors hover:bg-secondary md:grid-cols-5 md:items-center md:gap-0 ${
                index !== members.length - 1 ? "border-b border-border" : ""
              }`}
            >
              {/* Handle */}
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">$</span>
                <span className="font-bold text-primary">@{member.handle}</span>
              </div>

              {/* Name */}
              <span className="text-sm text-foreground">{member.name}</span>

              {/* Focus area */}
              <span className="text-sm text-muted-foreground">
                {member.role}
              </span>

              {/* Commits */}
              <div className="flex items-center gap-2 md:justify-end">
                <div className="h-1.5 w-16 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{
                      width: `${(member.commits / 850) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  {member.commits}
                </span>
              </div>

              {/* Links */}
              <div className="flex items-center gap-3 md:justify-end">
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
