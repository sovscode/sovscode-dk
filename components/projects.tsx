"use client"

import { useState } from "react"
import { ExternalLink, Github, Star, GitFork, AlertCircle, Code } from "lucide-react"
import type { GitHubRepo } from "@/lib/github"

interface ProjectsProps {
  repos: GitHubRepo[]
  statuses: Record<string, "active" | "beta" | "dev">
}

const statusColors: Record<string, string> = {
  active: "text-primary",
  beta: "text-chart-4",
  dev: "text-muted-foreground",
}

export function Projects({ repos, statuses }: ProjectsProps) {
  const [filter, setFilter] = useState("all")
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const projects = repos.map((repo) => ({
    id: repo.id,
    name: repo.name,
    description: repo.description || "No description provided",
    tech: repo.language ? [repo.language] : [],
    status: statuses[repo.name] || "active",
    github: repo.html_url,
    demo: repo.homepage,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    openIssues: repo.open_issues_count,
    license: repo.license?.spdx_id || null,
    updatedAt: new Date(repo.updated_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    topics: repo.topics,
  }))

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.status === filter)

  const availableStatuses = ["all", ...new Set(projects.map((p) => p.status))]

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
          {availableStatuses.map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`cursor-pointer border px-3 py-1.5 text-xs transition-colors ${
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
        <div className="grid gap-4 md:grid-cols-2">
          {filteredProjects.map((project) => (
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
                    <Code className="h-4 w-4 text-primary" />
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

                {/* Tech stack & topics */}
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="border border-border px-2 py-0.5 text-xs text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="border border-accent/30 bg-accent/10 px-2 py-0.5 text-xs text-accent"
                    >
                      {topic}
                    </span>
                  ))}
                  {project.license && (
                    <span className="border border-border px-2 py-0.5 text-xs text-muted-foreground">
                      {project.license}
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {project.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="h-3 w-3" />
                    {project.forks}
                  </span>
                  <span className="flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {project.openIssues} issues
                  </span>
                  <span className="ml-auto">
                    {project.updatedAt}
                  </span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    @sovscode
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer text-muted-foreground transition-colors hover:text-primary"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer text-muted-foreground transition-colors hover:text-primary"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="border border-border bg-card p-8 text-center text-muted-foreground">
            No projects found with status {"--"}{filter}
          </div>
        )}
      </div>
    </section>
  )
}
