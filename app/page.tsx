import Image from "next/image";
import Link from "next/link";
import TreeSection from "@/components/TreeSection";
import CopyLink from "@/components/CopyLink";
import GameIcon from "@/components/GameIcon";
import { games, otherGames } from "@/app/data/games";
import { profile } from "@/app/data/profile";
import { getRobloxGames, visitsLabel } from "@/app/lib/roblox";

const sectionLabel = "text-[13px] font-bold tracking-[0.08em] text-gray-300";
const navLink = "hover:text-green-400 transition-colors";
const outlineButton =
  "inline-flex min-h-11 items-center rounded-md border border-neutral-700 px-4 sm:px-[18px] text-sm hover:border-green-400 hover:text-green-400 transition-colors";

export default async function Home() {
  const live = await getRobloxGames(
    [...games, ...otherGames].map((game) => game.universeId),
  );

  const status = ["Open to work", profile.availability, profile.timezone]
    .filter(Boolean)
    .join(" · ");

  const contactLinks = [
    { label: "Email", href: profile.email && `mailto:${profile.email}`, text: profile.email },
    { label: "GitHub", href: profile.github, text: `${profile.github.replace("https://", "")} ↗` },
    { label: "Roblox", href: profile.robloxProfile, text: "Roblox profile ↗" },
    { label: "Resume", href: "/resume.pdf", text: "resume.pdf ↗" },
  ].filter((link) => link.href);

  return (
    <main className="px-4 sm:px-6 py-10 sm:py-14">
      <div className="max-w-[40rem] mx-auto flex flex-col gap-14 sm:gap-[72px]">
        <header className="flex items-center justify-between text-[13px] text-gray-400">
          <span className="font-bold text-white">{profile.handle}</span>
          <nav className="flex gap-5 sm:gap-6">
            <a href="#work" className={`hidden sm:inline ${navLink}`}>
              work
            </a>
            <a href="/resume.pdf" target="_blank" className={navLink}>
              resume.pdf ↗
            </a>
            <a href="#contact" className={navLink}>
              contact
            </a>
          </nav>
        </header>

        {/* Hero */}
        <section className="flex flex-col gap-4 sm:gap-5">
          <p className="flex items-start gap-2.5 text-[13px] leading-relaxed text-gray-300">
            <span className="mt-[7px] size-2 shrink-0 rounded-full bg-green-400" />
            <span>{status}</span>
          </p>

          <h1 className="text-[44px] sm:text-6xl font-extrabold leading-[1.05] tracking-tight">
            Yo, I&apos;m{" "}
            <span className="underline underline-offset-[6px] sm:underline-offset-8 decoration-[3px]">
              {profile.handle}
            </span>
          </h1>

          <p className="text-[17px] sm:text-xl font-medium leading-snug">
            {profile.tagline}
          </p>

          <p className="text-sm sm:text-[15px] leading-7 text-gray-300">
            3+ years in Luau. I keep live games fast and player data safe:
            legacy migrations, datastore reliability, memory leaks, and
            production incidents. I built my own framework,{" "}
            <a
              href={profile.forge}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 underline decoration-dotted underline-offset-4 hover:text-green-300 transition"
            >
              Forge v2
            </a>
            , and use it on games where I own the engineering.
          </p>

          <p className="text-xs sm:text-[13px] leading-relaxed text-gray-400">
            {profile.stack.join(" · ")}
          </p>

          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              className="inline-flex min-h-11 items-center rounded-md bg-green-400 px-4 sm:px-[18px] text-sm font-bold text-[#0d0d0d] hover:bg-green-300 transition-colors"
            >
              Resume (PDF)
            </a>
            <CopyLink
              label={`@${profile.discord} (copy)`}
              value={profile.discord}
              className={outlineButton}
            />
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className={outlineButton}
            >
              GitHub ↗
            </a>
          </div>
        </section>

        {/* Work */}
        <TreeSection
          id="work"
          label="SELECTED WORK"
          hint="open a project for the full case study"
          items={games.map((game) => {
            const info = live.get(game.universeId);
            const meta = [game.studio, game.ccu, visitsLabel(info)]
              .filter(Boolean)
              .join(" · ");

            return {
              key: game.slug,
              content: (
                <Link
                  href={`/work/${game.slug}`}
                  className="group flex items-center gap-3.5 sm:gap-[18px] py-3.5"
                >
                  <GameIcon
                    src={info?.iconUrl}
                    name={game.gameName}
                    size={64}
                    className="size-[52px] sm:size-16 rounded-[10px] sm:rounded-xl"
                  />
                  <div className="flex min-w-0 grow flex-col gap-1">
                    <span className="text-[15px] sm:text-base font-bold group-hover:text-green-400 transition-colors">
                      {game.gameName}
                    </span>
                    <span className="text-[13px] sm:text-sm leading-normal text-green-400">
                      {game.headline}
                    </span>
                    <span className="text-[11px] sm:text-xs leading-normal text-gray-400">
                      {meta}
                    </span>
                  </div>
                  <span
                    aria-hidden="true"
                    className="hidden sm:inline text-gray-400 group-hover:text-green-400 transition-colors"
                  >
                    →
                  </span>
                </Link>
              ),
            };
          })}
        />

        {otherGames.length > 0 && (
          <section className="flex flex-col gap-4">
            <h2 className={sectionLabel}>ALSO WORKED ON</h2>
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-4">
              {otherGames.map((game) => {
                const info = live.get(game.universeId);
                const meta = [game.ccu, visitsLabel(info)]
                  .filter(Boolean)
                  .join(" · ");

                return (
                  <a
                    key={game.universeId}
                    href={game.robloxUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-2.5"
                  >
                    {info?.thumbnailUrl ? (
                      <Image
                        src={info.thumbnailUrl}
                        alt={`${game.name} thumbnail`}
                        width={768}
                        height={432}
                        unoptimized
                        className="aspect-video w-full rounded-lg border border-neutral-800 object-cover"
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        className="aspect-video w-full rounded-lg border border-neutral-800 bg-neutral-900"
                      />
                    )}
                    <span className="flex flex-col gap-1">
                      <span className="text-sm font-bold group-hover:text-green-400 transition-colors">
                        {game.name} ↗
                      </span>
                      {meta && (
                        <span className="text-xs text-gray-400">{meta}</span>
                      )}
                    </span>
                  </a>
                );
              })}
            </div>
          </section>
        )}

        {/* Contact */}
        <section id="contact" className="flex flex-col gap-4">
          <h2 className={sectionLabel}>CONTACT</h2>
          <dl className="grid grid-cols-[72px_minmax(0,1fr)] sm:grid-cols-[120px_minmax(0,1fr)] gap-x-3 sm:gap-x-4 gap-y-3 text-[13px] sm:text-sm leading-normal">
            <dt className="text-gray-400">Discord</dt>
            <dd className="break-words">
              <CopyLink
                label={`@${profile.discord} (copy)`}
                value={profile.discord}
                className="hover:text-green-400"
              />
              {profile.discordId && (
                <>
                  {" · "}
                  <a
                    href={`https://discord.com/users/${profile.discordId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={navLink}
                  >
                    profile ↗
                  </a>
                </>
              )}
            </dd>

            {contactLinks.map((link) => (
              <div key={link.label} className="contents">
                <dt className="text-gray-400">{link.label}</dt>
                <dd className="break-words">
                  <a
                    href={link.href}
                    target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className={navLink}
                  >
                    {link.text}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <footer className="flex flex-col sm:flex-row sm:justify-between gap-1.5 sm:gap-4 border-t border-dashed border-neutral-800 pt-4 sm:pt-5 text-[11px] sm:text-xs leading-normal text-gray-400">
          <span>{profile.handle} · Luau programmer</span>
          <span>Game icons and visit counts update from Roblox automatically.</span>
        </footer>
      </div>
    </main>
  );
}
