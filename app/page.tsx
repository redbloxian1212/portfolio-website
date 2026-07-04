import Link from "next/link";
import TreeSection from "@/components/TreeSection";
import CopyLink from "@/components/CopyLink";
import { games } from "@/app/data/games";

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl">
        Yo, I&apos;m <span className="underline">src</span>
      </h1>
      <p className="text-gray-400 mt-1 mb-12">some bio</p>

      <TreeSection label="src/work">
        {games.map((game) => (
          <Link
            key={game.slug}
            href={`/work/${game.slug}`}
            className="hover:text-green-400 transition-colors"
          >
            {game.title}
          </Link>
        ))}
      </TreeSection>

      <TreeSection label="src/docs">
        <a href="/cv.pdf" target="_blank" className="hover:text-green-400 transition-colors">
          CV
        </a>
        <a href="/resume.pdf" target="_blank" className="hover:text-green-400 transition-colors">
          Resume
        </a>
      </TreeSection>

      <TreeSection label="src/contact">
        <CopyLink label="discord: @hask3l" value="hask3l" />
      </TreeSection>
    </main>
  );
}