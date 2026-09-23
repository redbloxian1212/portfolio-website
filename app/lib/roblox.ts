// Live game data from Roblox's public APIs. Responses are cached for an hour,
// so icons, thumbnails and visit counts stay current without a redeploy.
// These APIs don't allow browser requests (no CORS), so only call this on the server.

const REVALIDATE_SECONDS = 3600;

export type RobloxGameInfo = {
  iconUrl?: string;
  thumbnailUrl?: string;
  visits?: number;
};

type Thumbnail = {
  targetId: number;
  state: string;
  imageUrl: string | null;
};

async function getJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    // Roblox being down shouldn't break the site; the page renders without live data.
    return null;
  }
}

export async function getRobloxGames(
  universeIds: number[],
): Promise<Map<number, RobloxGameInfo>> {
  const info = new Map<number, RobloxGameInfo>(
    universeIds.map((id) => [id, {}]),
  );
  if (universeIds.length === 0) return info;

  const ids = universeIds.join(",");
  const [icons, thumbnails, games] = await Promise.all([
    getJson<{ data: Thumbnail[] }>(
      `https://thumbnails.roblox.com/v1/games/icons?universeIds=${ids}&size=256x256&format=Png&isCircular=false`,
    ),
    getJson<{ data: { universeId: number; thumbnails: Thumbnail[] }[] }>(
      `https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds=${ids}&countPerUniverse=1&size=768x432&format=Png&isCircular=false`,
    ),
    getJson<{ data: { id: number; visits: number }[] }>(
      `https://games.roblox.com/v1/games?universeIds=${ids}`,
    ),
  ]);

  for (const icon of icons?.data ?? []) {
    const entry = info.get(icon.targetId);
    if (entry && icon.state === "Completed" && icon.imageUrl) {
      entry.iconUrl = icon.imageUrl;
    }
  }

  for (const game of thumbnails?.data ?? []) {
    const entry = info.get(game.universeId);
    const thumbnail = game.thumbnails?.[0];
    if (entry && thumbnail?.state === "Completed" && thumbnail.imageUrl) {
      entry.thumbnailUrl = thumbnail.imageUrl;
    }
  }

  for (const game of games?.data ?? []) {
    const entry = info.get(game.id);
    if (entry) entry.visits = game.visits;
  }

  return info;
}

// 291287473 -> "291M", 21357963 -> "21.3M". Rounds down so it never overstates.
export function formatCount(n: number): string {
  const units: [number, string][] = [
    [1e9, "B"],
    [1e6, "M"],
    [1e3, "K"],
  ];
  for (const [size, suffix] of units) {
    if (n >= size) {
      const value = n / size;
      const shown = value >= 100 ? Math.floor(value) : Math.floor(value * 10) / 10;
      return `${shown}${suffix}`;
    }
  }
  return String(n);
}

export function visitsLabel(info?: RobloxGameInfo): string | null {
  return info?.visits ? `${formatCount(info.visits)} visits` : null;
}
