import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

/**
 * Hero Section Component
 * Features: Animated headline, gradient text, CTA buttons with neon effects
 */
interface HeroProps {
  scrollToEarlyAccess: () => void;
}

export const Hero = ({ scrollToEarlyAccess }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Limited Daily Interactions for Quality Connections</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          Connect Beyond
          <br />
          <span className="bg-gradient-primary bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
            The Swipe
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
        >
          Vibae is the chat-based dating and networking app for professionals and students. 
          Quality over quantity with meaningful daily interactions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
  size="xl"
  variant="neon"
  className="group"
  onClick={scrollToEarlyAccess} // <-- scroll handler
>
  Join Early Access
  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
</Button>

          <Button 
            size="xl"
            variant="neon-outline"
          >
            Learn More
          </Button>
        </motion.div>

        {/* Floating stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {[
            { label: "Daily Connections", value: "Limited" },
            { label: "Quality Matches", value: "100%" },
            { label: "Users Waiting", value: "10K+" },
          ].map((stat, index) => (
            <div 
              key={index}
              className="p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all"
            >
              <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
