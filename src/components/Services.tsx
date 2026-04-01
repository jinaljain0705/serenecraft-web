import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import serviceCompanion from "@/assets/service-companion.jpg";
import servicePersonalized from "@/assets/service-personalized.jpg";
import serviceDisability from "@/assets/service-disability.jpg";
import serviceNursing from "@/assets/service-nursing.jpg";
import serviceMedical from "@/assets/service-medical.jpg";
import serviceHome from "@/assets/service-home.jpg";

const services = [
  {
    title: "Companion Care",
    description: "Lorem ipsum dolor sit amet lorem etur adipiscing elit sed do eiusmod",
    image: serviceCompanion,
  },
  {
    title: "Personalized Care",
    description: "Lorem ipsum dolor sit amet lorem etur adipiscing elit sed do eiusmod",
    image: servicePersonalized,
  },
  {
    title: "Disability Housing",
    description: "Lorem ipsum dolor sit amet lorem etur adipiscing elit sed do eiusmod",
    image: serviceDisability,
  },
  {
    title: "Nursing Care",
    description: "Lorem ipsum dolor sit amet lorem etur adipiscing elit sed do eiusmod",
    image: serviceNursing,
  },
  {
    title: "Medical Checkup",
    description: "Lorem ipsum dolor sit amet lorem etur adipiscing elit sed do eiusmod",
    image: serviceMedical,
  },
  {
    title: "Home Aged Care",
    description: "Lorem ipsum dolor sit amet lorem etur adipiscing elit sed do eiusmod",
    image: serviceHome,
  },
];

const Services = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-2xl bg-card overflow-hidden border border-border hover:border-primary/40 transition-all duration-300 shadow-soft hover:shadow-card"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  width={640}
                  height={512}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-7">
                <span className="text-xs font-medium tracking-widest uppercase text-primary mb-2 block">
                  Service
                </span>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                  {s.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {s.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group/link"
                >
                  Learn More
                  <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-primary/10 group-hover/link:bg-primary/20 transition-colors">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
