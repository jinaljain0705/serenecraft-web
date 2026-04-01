import { motion } from "framer-motion";
import { Heart, Award, Clock, Users } from "lucide-react";

const stats = [
  { icon: Heart, value: "15+", label: "Years of Service" },
  { icon: Users, value: "2,000+", label: "Families Served" },
  { icon: Award, value: "50+", label: "Care Experts" },
  { icon: Clock, value: "24/7", label: "Support Available" },
];

const AboutUs = () => (
  <section id="about" className="py-24">
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            About Careold
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Our Mission Is to Bring{" "}
            <span className="text-gradient-teal">Joy & Dignity</span>{" "}
            to Every Senior
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Founded in 2009, Careold was born from a simple belief: every senior deserves
            to live with dignity, comfort, and happiness. Our team of compassionate
            professionals provides personalized care that honors each individual's
            unique needs and preferences.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            We go beyond basic care — we build genuine relationships with our residents
            and their families, creating a warm community where everyone feels valued
            and supported. Our holistic approach combines medical expertise with
            emotional well-being programs.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 rounded-xl bg-secondary/50 p-4"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-heading text-xl font-bold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl bg-primary/10 p-8 text-center">
                <p className="font-heading text-4xl font-bold text-primary mb-2">15+</p>
                <p className="text-sm text-muted-foreground">Years of Excellence</p>
              </div>
              <div className="rounded-2xl bg-cream-dark aspect-[4/3] overflow-hidden shadow-soft" />
            </div>
            <div className="space-y-4 pt-8">
              <div className="rounded-2xl bg-cream-dark aspect-[4/3] overflow-hidden shadow-soft" />
              <div className="rounded-2xl bg-secondary p-8 text-center">
                <p className="font-heading text-4xl font-bold text-primary mb-2">98%</p>
                <p className="text-sm text-muted-foreground">Family Satisfaction</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutUs;
