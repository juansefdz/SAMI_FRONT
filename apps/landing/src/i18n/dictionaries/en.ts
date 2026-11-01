import type { Dictionary } from "./es";

const en: Dictionary = {
  meta: {
    title: "SAMI · Immediate Medical Ambulatory Service",
    description:
      "Request an ambulance in seconds and track it in real time to the right hospital. 24/7 emergency care in Medellín.",
    ogTitle: "SAMI · Your ambulance, one click away",
  },
  nav: {
    howItWorks: "How it works",
    services: "Services",
    audiences: "Who it's for",
    about: "About",
    coverage: "Coverage",
    contact: "Contact",
    login: "Log in",
    cta: "Request ambulance",
    call: "Call",
    faq: "FAQ",
    menu: "Menu",
    close: "Close",
  },
  hero: {
    eyebrow: "24/7 care · Medellín",
    titleLead: "Your ambulance,",
    titleAccent: "one click away.",
    description:
      "Request medical help with your location, follow the unit on the map and reach the right hospital. No endless calls, no guessing.",
    primary: "Request ambulance",
    secondary: "No account, in seconds",
    hotline: "Life-threatening emergency: also call 123",
    call: "Call",
    imageAlt: "Ambulance beacon flashing at night",
  },
  tracking: {
    live: "Live tracking",
    unit: "Unit",
    eta: "Arrives in",
    hospital: "Assigned hospital",
    level: "Complexity level III",
    note: "Illustrative view",
  },
  marquee: ["24/7 care", "Basic ambulance BLS", "Advanced ambulance ALS", "Scheduled transfers", "Live GPS", "Hotline 123"],
  story: {
    kicker: "How it works",
    title: "One service, start to finish",
    steps: [
      { label: "Request", title: "Ask for help wherever you are", text: "Your GPS location, description and severity from 1 to 5 reach dispatch in seconds.", meta: "Patient · Cl. 10 #43A-30" },
      { label: "Dispatch", title: "We assign the right unit", text: "The center picks the available ambulance and the destination hospital based on the case.", meta: "SAM-217 · ALS assigned" },
      { label: "En route", title: "Watch it approach live", text: "The crew reports its position and you see the estimated arrival time update.", meta: "Arrives in" },
      { label: "Hospital", title: "You reach the right place", text: "The unit takes you to the assigned hospital while the paramedic records the care given.", meta: "General Hospital · Level III" },
    ],
  },
  services: {
    kicker: "Services",
    title: "The right unit for every case",
    items: [
      { tag: "ALS", title: "Advanced ambulance", text: "Advanced life support with staff and equipment for critical patients." },
      { tag: "BLS", title: "Basic ambulance", text: "Basic life support for low and medium complexity emergencies." },
      { tag: "Scheduled", title: "Transfers", text: "Between home, clinics and hospitals, at an agreed time." },
      { tag: "GPS · 10 s", title: "Tracking", text: "The crew reports its position live from the onboard terminal." },
    ],
  },
  unit: {
    kicker: "The unit",
    title: "Equipped ambulances, connected crews",
    specs: ["Basic and advanced life support", "Driver + paramedic", "GPS reported every 10 s", "Digital patient record"],
  },
  roles: {
    kicker: "One platform, three views",
    title: "Everyone sees what they need",
    items: [
      { role: "Client", title: "Request and track your ambulance", text: "One-tap location, severity, live map and ETA." },
      { role: "Dispatch", title: "Coordinate the whole fleet", text: "Inbound services, ambulance and hospital assignment, status of every unit." },
      { role: "Crew", title: "Onboard terminal", text: "Android/iOS app: current service, navigation, live GPS and patient record." },
    ],
    mock: { request: "Request ambulance", severity: "Severity", inbound: "Inbound", assign: "Assign", start: "Start service", live: "Live GPS" },
  },
  audiences: {
    kicker: "Who it's for",
    title: "Built for everyone involved",
    items: [
      { title: "Individuals and families", text: "Fast, reliable help when you need it most." },
      { title: "Companies and insurers", text: "Better medical care for employees and policyholders." },
      { title: "Emergency services", text: "Tools to coordinate fleet, crews and dispatch." },
      { title: "Hospitals and clinics", text: "Efficient referrals and patients arriving at the right place." },
    ],
  },
  about: {
    kicker: "About us",
    title: "Fast response, human care",
    vision: "Vision",
    visionText:
      "To revolutionize emergency response through technology, delivering speed and safety, leading the sector with constant innovation.",
    mission: "Mission",
    missionText:
      "Provide agile, personalized emergency medical solutions, ensuring customer trust through advanced technology and exceptional care.",
    team: "Founding team",
  },
  contact: {
    kicker: "Partnerships",
    title: "Bring SAMI to your organization",
    text: "Companies, insurers and healthcare institutions: write to us and we'll show you the platform.",
    button: "Send email",
    copy: "Copy email",
    copied: "Copied",
  },
  coverage: {
    kicker: "Coverage",
    title: "Where we operate",
    text: "Our units currently operate in these municipalities of the Aburrá Valley.",
    river: "Medellín River",
    active: "In service",
    missing: "Not seeing your town? Write to us",
  },
  trust: {
    kicker: "Backing",
    title: "Who trusts SAMI",
    partners: "Partners",
    credentials: "Accreditation",
  },
  app: {
    kicker: "Mobile app",
    title: "SAMI on your phone",
    text: "Request help with one tap and track the ambulance from the Android and iOS app. Crews use the same app as their onboard terminal.",
    available: "Available on",
    soon: "Coming soon",
    ios: "App Store",
    android: "Google Play",
  },
  faq: {
    kicker: "FAQ",
    title: "What people ask us most",
    items: [
      { q: "Do I need an account to request an ambulance?", a: "No. You can request one with just your name, phone and location. Afterwards, if you like, you can save the account with an email and password to see your history." },
      { q: "When should I call 123?", a: "If there is an immediate risk to life (the person does not respond, is not breathing, has severe bleeding or strong chest pain), also call the 123 emergency line." },
      { q: "What is the difference between a BLS and an ALS ambulance?", a: "BLS (basic life support) handles low and medium complexity cases. ALS (advanced life support) carries staff and equipment for critical patients." },
      { q: "How do I track the ambulance?", a: "Once you request the service you see a map with the position reported by the crew and the estimated arrival time, updated live." },
      { q: "How much does it cost and does my insurance cover it?", a: "It depends on the type of service and your coverage. Write to us and we will guide you before you need it." },
      { q: "Which areas do you cover?", a: "Check the coverage section. If your town is not listed, write to us to know when we will get there." },
    ],
  },
  footer: {
    rights: "All rights reserved.",
    emergency: "In a life-threatening emergency also call 123.",
    platform: "Go to the platform",
  },
};

export default en;
