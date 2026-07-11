export type Game = {
  slug: string;
  title: string;
  meta?: string;
  subtitle: string;
  gameName: string;

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
    meta: "1.2K-2K CCU | 254M lifetime visits",

    subtitle: "Legacy Migration • Performance • LiveOps",

    gameName: "Crazy Chefs",

    overview:
      "Crazy Chefs averaged roughly 1.2k concurrent players while I worked on it. Over time, the game accumulated significant technical debt, making new feature development increasingly difficult while causing many long-lived production servers to gradually degrade in performance.",

    challenge:
      "Many long-lived production servers gradually became laggy over time due to accumulated technical debt. Increased CPU time, excessive memory usage, and unstable heartbeat behavior led to inconsistent gameplay responsiveness, while the underlying codebase made debugging and feature development increasingly difficult.",

    investigation: [
      "Established baseline metrics using Roblox Performance dashboards before making changes.",
      "Tracked server CPU time, heartbeat stability, server memory usage and compute efficiency.",
      "Identified legacy systems performing unnecessary work every frame.",
      "Found the major causes of the performance issues: inefficient loops, detection, broad checks."
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
    meta: "Worked during 2K-10.5K CCU | 21.1M lifetime visits",

    subtitle: "Data Persistence • LiveOps • Incident Response • QA Collaboration",
    gameName: "Shoot the Brainrots",
    overview:
      "Shoot the Brainrots averaged roughly 2K CCU, peaking at around 2.5K on weekends while I worked on it. I focused on improving the game's datastore systems, investigating production incidents, rewriting the data system without putting existing player progress at risk, and improving server performance.",
    challenge:
      "The game's data system had fragile saving behavior that softlocked players after unexpected server failures. Backwards compatibility was critical to avoid losing the player's progress. Dupes and item corruption was also another problem.",
    investigation: [
      "Identified a pattern across multiple player reports related to data loss.",
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
        before: "Softlocks during server failures, no safety rollback for failed operations, complete data loss",
        after: "Reliable saving, data rollbacks, no data loss"
      },
      {
        metric: "Duplication Exploits",
        before: "Possible",
        after: "Patched by Item ID validation"
      },
      {
        metric: "Server Memory Growth",
        before: "~210%",
        after: "~88%"
      },
      {
        metric: "Compute Efficiency",
        before: "~32%",
        after: "~130%"
      }
    ],
    lessons:
      "I realized when working with live persistence systems, careful validation, backwards-compatible migrations, and coordinated testing are non-negotioable to ensuring players don't lose their progress throughout the rollout.",
    robloxUrl:
      "https://www.roblox.com/games/130557965403026/Shoot-the-Brainrots",
  },
  {
    slug: "speed-bridge-building",
    title: "Fixing massive client crash rates within minutes",
    meta: "Worked during 1.5K-3K CCU | 18M lifetime visits",
    gameName: "+1 Speed Bridge Building",
    subtitle: "Performance Optimization • Rapid Deployment • LiveOps",
    robloxUrl: "https://www.roblox.com/games/135787657971346/1-Speed-Bridge-Building",

    overview:
      "While monitoring games that I used to work on, I noticed +1 Speed Bridge Building(~3k CCU) had a huge spike in client crashes after a recent update that allowed players to easily buy hundreds of thousands of bridges. Trying to load everything at once posed extreme stress to the cpu, no breathing room at all, yikes! No time wasted, I informed my manager and immediately began fixing it. ",

    challenge:
      "The game attempted to load every bridge simultaneously. When a player loaded the game, they had to wait for a long time, or worse, they crashed. At high speeds, characters became unstable and kept getting flinged due to the bridge's animation creating small ridges that would trip/fling the character.",

    beforeImage: "",
    afterImage: "/speed_bridge/crash_fix.png",

    investigation: [
      "Profiled bridge loading behavior on large saves.",
      "Identified that thousands of bridge instances were being processed in a single frame.",
      "Investigated Humanoid physics behavior while moving at high speeds.",
    ],

    implementation: [
      "Distributed bridge loading across multiple frames instead of loading everything at once.",
      "Created dedicated hitboxes for bridges to improve collision behavior as bridges were animated when a player touched them.",
      "Disabled the Humanoid FallingDown state to further improve character stability at high speeds.",
    ],

    results: [
      {
        metric: "Client Crash Rate",
        before: "73%",
        after: "Near Zero",
      },
    ],

    lessons:
      "Drinking 3 cups of coffee helps fixing production bugs within 30 minutes.",
  },
  {
    slug: "brainrot-bounties",

    title: "Building a Roblox Game from Scratch",
    meta: "Peaked at 1.2K CCU | 1M lifetime visits",

    subtitle: "Gameplay Programming • UI • Sound Design",

    gameName: "Brainrot Bounties",

    overview:
      "Brainrot Bounties was built from scratch as a small team project. I was responsible for programming, UI design, and sound design(I put toolbox sounds together). Working across multiple disciplines meant balancing gameplay implementation, economy and UX. Every system needed to feel cohesive despite being developed simultaneously. I like the sound design in this game.",

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

    title: "Reducing Friction Between Modelers and Programmers",
    meta: "Worked during 2K-5K CCU | 76M lifetime visits",

    subtitle: "Developer Experience • Team Productivity • LiveOps",

    gameName: "Shoot a Brainrot",

    overview:
      "While working alongside modelers in Shoot a Brainrot, I noticed a repetitive workflow where brainrot assets frequently bounced between modelers and programmers because of incorrect model rotation(usual blender-roblox problems). Fixed it with a few lines of code that allowed modelers and programmers to tweak its rotation as a config.",

    challenge:
      "When imported models had incorrect rotation, fixing them required the modeler to return to Blender, re-export the asset, and have it imported again. This created unnecessary back-and-forth between modelers and programmers for what was ultimately just a rotation adjustment. You couldn't also `just rotate` them, you'd need to dig into the game's code)",

    investigation: [
      "Reviewed how imported models were used in-game.",
      "Studied the full life cycle of a brainrot entity from spawning, getting killed, and despawning.",
      "Checked how the code rotates the models and found that it uses align orientation.",
    ],

    implementation: [
      "Modified the constructor to read and apply rotation values into AlignOrientation during entity creation from the config.",
    ],

    results: [
      {
        metric: "Rotation Fixes",
        before: "Required Blender re-export",
        after: "One-line code change",
      },
    ],

    lessons:
      "Sometimes, small changes can have an outsized impact on a team's productivity. Eliminating repetitive manual work speeds up development and lets both programmers and modelers focus on tasks that truly matter.",

    robloxUrl:
      "https://www.rolimons.com/game/78949013360566",
  },
];