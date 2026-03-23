import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { Members } from "@/components/members"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      {/* CRT scanline overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-[0.03]" />
      
      {/* CRT flicker effect */}
      <div className="pointer-events-none fixed inset-0 z-50 animate-pulse opacity-[0.01]" 
           style={{ animationDuration: "0.1s" }} />

      <Header />
      <main>
        <Hero />
        <Projects />
        <Members />
      </main>
      <Footer />
    </div>
  )
}
