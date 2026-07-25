import type { PortfolioItem, Service, TeamMember } from "@/types";

/** Static catalogue — CLIENT: replace imageUrl values with real Doolenses photography */
export const SERVICES: Service[] = [
  {
    id: "1",
    name: "Weddings",
    slug: "weddings",
    shortLabel: "Cinematic coverage",
    shortDescription: "Cinematic wedding films that preserve every vow and celebration.",
    description:
      "From intimate ceremonies to grand receptions, our wedding team captures emotion and elegance with multi-camera coverage, refined storytelling, and polished highlight films.",
    features: [
      "Multi-camera ceremony & reception coverage",
      "Cinematic highlight film & full-length edit",
      "Drone & detail photography packages",
      "Same-day teaser options available",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
    icon: "Heart",
    orderIndex: 1,
  },
  {
    id: "2",
    name: "Funerals",
    slug: "funerals",
    shortLabel: "Respectful memorials",
    shortDescription: "Dignified memorial coverage that honours lives with care.",
    description:
      "We document farewell services with sensitivity — live streaming for distant relatives, tasteful highlight reels, and archival recordings that celebrate a life well lived.",
    features: [
      "Discreet multi-camera coverage",
      "Live streaming for remote family",
      "Memorial highlight films",
      "Full archival recordings",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
    icon: "Flower2",
    orderIndex: 2,
  },
  {
    id: "3",
    name: "Webinars",
    slug: "webinars",
    shortLabel: "Broadcast virtual",
    shortDescription: "Broadcast-quality virtual events that keep audiences engaged.",
    description:
      "Host polished webinars with professional switching, graphics, and streaming infrastructure for brands, educators, and organisations.",
    features: [
      "Multi-source switching & graphics",
      "Platform streaming (Zoom, YouTube, LinkedIn)",
      "On-site or remote production crews",
      "Recording & post-event edits",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=1200&q=80",
    icon: "MonitorPlay",
    orderIndex: 3,
  },
  {
    id: "4",
    name: "Conferences",
    slug: "conferences",
    shortLabel: "Full-scale stages",
    shortDescription: "Full-scale conference production — stages, screens, coverage.",
    description:
      "From keynote stages to breakout sessions, we deliver multi-camera coverage, IMAG, live streaming, and highlight packages that amplify your conference brand.",
    features: [
      "Stage, IMAG & LED screen coordination",
      "Multi-camera keynote coverage",
      "Live streaming & hybrid setups",
      "Speaker & session highlight edits",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
    icon: "Users",
    orderIndex: 4,
  },
  {
    id: "5",
    name: "Musical Concerts",
    slug: "musical-concerts",
    shortLabel: "Dynamic energy",
    shortDescription: "Dynamic concert films that capture energy and performance.",
    description:
      "Fast camera work, stage lighting sync, and edits that feel as alive as the night — for artists, festivals, and promoters.",
    features: [
      "Dynamic multi-camera concert coverage",
      "Stage lighting & audio coordination",
      "Artist & crowd cinematic packages",
      "Promo cuts for social & broadcast",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80",
    icon: "Music",
    orderIndex: 5,
  },
  {
    id: "6",
    name: "Crusades",
    slug: "crusades",
    shortLabel: "Faith at scale",
    shortDescription: "Large-scale faith event production with clarity and reach.",
    description:
      "Outdoor and indoor crusade production with robust audio, lighting, wide-angle coverage, and live streaming for congregations near and far.",
    features: [
      "Large-venue camera & audio systems",
      "Outdoor production logistics",
      "Live streaming to global audiences",
      "Message & worship highlight packages",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1511632765486-a01980e36a55?w=1200&q=80",
    icon: "Church",
    orderIndex: 6,
  },
  {
    id: "7",
    name: "Election Campaigns",
    slug: "election-campaigns",
    shortLabel: "Campaign impact",
    shortDescription: "Campaign films and rally coverage that communicate with impact.",
    description:
      "Strategic campaign production — manifesto films, rally coverage, town halls, and social content engineered for clarity and engagement.",
    features: [
      "Manifesto & candidate films",
      "Rally & town hall coverage",
      "Rapid social content turnaround",
      "Nationwide production capability",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1494178270170-e99d64a9b3a0?w=1200&q=80",
    icon: "Vote",
    orderIndex: 7,
  },
  {
    id: "8",
    name: "Educational Programs",
    slug: "educational-programs",
    shortLabel: "Clear learning",
    shortDescription: "Institutional video built for clarity and retention.",
    description:
      "From school ceremonies to corporate learning series, we produce educational content that informs, inspires, and represents institutions with polish.",
    features: [
      "Institutional & graduation coverage",
      "Training & e-learning series",
      "Documentary-style programme films",
      "Accessible delivery formats",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80",
    icon: "GraduationCap",
    orderIndex: 8,
  },
  {
    id: "9",
    name: "Award Ceremonies",
    slug: "award-ceremonies",
    shortLabel: "Red-carpet polish",
    shortDescription: "Red-carpet production that makes every moment prestigious.",
    description:
      "Award nights demand precision timing and glamorous visuals. We deliver stage coverage, winner packages, red-carpet content, and event films.",
    features: [
      "Red carpet & stage coverage",
      "Winner announcement packages",
      "Live IMAG & streaming",
      "Highlight films for sponsors & press",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80",
    icon: "Trophy",
    orderIndex: 9,
  },
];

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: "p1",
    title: "Garden Wedding at Labadi",
    category: "Weddings",
    description: "Full cinematic wedding film with drone and evening reception coverage.",
    clientName: "Private Client",
    location: "Accra, Ghana",
    imageUrl:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80",
    eventDate: "2025-06-14",
    featured: true,
  },
  {
    id: "p2",
    title: "West Africa FinTech Summit",
    category: "Conferences",
    description: "Three-day conference with IMAG, live stream, and session edits.",
    clientName: "FinTech Alliance GH",
    location: "Accra International Conference Centre",
    imageUrl:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80",
    eventDate: "2025-09-22",
    featured: true,
  },
  {
    id: "p3",
    title: "Night of Glory Concert",
    category: "Musical Concerts",
    description: "Arena concert multi-camera package with artist promo cuts.",
    clientName: "Glory Sounds",
    location: "Accra Sports Stadium",
    imageUrl:
      "https://images.unsplash.com/photo-1459749411175-04bf529e3b0e?w=1200&q=80",
    eventDate: "2025-11-08",
    featured: true,
  },
  {
    id: "p4",
    title: "National Youth Crusade",
    category: "Crusades",
    description: "Outdoor crusade with live stream and worship highlights.",
    clientName: "Faith Network",
    location: "Kumasi, Ghana",
    imageUrl:
      "https://images.unsplash.com/photo-1511632765486-a01980e36a55?w=1200&q=80",
    eventDate: "2025-04-19",
    featured: false,
  },
  {
    id: "p5",
    title: "Excellence Awards Night",
    category: "Award Ceremonies",
    description: "Red-carpet and stage production for annual industry awards.",
    clientName: "Creative Guild Awards",
    location: "Accra, Ghana",
    imageUrl:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80",
    eventDate: "2025-12-05",
    featured: true,
  },
  {
    id: "p6",
    title: "Campaign Launch Rally",
    category: "Election Campaigns",
    description: "Rally coverage and manifesto film for regional campaign launch.",
    clientName: "Confidential Client",
    location: "Pokuase, Accra",
    imageUrl:
      "https://images.unsplash.com/photo-1494178270170-e99d64a9b3a0?w=1200&q=80",
    eventDate: "2024-10-12",
    featured: false,
  },
  {
    id: "p7",
    title: "University Graduation Series",
    category: "Educational Programs",
    description: "Multi-day graduation coverage with institutional highlight film.",
    clientName: "Private University",
    location: "Accra, Ghana",
    imageUrl:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80",
    eventDate: "2025-07-18",
    featured: false,
  },
  {
    id: "p8",
    title: "Executive Leadership Webinar",
    category: "Webinars",
    description: "Hybrid webinar production with graphics package and recording.",
    clientName: "Leadership Institute",
    location: "Studio — Accra",
    imageUrl:
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&q=80",
    eventDate: "2025-03-03",
    featured: false,
  },
];

export const TEAM: TeamMember[] = [
  {
    name: "Creative Director",
    role: "Lead Director",
    bio: "Shapes every production with a cinematic eye and client-first discipline.",
    imageUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80",
  },
  {
    name: "Production Manager",
    role: "Operations Lead",
    bio: "Coordinates crews, gear, and timelines so every shoot runs with precision.",
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
  },
  {
    name: "Lead Camera Operator",
    role: "Cinematography",
    bio: "Captures decisive moments with broadcast-ready framing and movement.",
    imageUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80",
  },
  {
    name: "Post-Production Editor",
    role: "Editing & Colour",
    bio: "Transforms raw footage into polished films with narrative clarity.",
    imageUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80",
  },
];

export function getPortfolioCategories(): string[] {
  return ["All", ...Array.from(new Set(PORTFOLIO.map((p) => p.category)))];
}

export function getFeaturedPortfolio(limit = 8): PortfolioItem[] {
  const featured = PORTFOLIO.filter((p) => p.featured);
  const rest = PORTFOLIO.filter((p) => !p.featured);
  return [...featured, ...rest].slice(0, limit);
}
