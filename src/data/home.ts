import type { LucideIcon } from "lucide-react";
import {
  Factory,
  Globe2,
  Layers3,
  ShieldCheck,
  Settings2,
  Truck,
} from "lucide-react";

export type Capability = {
  step: string;
  title: string;
  text: string;
  icon: LucideIcon;
};

export type Industry = {
  id: string;
  name: string;
  description: string;
  image?: string;
  imagePosition?: string;
  note?: string;
};

export type DeliveryStep = {
  step: string;
  title: string;
  text: string;
};

export type ExperienceItem = {
  title: string;
  location: string;
  scope: string;
  note: string;
};

export const brandName = "Novertra Industrial";
export const brandTagline = "Industrial Project Development & Delivery";
export const brandClaim = "From Industrial Vision to Operational Reality";
export const brandMission = "We Build the Industries That Build Nations.";
export const brandOperations = "Connected. Structured. Delivered.";

export const trustPoints = [
  "Nearly Two Decades in Africa",
  "Industrial Project Development",
  "Türkiye-Africa Supply Network",
  "Turnkey Delivery Capability",
];

export const capabilities: Capability[] = [
  {
    step: "01",
    title: "Feasibility & Project Structuring",
    text: "We review the opportunity, define the project basis and shape the delivery path before capital is committed.",
    icon: Globe2,
  },
  {
    step: "02",
    title: "Engineering & Factory Design",
    text: "Process layouts, utilities, buildings and operational flows are aligned around the intended production system.",
    icon: Settings2,
  },
  {
    step: "03",
    title: "Machinery & Production Lines",
    text: "We compare industrial lines, equipment packages and technical fit for the target capacity and operating model.",
    icon: Factory,
  },
  {
    step: "04",
    title: "Civil Construction & Utilities",
    text: "Foundations, structures, power, water and industrial support infrastructure are coordinated as one scope.",
    icon: Layers3,
  },
  {
    step: "05",
    title: "Installation & Commissioning",
    text: "Procurement, delivery, installation and start-up support are sequenced to reduce project risk.",
    icon: Truck,
  },
  {
    step: "06",
    title: "Operational Readiness",
    text: "Handover, documentation, team preparation and early operating support complete the delivery chain.",
    icon: ShieldCheck,
  },
];

export const industries: Industry[] = [
  {
    id: "infrastructure",
    name: "Infrastructure",
    description: "Transport corridors, civil works, utility networks and industrial access infrastructure.",
    image: "/assets/optimized/infrastructure.webp",
    imagePosition: "center center",
  },
  {
    id: "energy",
    name: "Energy",
    description: "Conventional, renewable and hybrid energy systems supporting industrial production and national infrastructure.",
    image: "/assets/optimized/energy.webp",
    imagePosition: "center center",
  },
  {
    id: "agro-industry",
    name: "Agro-Industry",
    description: "Integrated agricultural production, storage, processing, irrigation and rural industrial development.",
    image: "/assets/optimized/agro-industry.webp",
    imagePosition: "center center",
  },
  {
    id: "mining-processing",
    name: "Mining & Processing",
    description: "Material handling, mineral processing, recovery systems and supporting industrial infrastructure.",
    image: "/assets/optimized/mining-processing.webp",
    imagePosition: "center center",
  },
  {
    id: "industrial-manufacturing",
    name: "Industrial & Manufacturing",
    description: "Production systems, modular factories, assembly lines and scalable manufacturing environments.",
    image: "/assets/optimized/industrial-manufacturing.webp",
    imagePosition: "center right",
  },
  {
    id: "strategic-facilities",
    name: "Strategic Facilities",
    description: "Mission-critical, secure and institutional facilities designed for operational continuity.",
    image: "/assets/optimized/strategic-facilities.webp",
    imagePosition: "center center",
  },
  {
    id: "textile-manufacturing",
    name: "Textile Manufacturing",
    description: "Spinning, weaving, factory rehabilitation and integrated textile production systems.",
    image: "/assets/optimized/textile-manufacturing.webp",
    imagePosition: "center center",
  },
  {
    id: "food-processing-cold-chain",
    name: "Food Processing & Cold Chain",
    description: "Processing, packaging, storage, refrigeration and temperature-controlled logistics.",
    image: "/assets/optimized/food-processing-cold-chain.webp",
    imagePosition: "center center",
  },
  {
    id: "poultry-production-processing",
    name: "Poultry Production & Processing",
    description: "Integrated poultry farming, feed systems, processing, packaging and cold-chain infrastructure.",
    image: "/assets/optimized/poultry-production-processing.webp",
    imagePosition: "center center",
  },
  {
    id: "cattle-beef-processing",
    name: "Cattle & Beef Processing",
    description: "Livestock production, feed systems, modern abattoirs, meat processing and refrigerated distribution.",
    note: "AMBIGUOUS_ASSET",
  },
  {
    id: "small-factories-industrial-park",
    name: "Small Factories & Industrial Parks",
    description: "Scalable industrial units and coordinated production campuses for local manufacturing development.",
    note: "AMBIGUOUS_ASSET",
  },
  {
    id: "tractor-assembly",
    name: "Tractor Assembly",
    description: "Local tractor assembly, production-line development, testing and operational training.",
    note: "AMBIGUOUS_ASSET",
  },
  {
    id: "agricultural-equipment-manufacturing",
    name: "Agricultural Equipment Manufacturing",
    description: "Manufacturing of implements, trailers, seeders, cultivators and agricultural machinery systems.",
    note: "AMBIGUOUS_ASSET",
  },
];

export const deliveryModel: DeliveryStep[] = [
  { step: "01", title: "Opportunity Assessment", text: "Country, sector, land and operating need are reviewed." },
  { step: "02", title: "Feasibility & Structuring", text: "The project basis, delivery scope and commercial path are defined." },
  { step: "03", title: "Engineering & Configuration", text: "Technical design, layout and industrial system choices are aligned." },
  { step: "04", title: "Procurement & Manufacturing", text: "Equipment, fabrication and vendor coordination move in sequence." },
  { step: "05", title: "Construction & Installation", text: "Civil works, utility tie-ins and installation are delivered on site." },
  { step: "06", title: "Commissioning & Handover", text: "Testing, handover and operational readiness close the delivery loop." },
  { step: "07", title: "Operational Support", text: "Early operating support protects the transition into production." },
];

export const experience: ExperienceItem[] = [
  {
    title: "Hasahisa Textile Complex",
    location: "Sudan",
    scope: "Construction, rehabilitation and industrial facility works.",
    note: "Bewell Global / Deltayapı project experience",
  },
  {
    title: "Additional Textile Facilities",
    location: "Kosti, Shendi and other Sudan locations",
    scope: "Factory renovation and electro-mechanical works.",
    note: "Bewell Global / Deltayapı project experience",
  },
  {
    title: "150 MW Mobile Power Project",
    location: "Khartoum, Sudan",
    scope: "Industrial construction and power infrastructure implementation experience.",
    note: "Bewell Global / Deltayapı project experience",
  },
  {
    title: "Mining Facility Installation",
    location: "Northern Sudan",
    scope: "Construction and machinery installation for gold mining operations.",
    note: "Bewell Global / Deltayapı project experience",
  },
  {
    title: "Industrial & Public Projects",
    location: "Sudan",
    scope: "Industrial buildings, administrative facilities, parks and municipal works.",
    note: "Bewell Global / Deltayapı project experience",
  },
];

export const technologyPoints = [
  "Early Feasibility",
  "Production Line Comparison",
  "Cost Scenario Development",
  "Supplier Evaluation",
  "Project Risk Review",
  "Proposal & Document Preparation",
];

export const supplyClaims = [
  "Project development and field execution in Africa.",
  "Engineering, machinery and production capability from Türkiye.",
  "Regional sourcing and local delivery partnerships.",
];

export const projectFormFields = [
  "Full Name",
  "Company / Institution",
  "Country",
  "Email",
  "Phone / WhatsApp",
  "Product to Be Manufactured",
  "Target Capacity",
  "Available Land",
  "Raw Material Availability",
  "Budget Range",
  "Financing Status",
  "Desired Timeline",
  "Additional Notes",
  "File Upload placeholder",
  "Request a Meeting checkbox",
];

export const financingOptions = [
  "Own Funding Available",
  "Bank Financing in Progress",
  "Investor Required",
  "Government-Backed Project",
  "Financing Not Yet Defined",
];

export const navigationLinks = [
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Industries", href: "/#industries" },
  { label: "Delivery Model", href: "/#delivery-model" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Insights", href: "/#insights" },
];

export const secondaryLinks = [
  { label: "Factory Configurator", href: "/configure" },
];

export const heroBullets = [
  "Industrial project development and delivery.",
  "Engineering-led execution for Africa and beyond.",
  "Operational reality starts with structured opportunity review.",
];

export const heroButtons = [
  { label: "Start a Factory Project", href: "#start-project", variant: "primary" },
  { label: "Explore Our Capabilities", href: "#capabilities", variant: "secondary" },
] as const;

export const footerLinks = [
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Industries", href: "/#industries" },
  { label: "Delivery Model", href: "/#delivery-model" },
  { label: "Experience", href: "/#experience" },
  { label: "Start a Project", href: "/#start-project" },
  { label: "Factory Configurator", href: "/configure" },
];
