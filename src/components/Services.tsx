import { motion } from "framer-motion";
import { Stethoscope, Home, Heart, Clock, Users, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

const services: Service[] = [
  { title: "Medical Care", description: "Professional medical attention with regular health check-ups and medication management.", icon: Stethoscope },
  { title: "Home Care", description: "Comfortable in-home care services tailored to individual needs and preferences.", icon: Home },
  { title: "Emotional Support", description: "Companionship and emotional well-being programs to keep spirits high.", icon: Heart },
  { title: "24/7 Availability", description: "Round-the-clock assistance ensuring safety and peace of mind for families.", icon: Clock },
  { title: "Community Activities", description: "Social engagement programs fostering connection and joyful experiences.", icon: Users },
  { title: "Safety & Security", description: "Advanced monitoring and safety protocols for complete protection.", icon: Shield },
];

const Services = () => (
  <section id="services" className="py-24 bg-secondary/50">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">Our Services</span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Comprehensive Care <span className="text-gradient-teal">Solutions</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          We offer a wide range of senior care services designed to enhance quality of life.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group rounded-2xl bg-card p-8 shadow-soft hover:shadow-card transition-all duration-300 border border-border hover:border-primary/30"
          >
            <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
              <s.icon className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{s.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
