import { Terminal, Github, Twitter } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Logo and tagline */}
          <div className="flex items-center gap-3">
            <Terminal className="h-5 w-5 text-primary" />
            <span className="font-bold text-primary">sovscode</span>
            <span className="text-xs text-muted-foreground">
              | made with {"<"}3 by CS students
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <Twitter className="h-4 w-4" />
              <span>Twitter</span>
            </a>
          </div>
        </div>

        {/* ASCII divider */}
        <div className="my-6 text-center text-xs text-muted-foreground">
          ═══════════════════════════════════════════════════════════════
        </div>

        {/* Copyright and fun message */}
        <div className="flex flex-col items-center gap-2 text-center text-xs text-muted-foreground">
          <p>© {currentYear} sovscode collective. All rights reserved.</p>
          <p className="font-mono">
            <span className="text-primary">$</span> echo {"\""}May your code compile and your tests pass.{"\""}_
          </p>
        </div>
      </div>
    </footer>
  )
}
