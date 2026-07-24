export type LeadStatus = "new" | "contacted" | "qualified" | "won" | "lost";

export type LeadSource =
  | "contact"
  | "quote"
  | "newsletter"
  | "portfolio_inquire"
  | "consultation";

export interface Lead {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  event_type: string | null;
  event_date: string | null;
  event_location: string | null;
  budget_range: string | null;
  message: string | null;
  source: LeadSource | string | null;
  status: LeadStatus | string;
  notes: string | null;
  contacted_at: string | null;
  production_needs?: string[] | null;
  event_duration?: string | null;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
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
