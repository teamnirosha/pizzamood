import { Rocket, HeartHandshake, UtensilsCrossed, Megaphone, Truck, ShieldCheck, TrendingUp, type LucideIcon } from "lucide-react";
import type { UspIconName } from "@/lib/usps";

const ICONS: Record<UspIconName, LucideIcon> = { Rocket, HeartHandshake, UtensilsCrossed, Megaphone, Truck, ShieldCheck, TrendingUp };

export default function UspIcon({ name, className }: { name: UspIconName; className?: string }) {
  const Icon = ICONS[name];
  return <Icon className={className} aria-hidden="true" />;
}
