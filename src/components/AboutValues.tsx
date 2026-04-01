import { motion } from "framer-motion";
import { Handshake, Users, HeartHandshake } from "lucide-react";

const values = [
  {
    icon: Handshake,
    title: "Guidance You\nCan Trust",
    description: "Expert-led care strategies and personalized guidance for every senior's well-being",
    bg: "bg-accent/50",
    iconBg: "bg-accent/80",
  },
  {
    icon: Users,
    title: "We are\nCareold",
    description: "A compassionate team dedicated to providing exceptional senior care services",
    bg: "bg-peach/60",
    iconBg: "bg-accent/60",
  },
  {
    icon: HeartHandshake,
    title: "Support You Can\nReply On",
    description: "Reliable round-the-clock support for seniors and their families",
    bg: "bg-lemon/60",
    iconBg: "bg-accent/60",
  },
];

const AboutValues = () => (
  <section className="relative">
    {/* Cards row */}
    <div className="container mx-auto px-4 relative z-10">
      <div className="grid md:grid-cols-3 gap-6 -mb-16">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className={`${v.bg} rounded-2xl p-8 text-center`}
          >
            <div className={`${v.iconBg} h-16 w-16 rounded-xl flex items-center justify-center mx-auto mb-5`}>
              <v.icon className="h-8 w-8 text-teal-dark" />
            </div>
            <h3 className="font-heading text-xl font-bold text-foreground whitespace-pre-line mb-3">
              {v.title}
            </h3>
            <p className="text-sm text-muted-foreground">{v.description}</p>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Dark green banner */}
    <div className="bg-foreground pt-28 pb-20 text-center px-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-background max-w-4xl mx-auto leading-tight"
      >
        We <span className="text-primary">Empower</span> You With The Knowledge And Skills You Need To Strengthen Your Well-being
      </motion.h2>
    </div>
  </section>
);

export default AboutValues;
