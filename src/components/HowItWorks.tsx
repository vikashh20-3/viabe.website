import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { UserPlus, MessageSquare, Heart, Users } from "lucide-react";

/**
 * How It Works Section Component
 * Step-by-step explanation with animated timeline
 */
export const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const steps = [
    {
      icon: UserPlus,
      title: "Create Your Profile",
      description: "Sign up as a professional or student. Share your interests, goals, and what makes you unique.",
      step: "01"
    },
    {
      icon: Users,
      title: "Join Communities",
      description: "Discover and join groups based on your location, profession, college, or interests.",
      step: "02"
    },
    {
      icon: MessageSquare,
      title: "Start Chatting",
      description: "Use your daily interactions wisely. Begin meaningful conversations that go beyond the surface.",
      step: "03"
    },
    {
      icon: Heart,
      title: "Build Connections",
      description: "Form lasting relationships and grow your network with people who truly resonate with you.",
      step: "04"
    },
  ];

  return (
    <section ref={ref} className="py-24 px-4 bg-card/20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            How <span className="bg-gradient-accent bg-clip-text text-transparent">Vibae</span> Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting started is simple. Follow these steps to begin your journey towards meaningful connections.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative mb-12 last:mb-0"
              >
                <div className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Step number and icon */}
                  <div className="flex-shrink-0 relative">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative">
                      <div className="w-24 h-24 rounded-full bg-card border-2 border-primary/30 flex items-center justify-center">
                        <Icon className="w-10 h-10 text-primary" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-sm font-bold">
                        {step.step}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`flex-1 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                    <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300">
                      <h3 className="text-2xl font-bold mb-3">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Connecting line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute left-16 top-32 w-0.5 h-12 bg-gradient-to-b from-primary/50 to-transparent" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
