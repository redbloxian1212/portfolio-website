import Link from "next/link";
import TreeSection from "@/components/TreeSection";
import CopyLink from "@/components/CopyLink";
import { games } from "@/app/data/games";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center py-20">
      <div className="max-w-xl w-full px-6">
        {/* Hero */}
        <section className="text-center mb-16">
          <h1 className="text-6xl font-bold tracking-tight">
            Yo, I&apos;m <span className="underline">src</span>
          </h1>
          <p className="text-gray-400 mt-2">
            3 years of Luau experience, covering gameplay systems, architecture,
            performance optimization and live datastore reliability.
            <br />
            <br />
            Tech stack: Luau, Roblox Studio, Git, Rojo, Wally.
          </p>
        </section>

        {/* Content */}
        <section>
          <TreeSection label="IMPACT">
            {games.map((game) => (
              <Link key={game.slug} href={`/work/${game.slug}`} className="hover:text-green-400 transition-colors">
                {game.title}
              </Link>
            ))}
          </TreeSection>

          <TreeSection label="ABOUT ME">
            <a href="/resume.pdf" target="_blank" className="hover:text-green-400 transition-colors">
              Resume
            </a>
            <a href="https://github.com/redbloxian1212" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
              GitHub
            </a>
          </TreeSection>

        </section>

        {/* Connect */}
        <div className="mt-10 text-left">
          <p className="text-gray-500 mb-2">connect with me on discord:</p>
          <CopyLink label="@hask3l (click to copy)" value="hask3l" />
        </div>

        <footer className="mt-16 pt-6 border-t border-dashed border-gray-800 flex justify-between text-xs text-gray-500">
          <span>last updated: July 6, 2026</span>
          <span className="text-green-400">● open to work</span>
        </footer>
      </div>
    </main>
  );
}