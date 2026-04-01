import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Stethoscope, Heart, Users, ArrowRight } from "lucide-react";

const highlights = [
  { icon: Stethoscope, title: "Medical Care", desc: "Professional health services" },
  { icon: Heart, title: "Emotional Support", desc: "Compassionate companionship" },
  { icon: Users, title: "Community", desc: "Social engagement programs" },
];

const Index = () => (
  <PageTransition>
    <Navbar />
    <Hero />
    <section className="py-20">
      <div className="container mx-auto">
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl bg-card p-8 shadow-soft border border-border text-center"
            >
              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <h.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{h.title}</h3>
              <p className="text-sm text-muted-foreground">{h.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center space-x-4">
          <Link to="/services" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-teal-dark transition-colors">
            Explore Services <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/about" className="inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors">
            Learn About Us
          </Link>
        </div>
      </div>
    </section>
    <Footer />
  </PageTransition>
);

export default Index;
