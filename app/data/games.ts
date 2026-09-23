export type Game = {
  slug: string;
  gameName: string;
  // Look it up at https://apis.roblox.com/universes/v1/places/<placeId>/universe
  universeId: number;
  robloxUrl: string;

  // Homepage row
  headline: string;
  // CCU while you worked on the game. Typed by hand on purpose: a game's live
  // player count can drop after you leave, and that would undersell your work.
  ccu: string;

  // Case study header
  title: string;
  subtitle: string;
  summary?: string;
  role?: string;
  studio?: string;
  when?: string;
  team?: string;
  stack?: string;
  highlights: {
    label: string;
    value: string;
    from: string;
  }[];

  overview: string;

  challenge: string;

  investigation: string[];

  implementation: string[];

  results: {
    metric: string;
    before: string;
    after: string;
  }[];
  resultsNote?: string;

  evidence: {
    src: string;
    alt: string;
    label: string;
    width: number;
    height: number;
  }[];
};

// Games shown as thumbnails under "Also worked on", without a case study.
export type OtherGame = {
  name: string;
  universeId: number;
  robloxUrl: string;
  ccu?: string;
};

const computeEfficiencyNote =
  "Compute efficiency is Roblox's measure of how efficiently a game's servers run compared to the Roblox average. Above 100% means more efficient than average.";

export const games: Game[] = [
  {
    slug: "crazy-chefs",
    gameName: "Crazy Chefs",
    universeId: 6136243726,
    robloxUrl: "https://www.roblox.com/games/18102078939/CRAZY-CHEFS",

    headline: "Server CPU 16.9 → 1.4 ms, memory 943 → 234 MB",
    ccu: "2.5K–5K CCU",

    title: "Optimizing a Live Roblox Game at Scale",
    subtitle: "Legacy Migration · Performance · LiveOps",
    summary:
      "Server CPU time down 12× and server memory down 4× on a game averaging 2.5K concurrent players, while still shipping content.",
    role: "Programmer (contract)",
    studio: "Grow Games",
    when: "Feb 2026 – present",
    stack: "Luau · Forge v2",
    highlights: [
      { label: "Server CPU time", value: "1.4 ms", from: "16.9 ms" },
      { label: "Server memory", value: "234 MB", from: "943 MB" },
      { label: "Server heartbeat", value: "60", from: "1–14" },
    ],

    overview: "",

    challenge:
      "Crazy Chefs averages 2.5K concurrent players. Accumulated technical debt made new features slow to build, and long-running servers degraded over time: CPU time climbed, memory kept growing, and heartbeat became unstable, so gameplay felt laggy on older servers.",

    investigation: [
      "Set baseline metrics on Roblox's server performance dashboards before changing anything.",
      "Tracked server CPU time, heartbeat, server memory, and compute efficiency.",
      "Found legacy systems doing unnecessary work every frame.",
      "Traced the main causes to inefficient loops, detection logic, and overly broad checks.",
    ],

    implementation: [
      "Migrated large parts of the codebase to Forge v2, my dependency-injected framework.",
      "Removed redundant work that ran every frame.",
      "Refactored systems to reduce coupling and make them easier to maintain.",
      "Kept shipping gameplay content and quality-of-life updates throughout the migration.",
    ],

    results: [
      {
        metric: "Server CPU Time",
        before: "16.9 ms",
        after: "1.39 ms",
      },
      {
        metric: "Server Heartbeat",
        before: "1–14",
        after: "60",
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
    resultsNote: computeEfficiencyNote,

    evidence: [
      {
        src: "/crazy_chefs/perf_before.png",
        alt: "Roblox server performance dashboard before the work: 16.9 ms server CPU time, 943 MB server memory, unstable heartbeat",
        label: "Before",
        width: 979,
        height: 780,
      },
      {
        src: "/crazy_chefs/perf_after.png",
        alt: "Roblox server performance dashboard after the work: 1.39 ms server CPU time, 234 MB server memory, heartbeat steady at 60",
        label: "After",
        width: 999,
        height: 833,
      },
    ],
  },

  {
    slug: "shoot-the-brainrots",
    gameName: "Shoot the Brainrots",
    universeId: 8814191591,
    robloxUrl: "https://www.roblox.com/games/130557965403026/Shoot-the-Brainrots",

    headline: "Rebuilt saves on ProfileStore, patched item dupes",
    ccu: "2K–10.5K CCU",

    title: "Rewriting the Data System on a Live Roblox Game",
    subtitle: "Data Persistence · LiveOps · Incident Response · QA Collaboration",
    summary:
      "Moved player saves on a live game to ProfileStore without losing anyone's progress, and closed the item duplication exploits.",
    role: "LiveOps Programmer",
    studio: "IndigoVC",
    stack: "Luau · ProfileStore",
    highlights: [
      { label: "Server memory growth", value: "~88%", from: "~210%" },
      { label: "Compute efficiency", value: "~130%", from: "~32%" },
    ],

    overview:
      "Shoot the Brainrots averaged roughly 2K CCU, peaking at around 2.5K on weekends while I worked on it. I focused on improving the game's datastore systems, investigating production incidents, rewriting the data system without putting existing player progress at risk, and improving server performance.",

    challenge:
      "The game's data system had fragile saving behavior that softlocked players after unexpected server failures. Backwards compatibility was critical to avoid losing players' progress. Dupes and item corruption were also a problem.",

    investigation: [
      "Identified a pattern across multiple player reports related to data loss.",
      "Determined that players didn't actually lose their data: ProfileStore couldn't release their session lock, which softlocked them.",
      "Used the findings to narrow the problem down to session ownership rather than corrupted save data.",
      "Also found systems doing unnecessary work that hurt performance, along with memory leaks caused by stale upvalues, loose references, and dead RBXScriptSignal connections.",
    ],

    implementation: [
      "Redesigned the persistence architecture around ProfileStore while maintaining backwards compatibility.",
      "Created a migration that converted legacy player inventories to the new schema without losing progress.",
      "Introduced an ID system with Roblox's HttpService to eliminate duplication exploits.",
      "Coordinated with QA testers to verify that the new system did not cause data loss before deployment.",
      "Optimized server systems and fixed the memory leaks, cutting memory growth and improving compute efficiency.",
    ],

    results: [
      {
        metric: "Player Saves",
        before: "Softlocks during server failures, no safety rollback for failed operations, complete data loss",
        after: "Reliable saving, data rollbacks, no data loss",
      },
      {
        metric: "Duplication Exploits",
        before: "Possible",
        after: "Patched by Item ID validation",
      },
      {
        metric: "Server Memory Growth",
        before: "~210%",
        after: "~88%",
      },
      {
        metric: "Compute Efficiency",
        before: "~32%",
        after: "~130%",
      },
    ],
    resultsNote: computeEfficiencyNote,

    evidence: [],
  },

  {
    slug: "speed-bridge-building",
    gameName: "+1 Speed Bridge Building",
    universeId: 9334607793,
    robloxUrl: "https://www.roblox.com/games/135787657971346/1-Speed-Bridge-Building",

    headline: "Client crash rate 12.01% → near zero",
    ccu: "1.5K–3K CCU",

    title: "Fixing a Spike in Client Crash Rates Within Minutes",
    subtitle: "Performance Optimization · Rapid Deployment · LiveOps",
    summary:
      "Found and fixed a client crash spike caused by the game loading every bridge at once.",
    role: "LiveOps Programmer",
    studio: "IndigoVC",
    stack: "Luau",
    highlights: [
      { label: "Client crash rate", value: "Near zero", from: "12.01%" },
    ],

    overview:
      "While monitoring games I used to work on, I noticed +1 Speed Bridge Building had a huge spike in client crashes after an update that let players buy hundreds of thousands of bridges. Loading them all at once pushed the client's CPU to its limit. I told my manager and started fixing it right away.",

    challenge:
      "The game tried to load every bridge at the same time. Players either waited a long time to load in or crashed. At high speeds, characters also became unstable and kept getting flung, because the bridge animation created small ridges that tripped them.",

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
        before: "12.01%",
        after: "Near Zero",
      },
    ],

    evidence: [
      {
        src: "/speed_bridge/crash_fix.png",
        alt: "Client crash rate chart: around 12% to 17% for most of a day, then dropping to near zero after the fix shipped",
        label: "Client crash rate, before and after the fix",
        width: 697,
        height: 499,
      },
    ],
  },
  /*{
    slug: "shoot-a-brainrot",
    gameName: "Shoot a Brainrot",
    universeId: 8220738785,
    robloxUrl: "https://www.rolimons.com/game/78949013360566",

    headline: "Rotation fixes: Blender re-export → one-line config change",
    ccu: "2K–5K CCU",

    title: "Reducing Friction Between Modelers and Programmers",
    subtitle: "Developer Experience · Team Productivity · LiveOps",
    highlights: [],

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

    evidence: [],
  }*/
];

export const otherGames: OtherGame[] = [
  {
    name: "Shoot a Brainrot",
    universeId: 8220738785,
    robloxUrl: "https://www.roblox.com/games/78949013360566",
    ccu: "2K–5K CCU",
  },
];
