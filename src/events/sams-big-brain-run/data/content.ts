export interface RunNavLink {
  label: string;
  id: string;
}

export interface RunStat {
  value: string;
  label: string;
}

export interface RunTier {
  eyebrow: string;
  title: string;
  description: string;
  featured?: boolean;
}

export const runNavLinks: RunNavLink[] = [
  { label: "About", id: "about" },
  { label: "Partner", id: "partner" },
  { label: "Tiers", id: "tiers" },
  { label: "Story", id: "story" },
  { label: "Contact", id: "contact" },
];

export const runPartnerNames = ["Partner one", "Partner two", "Partner three", "Partner four"];

export const runStats: RunStat[] = [
  { value: "25", label: "Days placeholder" },
  { value: "1,300km", label: "Distance placeholder" },
  { value: "$100k", label: "Goal placeholder" },
];

export const runTiers: RunTier[] = [
  { eyebrow: "Tier 01", title: "Trailhead", description: "Entry partner placeholder" },
  { eyebrow: "Tier 02", title: "Ridge Line", description: "Core partner placeholder", featured: true },
  { eyebrow: "Tier 03", title: "Summit", description: "Lead partner placeholder" },
];
