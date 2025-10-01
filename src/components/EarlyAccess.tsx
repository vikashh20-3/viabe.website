import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Sparkles, MessageSquare, UserPlus, RotateCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

/**
 * Early Access / Wishlist Form Component
 * Allows users to sign up for early access or submit suggestions with card flip animation
 */
export const EarlyAccess = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { toast } = useToast();
  
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const [wishlistData, setWishlistData] = useState({
    name: "",
    email: "",
    profileType: "",
  });
  const [suggestionData, setSuggestionData] = useState({
    name: "",
    email: "",
    category: "",
    suggestion: "",
  });
  
  const [isWishlistSubmitted, setIsWishlistSubmitted] = useState(false);
  const [isSuggestionSubmitted, setIsSuggestionSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFlip = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsFlipped(!isFlipped);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const handleWishlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsWishlistSubmitted(true);
    setIsSubmitting(false);

    toast({
      title: "Welcome to Vibae! 🎉",
      description: "You're on the early access list. We'll notify you when we launch!",
    });

    // Reset form after animation
    setTimeout(() => {
      setWishlistData({ name: "", email: "", profileType: "" });
      setIsWishlistSubmitted(false);
    }, 3000);
  };

  const handleSuggestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSuggestionSubmitted(true);
    setIsSubmitting(false);

    toast({
      title: "Thanks for Your Feedback! 💡",
      description: "We appreciate your suggestion and will consider it for future updates!",
    });

    // Reset form after animation
    setTimeout(() => {
      setSuggestionData({ name: "", email: "", category: "", suggestion: "" });
      setIsSuggestionSubmitted(false);
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
            <AnimatePresence mode="wait">
              <motion.span
                key={isFlipped ? "suggestions" : "wishlist"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {isFlipped ? (
                  <>Share Your <span className="bg-gradient-accent bg-clip-text text-transparent">Ideas</span></>
                ) : (
                  <>Join the <span className="bg-gradient-primary bg-clip-text text-transparent">Waitlist</span></>
                )}
              </motion.span>
            </AnimatePresence>
          </h2>
          <AnimatePresence mode="wait">
            <motion.p
              key={isFlipped ? "suggestions-desc" : "wishlist-desc"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-lg text-muted-foreground"
            >
              {isFlipped ? (
                "Have a feature request or suggestion? We'd love to hear your thoughts on how to improve Vibae."
              ) : (
                "Be among the first to experience meaningful connections. Get early access to Vibae before the official launch."
              )}
            </motion.p>
          </AnimatePresence>

          {/* Flip Toggle Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8"
          >
            <Button
              onClick={handleFlip}
              variant="ghost"
              className="group relative px-6 py-3 border border-primary/30 hover:border-primary/60 hover:bg-primary/5"
              disabled={isAnimating}
            >
              <RotateCw className={`w-4 h-4 mr-2 transition-transform duration-500 ${isAnimating ? 'animate-spin' : ''}`} />
              {isFlipped ? (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Switch to Waitlist
                </>
              ) : (
                <>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Share Suggestions
                </>
              )}
            </Button>
          </motion.div>
        </motion.div>

        {/* Card Flip Container */}
        <div className="relative perspective-1000" style={{ perspective: "1000px" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative preserve-3d"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="relative"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Front - Wishlist Form */}
              <div
                className="backface-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  display: isFlipped ? "none" : "block",
                }}
              >
                <div className="p-8 md:p-12 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-300 backdrop-blur-sm">
                  {!isWishlistSubmitted ? (
                    <form onSubmit={handleWishlistSubmit} className="space-y-6">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                      >
                        <label htmlFor="wishlist-name" className="block text-sm font-medium mb-2">
                          Full Name
                        </label>
                        <Input
                          id="wishlist-name"
                          type="text"
                          placeholder="Enter your name"
                          value={wishlistData.name}
                          onChange={(e) => setWishlistData({ ...wishlistData, name: e.target.value })}
                          required
                          className="h-12 bg-background/50 border-border focus:border-primary transition-all"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                      >
                        <label htmlFor="wishlist-email" className="block text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <Input
                          id="wishlist-email"
                          type="email"
                          placeholder="your@email.com"
                          value={wishlistData.email}
                          onChange={(e) => setWishlistData({ ...wishlistData, email: e.target.value })}
                          required
                          className="h-12 bg-background/50 border-border focus:border-primary transition-all"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                      >
                        <label htmlFor="wishlist-profileType" className="block text-sm font-medium mb-2">
                          Profile Type
                        </label>
                        <Select
                          value={wishlistData.profileType}
                          onValueChange={(value) => setWishlistData({ ...wishlistData, profileType: value })}
                          required
                        >
                          <SelectTrigger id="wishlist-profileType" className="h-12 bg-background/50 border-border">
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
                          <UserPlus className="w-5 h-5 mr-2" />
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
              </div>

              {/* Back - Suggestions Form */}
              <div
                className="backface-hidden absolute inset-0"
                style={{
                  backfaceVisibility: "hidden",
                  transform: isFlipped ? "rotateY(0deg)" : "rotateY(-180deg)",
                  display: isFlipped ? "block" : "none",
                }}
              >
                <div className="p-8 md:p-12 rounded-3xl bg-card border border-border hover:border-accent/30 transition-all duration-300 backdrop-blur-sm">
                  {!isSuggestionSubmitted ? (
                    <form onSubmit={handleSuggestionSubmit} className="space-y-6">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                      >
                        <label htmlFor="suggestion-name" className="block text-sm font-medium mb-2">
                          Full Name
                        </label>
                        <Input
                          id="suggestion-name"
                          type="text"
                          placeholder="Enter your name"
                          value={suggestionData.name}
                          onChange={(e) => setSuggestionData({ ...suggestionData, name: e.target.value })}
                          required
                          className="h-12 bg-background/50 border-border focus:border-accent transition-all"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                      >
                        <label htmlFor="suggestion-email" className="block text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <Input
                          id="suggestion-email"
                          type="email"
                          placeholder="your@email.com"
                          value={suggestionData.email}
                          onChange={(e) => setSuggestionData({ ...suggestionData, email: e.target.value })}
                          required
                          className="h-12 bg-background/50 border-border focus:border-accent transition-all"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                      >
                        <label htmlFor="suggestion-category" className="block text-sm font-medium mb-2">
                          Category
                        </label>
                        <Select
                          value={suggestionData.category}
                          onValueChange={(value) => setSuggestionData({ ...suggestionData, category: value })}
                          required
                        >
                          <SelectTrigger id="suggestion-category" className="h-12 bg-background/50 border-border">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="feature">Feature Request</SelectItem>
                            <SelectItem value="ui">UI/UX Improvement</SelectItem>
                            <SelectItem value="bug">Bug Report</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 }}
                      >
                        <label htmlFor="suggestion-text" className="block text-sm font-medium mb-2">
                          Your Suggestion
                        </label>
                        <Textarea
                          id="suggestion-text"
                          placeholder="Tell us your ideas for improving Vibae..."
                          value={suggestionData.suggestion}
                          onChange={(e) => setSuggestionData({ ...suggestionData, suggestion: e.target.value })}
                          required
                          className="min-h-32 bg-background/50 border-border focus:border-accent transition-all resize-none"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.7 }}
                      >
                        <Button
                          type="submit"
                          variant="gradient"
                          size="lg"
                          className="w-full"
                          disabled={isSubmitting}
                        >
                          <MessageSquare className="w-5 h-5 mr-2" />
                          {isSubmitting ? "Submitting..." : "Submit Suggestion"}
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
                      <div className="w-20 h-20 rounded-full bg-gradient-accent mx-auto mb-6 flex items-center justify-center animate-glow-pulse">
                        <Check className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">Thank You! 💡</h3>
                      <p className="text-muted-foreground">
                        We appreciate your feedback and will consider it for future updates!
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />
          </motion.div>
        </div>

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
