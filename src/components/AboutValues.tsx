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
    {/* Top white area behind cards */}
    <div className="h-48 bg-background" />

    {/* Dark green section with radial glow */}
    <div className="relative bg-foreground overflow-hidden">
      {/* Radial green glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-teal/20 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-teal/15 blur-[80px]" />
      </div>

      {/* Cards overlapping both sections */}
      <div className="container mx-auto px-4 relative z-10 -mt-48">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`${v.bg} rounded-2xl p-8 pt-6 text-center shadow-lg`}
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

      {/* Empowerment text */}
      <div className="relative z-10 pb-20 pt-4 text-center px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-background max-w-4xl mx-auto leading-tight"
        >
          We <span className="text-primary">Empower</span> You With The Knowledge And Skills You Need To Strengthen Your Mental
        </motion.h2>
      </div>
    </div>
  </section>
);

export default AboutValues;
