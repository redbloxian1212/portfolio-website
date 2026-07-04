import { games } from "@/app/data/games";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }));
}

export default function GamePage({ params }: { params: { slug: string } }) {
  const game = games.find((g) => g.slug === params.slug);
  if (!game) return notFound();

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <Link href="/" className="text-gray-400 hover:text-green-400">
        ← back
      </Link>
      <h1 className="text-2xl mt-6">{game.title}</h1>
      <p className="text-gray-400 mt-2 mb-6">{game.summary}</p>
      <ul className="list-disc list-inside space-y-2 text-gray-200">
        {game.details.map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ul>
    </main>
  );
}