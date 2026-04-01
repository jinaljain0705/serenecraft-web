import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import serviceCompanion from "@/assets/service-companion.jpg";
import servicePersonalized from "@/assets/service-personalized.jpg";
import serviceDisability from "@/assets/service-disability.jpg";
import serviceNursing from "@/assets/service-nursing.jpg";

const services = [
  { num: 1, title: "Companion Care", desc: "Professional companionship and social engagement for seniors living independently.", img: serviceCompanion },
  { num: 2, title: "Personalized Care", desc: "Tailored care plans designed around individual health needs and preferences.", img: servicePersonalized },
  { num: 3, title: "Disability Housing", desc: "Accessible and comfortable living spaces designed for seniors with mobility needs.", img: serviceDisability },
  { num: 4, title: "Nursing Care", desc: "Round-the-clock professional nursing services for comprehensive medical support.", img: serviceNursing },
];

const ServicesHome = () => (
  <section className="py-24 bg-mint/30">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-sm font-medium text-primary tracking-wider uppercase">◇ Our Services ◇</span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">
          The Services We Offer To<br />Our Clients
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all"
          >
            {/* Service number tab */}
            <div className="absolute top-0 left-6 z-10 bg-primary/80 text-primary-foreground text-xs font-bold px-3 py-6 rounded-b-lg writing-mode-vertical"
              style={{ writingMode: "vertical-lr", textOrientation: "mixed" }}
            >
              Service {s.num}
            </div>

            <div className="p-6 pt-8 pb-4">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2 ml-10">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed ml-10">{s.desc}</p>
            </div>

            <div className="relative mx-4 mb-4 rounded-2xl overflow-hidden aspect-[4/3]">
              <img src={s.img} alt={s.title} className="w-full h-full object-cover" loading="lazy" width={640} height={512} />
              {/* Curved white overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-card" style={{ borderRadius: "50% 50% 0 0" }}>
                <div className="flex justify-center pt-1">
                  <Link to="/services" className="h-10 w-10 rounded-full border-2 border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="text-center pb-4">
              <Link to="/services" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Learn More
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesHome;
