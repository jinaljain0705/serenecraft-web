import { motion } from "framer-motion";
import { Settings, Users, HeartHandshake } from "lucide-react";

const cards = [
  {
    icon: Settings,
    title: "Guidance You Can Trust",
    desc: "Expert professionals providing reliable guidance for every step of senior care.",
    bg: "bg-mint",
  },
  {
    icon: Users,
    title: "We are Virtus Care",
    desc: "A dedicated team committed to enhancing quality of life for every senior.",
    bg: "bg-peach",
  },
  {
    icon: HeartHandshake,
    title: "Support You Can Reply On",
    desc: "Dependable support systems ensuring peace of mind for families and loved ones.",
    bg: "bg-lemon",
  },
];

const ValueProps = () => (
  <section className="py-20">
    <div className="container mx-auto">
      <div className="grid sm:grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`${c.bg} rounded-2xl p-8 text-center`}
          >
            <div className="h-16 w-16 rounded-xl bg-muted/50 flex items-center justify-center mx-auto mb-5">
              <c.icon className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-3">{c.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ValueProps;
