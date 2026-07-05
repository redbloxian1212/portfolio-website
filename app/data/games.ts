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
    title: "Crazy Chefs (Legacy Migration)",
    summary: "I worked with legacy codebases and cleaning up technical debt while adding new content and features.",
    details: [
      "Migrated the messy codebase into my own dependency-injected framework (Forge v2).",
      "Performance fixes that resolved servers running at 1-14 heartbeat.",
      "Added new content and features.",
      "Shipped gameplay enhancements and QOL improvements.",
    ],
    robloxUrl: "https://www.roblox.com/games/18102078939/CRAZY-CHEFS",
  },
  {
    slug: "shoot-the-brainrots",
    title: "Shoot the Brainrots (Datastore Reliability)",
    summary: "I reworked of CRITICAL systems whilst handling the pressure of weekly content updates.",
    details: [
      "Proactively reworked data persistence architecture with ProfileStore to prevent data losses and softlocks caused by fragile saving behavior, while maintaining backwards compatibility and coordinating with the community on root cause analysis.",
      "First responder mitigating critical data loss after a version with compatibility problems was rolled back.",
      "Patched duplication bugs by implementing an id system for items",
      "Performance optimizations that reduced server memory growth ~2.6x and improved compute efficiency by 71%.",
      "Content updates, expansion and QOL improvements."
    ],
    robloxUrl: "https://www.roblox.com/games/130557965403026/Shoot-the-Brainrots",
  },
  {
    slug: "1-speed-bridge-building",
    title: "+1 Speed Bridge Building (Rapid Debugging)",
    summary: "Rapid diagnosis and deployment of production fixes.",
    details: [
      "Saw a spike in client crashes during routine monitoring; distributed bridge loading across multiple frames instead of loading 10k+ bridges at once, reducing client crashes by 73%.",
      "Fixed character instability at high speeds by creating dedicated hitboxes for bridges and disabling the FallingDown state on the Humanoid.",
      "Content expansion and QOL improvements.",
    ],
    robloxUrl: "https://www.roblox.com/games/135787657971346/1-Speed-Bridge-Building",
  },
  {
    slug: "brainrot-bounties",
    title: "Brainrot Bounties (End-to-end Ownership)",
    summary: "Gameplay engineering.",
    details: [
      "Programmed solo from scratch.",
      "Created a satisfying combat system with great feedback and smooth flow.",
      "You gotta check this one out for yourself ;)"
    ],
    robloxUrl: "https://www.roblox.com/games/139701287827416/Brainrot-Bounties",
  },
  {
    slug: "shoot-a-brainrot",
    title: "Shoot a Brainrot (Collaboration)",
    summary: "Identifying workflow bottlenecks and implementing a simple but effective solution.",
    details: [
      "Tweaked the constructor function to apply rotation properties to align orientation, which sped up content updates and prevented ping-pong delays between modelers and scripters.",
      "Content expansion."
    ],
    robloxUrl: "https://www.roblox.com/games/78949013360566/Shoot-a-Brainrot",
  },
];