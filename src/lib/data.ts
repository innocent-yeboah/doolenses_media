import type { PortfolioItem, Service, TeamMember } from "@/types";
import { STUDIO_PORTFOLIO, STUDIO_SERVICES, STUDIO_TEAM } from "@/lib/constants";

/** Studio catalogue mapped for shared components */
export const SERVICES: Service[] = STUDIO_SERVICES.map((s, index) => ({
  id: s.id,
  name: s.title,
  slug: s.slug,
  shortLabel: s.items[0] ?? s.title,
  shortDescription: s.shortDescription,
  description: s.description,
  features: [...s.items],
  imageUrl: s.imageUrl,
  icon: s.icon,
  orderIndex: index + 1,
}));

export const PORTFOLIO: PortfolioItem[] = STUDIO_PORTFOLIO.map((p) => ({
  id: p.id,
  title: p.title,
  category: p.category,
  description: p.description,
  clientName: "Doolenses Studio",
  location: "Accra, Ghana",
  imageUrl: p.imageUrl,
  eventDate: "2025-01-01",
  featured: p.featured,
}));

export const TEAM: TeamMember[] = STUDIO_TEAM.map((m) => ({ ...m }));

export function getPortfolioCategories(): string[] {
  return ["All", ...Array.from(new Set(PORTFOLIO.map((p) => p.category)))];
}

export function getFeaturedPortfolio(limit = 6): PortfolioItem[] {
  const featured = PORTFOLIO.filter((p) => p.featured);
  const rest = PORTFOLIO.filter((p) => !p.featured);
  return [...featured, ...rest].slice(0, limit);
}
