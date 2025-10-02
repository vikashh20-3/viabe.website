import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { EarlyAccess } from "@/components/EarlyAccess";
import { Footer } from "@/components/Footer";
import { useRef } from "react";

const Index = () => {
  const earlyAccessRef = useRef<HTMLElement | null>(null);

  const scrollToEarlyAccess = () => {
    if (earlyAccessRef.current) {
      earlyAccessRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Hero scrollToEarlyAccess={scrollToEarlyAccess} />
      <Features />
      <HowItWorks />
      <EarlyAccess ref={earlyAccessRef} />
      <Footer />
    </main>
  );
};

export default Index;
