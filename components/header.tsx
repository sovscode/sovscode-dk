"use client"

import { useState, useEffect } from "react"
import { Terminal, Github } from "lucide-react"

export function Header() {
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString("en-US", { hour12: false }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="border-b border-border px-4 py-3 md:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex items-center gap-3">
          <Terminal className="h-5 w-5 text-primary" />
          <span className="text-lg font-bold tracking-tight text-primary">
            sovscode
          </span>
          <span className="hidden text-xs text-muted-foreground md:inline">
            v1.0.0
          </span>
        </div>

        <nav className="flex items-center gap-6">
          <span className="hidden text-xs text-muted-foreground md:inline">
            {currentTime}
          </span>
          <a
            href="#projects"
            className="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            ./projects
          </a>
          <a
            href="#members"
            className="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            ./members
          </a>
          <a
            href="https://github.com/sovscode"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-muted-foreground transition-colors hover:text-primary"
          >
            <Github className="h-4 w-4" />
          </a>
        </nav>
      </div>
    </header>
  )
}
