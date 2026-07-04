export type Game = {
  slug: string;
  title: string;
  summary: string;
  details: string[];
};

export const games: Game[] = [
  {
    slug: "game-1",
    title: "Game 1",
    summary: "A short one-line description of the game.",
    details: [
      "What the game is about.",
      "Your role and what you built.",
      "Tools/tech used (Luau, Roblox Studio, etc).",
    ],
  },
  {
    slug: "game-2",
    title: "Game 2",
    summary: "A short one-line description of the game.",
    details: [
      "What the game is about.",
      "Your role and what you built.",
      "Tools/tech used.",
    ],
  },
];