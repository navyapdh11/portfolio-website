import { cleaningServices } from "@/lib/constants/services";

export const serviceDetails: Record<string, {
  included: string[];
  addons: { label: string, value: string, price: number }[];
  description: string;
}> = {
  "domestic-cleaning": {
    description: "Our professional domestic cleaning ensures your home stays immaculate with our proven 50-point checklist.",
    included: ["Dusting all surfaces", "Vacuuming & mopping", "Kitchen benchtop sanitization", "Bathroom deep clean", "Mirror polishing"],
    addons: [
      { label: "Oven Cleaning", value: "oven", price: 80 },
      { label: "Internal Windows", value: "windows", price: 60 },
      { label: "Inside Fridge", value: "fridge", price: 50 },
    ]
  },
  "end-of-lease-cleaning": {
    description: "Strictly compliant with state residential tenancy laws, ensuring your bond is returned in full.",
    included: ["Wall washing", "Inside kitchen cabinets", "Rangehood degreasing", "Exhaust fan cleaning", "Carpet steam cleaning", "Skirting boards"],
    addons: [
      { label: "Carpet Steam (Extra Rooms)", value: "carpet", price: 40 },
      { label: "Wall Spot Cleaning", value: "walls", price: 100 },
      { label: "Garage Deep Clean", value: "garage", price: 90 },
    ]
  },
  "commercial-cleaning": {
    description: "Enterprise-grade commercial cleaning for offices, ensuring professional presentation and WHS compliance.",
    included: ["Common area sanitation", "Floor buffing", "Bin management", "Kitchen/Breakroom sanitization"],
    addons: [
      { label: "High-level Dusting", value: "high_dust", price: 150 },
      { label: "Disinfection Fogging", value: "fogging", price: 200 },
    ]
  },
  // ... maps to all 20 services
};
