export type Game = {
  slug: string;
  title: string;
  subtitle: string;

  overview: string;

  challenge: string;

  investigation: string[];

  implementation: string[];

  results: {
    metric: string;
    before: string;
    after: string;
  }[];

  lessons: string;

  beforeImage?: string;
  afterImage?: string;

  robloxUrl: string;
};

export const games: Game[] = [
  {
    slug: "crazy-chefs",

    title: "Optimizing a Live Roblox Game at Scale",

    subtitle: "Legacy Migration • Performance • LiveOps",

    overview:
      "Crazy Chefs averaged roughly 1.2k concurrent players while I worked on it. Over time, the game accumulated significant technical debt, making new feature development increasingly difficult while causing many long-lived production servers to gradually degrade in performance. It felt like I had a heart attack when I finally deployed it.",

    challenge:
      "Being an acquisitioned game, many long-lived production servers gradually became laggy over time due to accumulated technical debt. Increased CPU time, excessive memory usage, and unstable heartbeat behavior led to inconsistent gameplay responsiveness, while the underlying codebase made debugging and feature development increasingly difficult.",

    investigation: [
      "Established baseline metrics using Roblox Performance dashboards before making changes.",
      "Tracked server CPU time, heartbeat stability, server memory usage and compute efficiency.",
      "Identified legacy systems performing unnecessary work every frame.",
      "Found the major causes of the performance issues."
    ],

    implementation: [
      "Migrated large parts of the project to a dependency-injected architecture (Forge v2).",
      "Removed redundant work occurring every frame.",
      "Refactored systems to reduce coupling and improve long-term maintainability.",
      "Continued shipping gameplay content and quality-of-life improvements throughout the migration."
    ],

    results: [
      {
        metric: "Server CPU Time",
        before: "16.9 ms",
        after: "1.39 ms",
      },
      {
        metric: "Heartbeat Stability",
        before: "Unstable on many long-lived servers",
        after: "Consistently stable",
      },
      {
        metric: "Server Memory",
        before: "943 MB",
        after: "234 MB",
      },
      {
        metric: "Compute Efficiency",
        before: "26.5%",
        after: "118.6%",
      },
    ],

    lessons:
      "Large-scale optimization is ultimately a measurement problem. Rather than relying on assumptions, I established baseline metrics, made incremental changes, and validated every improvement against production telemetry before considering the work complete. Since I lacked knowledge using proper analytics tool, I had to make use of what I already knew and kept things simple.",

    beforeImage: "/crazy_chefs/perf_before.png",
    afterImage: "/crazy_chefs/perf_after.png",

    robloxUrl:
      "https://www.roblox.com/games/18102078939/CRAZY-CHEFS",
  },

  {
    slug: "shoot-the-brainrots",
    title: "Rewriting Data System on a Live Roblox Game",
    subtitle: "Data Persistence • LiveOps • Incident Response • QA Collaboration",
    overview:
      "Shoot the Brainrots averaged roughly 2K CCU, peaking at around 2.5K on weekends while I worked on it. I focused on improving the game's datastore systems, investigating production incidents, rewriting the data system without putting existing player progress at risk, and improving server performance.",
    challenge:
      "The game's data system had fragile saving behavior that softlocked players after unexpected server failures. Backwards compatibility was critical to avoid losing the player's progress. Dupes and item corruption was also another problem.",
    investigation: [
      "Identified a pattern across multiple player reports related to `data loss`.",
      "Determined that players didn't actually loose their data, ProfileStore just wasn't able to release their session lock resulting in softlocks.",
      "Used the findings to narrow the problem down to session ownership rather than corrupted save data.",
      "I also found systems doing unnecessary work that hurt performance, along with memory leaks caused by stale upvalues, loose references, and dead RBXScriptSignal connections."
    ],
    implementation: [
      "Redesigned the persistence architecture around ProfileStore while maintaining backwards compatibility.",
      "Created a migration that converted legacy player inventories to the new schema without losing progress.",
      "Introduced an ID system with Roblox's HTTPService to eliminate duplication exploits.",
      "Coordinated with QA testers to verify that the new system did not cause data loss before deployment.",
      "Optimized server systems, reducing memory growth by roughly 2.6× while improving compute efficiency by 71%."
    ],
    results: [
      {
        metric: "Player Saves",
        before: "Softlocks during session ownership failures",
        after: "Reliable recovery"
      },
      {
        metric: "Inventory Format",
        before: "Legacy format",
        after: "Automatic migration"
      },
      {
        metric: "Duplication Exploits",
        before: "Possible",
        after: "Item ID validation"
      },
      {
        metric: "Server Memory Growth",
        before: "Baseline",
        after: "~2.6× reduction"
      },
      {
        metric: "Compute Efficiency",
        before: "Baseline",
        after: "+71%"
      }
    ],
    lessons:
      "I realized when working on live persistence systems, solving the problem alone is not enough. Careful validation, backwards-compatible migrations, and coordinated testing are essential to ensuring players don't lose their progress throughout the rollout.",
    robloxUrl:
      "https://www.roblox.com/games/130557965403026/Shoot-the-Brainrots",
  },

  /*{
    slug: "1-speed-bridge-building",
    title: "+1 Speed Bridge Building",
    subtitle: "",
    overview: "",
    challenge: "",
    investigation: [],
    implementation: [],
    results: [],
    lessons: "",
    robloxUrl:
      "https://www.roblox.com/games/135787657971346/1-Speed-Bridge-Building",
  },

  {
    slug: "brainrot-bounties",
    title: "Brainrot Bounties",
    subtitle: "",
    overview: "",
    challenge: "",
    investigation: [],
    implementation: [],
    results: [],
    lessons: "",
    robloxUrl:
      "https://www.roblox.com/games/139701287827416/Brainrot-Bounties",
  },

  {
    slug: "shoot-a-brainrot",
    title: "Shoot a Brainrot",
    subtitle: "",
    overview: "",
    challenge: "",
    investigation: [],
    implementation: [],
    results: [],
    lessons: "",
    robloxUrl:
      "https://www.roblox.com/games/78949013360566/Shoot-a-Brainrot",
  },*/
];