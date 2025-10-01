import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { EarlyAccess } from "@/components/EarlyAccess";
import { Footer } from "@/components/Footer";

/**
 * Main Landing Page for Vibae
 * Combines all sections into a cohesive, animated experience
 */
const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Hero />
      <Features />
      <HowItWorks />
      <EarlyAccess />
      <Footer />
    </main>
  );
};

export default Index;
