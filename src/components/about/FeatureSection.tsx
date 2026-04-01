import { motion } from "framer-motion";
import { Handshake, Users, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: Handshake,
    title: "Guidance You\nCan Trust",
    description: "Lorem ipsum dolor sit amet gravida risus commodo viverra",
    bg: "bg-[hsl(165_40%_85%/0.5)]",
    iconBg: "bg-[hsl(165_40%_85%/0.8)]",
  },
  {
    icon: Users,
    title: "We are\nVirtus Care",
    description: "Lorem ipsum dolor sit amet gravida risus commodo viverra",
    bg: "bg-[hsl(15_60%_92%/0.6)]",
    iconBg: "bg-[hsl(165_40%_92%/0.6)]",
  },
  {
    icon: HeartHandshake,
    title: "Support You Can\nReply On",
    description: "Lorem ipsum dolor sit amet gravida risus commodo viverra",
    bg: "bg-[hsl(60_50%_90%/0.6)]",
    iconBg: "bg-[hsl(165_40%_92%/0.6)]",
  },
];

const FeatureSection = () => (
  <section className="relative">
    {/* Top white area for card overlap */}
    <div className="h-56 bg-background" />

    {/* Dark green section */}
    <div className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(174 35% 18%) 0%, hsl(174 40% 13%) 100%)" }}>
      {/* Radial glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px]" style={{ background: "radial-gradient(circle, hsl(174 40% 40% / 0.35) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full blur-[80px]" style={{ background: "radial-gradient(circle, hsl(174 35% 35% / 0.25) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-1/3 w-[250px] h-[250px] rounded-full blur-[80px]" style={{ background: "radial-gradient(circle, hsl(174 35% 35% / 0.2) 0%, transparent 70%)" }} />
      </div>

      {/* Cards overlapping */}
      <div className="max-w-5xl mx-auto px-4 relative z-10 -mt-56">
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`${f.bg} rounded-3xl p-10 pt-8 text-center shadow-xl`}
            >
              <div className={`${f.iconBg} h-20 w-20 rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                <f.icon className="h-10 w-10 text-foreground/70" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground whitespace-pre-line mb-4">
                {f.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
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
          className="font-heading text-3xl sm:text-4xl lg:text-[3.5rem] font-bold max-w-4xl mx-auto leading-[1.2]"
          style={{ color: "hsl(45 33% 90%)" }}
        >
          We <span className="text-primary">Empower</span> You With The
          <br className="hidden sm:block" /> Knowledge And Skills You Need
          <br className="hidden sm:block" /> To Strengthen Your Mental
        </motion.h2>
      </div>
    </div>
  </section>
);

export default FeatureSection;
