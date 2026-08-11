export const COMPANY = {
  name: "Doolenses",
  legalName: "Doolenses",
  tagline: "Creative work for creative peoples",
  subheadline: "Creative Studio",
  agencyLine:
    "Creative studio for graphic design, photography, videography, web design, printing, and fashion",
  heroHeadline: "We Are Doolenses!",
  heroTrust:
    "From the first sketch to the final pixel, we shape brands that feel unmistakable and built to perform across every screen and surface.",
  aboutBlurb:
    "We are the explorers, the dreamers, and the builders who guide your brand toward its next destination.",
  phone: process.env.COMPANY_PHONE || "0556195581",
  phoneDisplay: "(+233) 055 619 5581",
  officePhone: process.env.COMPANY_OFFICE_PHONE || "0303963158",
  officePhoneDisplay: "(+233) 030 396 3158",
  email: process.env.COMPANY_EMAIL || "doolenses@gmail.com",
  address: "House No. 13, Mahogany Close, Near Mary-Lucy Hospital, Awoshie, Accra, Ghana",
  addressShort: "Awoshie, Accra, Ghana",
  city: "Accra",
  country: "Ghana",
  mapsQuery: "House No. 13 Mahogany Close Near Mary-Lucy Hospital Awoshie Accra Ghana",
  hours: {
    weekdays: "Monday – Friday: 8:00 AM – 6:00 PM",
    saturday: "Saturday: 9:00 AM – 3:00 PM",
    sunday: "Sunday: By appointment",
  },
  social: {
    facebook: "https://facebook.com/doolenses",
    instagram: "https://www.instagram.com/doolenses/",
    youtube: "https://youtube.com/@doolenses",
    linkedin: "https://linkedin.com/company/doolenses",
  },
  whatsappMessage: "Hello Doolenses — I'd like to talk about a creative project.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://doolenses.com",
} as const;

export const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Explorer" },
] as const;

export const STUDIO_STATS = [
  { numeric: 250, suffix: "+", label: "Projects Completed" },
  { numeric: 180, suffix: "+", label: "Happy Clients" },
  { numeric: 10, suffix: "+", label: "Years of Experience" },
  { numeric: 6, suffix: "", label: "Creative Disciplines" },
] as const;

export const STUDIO_SERVICES = [
  {
    id: "graphic-design",
    title: "Graphic Design",
    slug: "graphic-design",
    shortDescription: "Identity systems and visuals that feel unmistakable.",
    description:
      "From logos to full brand guides, we craft design that carries your story across every surface.",
    items: ["Logo Design", "Brand Guide", "General Design"],
    icon: "Palette",
    imageUrl: "/services/graphic-design-hero.jpg",
  },
  {
    id: "photography",
    title: "Photography",
    slug: "photography",
    shortDescription: "Still frames with clarity, emotion, and polish.",
    description:
      "Weddings, birthdays, products, and corporate moments — captured with intention.",
    items: ["Wedding Shoot", "Birthday Shoot", "Product Shoot", "Corporate Shoot"],
    icon: "Camera",
    imageUrl: "/services/weddings.jpg",
  },
  {
    id: "videography",
    title: "Videography",
    slug: "videography",
    shortDescription: "Motion that holds attention and drives action.",
    description:
      "Music videos, documentaries, live streams, product films, and commercials.",
    items: ["Music Video", "Documentary", "Live Streaming", "Product Shoot", "Commercial"],
    icon: "Clapperboard",
    imageUrl: "/services/musical-concerts.jpg",
  },
  {
    id: "web-design",
    title: "Web Design",
    slug: "web-design",
    shortDescription: "Digital experiences built to perform.",
    description:
      "E-commerce, corporate sites, and mobile app interfaces designed for clarity and conversion.",
    items: ["E-commerce", "Corporate", "Mobile App"],
    icon: "Monitor",
    imageUrl: "/hero/slide-01-control-booth.jpg",
  },
  {
    id: "printing",
    title: "Printing",
    slug: "printing",
    shortDescription: "Tangible brand assets, finished with precision.",
    description:
      "T-shirts, large format, souvenirs, and general print production for campaigns and events.",
    items: ["T-Shirt", "Large Format", "Souvenir", "General Printing"],
    icon: "Printer",
    imageUrl: "/services/award-ceremonies.jpg",
  },
  {
    id: "fashion",
    title: "Fashion & Costume",
    slug: "fashion",
    shortDescription: "Wardrobe and costume craft for stage and street.",
    description:
      "Female and male dress design, shoes, and bags — style built for presence.",
    items: ["Female Dress", "Male Dresses", "Shoe", "Bags"],
    icon: "Shirt",
    imageUrl: "/hero/slide-02-studio-cyclorama.jpg",
  },
] as const;

export type StudioServiceSlug = (typeof STUDIO_SERVICES)[number]["slug"];

type ServiceWork = {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
};

/** Selected works for each discipline’s dedicated page. */
export const SERVICE_WORKS: Record<StudioServiceSlug, readonly ServiceWork[]> = {
  "graphic-design": [
    {
      id: "gd1",
      title: "Brand Identity System",
      category: "Logo & Brand Guide",
      description: "Full identity lockup, colour system, and application rules for a growing Accra brand.",
      imageUrl: "/services/graphic-design-poster.jpg",
    },
    {
      id: "gd2",
      title: "Campaign Visual Language",
      category: "Art Direction",
      description: "Poster and social system built for clear hierarchy and high impact on every screen.",
      imageUrl: "/about/about-slide-01-idea.jpg",
    },
    {
      id: "gd3",
      title: "Editorial Lookbook Layout",
      category: "Print Design",
      description: "Spread layouts and type pairing for a photographic studio presentation.",
      imageUrl: "/about/about-slide-02-photographic.jpg",
    },
    {
      id: "gd4",
      title: "Event Brand Suite",
      category: "Collateral",
      description: "Invitation, stage graphics, and programme design for a live production.",
      imageUrl: "/services/award-ceremonies.jpg",
    },
    {
      id: "gd5",
      title: "Product Packaging Story",
      category: "Packaging",
      description: "Label and carton system that carries the brand from shelf to unboxing.",
      imageUrl: "/services/educational-programs.jpg",
    },
    {
      id: "gd6",
      title: "Social Content System",
      category: "Digital Design",
      description: "Repeatable templates for campaigns, launches, and studio announcements.",
      imageUrl: "/hero/slide-01-music-video-set.jpg",
    },
  ],
  photography: [
    {
      id: "ph1",
      title: "Garden Wedding Stills",
      category: "Wedding Shoot",
      description: "Soft-light editorial frames for an outdoor Accra wedding day.",
      imageUrl: "/services/weddings.jpg",
    },
    {
      id: "ph2",
      title: "Corporate Portrait Session",
      category: "Corporate Shoot",
      description: "Clean headshots and environmental portraits for leadership teams.",
      imageUrl: "/about/about-slide-02-photographic.jpg",
    },
    {
      id: "ph3",
      title: "Product Catalogue Series",
      category: "Product Shoot",
      description: "Consistent lighting and composition for e-commerce and print catalogues.",
      imageUrl: "/services/educational-programs.jpg",
    },
    {
      id: "ph4",
      title: "Birthday Celebration Coverage",
      category: "Birthday Shoot",
      description: "Candid and posed moments that keep the energy of the room.",
      imageUrl: "/services/conferences.jpg",
    },
    {
      id: "ph5",
      title: "Studio Cyclorama Portraits",
      category: "Studio Shoot",
      description: "Controlled-light portraiture with a cinematic finish.",
      imageUrl: "/hero/slide-02-studio-cyclorama.jpg",
    },
    {
      id: "ph6",
      title: "Event Highlights Gallery",
      category: "Event Coverage",
      description: "Key moments from awards and live gatherings, edited for share and press.",
      imageUrl: "/services/award-ceremonies.jpg",
    },
  ],
  videography: [
    {
      id: "vd1",
      title: "Music Video Production",
      category: "Music Video",
      description: "Multi-camera music video with cinematic colour and performance energy.",
      imageUrl: "/services/musical-concerts.jpg",
    },
    {
      id: "vd2",
      title: "Live Set Documentation",
      category: "Live Streaming",
      description: "Broadcast-ready coverage from set with jib and monitor direction.",
      imageUrl: "/hero/slide-01-music-video-set.jpg",
    },
    {
      id: "vd3",
      title: "Documentary Short",
      category: "Documentary",
      description: "Story-led documentary film with intimate interviews and location B-roll.",
      imageUrl: "/services/crusades.jpg",
    },
    {
      id: "vd4",
      title: "Stadium Crew Film",
      category: "Commercial",
      description: "Production film capturing scale, crew craft, and live-event atmosphere.",
      imageUrl: "/hero/slide-05-stadium-crew.jpg",
    },
    {
      id: "vd5",
      title: "Pink Set Monitor Cut",
      category: "Product Film",
      description: "Stylised set piece with monitor playback and colour-led direction.",
      imageUrl: "/hero/slide-03-pink-set-monitor.jpg",
    },
    {
      id: "vd6",
      title: "Jib Operator Feature",
      category: "Behind the Scenes",
      description: "Craft-focused feature on camera movement and on-set precision.",
      imageUrl: "/hero/slide-04-jib-operator.jpg",
    },
  ],
  "web-design": [
    {
      id: "wd1",
      title: "Corporate Web Presence",
      category: "Corporate",
      description: "Clean architecture and UI system for a professional Accra business.",
      imageUrl: "/hero/slide-01-control-booth.jpg",
    },
    {
      id: "wd2",
      title: "Studio Landing Experience",
      category: "Marketing Site",
      description: "Conversion-led homepage with strong brand hierarchy and clear CTAs.",
      imageUrl: "/about/about-slide-01-idea.jpg",
    },
    {
      id: "wd3",
      title: "E-commerce Product Flow",
      category: "E-commerce",
      description: "Product listing and checkout UX designed for clarity and trust.",
      imageUrl: "/services/educational-programs.jpg",
    },
    {
      id: "wd4",
      title: "Event Registration Portal",
      category: "Web App",
      description: "Responsive registration experience for conferences and live programmes.",
      imageUrl: "/services/conferences.jpg",
    },
    {
      id: "wd5",
      title: "Mobile App Interface Kit",
      category: "Mobile App",
      description: "Component-ready mobile screens with accessible contrast and spacing.",
      imageUrl: "/hero/slide-03-pink-set-monitor.jpg",
    },
    {
      id: "wd6",
      title: "Campaign Microsite",
      category: "Campaign Site",
      description: "Short-form landing page for launches, with motion-ready layout blocks.",
      imageUrl: "/services/webinars.jpg",
    },
  ],
  printing: [
    {
      id: "pr1",
      title: "Campaign Print Suite",
      category: "Large Format",
      description: "Large-format and souvenir print for a live awards production.",
      imageUrl: "/services/award-ceremonies.jpg",
    },
    {
      id: "pr2",
      title: "Conference Brand Pack",
      category: "General Printing",
      description: "Badges, programmes, and stage print assets for multi-day events.",
      imageUrl: "/services/conferences.jpg",
    },
    {
      id: "pr3",
      title: "Merchandise Drop",
      category: "T-Shirt",
      description: "Apparel graphics and print finish for a studio merchandise release.",
      imageUrl: "/services/educational-programs.jpg",
    },
    {
      id: "pr4",
      title: "Souvenir Collection",
      category: "Souvenir",
      description: "Keep-sake print pieces designed for guests and press kits.",
      imageUrl: "/services/funerals.jpg",
    },
    {
      id: "pr5",
      title: "Outdoor Banner System",
      category: "Large Format",
      description: "Weather-ready banners with strong type and brand colour blocks.",
      imageUrl: "/hero/slide-05-stadium-crew.jpg",
    },
    {
      id: "pr6",
      title: "Election Campaign Print",
      category: "Campaign Print",
      description: "Poster and flyer set built for street visibility and message clarity.",
      imageUrl: "/services/election-campaigns.jpg",
    },
  ],
  fashion: [
    {
      id: "fs1",
      title: "Stage Costume Collection",
      category: "Costume",
      description: "Wardrobe direction and costume craft for performance and stage.",
      imageUrl: "/hero/slide-02-studio-cyclorama.jpg",
    },
    {
      id: "fs2",
      title: "Editorial Dress Series",
      category: "Female Dress",
      description: "Silhouette-led dress design for lookbook and runway presentation.",
      imageUrl: "/about/about-slide-02-photographic.jpg",
    },
    {
      id: "fs3",
      title: "Menswear Statement Looks",
      category: "Male Dresses",
      description: "Tailored stage and street looks with strong fabric and colour contrast.",
      imageUrl: "/hero/slide-06-beetle-crane.jpg",
    },
    {
      id: "fs4",
      title: "Accessory Capsule",
      category: "Bags",
      description: "Bag and accessory styling to complete the full costume story.",
      imageUrl: "/services/award-ceremonies.jpg",
    },
    {
      id: "fs5",
      title: "Footwear Direction",
      category: "Shoe",
      description: "Shoe selection and styling that anchors each look on camera.",
      imageUrl: "/hero/slide-03-pink-set-monitor.jpg",
    },
    {
      id: "fs6",
      title: "Live Performance Wardrobe",
      category: "Stage & Street",
      description: "Full wardrobe package for music and live production talent.",
      imageUrl: "/services/musical-concerts.jpg",
    },
  ],
};

/** Resolve Explorer / services link to each discipline’s dedicated page. */
export function getServiceHref(slug: string): string {
  return `/services/${slug}`;
}

export function getStudioService(slug: string) {
  return STUDIO_SERVICES.find((s) => s.slug === slug);
}

export const STUDIO_PORTFOLIO = [
  {
    id: "p1",
    title: "Brand Identity System",
    category: "Graphic Design",
    description: "Logo, guide, and applications for a growing Accra brand.",
    imageUrl: "/services/graphic-design-poster.jpg",
    featured: true,
  },
  {
    id: "p2",
    title: "Garden Wedding Film Stills",
    category: "Photography",
    description: "Editorial wedding photography with soft light and detail.",
    imageUrl: "/services/weddings.jpg",
    featured: true,
  },
  {
    id: "p3",
    title: "Music Video Production",
    category: "Videography",
    description: "Multi-camera music video with cinematic colour.",
    imageUrl: "/services/musical-concerts.jpg",
    featured: true,
  },
  {
    id: "p4",
    title: "Corporate Web Presence",
    category: "Web Design",
    description: "Clean corporate site architecture and UI system.",
    imageUrl: "/hero/slide-01-control-booth.jpg",
    featured: true,
  },
  {
    id: "p5",
    title: "Campaign Print Suite",
    category: "Printing",
    description: "Large-format and souvenir print for a live event.",
    imageUrl: "/services/award-ceremonies.jpg",
    featured: false,
  },
  {
    id: "p6",
    title: "Stage Costume Collection",
    category: "Fashion",
    description: "Costume and wardrobe direction for performance.",
    imageUrl: "/hero/slide-02-studio-cyclorama.jpg",
    featured: false,
  },
  {
    id: "p7",
    title: "Product Shoot Series",
    category: "Photography",
    description: "Clean product photography for e-commerce.",
    imageUrl: "/services/educational-programs.jpg",
    featured: false,
  },
  {
    id: "p8",
    title: "Documentary Coverage",
    category: "Videography",
    description: "Story-led documentary film and stills package.",
    imageUrl: "/services/crusades.jpg",
    featured: true,
  },
] as const;

export const STUDIO_TEAM = [
  {
    name: "Creative Director",
    role: "Lead Director",
    bio: "Shapes every project with a cinematic eye and client-first discipline.",
    imageUrl: "/images/team/creative-director.jpg",
  },
  {
    name: "Production Manager",
    role: "Operations Lead",
    bio: "Coordinates crews, timelines, and delivery with precision.",
    imageUrl: "/images/team/production-manager.jpg",
  },
  {
    name: "Lead Camera Operator",
    role: "Cinematography",
    bio: "Captures decisive frames with broadcast-ready movement.",
    imageUrl: "/images/team/lead-camera-operator.jpg",
  },
  {
    name: "Post-Production Editor",
    role: "Editing & Colour",
    bio: "Transforms raw footage into polished, narrative work.",
    imageUrl: "/images/team/post-production-editor.jpg",
  },
] as const;

export const STUDIO_VALUES = [
  {
    title: "Clarity",
    description: "Every idea is refined until the message is unmistakable.",
  },
  {
    title: "Craft",
    description: "We sweat the details — from type to lighting to finish.",
  },
  {
    title: "Collaboration",
    description: "Your vision leads; our team builds beside you.",
  },
] as const;

/** Kept for legacy quote/admin form enums */
export const EVENT_TYPES = [
  "Graphic Design",
  "Photography",
  "Videography",
  "Web Design",
  "Printing",
  "Fashion & Costume",
  "Other",
] as const;

export const BUDGET_RANGES = [
  "Under GHS 5,000",
  "GHS 5,000 – 15,000",
  "GHS 15,000 – 30,000",
  "GHS 30,000 – 50,000",
  "GHS 50,000+",
  "Prefer to discuss",
] as const;

export const PRODUCTION_NEEDS = [
  { id: "design", label: "Graphic design" },
  { id: "photo", label: "Photography" },
  { id: "video", label: "Videography" },
  { id: "web", label: "Web design" },
  { id: "print", label: "Printing" },
  { id: "fashion", label: "Fashion & costume" },
] as const;

export const TRUST_STATS = [
  { numeric: 250, suffix: "+", label: "Projects Completed" },
  { numeric: 180, suffix: "+", label: "Happy Clients" },
  { numeric: 10, suffix: "+", label: "Years of Experience" },
  { numeric: null, display: "6", suffix: "", label: "Creative Disciplines" },
] as const satisfies ReadonlyArray<{
  numeric: number | null;
  suffix: string;
  label: string;
  display?: string;
}>;
export const WHY_CHOOSE = STUDIO_VALUES;
export const CAPABILITY_SKILLS = [
  { label: "Graphic Design", percent: 94 },
  { label: "Photography", percent: 92 },
  { label: "Videography", percent: 96 },
  { label: "Web & Print", percent: 88 },
] as const;
export const PRODUCTION_PROCESS = [
  { title: "Concept", description: "We listen, sketch, and define the idea with clarity." },
  { title: "Craft", description: "Design, shoot, and build with disciplined creative focus." },
  { title: "Deliver", description: "Polished assets ready for every screen and surface." },
] as const;
export const HOME_JOURNAL = STUDIO_PORTFOLIO.slice(0, 3).map((p) => ({
  title: p.title,
  date: "Studio",
  href: "/services",
  imageUrl: p.imageUrl,
}));
export const TESTIMONIALS = [
  {
    name: "Ama Serwaa",
    role: "Brand Client",
    quote: "Doolenses shaped our identity with clarity and confidence.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
] as const;
