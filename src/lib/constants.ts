export const COMPANY = {
  name: "Doolenses",
  legalName: "Doolenses",
  tagline: "We craft bold ideas and visuals that truly work",
  subheadline: "Creative Studio",
  agencyLine: "Creative studio for design, photography, videography, web, print, and fashion",
  heroHeadline: "Doolenses",
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
  whatsappMessage:
    "Hello Doolenses — I'd like to talk about a creative project.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://doolenses.com",
} as const;

/** Single-page editorial nav */
export const NAV_LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
] as const;

export const STUDIO_SERVICES = [
  {
    id: "graphic-design",
    title: "Graphic Design",
    items: ["Logo Design", "Brand Guide", "General Design"],
  },
  {
    id: "photography",
    title: "Photography",
    items: ["Wedding Shoot", "Birthday Shoot", "Product Shoot", "Corporate Shoot"],
  },
  {
    id: "videography",
    title: "Videography",
    items: ["Music Video", "Documentary", "Live Streaming", "Product Shoot", "Commercial"],
  },
  {
    id: "web-design",
    title: "Web Design",
    items: ["E-commerce", "Corporate", "Mobile App"],
  },
  {
    id: "printing",
    title: "Printing",
    items: ["T-Shirt", "Large Format", "Souvenir", "General Printing"],
  },
  {
    id: "fashion",
    title: "Fashion & Costume",
    items: ["Female Dress", "Male Dresses", "Shoe", "Bags"],
  },
] as const;

/** Kept for admin / legacy pages that still import these symbols */
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
    description: "Seasoned creatives delivering work that performs.",
  },
  {
    title: "State-of-the-Art Equipment",
    description: "Tools ready for studio, stage, and street.",
  },
  {
    title: "Creative Excellence",
    description: "Bold ideas shaped into unmistakable brands.",
  },
  {
    title: "Reliable Delivery",
    description: "Clear timelines from first sketch to final pixel.",
  },
] as const;

export const CAPABILITY_SKILLS = [
  { label: "Design", percent: 96 },
  { label: "Photography", percent: 94 },
  { label: "Videography", percent: 92 },
  { label: "Web & Print", percent: 90 },
] as const;

export const PRODUCTION_PROCESS = [
  {
    title: "Concept",
    description: "We listen, sketch, and define the idea with clarity.",
  },
  {
    title: "Craft",
    description: "Design, shoot, and build with disciplined creative focus.",
  },
  {
    title: "Deliver",
    description: "Polished assets ready for every screen and surface.",
  },
] as const;

export const HOME_JOURNAL = [
  {
    title: "Brand systems that travel",
    date: "Studio",
    href: "/#work",
    imageUrl: "/hero/slide-01-music-video-set.jpg",
  },
  {
    title: "Frames that hold attention",
    date: "Studio",
    href: "/#work",
    imageUrl: "/hero/slide-02-studio-cyclorama.jpg",
  },
  {
    title: "Motion with intent",
    date: "Studio",
    href: "/#work",
    imageUrl: "/hero/slide-03-pink-set-monitor.jpg",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Ama Serwaa",
    role: "Brand Client",
    quote: "Doolenses shaped our identity with clarity and confidence.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    name: "Kwame Mensah",
    role: "Creative Director",
    quote: "From concept to delivery, every detail felt intentional.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    name: "Efua Mensah",
    role: "Founder",
    quote: "Bold ideas, quiet precision — exactly what we needed.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
  },
] as const;
