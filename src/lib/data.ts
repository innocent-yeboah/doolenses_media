import type { Service, TeamMember } from "@/types";
import { STUDIO_SERVICES, STUDIO_TEAM } from "@/lib/constants";

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

export const TEAM: TeamMember[] = STUDIO_TEAM.map((m) => ({ ...m }));
