"use client"

import { useState, useEffect } from "react"
import type { OrgStats } from "@/lib/github"

const ASCII_ART = `
███████╗ ██████╗ ██╗   ██╗███████╗ ██████╗ ██████╗ ██████╗ ███████╗
██╔════╝██╔═══██╗██║   ██║██╔════╝██╔════╝██╔═══██╗██╔══██╗██╔════╝
███████╗██║   ██║██║   ██║███████╗██║     ██║   ██║██║  ██║█████╗  
╚════██║██║   ██║╚██╗ ██╔╝╚════██║██║     ██║   ██║██║  ██║██╔══╝  
███████║╚██████╔╝ ╚████╔╝ ███████║╚██████╗╚██████╔╝██████╔╝███████╗
╚══════╝ ╚═════╝   ╚═══╝  ╚══════╝ ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝
`.trim()

interface HeroProps {
  stats: OrgStats
}

export function Hero({ stats }: HeroProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const [isTyping, setIsTyping] = useState(true)

  const tagline = "// A collective of CS students building cool shit"

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < tagline.length) {
        setDisplayedText(tagline.slice(0, index + 1))
        index++
      } else {
        setIsTyping(false)
        clearInterval(interval)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        {/* ASCII Art Logo */}
        <pre className="mb-8 overflow-x-auto text-[0.35rem] leading-tight text-primary md:text-[0.5rem] lg:text-xs">
          {ASCII_ART}
        </pre>

        {/* Tagline with typing effect */}
        <div className="mb-8 h-8">
          <p className="text-base text-muted-foreground md:text-lg">
            {displayedText}
            <span
              className={`ml-0.5 ${cursorVisible ? "opacity-100" : "opacity-0"} ${isTyping ? "" : "animate-pulse"}`}
            >
              █
            </span>
          </p>
        </div>

        {/* Terminal-style info block */}
        <div className="border border-border bg-card p-4 md:p-6">
          <div className="mb-4 flex items-center gap-2 border-b border-border pb-3">
            <span className="text-xs text-muted-foreground">
              ~/sovscode/README.md
            </span>
          </div>

          <div className="space-y-3 text-sm">
            <p>
              <span className="text-muted-foreground">$</span>{" "}
              <span className="text-primary">cat</span> about.txt
            </p>
            <p className="pl-4 text-foreground">
              We are a group of computer science students who love building
              things. This is our collective — a place where our side projects,
              experiments, and passion projects live.
            </p>
            <p className="mt-4">
              <span className="text-muted-foreground">$</span>{" "}
              <span className="text-primary">ls</span> -la ./projects
            </p>
            <p className="pl-4 text-muted-foreground">
              total {stats.totalRepos} projects | {stats.totalStars} stars | {stats.totalContributors} contributors
            </p>
            {stats.languages.length > 0 && (
              <>
                <p className="mt-4">
                  <span className="text-muted-foreground">$</span>{" "}
                  <span className="text-primary">echo</span> $LANGUAGES
                </p>
                <p className="pl-4 text-muted-foreground">
                  [{stats.languages.join(", ")}]
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
