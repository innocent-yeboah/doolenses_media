export const COMPANY = {
  name: "Doolenses",
  legalName: "Doolenses Media",
  tagline: "Creative Work, For Creative People",
  subheadline: "Television Production and Advertising Excellence",
  agencyLine: "Television Production, and Advertising Agency",
  heroHeadline: "Capturing Moments, Creating Memories",
  heroTrust:
    "Experience exceptional video coverage and media production tailored for your events in Accra, Ghana.",
  aboutBlurb:
    "At Doolenses, we are passionate about capturing life's most important moments through high-quality video production and media coverage tailored to your needs.",
  /** Mobile — primary WhatsApp / click-to-call */
  phone: process.env.COMPANY_PHONE || "0556195581",
  phoneDisplay: "(+233) 055 619 5581",
  /** Office landline */
  officePhone: process.env.COMPANY_OFFICE_PHONE || "0303963158",
  officePhoneDisplay: "(+233) 030 396 3158",
  email: process.env.COMPANY_EMAIL || "doolenses@gmail.com",
  address: "House No. 13, Mahogany Close, Near Mary-Lucy Hospital, Awoshie, Accra, Ghana",
  addressShort: "House No. 13, Mahogany Close, Awoshie, Accra",
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
  whatsappMessage:
    "Hello, I am interested in professional production services for my event. Please let me know how we can proceed.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://doolenses.com",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const TRUST_STATS = [
  { numeric: 10, suffix: "+", label: "Years of Experience" },
  { numeric: 500, suffix: "+", label: "Events Covered" },
  { numeric: 100, suffix: "%", label: "Client Dedication" },
  { numeric: null, display: "Nationwide", suffix: "", label: "Coverage Across Ghana" },
] as const satisfies ReadonlyArray<{
  numeric: number | null;
  suffix: string;
  label: string;
  display?: string;
}>;

export const EVENT_TYPES = [
  "Weddings",
  "Funerals",
  "Webinars",
  "Conferences",
  "Musical Concerts",
  "Crusades",
  "Election Campaigns",
  "Educational Programs",
  "Award Ceremonies",
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
  { id: "multi_camera", label: "Multi-camera coverage" },
  { id: "sound", label: "Professional sound / audio" },
  { id: "lighting", label: "Lighting design" },
  { id: "live_streaming", label: "Live streaming" },
  { id: "editing", label: "Post-production editing" },
  { id: "drone", label: "Aerial / drone footage" },
  { id: "photography", label: "Still photography" },
  { id: "led_screens", label: "LED screens / display" },
] as const;

export const WHY_CHOOSE = [
  {
    title: "Professional Production Team",
    description:
      "Seasoned directors, camera operators, and editors delivering broadcast-quality storytelling.",
  },
  {
    title: "State-of-the-Art Equipment",
    description:
      "Cinema cameras, pro audio, lighting, and streaming kits ready for Accra venues and outdoor sets.",
  },
  {
    title: "Creative Excellence",
    description:
      "Cinematic narratives that elevate brands, celebrations, and campaigns — creative work for creative people.",
  },
  {
    title: "Reliable Delivery",
    description:
      "Clear timelines, disciplined crews, and polished deliverables from first call to final cut.",
  },
] as const;

/** Munson-style capability meters for the about block */
export const CAPABILITY_SKILLS = [
  { label: "Cinematic Events", percent: 96 },
  { label: "Live Streaming", percent: 90 },
  { label: "Commercial Films", percent: 88 },
  { label: "Post-Production", percent: 94 },
] as const;

/** Munson-style 3-step process */
export const PRODUCTION_PROCESS = [
  {
    title: "Concept",
    description:
      "We listen, storyboard, and plan every camera, cue, and deliverable around your event vision.",
  },
  {
    title: "Production",
    description:
      "On set with disciplined crews, cinema cameras, and lighting that makes every moment broadcast-ready.",
  },
  {
    title: "Presentation",
    description:
      "Polished edits, colour, and delivery formats your audience will watch again and again.",
  },
] as const;

/** Light journal cards for Munson “Latest Blog” rhythm (uses existing stills) */
export const HOME_JOURNAL = [
  {
    title: "Behind the lens at Labadi",
    date: "14 Jun, 2025",
    href: "/portfolio",
    imageUrl: "/services/weddings.jpg",
  },
  {
    title: "Staging the Ghana CEO Summit",
    date: "22 Sep, 2025",
    href: "/services#conferences",
    imageUrl: "/services/conferences.jpg",
  },
  {
    title: "Night shoots & campaign craft",
    date: "12 Oct, 2024",
    href: "/services#election-campaigns",
    imageUrl: "/services/election-campaigns.jpg",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Ama Serwaa",
    role: "Bride, Accra Wedding",
    quote:
      "Doolenses captured our wedding with elegance. Every frame felt cinematic — our families still watch the film months later.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    name: "Kwame Mensah",
    role: "Conference Director",
    quote:
      "From multi-camera coverage to live streaming, the team executed flawlessly. Sponsors were impressed with the production quality.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    name: "Pastor Emmanuel Osei",
    role: "Crusade Organizer",
    quote:
      "They handled a large outdoor crusade with professionalism. Sound, lighting, and cameras were perfectly coordinated.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
  },
] as const;
