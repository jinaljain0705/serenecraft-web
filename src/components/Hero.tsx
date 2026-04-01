import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-senior-care.jpg";

const Hero = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-10 left-[10%] w-3 h-3 bg-primary/60 rotate-45" />
      <div className="absolute top-32 right-20 text-primary text-2xl font-bold">»</div>
      <div className="absolute bottom-40 left-8 text-muted-foreground text-xl">✕</div>
      <div className="absolute top-40 right-[30%] w-2 h-2 bg-teal/40 rotate-45" />

      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground mb-6">
            Creating{" "}
            <span className="relative">
              Smiles
              <span className="absolute -top-4 -right-6 text-primary text-xl">✦✦</span>
            </span>{" "}
            In Senior Living
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-lg mb-8">
            We provide compassionate and professional care for your loved ones, ensuring comfort,
            dignity, and joy in every moment of their golden years.
          </p>

          <Link
            to="/contact"
            className="inline-block rounded-lg border-2 border-primary bg-transparent px-7 py-3.5 text-base font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Get Consultation
          </Link>

          {/* Stats bar */}
          <div className="flex items-center gap-6 mt-12">
            <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-5 py-3">
              <span className="font-heading text-2xl font-bold text-foreground">4.5k+</span>
              <span className="text-primary">⭐</span>
              <span className="text-sm text-muted-foreground">To customer reviews</span>
            </div>
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 w-10 rounded-full bg-secondary border-2 border-card" />
              ))}
              <div className="h-10 w-10 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center text-xs text-primary font-medium">+</div>
            </div>
          </div>
        </motion.div>

        {/* Image with circle frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative hidden md:flex justify-center"
        >
          {/* Circular outline */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[420px] h-[420px] rounded-full border-2 border-primary/30" />
          </div>

          <div className="w-[380px] h-[480px] rounded-[200px_200px_40px_40px] overflow-hidden shadow-elevated relative z-10">
            <img src={heroImage} alt="Caring for seniors" className="w-full h-full object-cover" width={380} height={480} />
          </div>

          {/* Play button */}
          <button
            onClick={() => setVideoOpen(true)}
            className="absolute top-1/4 -left-4 z-20 h-16 w-16 rounded-full bg-teal flex items-center justify-center shadow-card hover:scale-110 transition-transform"
          >
            <Play className="h-6 w-6 text-card ml-1" fill="hsl(var(--card))" />
          </button>

          {/* Rotating text badge */}
          <div className="absolute top-[15%] -left-8 z-20">
            <div className="relative h-24 w-24">
              <div className="absolute inset-0 rounded-full border border-muted-foreground/20" />
              <div className="absolute inset-3 rounded-full bg-card flex items-center justify-center shadow-soft">
                <Play className="h-5 w-5 text-primary ml-0.5" fill="hsl(var(--primary))" />
              </div>
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
