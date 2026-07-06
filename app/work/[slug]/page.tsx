import { games } from "@/app/data/games";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return games.map((game) => ({
    slug: game.slug,
  }));
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const game = games.find((g) => g.slug === slug);

  if (!game) return notFound();

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <Link
        href="/"
        className="text-gray-500 hover:text-green-400 transition"
      >
        ← back
      </Link>

      <h1 className="text-4xl mt-8 font-bold">{game.title}</h1>

      {game.subtitle && (
        <p className="text-green-400 mt-2">{game.subtitle}</p>
      )}

      {game.overview && (
        <section className="mt-10">
          <h2 className="text-xl mb-3">Overview</h2>

          <p className="text-gray-300 leading-8">
            {game.overview.split(game.gameName).map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <a
                    href={game.robloxUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 font-semibold underline decoration-dotted underline-offset-4 hover:text-green-300 transition"
                  >
                    {game.gameName}
                  </a>
                )}
              </span>
            ))}
          </p>
        </section>
      )}

      {game.challenge && (
        <section className="mt-10">
          <h2 className="text-xl mb-3">Challenge</h2>

          <p className="text-gray-300 leading-8">
            {game.challenge}
          </p>
        </section>
      )}

      {game.beforeImage && (
        <section className="mt-12">
          <h2 className="text-xl mb-4">Performance Before</h2>

          <Image
            src={game.beforeImage}
            alt="Performance Before"
            width={1200}
            height={800}
            className="rounded-lg border border-neutral-800"
          />
        </section>
      )}

      {game.afterImage && (
        <section className="mt-10">
          <h2 className="text-xl mb-4">Performance After</h2>

          <Image
            src={game.afterImage}
            alt="Performance After"
            width={1200}
            height={800}
            className="rounded-lg border border-neutral-800"
          />
        </section>
      )}

      {game.investigation.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl mb-4">Investigation</h2>

          <ul className="space-y-3 list-disc list-inside text-gray-300">
            {game.investigation.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {game.implementation.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl mb-4">Implementation</h2>

          <ul className="space-y-3 list-disc list-inside text-gray-300">
            {game.implementation.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {game.results.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl mb-4">Results</h2>

          <div className="overflow-hidden rounded-lg border border-neutral-800">
            <table className="w-full">
              <thead className="border-b border-neutral-800">
                <tr className="text-left">
                  <th className="p-4">Metric</th>
                  <th className="p-4">Before</th>
                  <th className="p-4">After</th>
                </tr>
              </thead>

              <tbody>
                {game.results.map((result) => (
                  <tr
                    key={result.metric}
                    className="border-b border-neutral-900 last:border-0"
                  >
                    <td className="p-4">{result.metric}</td>
                    <td className="p-4 text-red-400">{result.before}</td>
                    <td className="p-4 text-green-400">{result.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {game.lessons && (
        <section className="mt-12">
          <h2 className="text-xl mb-3">Reflection</h2>

          <p className="text-gray-300 leading-8">
            {game.lessons}
          </p>
        </section>
      )}

      <a
        href={game.robloxUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-12 text-green-400 hover:underline"
      >
        View on Roblox →
      </a>
    </main>
  );
}