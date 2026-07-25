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
    imageUrl: "/services/weddings.jpg",
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
    imageUrl: "/services/funerals.jpg",
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
    imageUrl: "/services/webinars.jpg",
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
    imageUrl: "/services/conferences.jpg",
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
    imageUrl: "/services/musical-concerts.jpg",
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
    imageUrl: "/services/crusades.jpg",
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
    imageUrl: "/services/election-campaigns.jpg",
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
    imageUrl: "/services/educational-programs.jpg",
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
    imageUrl: "/services/award-ceremonies.jpg",
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
    imageUrl: "/services/weddings.jpg",
    eventDate: "2025-06-14",
    featured: true,
  },
  {
    id: "p2",
    title: "8th Ghana CEO Summit",
    category: "Conferences",
    description: "Full conference coverage with stage IMAG, multi-camera, and jib production.",
    clientName: "Ghana CEO Summit",
    location: "Accra, Ghana",
    // Real Doolenses conference production still
    imageUrl: "/services/conferences.jpg",
    eventDate: "2025-09-22",
    featured: true,
  },
  {
    id: "p3",
    title: "Hip Hop Africa Session",
    category: "Musical Concerts",
    description: "Creative music culture coverage with cinematic artist and location packages.",
    clientName: "Hip Hop Africa",
    location: "Accra, Ghana",
    imageUrl: "/services/musical-concerts.jpg",
    eventDate: "2025-11-08",
    featured: true,
  },
  {
    id: "p4",
    title: "Worship & Crusade Coverage",
    category: "Crusades",
    description: "Indoor crusade production with stage lighting, multi-camera, and worship highlights.",
    clientName: "Faith Network",
    location: "Accra, Ghana",
    imageUrl: "/services/crusades.jpg",
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
    imageUrl: "/services/award-ceremonies.jpg",
    eventDate: "2025-12-05",
    featured: true,
  },
  {
    id: "p6",
    title: "Night Campaign Production",
    category: "Election Campaigns",
    description: "On-location campaign film production with lighting, crew, and multi-camera coverage.",
    clientName: "Confidential Client",
    location: "Accra, Ghana",
    imageUrl: "/services/election-campaigns.jpg",
    eventDate: "2024-10-12",
    featured: false,
  },
  {
    id: "p7",
    title: "Leadership Seminar Coverage",
    category: "Educational Programs",
    description: "Professional seminar production with multi-camera audience and stage coverage.",
    clientName: "Private Institution",
    location: "Accra, Ghana",
    imageUrl: "/services/educational-programs.jpg",
    eventDate: "2025-07-18",
    featured: false,
  },
  {
    id: "p8",
    title: "Live Broadcast Control",
    category: "Webinars",
    description: "Hybrid live streaming and multi-camera production from the media control desk.",
    clientName: "Event Client",
    location: "Accra, Ghana",
    imageUrl: "/services/webinars.jpg",
    eventDate: "2025-03-03",
    featured: false,
  },
];

export const TEAM: TeamMember[] = [
  {
    name: "Creative Director",
    role: "Lead Director",
    bio: "Shapes every production with a cinematic eye and client-first discipline.",
    imageUrl: "/images/team/creative-director.jpg",
  },
  {
    name: "Production Manager",
    role: "Operations Lead",
    bio: "Coordinates crews, gear, and timelines so every shoot runs with precision.",
    imageUrl: "/images/team/production-manager.jpg",
  },
  {
    name: "Lead Camera Operator",
    role: "Cinematography",
    bio: "Captures decisive moments with broadcast-ready framing and movement.",
    imageUrl: "/images/team/lead-camera-operator.jpg",
  },
  {
    name: "Post-Production Editor",
    role: "Editing & Colour",
    bio: "Transforms raw footage into polished films with narrative clarity.",
    imageUrl: "/images/team/post-production-editor.jpg",
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
