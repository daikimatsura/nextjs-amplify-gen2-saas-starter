import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeatureSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { ContactSection } from "@/components/landing/ContactSection";

const LandingPage = () => (
  <div className="flex flex-col min-h-screen">
    <HeroSection />
    <FeaturesSection />
    <PricingSection />
    <ContactSection />
  </div>
);

LandingPage.displayName = "LandingPage";
export default LandingPage;
