import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

/**
 * Early Access / Wishlist Form Component
 * Allows users to sign up for early access with animated form elements
 */
export const EarlyAccess = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profileType: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitted(true);
    setIsSubmitting(false);

    toast({
      title: "Welcome to Vibae! 🎉",
      description: "You're on the early access list. We'll notify you when we launch!",
    });

    // Reset form after animation
    setTimeout(() => {
      setFormData({ name: "", email: "", profileType: "" });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section ref={ref} className="py-24 px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      <div className="container mx-auto max-w-2xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Limited Spots Available</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Join the <span className="bg-gradient-primary bg-clip-text text-transparent">Waitlist</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Be among the first to experience meaningful connections. Get early access to Vibae before the official launch.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="p-8 md:p-12 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-300 backdrop-blur-sm">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-12 bg-background/50 border-border focus:border-primary transition-all"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-12 bg-background/50 border-border focus:border-primary transition-all"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <label htmlFor="profileType" className="block text-sm font-medium mb-2">
                    Profile Type
                  </label>
                  <Select
                    value={formData.profileType}
                    onValueChange={(value) => setFormData({ ...formData, profileType: value })}
                    required
                  >
                    <SelectTrigger id="profileType" className="h-12 bg-background/50 border-border">
                      <SelectValue placeholder="Select your profile type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  <Button
                    type="submit"
                    variant="neon"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Joining..." : "Get Early Access"}
                  </Button>
                </motion.div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-primary mx-auto mb-6 flex items-center justify-center animate-glow-pulse">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">You're In! 🎉</h3>
                <p className="text-muted-foreground">
                  Welcome to the Vibae early access list. We'll send you an email when we launch!
                </p>
              </motion.div>
            )}
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl animate-pulse" />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          By joining, you agree to receive updates about Vibae. We respect your privacy and won't spam you.
        </motion.p>
      </div>
    </section>
  );
};
