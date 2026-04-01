import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, Star, HeartPulse, Stethoscope } from "lucide-react";
import aboutImage from "@/assets/about-care.jpg";

const features = [
  { icon: HeartPulse, title: "Strategies To Feel Better", desc: "Personalized wellness plans for every resident" },
  { icon: Stethoscope, title: "Complete Medical Supply", desc: "Full range of medical equipment and care tools" },
];

const checks = [
  "Compassionate care from certified professionals",
  "Professional support service for all your needs",
];

const AboutHome = () => (
  <section className="py-24">
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="rounded-2xl overflow-hidden shadow-elevated">
            <img src={aboutImage} alt="Expert senior care" className="w-full h-full object-cover" loading="lazy" width={640} height={800} />
          </div>

          {/* Rating badge */}
          <div className="absolute top-6 right-6 bg-teal rounded-xl px-5 py-3 flex items-center gap-2 shadow-card">
            <Star className="h-5 w-5 text-primary" fill="hsl(var(--primary))" />
            <span className="font-heading font-bold text-card text-sm">4.9 avg rating</span>
          </div>

          {/* Years badge */}
          <div className="absolute -bottom-6 left-8 bg-card rounded-2xl px-6 py-5 shadow-card text-center">
            <p className="font-heading text-4xl font-bold text-foreground">20+</p>
            <p className="text-sm text-muted-foreground mt-1">Years Of Experience</p>
            <Star className="h-5 w-5 text-primary mx-auto mt-2" fill="hsl(var(--primary))" />
          </div>
        </motion.div>

        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-medium text-primary tracking-wider uppercase">◇ Know About Us</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3 mb-6">
            We Offer Expert<br />Senior Care Services
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            With over two decades of experience, we provide comprehensive care solutions
            that prioritize comfort, dignity, and well-being for every senior in our community.
          </p>

          <div className="space-y-6 mb-8">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-1">{f.title}</h4>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3 mb-8">
            {checks.map((c) => (
              <div key={c} className="flex items-center gap-3">
                <Check className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{c}</span>
              </div>
            ))}
          </div>

          <Link
            to="/about"
            className="inline-block rounded-lg border-2 border-foreground px-7 py-3 text-sm font-medium text-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            Learn More
          </Link>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutHome;
