import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { games } from "@/app/data/games";
import { profile } from "@/app/data/profile";
import { getRobloxGames } from "@/app/lib/roblox";

// The preview card Discord, X, etc. show when someone pastes your link.
export const alt = "src, Luau programmer for live Roblox games";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const [regular, extraBold, live] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/JetBrainsMono-400.ttf")),
    readFile(join(process.cwd(), "assets/fonts/JetBrainsMono-800.ttf")),
    getRobloxGames(games.map((game) => game.universeId)),
  ]);

  const icons = games
    .map((game) => live.get(game.universeId)?.iconUrl)
    .filter((url): url is string => Boolean(url));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0d0d0d",
          color: "#ffffff",
          fontFamily: "JetBrains Mono",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 26,
              color: "#d1d5dc",
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                background: "#05df72",
              }}
            />
            open to work
          </div>
          <div
            style={{
              fontSize: 120,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.03em",
            }}
          >
            {profile.handle}
          </div>
          <div style={{ fontSize: 40, lineHeight: 1.25 }}>
            Luau programmer for live Roblox games
          </div>
          <div style={{ fontSize: 30, color: "#05df72" }}>
            backend · performance · LiveOps
          </div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {icons.map((src) => (
            <img
              key={src}
              src={src}
              alt=""
              width={88}
              height={88}
              style={{ borderRadius: 18, border: "1px solid #262626" }}
            />
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "JetBrains Mono", data: regular, style: "normal", weight: 400 },
        { name: "JetBrains Mono", data: extraBold, style: "normal", weight: 800 },
      ],
    },
  );
}
