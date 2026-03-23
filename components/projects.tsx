"use client"

import { useState } from "react"
import { ExternalLink, Github, Folder, Code, Cpu, Globe, Database, Smartphone } from "lucide-react"

const projects = [
  {
    id: 1,
    name: "neural-net-viz",
    description: "Interactive neural network visualizer for understanding deep learning architectures",
    tech: ["Python", "TensorFlow", "React"],
    author: "alice",
    status: "active",
    icon: Cpu,
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    id: 2,
    name: "terminal-chat",
    description: "P2P encrypted chat application with a retro terminal interface",
    tech: ["Rust", "WebRTC", "TUI"],
    author: "bob",
    status: "active",
    icon: Code,
    github: "https://github.com",
  },
  {
    id: 3,
    name: "algo-trainer",
    description: "LeetCode-style platform for practicing algorithms with real-time feedback",
    tech: ["Go", "PostgreSQL", "Next.js"],
    author: "charlie",
    status: "beta",
    icon: Database,
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    id: 4,
    name: "git-garden",
    description: "Gamified version control learning tool with visual branch visualization",
    tech: ["TypeScript", "D3.js", "Node.js"],
    author: "diana",
    status: "active",
    icon: Globe,
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    id: 5,
    name: "pocket-compiler",
    description: "A tiny compiler that fits in your pocket, teaching compilation basics",
    tech: ["C", "LLVM", "Assembly"],
    author: "eve",
    status: "dev",
    icon: Folder,
    github: "https://github.com",
  },
  {
    id: 6,
    name: "studymate-app",
    description: "AI-powered study companion with spaced repetition and note-taking",
    tech: ["Swift", "CoreML", "Firebase"],
    author: "frank",
    status: "active",
    icon: Smartphone,
    github: "https://github.com",
    demo: "https://example.com",
  },
]

const statusColors: Record<string, string> = {
  active: "text-primary",
  beta: "text-chart-4",
  dev: "text-muted-foreground",
}

export function Projects() {
  const [filter, setFilter] = useState("all")
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.status === filter)

  return (
    <section id="projects" className="border-t border-border px-4 py-16 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-bold text-primary md:text-3xl">
            {">"} projects/
          </h2>
          <p className="text-sm text-muted-foreground">
            Explore what we{"'"}ve been building
          </p>
        </div>

        {/* Filter tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {["all", "active", "beta", "dev"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`rounded border px-3 py-1.5 text-xs transition-colors ${
                filter === status
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              --{status}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => {
            const Icon = project.icon
            return (
              <div
                key={project.id}
                className="group relative overflow-hidden border border-border bg-card p-4 transition-all hover:border-primary"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Scanline effect on hover */}
                {hoveredId === project.id && (
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(255,255,255,0.02)_50%)] bg-[length:100%_4px]" />
                )}

                <div className="relative z-10">
                  {/* Header */}
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="font-bold text-foreground">
                        {project.name}
                      </span>
                    </div>
                    <span
                      className={`text-xs ${statusColors[project.status]}`}
                    >
                      [{project.status}]
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-border px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      @{project.author}
                    </span>
                    <div className="flex items-center gap-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground transition-colors hover:text-primary"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
