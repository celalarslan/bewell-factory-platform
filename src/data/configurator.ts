import { Building2, Factory, PackageCheck, SunMedium, Waves } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type FactoryType = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  baseInvestment: number;
  baseLand: number;
  baseMonths: number;
  tag: string;
};

export const factoryTypes: FactoryType[] = [
  {
    id: "feed",
    name: "Feed & Grain Hub",
    description: "Animal feed, grain intake, silos, laboratory and packaging.",
    icon: Factory,
    baseInvestment: 3200000,
    baseLand: 18000,
    baseMonths: 11,
    tag: "Recommended pilot",
  },
  {
    id: "cold",
    name: "Cold Chain Center",
    description: "Cold storage, packhouse, reefer handling and food logistics.",
    icon: PackageCheck,
    baseInvestment: 2400000,
    baseLand: 12000,
    baseMonths: 9,
    tag: "Food security",
  },
  {
    id: "dairy",
    name: "Dairy Processing",
    description: "Milk collection, pasteurisation, yoghurt, cheese and cold chain.",
    icon: Waves,
    baseInvestment: 4100000,
    baseLand: 16000,
    baseMonths: 12,
    tag: "High local impact",
  },
  {
    id: "flour",
    name: "Flour Mill",
    description: "Grain cleaning, milling, packaging and finished-goods storage.",
    icon: Building2,
    baseInvestment: 5200000,
    baseLand: 22000,
    baseMonths: 14,
    tag: "Import substitution",
  },
  {
    id: "solar",
    name: "Industrial Utility Module",
    description: "Solar, battery, generator, water treatment and smart controls.",
    icon: SunMedium,
    baseInvestment: 1800000,
    baseLand: 8000,
    baseMonths: 7,
    tag: "Add-on system",
  },
];
export const countries = [
  "Sudan",
  "South Sudan",
  "Burkina Faso",
  "Cameroon",
  "Uganda",
  "Nigeria",
  "Zambia",
  "Other African market",
];

export const capacities = [
  { id: "small", label: "Small", subtitle: "Entry / pilot", factor: 0.7 },
  { id: "medium", label: "Medium", subtitle: "Commercial scale", factor: 1 },
  { id: "large", label: "Large", subtitle: "Regional supply", factor: 1.65 },
];

export const energyOptions = [
  { id: "grid", label: "Grid + backup", factor: 1 },
  { id: "hybrid", label: "Solar hybrid", factor: 1.16 },
  { id: "offgrid", label: "Fully off-grid", factor: 1.28 },
];

export const financeOptions = [
  ["secured", "Capital secured"],
  ["structured", "Needs structuring"],
  ["early", "Early-stage concept"],
] as const;
