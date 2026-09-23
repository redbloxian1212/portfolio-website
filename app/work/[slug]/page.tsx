import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import GameIcon from "@/components/GameIcon";
import { games } from "@/app/data/games";
import { getRobloxGames, visitsLabel } from "@/app/lib/roblox";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return games.map((game) => ({
    slug: game.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = games.find((g) => g.slug === slug);
  if (!game) return {};

  const description = `${game.gameName}: ${game.summary ?? game.headline}`;
  return {
    title: game.title,
    description,
    openGraph: { title: game.title, description },
  };
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xl font-bold">{title}</h2>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5 text-[15px] leading-7 text-gray-300">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="text-green-400">
            ›
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function GamePage({ params }: Props) {
  const { slug } = await params;

  const game = games.find((g) => g.slug === slug);

  if (!game) return notFound();

  const info = (await getRobloxGames([game.universeId])).get(game.universeId);

  const facts = [
    { label: "Role", value: game.role },
    { label: "Studio", value: game.studio },
    { label: "When", value: game.when },
    { label: "Scale", value: [game.ccu, visitsLabel(info)].filter(Boolean).join(" · ") },
    { label: "Team", value: game.team },
    { label: "Stack", value: game.stack },
  ].filter((fact) => fact.value);

  return (
    <main className="px-4 sm:px-6 py-10 sm:py-14">
      <div className="max-w-3xl mx-auto flex flex-col gap-12 sm:gap-14">
        <Link
          href="/"
          className="self-start text-sm text-gray-400 hover:text-green-400 transition-colors"
        >
          ← all work
        </Link>

        <header className="flex flex-col gap-4 sm:gap-[18px]">
          <div className="flex items-center gap-3.5">
            <GameIcon
              src={info?.iconUrl}
              name={game.gameName}
              size={56}
              className="size-14 rounded-xl"
            />
            <div className="flex flex-col gap-1">
              <span className="text-[15px] font-bold">{game.gameName}</span>
              <span className="text-[13px] text-green-400">{game.subtitle}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-[40px] font-extrabold leading-tight tracking-tight text-balance">
            {game.title}
          </h1>

          {game.summary && (
            <p className="text-[15px] sm:text-base leading-7 text-gray-300">
              {game.summary}
            </p>
          )}
        </header>

        {facts.length > 0 && (
          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5 rounded-lg border border-neutral-800 bg-[#141414] p-5 sm:px-6">
            {facts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-1.5">
                <dt className="text-[11px] tracking-[0.08em] text-gray-400">
                  {fact.label.toUpperCase()}
                </dt>
                <dd className="text-sm">{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {game.highlights.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4">
            {game.highlights.map((highlight) => (
              <div
                key={highlight.label}
                className="flex flex-1 flex-col gap-2 rounded-lg border border-neutral-800 p-5"
              >
                <span className="text-[11px] tracking-[0.08em] text-gray-400">
                  {highlight.label.toUpperCase()}
                </span>
                <span className="text-[32px] font-extrabold leading-none text-green-400 tabular-nums">
                  {highlight.value}
                </span>
                <span className="text-[13px] text-gray-400">
                  from {highlight.from}
                </span>
              </div>
            ))}
          </div>
        )}

        {game.overview && (
          <Section title="Overview">
            <p className="text-[15px] leading-7 text-gray-300">
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
          </Section>
        )}

        {game.challenge && (
          <Section title="The problem">
            <p className="text-[15px] leading-7 text-gray-300">{game.challenge}</p>
          </Section>
        )}

        {game.investigation.length > 0 && (
          <Section title="Investigation">
            <Bullets items={game.investigation} />
          </Section>
        )}

        {game.implementation.length > 0 && (
          <Section title="What I changed">
            <Bullets items={game.implementation} />
          </Section>
        )}

        {game.results.length > 0 && (
          <Section title="Results">
            <div className="overflow-x-auto rounded-lg border border-neutral-800">
              <table className="w-full text-sm tabular-nums">
                <thead className="border-b border-neutral-800">
                  <tr className="text-left">
                    <th className="p-4 font-bold">Metric</th>
                    <th className="p-4 font-bold">Before</th>
                    <th className="p-4 font-bold">After</th>
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

            {game.resultsNote && (
              <p className="text-xs leading-relaxed text-gray-400">
                {game.resultsNote}
              </p>
            )}
          </Section>
        )}

        {game.evidence.length > 0 && (
          <Section title="Evidence">
            <div
              className={`grid gap-6 ${game.evidence.length > 1 ? "sm:grid-cols-2" : ""}`}
            >
              {game.evidence.map((item) => (
                <figure key={item.src} className="flex flex-col gap-2">
                  <a href={item.src} target="_blank" title="Open full size">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      className="w-full rounded-lg border border-neutral-800 bg-[#111111]"
                    />
                  </a>
                  <figcaption className="text-xs text-gray-300">
                    {item.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Section>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-neutral-800 pt-5 text-sm">
          <a
            href={game.robloxUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:underline"
          >
            Play {game.gameName} on Roblox ↗
          </a>
          <Link href="/" className="text-gray-400 hover:text-green-400 transition-colors">
            ← all work
          </Link>
        </div>
      </div>
    </main>
  );
}
