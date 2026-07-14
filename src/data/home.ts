import {
  Factory,
  Globe2,
  Layers3,
  Settings2,
  ShieldCheck,
  Truck,
} from "lucide-react";

export const capabilityIcons = [
  Globe2,
  Settings2,
  Factory,
  Layers3,
  Truck,
  ShieldCheck,
];

export const industryAssets: Record<
  string,
  { image: string; imagePosition?: string }
> = {
  infrastructure: { image: "/assets/optimized/infrastructure.webp" },
  energy: { image: "/assets/optimized/energy.webp" },
  "agro-industry": { image: "/assets/optimized/agro-industry.webp" },
  "mining-processing": { image: "/assets/optimized/mining-processing.webp" },
  "industrial-manufacturing": {
    image: "/assets/optimized/industrial-manufacturing.webp",
    imagePosition: "center right",
  },
  "strategic-facilities": { image: "/assets/optimized/strategic-facilities.webp" },
  "textile-manufacturing": { image: "/assets/optimized/textile-manufacturing.webp" },
  "food-processing-cold-chain": {
    image: "/assets/optimized/food-processing-cold-chain.webp",
  },
  "poultry-production-processing": {
    image: "/assets/optimized/poultry-production-processing.webp",
  },
  "cattle-beef-processing": { image: "/assets/sectors/cattle-beef-processing.png" },
  "small-factories-industrial-park": {
    image: "/assets/sectors/small-factories-industrial-park.png",
  },
  "tractor-assembly": { image: "/assets/sectors/tractor-assembly.png" },
  "agricultural-equipment-manufacturing": {
    image: "/assets/sectors/agricultural-equipment-manufacturing.png",
  },
};
