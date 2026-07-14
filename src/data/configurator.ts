import { Building2, Factory, PackageCheck, SunMedium, Waves } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type FactoryType = {
  id: string;
  icon: LucideIcon;
  baseInvestment: number;
  baseLand: number;
  baseMonths: number;
};

export const factoryTypes: FactoryType[] = [
  { id: "feed", icon: Factory, baseInvestment: 3_200_000, baseLand: 18_000, baseMonths: 11 },
  { id: "cold", icon: PackageCheck, baseInvestment: 2_400_000, baseLand: 12_000, baseMonths: 9 },
  { id: "dairy", icon: Waves, baseInvestment: 4_100_000, baseLand: 16_000, baseMonths: 12 },
  { id: "flour", icon: Building2, baseInvestment: 5_200_000, baseLand: 22_000, baseMonths: 14 },
  { id: "solar", icon: SunMedium, baseInvestment: 1_800_000, baseLand: 8_000, baseMonths: 7 },
];
