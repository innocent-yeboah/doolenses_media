export type LeadStatus = "new" | "contacted" | "qualified" | "won" | "lost";

export type LeadSource =
  | "contact"
  | "quote"
  | "newsletter"
  | "portfolio_inquire"
  | "consultation";

export interface Service {
  id: string;
  name: string;
  slug: string;
  shortLabel: string;
  shortDescription: string;
  description: string;
  features: string[];
  imageUrl: string;
  icon: string;
  orderIndex: number;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  clientName: string;
  location: string;
  imageUrl: string;
  eventDate: string;
  featured: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}
