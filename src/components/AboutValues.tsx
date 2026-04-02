import { motion } from "framer-motion";
import { Handshake, Users, HeartHandshake } from "lucide-react";

const values = [
  {
    icon: Handshake,
    title: "Guidance You\nCan Trust",
    description: "Lorem ipsum dolor sit amet gravida risus commodo viverra",
    bg: "bg-accent/50",
    iconBg: "bg-accent/80",
  },
  {
    icon: Users,
    title: "We are\nVirtus Care",
    description: "Lorem ipsum dolor sit amet gravida risus commodo viverra",
    bg: "bg-peach/60",
    iconBg: "bg-accent/60",
  },
  {
    icon: HeartHandshake,
    title: "Support You Can\nReply On",
    description: "Lorem ipsum dolor sit amet gravida risus commodo viverra",
    bg: "bg-lemon/60",
    iconBg: "bg-accent/60",
  },
];

const AboutValues = () => (
  <section className="relative">
    {/* Top white area behind cards */}
    <div className="h-80 bg-background" />

    {/* Dark green section with radial glow */}
    <div className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(174 35% 20%) 0%, hsl(174 40% 15%) 100%)" }}>
      {/* Radial green glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px]" style={{ background: "radial-gradient(circle, hsl(174 40% 40% / 0.4) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full blur-[80px]" style={{ background: "radial-gradient(circle, hsl(174 35% 35% / 0.3) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-1/4 w-[250px] h-[250px] rounded-full blur-[80px]" style={{ background: "radial-gradient(circle, hsl(174 35% 35% / 0.25) 0%, transparent 70%)" }} />
      </div>

      {/* Cards overlapping both sections */}
      <div className="max-w-5xl mx-auto px-4 relative z-10 -mt-56">
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`${v.bg} rounded-3xl p-10 pt-8 text-center shadow-xl`}
            >
              <div className={`${v.iconBg} h-20 w-20 rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                <v.icon className="h-10 w-10 text-foreground/70" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground whitespace-pre-line mb-4">
                {v.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Empowerment text */}
      <div className="relative z-10 pb-24 pt-4 text-center px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl sm:text-4xl lg:text-[3.5rem] font-bold max-w-4xl mx-auto leading-[1.2] italic"
          style={{ color: "hsl(45 33% 90%)" }}
        >
          We <span className="text-primary not-italic">Empower</span> You With The Knowledge And Skills You Need To Strengthen Your Mental Health
        </motion.h2>
      </div>
    </div>
  </section>
);

export default AboutValues;
