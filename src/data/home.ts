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
  key: string;
  title: string;
  description: string;
  image: string;
  imagePosition?: string;
  developmentAreas: string[];
  deliveryScope: string[];
  projectModels: string[];
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
    key: "infrastructure",
    title: "Infrastructure",
    description: "Industrial growth requires more than a production building. Novertra structures the supporting infrastructure that connects sites, utilities, logistics and operations.",
    image: "/assets/optimized/infrastructure.webp",
    imagePosition: "center center",
    developmentAreas: [
      "Industrial access roads and transport corridors",
      "Utility networks and site infrastructure",
      "Water, drainage and service systems",
      "Logistics and industrial support facilities",
    ],
    deliveryScope: [
      "Site assessment and infrastructure planning",
      "Civil works and utility coordination",
      "Access, circulation and loading systems",
      "Construction and implementation management",
    ],
    projectModels: [
      "Greenfield industrial sites",
      "Industrial zones and production campuses",
      "Public–private infrastructure programmes",
      "Factory-linked civil infrastructure",
    ],
  },
  {
    key: "energy",
    title: "Energy",
    description: "Reliable energy is a foundation of industrial production. Novertra develops conventional, renewable and hybrid energy systems around the operating needs of each facility.",
    image: "/assets/optimized/energy.webp",
    imagePosition: "center center",
    developmentAreas: [
      "Industrial power generation systems",
      "Solar, wind and hybrid energy solutions",
      "Captive power and backup systems",
      "Distribution and plant utility infrastructure",
    ],
    deliveryScope: [
      "Energy demand assessment",
      "Technology and equipment configuration",
      "Generation and distribution integration",
      "Installation, commissioning and operational readiness",
    ],
    projectModels: [
      "Industrial captive power",
      "Hybridisation of existing plants",
      "Independent or government-backed energy projects",
      "Energy systems for remote industrial sites",
    ],
  },
  {
    key: "agro-industry",
    title: "Agro-Industry",
    description: "Novertra connects agricultural production with storage, processing, logistics and market access to create complete agro-industrial value chains.",
    image: "/assets/optimized/agro-industry.webp",
    imagePosition: "center center",
    developmentAreas: [
      "Irrigated agricultural production systems",
      "Grain, feed and crop-processing facilities",
      "Storage, packaging and logistics systems",
      "Integrated rural production campuses",
    ],
    deliveryScope: [
      "Production and processing configuration",
      "Irrigation, water and utility planning",
      "Machinery and production-line sourcing",
      "Installation, training and operational support",
    ],
    projectModels: [
      "Contract farming programmes",
      "Integrated agricultural communities",
      "Commercial farming and processing projects",
      "Government food-security initiatives",
    ],
  },
  {
    key: "mining-processing",
    title: "Mining & Processing",
    description: "Mining value is created through reliable material handling, processing and recovery systems—not extraction alone.",
    image: "/assets/optimized/mining-processing.webp",
    imagePosition: "center center",
    developmentAreas: [
      "Mineral-processing facilities",
      "Crushing, screening and material handling",
      "Recovery and concentration systems",
      "Supporting utilities and industrial infrastructure",
    ],
    deliveryScope: [
      "Process-flow and equipment configuration",
      "Machinery procurement and integration",
      "Civil and structural implementation",
      "Installation and commissioning support",
    ],
    projectModels: [
      "New processing facilities",
      "Expansion of existing mining operations",
      "Mobile or modular processing systems",
      "Public or private mineral-development projects",
    ],
  },
  {
    key: "industrial-manufacturing",
    title: "Industrial & Manufacturing",
    description: "Novertra develops scalable production environments that convert manufacturing opportunities into operational industrial capacity.",
    image: "/assets/optimized/industrial-manufacturing.webp",
    imagePosition: "center right",
    developmentAreas: [
      "Modular and conventional factories",
      "Assembly and production lines",
      "Industrial workshops and fabrication facilities",
      "Supporting utilities and production infrastructure",
    ],
    deliveryScope: [
      "Product and capacity definition",
      "Factory and production-line engineering",
      "Machinery sourcing and installation",
      "Commissioning and operational preparation",
    ],
    projectModels: [
      "Local production and import substitution",
      "Technology-transfer projects",
      "Industrial joint ventures",
      "Government-supported manufacturing programmes",
    ],
  },
  {
    key: "strategic-facilities",
    title: "Strategic Facilities",
    description: "Strategic and mission-critical facilities require controlled delivery, operational continuity and dependable infrastructure.",
    image: "/assets/optimized/strategic-facilities.webp",
    imagePosition: "center center",
    developmentAreas: [
      "Secure institutional facilities",
      "Administrative and operational compounds",
      "Critical infrastructure buildings",
      "Special-purpose industrial and public facilities",
    ],
    deliveryScope: [
      "Functional requirement analysis",
      "Secure site and facility planning",
      "Civil, utility and systems coordination",
      "Controlled construction and commissioning",
    ],
    projectModels: [
      "Government and institutional facilities",
      "Critical operating centres",
      "Secure industrial compounds",
      "Special-purpose public infrastructure",
    ],
  },
  {
    key: "textile-manufacturing",
    title: "Textile Manufacturing",
    description: "Novertra combines factory development, rehabilitation and electro-mechanical implementation for integrated textile production.",
    image: "/assets/optimized/textile-manufacturing.webp",
    imagePosition: "center center",
    developmentAreas: [
      "Spinning and weaving facilities",
      "Textile production and finishing lines",
      "Factory rehabilitation programmes",
      "Supporting utilities and storage systems",
    ],
    deliveryScope: [
      "Factory and machinery condition assessment",
      "Production-line configuration",
      "Civil and electro-mechanical rehabilitation",
      "Installation, testing and operational restart",
    ],
    projectModels: [
      "New textile factories",
      "Rehabilitation of idle facilities",
      "Capacity expansion programmes",
      "Integrated cotton-to-textile projects",
    ],
  },
  {
    key: "food-processing-cold-chain",
    title: "Food Processing & Cold Chain",
    description: "Food value chains depend on hygienic processing, controlled storage and reliable temperature-managed logistics.",
    image: "/assets/optimized/food-processing-cold-chain.webp",
    imagePosition: "center center",
    developmentAreas: [
      "Food-processing and packaging facilities",
      "Refrigerated and frozen storage",
      "Cold-chain logistics infrastructure",
      "Product handling and distribution systems",
    ],
    deliveryScope: [
      "Process and hygiene-flow planning",
      "Production and packaging-line integration",
      "Refrigeration and utility systems",
      "Commissioning and operational preparation",
    ],
    projectModels: [
      "Fruit and vegetable processing",
      "Dairy and packaged-food projects",
      "Export-oriented food facilities",
      "National food-security and storage programmes",
    ],
  },
  {
    key: "poultry-production-processing",
    title: "Poultry Production & Processing",
    description: "Novertra develops integrated poultry systems connecting feed, farming, processing, packaging and cold-chain distribution.",
    image: "/assets/optimized/poultry-production-processing.webp",
    imagePosition: "center center",
    developmentAreas: [
      "Poultry houses and production farms",
      "Feed handling and storage systems",
      "Poultry processing and packaging facilities",
      "Refrigeration and cold-chain infrastructure",
    ],
    deliveryScope: [
      "Farm and production-capacity planning",
      "Processing-line and equipment configuration",
      "Utilities, hygiene and waste-management systems",
      "Installation, training and commissioning",
    ],
    projectModels: [
      "Integrated broiler projects",
      "Layer and egg-production programmes",
      "Poultry-processing facilities",
      "Regional food-security investments",
    ],
  },
  {
    key: "cattle-beef-processing",
    title: "Cattle & Beef Processing",
    description: "Novertra structures complete livestock and beef value chains from animal production and feed systems to modern processing and refrigerated distribution.",
    image: "/assets/sectors/cattle-beef-processing.png",
    developmentAreas: [
      "Livestock production and feeding systems",
      "Modern abattoirs",
      "Meat-processing and packaging facilities",
      "Refrigerated storage and distribution",
    ],
    deliveryScope: [
      "Livestock and throughput planning",
      "Abattoir and process-flow configuration",
      "Hygiene, waste and utility systems",
      "Cold-chain and operational integration",
    ],
    projectModels: [
      "Commercial cattle-production projects",
      "Integrated livestock and meat complexes",
      "Municipal or regional slaughter facilities",
      "Export-oriented beef-processing projects",
    ],
  },
  {
    key: "small-factories-industrial-park",
    title: "Small Factories & Industrial Parks",
    description: "Coordinated industrial parks allow multiple producers to share infrastructure, services and market access while reducing individual investment barriers.",
    image: "/assets/sectors/small-factories-industrial-park.png",
    developmentAreas: [
      "Small and medium factory units",
      "Shared industrial utility systems",
      "Workshops, warehouses and logistics areas",
      "Common service and management facilities",
    ],
    deliveryScope: [
      "Industrial-park master planning",
      "Modular building and utility design",
      "Shared service and logistics systems",
      "Phased construction and tenant readiness",
    ],
    projectModels: [
      "SME industrial parks",
      "Local manufacturing clusters",
      "Government industrialisation programmes",
      "Specialised production campuses",
    ],
  },
  {
    key: "tractor-assembly",
    title: "Tractor Assembly",
    description: "Local tractor assembly creates industrial capability, employment, technical skills and long-term agricultural support capacity.",
    image: "/assets/sectors/tractor-assembly.png",
    developmentAreas: [
      "Tractor assembly lines",
      "Component storage and logistics systems",
      "Testing and quality-control areas",
      "Training and after-sales infrastructure",
    ],
    deliveryScope: [
      "Assembly-line and capacity configuration",
      "Equipment and tooling procurement",
      "Facility and workflow planning",
      "Installation, testing and workforce training",
    ],
    projectModels: [
      "CKD and SKD assembly plants",
      "Government mechanisation programmes",
      "Private tractor-manufacturing ventures",
      "Regional agricultural equipment hubs",
    ],
  },
  {
    key: "agricultural-equipment-manufacturing",
    title: "Agricultural Equipment Manufacturing",
    description: "Novertra develops manufacturing systems for agricultural implements and machinery adapted to local farming conditions and production needs.",
    image: "/assets/sectors/agricultural-equipment-manufacturing.png",
    developmentAreas: [
      "Ploughs, cultivators and seeders",
      "Agricultural trailers and transport equipment",
      "Fabricated machinery frames and attachments",
      "Maintenance and spare-parts workshops",
    ],
    deliveryScope: [
      "Product-family and capacity definition",
      "Cutting, forming, machining and welding systems",
      "Assembly, painting and quality-control areas",
      "Workforce training and production launch",
    ],
    projectModels: [
      "Local agricultural machinery production",
      "Import-substitution programmes",
      "Tractor-linked equipment manufacturing",
      "SME or state-supported industrial ventures",
    ],
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
