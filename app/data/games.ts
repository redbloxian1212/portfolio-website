export type Game = {
  slug: string;
  title: string;
  summary: string;
  details: string[];
  robloxUrl: string;
};

export const games: Game[] = [
  {
    slug: "crazy-chefs",
    title: "Crazy Chefs",
    summary: "Migrated a legacy codebase to a custom dependency-injected framework and fixed critical performance issues.",
    details: [
      "Migrated the messy codebase into my own dependency-injected framework (Forge v2).",
      "Performance fixes that resolved servers running at 1-14 heartbeat.",
      "Shipped gameplay enhancements and QOL improvements.",
    ],
    robloxUrl: "https://www.roblox.com/games/18102078939/CRAZY-CHEFS",
  },
  {
    slug: "shoot-the-brainrots",
    title: "Shoot the Brainrots",
    summary: "Reworked data persistence architecture to eliminate data loss and softlocks while maintaining backwards compatibility.",
    details: [
      "Proactively reworked data persistence architecture with ProfileStore to prevent data losses and softlocks caused by fragile saving behavior, while maintaining backwards compatibility and coordinating with the community on root cause analysis.",
      "First responder mitigating critical data loss after a version with compatibility problems was rolled back.",
      "Performance optimizations that reduced server memory growth ~2.6x and improved compute efficiency by 71%.",
    ],
    robloxUrl: "https://www.roblox.com/games/130557965403026/Shoot-the-Brainrots",
  },
  {
    slug: "1-speed-bridge-building",
    title: "+1 Speed Bridge Building",
    summary: "Solved client crashes and character instability caused by loading 10k+ player-owned bridges at once.",
    details: [
      "Distributed bridge loading across multiple frames instead of loading 10k+ bridges at once, reducing client crashes by 73%.",
      "Fixed character instability at high speeds by creating dedicated hitboxes for bridges and disabling the FallingDown state on the Humanoid.",
    ],
    robloxUrl: "https://www.roblox.com/games/135787657971346/1-Speed-Bridge-Building",
  },
  {
    slug: "brainrot-bounties",
    title: "Brainrot Bounties",
    summary: "Built from scratch, covering sound design, UI design, and programming.",
    details: [
      "Built from scratch (except for the buildings).",
      "Sound design.",
      "UI design.",
      "Programming.",
    ],
    robloxUrl: "https://www.roblox.com/games/139701287827416/Brainrot-Bounties",
  },
  {
    slug: "shoot-a-brainrot",
    title: "Shoot a Brainrot",
    summary: "Optimized content update pipeline between modelers and scripters.",
    details: [
      "Tweaked the constructor function to apply rotation properties to align orientation, which sped up content updates and prevented ping-pong delays between modelers and scripters.",
    ],
    robloxUrl: "https://www.roblox.com/games/78949013360566/Shoot-a-Brainrot",
  },
];