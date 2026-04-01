import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
  { num: "01", title: "Short-Term Care" },
  { num: "02", title: "Respite Senior Care" },
  { num: "03", title: "Tips For Healthy Aging" },
  { num: "04", title: "Mindful Breathing Meditation" },
  { num: "05", title: "Safety And Happiness Of Your Senior Family" },
];

const ProjectsList = () => (
  <section className="py-20">
    <div className="container mx-auto max-w-3xl">
      <div className="flex items-start justify-between mb-10">
        <div>
          <span className="text-sm font-medium text-primary tracking-wider uppercase">◇ Explore Works</span>
          <h2 className="font-heading text-3xl font-bold text-foreground mt-3">
            See Our Clients' Successful<br />Projects Details
          </h2>
        </div>
        <Link
          to="/services"
          className="shrink-0 h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold hover:bg-gold-dark transition-colors"
        >
          More
        </Link>
      </div>

      <div className="space-y-0">
        {projects.map((p, i) => (
          <motion.div
            key={p.num}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center justify-between py-5 border-b border-border group hover:border-primary transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-6">
              <span className="font-heading text-2xl font-bold text-muted-foreground/40 group-hover:text-primary transition-colors">
                {p.num}
              </span>
              <span className="font-heading font-semibold text-foreground">{p.title}</span>
            </div>
            <div className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:bg-teal group-hover:border-teal group-hover:text-card transition-colors">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsList;
