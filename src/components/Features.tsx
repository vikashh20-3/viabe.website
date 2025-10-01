import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Users, Shield, Clock, Briefcase, GraduationCap } from "lucide-react";
import iconChat from "@/assets/icon-chat.png";
import iconNetwork from "@/assets/icon-network.png";
import iconQuality from "@/assets/icon-quality.png";

/**
 * Features Section Component
 * Displays key features with animated cards and icons
 */
export const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const features = [
    {
      icon: iconChat,
      iconComponent: MessageCircle,
      title: "Limited Daily Interactions",
      description: "Quality over quantity. Request more interactions when you need them, ensuring every connection matters.",
      color: "primary"
    },
    {
      icon: iconQuality,
      iconComponent: Shield,
      title: "Professional & Student Profiles",
      description: "Tailored experiences for professionals and students. Connect with people who share your ambitions and lifestyle.",
      color: "secondary"
    },
    {
      icon: iconNetwork,
      iconComponent: Users,
      title: "Groups & Communities",
      description: "Join groups based on location, profession, college, or interests. Build meaningful communities with shared identities.",
      color: "accent"
    },
    {
      iconComponent: Clock,
      title: "Chat-First Approach",
      description: "Start with conversation, not just photos. Get to know someone through meaningful dialogue before deciding to connect.",
      color: "primary"
    },
    {
      iconComponent: Briefcase,
      title: "Career Networking",
      description: "Connect with professionals in your field. Grow your network with people who understand your career journey.",
      color: "secondary"
    },
    {
      iconComponent: GraduationCap,
      title: "Student Communities",
      description: "Find fellow students from your college or major. Build friendships and study groups that last beyond graduation.",
      color: "accent"
    },
  ];

  return (
    <section ref={ref} className="py-24 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial opacity-50" />
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Why Choose <span className="bg-gradient-primary bg-clip-text text-transparent">Vibae</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience a new way to connect, designed for meaningful relationships and authentic networking.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.iconComponent;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="h-full p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(271_91%_65%/0.2)] hover:-translate-y-2">
                  {/* Icon */}
                  <div className="mb-6 relative">
                    {feature.icon ? (
                      <img 
                        src={feature.icon} 
                        alt={feature.title}
                        className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${feature.color}/20 to-${feature.color}/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-8 h-8 text-${feature.color}`} />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
