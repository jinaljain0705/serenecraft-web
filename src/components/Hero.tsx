import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import heroImage from "@/assets/hero-senior-care.jpg";

const Hero = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 left-0 w-72 h-72 rounded-full bg-secondary blur-3xl" />
      </div>

      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            Trusted Senior Care
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground mb-6">
            Spreading{" "}
            <span className="text-gradient-teal">Happiness</span>{" "}
            In Senior Care
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-lg mb-8">
            We provide compassionate and professional care for your loved ones, ensuring comfort,
            dignity, and joy in every moment of their golden years.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="rounded-lg bg-primary px-7 py-3.5 text-base font-medium text-primary-foreground hover:bg-teal-dark transition-colors shadow-soft"
            >
              Book Consultation
            </a>

            <button
              onClick={() => setVideoOpen(true)}
              className="flex items-center gap-3 group"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Play className="h-5 w-5 text-primary ml-0.5" fill="hsl(var(--primary))" />
              </span>
              <span className="text-sm font-medium text-foreground">Watch Our Story</span>
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-10 mt-12 pt-8 border-t border-border">
            {[
              { value: "15+", label: "Years Experience" },
              { value: "2K+", label: "Happy Families" },
              { value: "50+", label: "Care Experts" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-heading text-3xl font-bold text-primary">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative hidden md:block"
        >
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-elevated bg-cream-dark" />
          {/* Floating badge */}
          <div className="absolute -left-6 bottom-20 rounded-2xl bg-card shadow-card p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary text-lg">❤️</span>
            </div>
            <div>
              <p className="font-heading font-semibold text-foreground text-sm">Trusted Care</p>
              <p className="text-xs text-muted-foreground">Since 2009</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-sm p-4"
            onClick={() => setVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden bg-foreground"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setVideoOpen(false)}
                className="absolute top-3 right-3 z-10 h-9 w-9 flex items-center justify-center rounded-full bg-card/80 hover:bg-card transition"
              >
                <X className="h-5 w-5 text-foreground" />
              </button>
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Our Story"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
