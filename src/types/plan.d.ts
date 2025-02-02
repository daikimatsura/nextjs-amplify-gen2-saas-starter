import type { Pricing } from "@/schema/appSync/schema";

type Plans = Array<{
  plan: Pricing;
  description: string;
  price: number;
  features: string[];
  buttonText: string;
  variant: "outline" | "default";
  highlight?: boolean;
}>;
