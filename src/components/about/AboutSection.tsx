import { motion } from "framer-motion";
import { HandHeart, Shield, Check } from "lucide-react";
import { Link } from "react-router-dom";

const AboutSection = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Image Side */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative rounded-2xl overflow-hidden bg-accent/40 aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&h=500&fit=crop"
              alt="Caregiver with senior"
              className="w-full h-full object-cover"
            />
            {/* Rating badge */}
            <div className="absolute top-6 right-6 bg-accent px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-md">
              <span className="text-primary text-lg">✦</span>
              <span className="font-heading font-semibold text-foreground">4.9 avg rating</span>
            </div>
          </div>
          {/* Experience badge */}
          <div className="absolute -bottom-6 -left-4 bg-card rounded-2xl shadow-lg p-6 text-center w-44">
            <p className="font-heading text-4xl font-bold text-foreground">20+</p>
            <p className="text-sm text-muted-foreground mt-1">Years Of Experience</p>
            <span className="text-primary text-2xl mt-2 inline-block">✦</span>
          </div>
        </motion.div>

        {/* Text Side */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-3 h-3 rounded-full border-2 border-primary" />
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">Know About Us</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            We Offer Expert Senior Care Services
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing do eiusmod tempor incididunt labore et dolore magna aliqua.
          </p>

          {/* Feature items */}
          <div className="space-y-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-xl bg-accent/60 flex items-center justify-center shrink-0">
                <HandHeart className="h-7 w-7 text-teal-dark" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground">Strategies To Feel Better</h3>
                <p className="text-sm text-muted-foreground">Lorem ipsum or lipsum as it is sometimes known</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground">Complete Medical Supply</h3>
                <p className="text-sm text-muted-foreground">Lorem ipsum or lipsum as it is sometimes known</p>
              </div>
            </div>
          </div>

          {/* Check items */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-foreground" />
              <span className="text-muted-foreground">Lorem ipsum or lipsum as it is sometimes known</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-foreground" />
              <span className="text-muted-foreground">Professional gardening service for all your home</span>
            </div>
          </div>

          <Link
            to="/contact"
            className="inline-block border-2 border-foreground text-foreground font-semibold px-8 py-3 rounded-md hover:bg-foreground hover:text-background transition-colors"
          >
            Learn More
          </Link>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutSection;
