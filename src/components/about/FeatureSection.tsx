import { motion } from "framer-motion";

const FeatureSection = () => (
  <section className="relative">
    {/* Dark green section */}
    <div className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(174 35% 18%) 0%, hsl(174 40% 13%) 100%)" }}>
      {/* Radial glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px]" style={{ background: "radial-gradient(circle, hsl(174 40% 40% / 0.35) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full blur-[80px]" style={{ background: "radial-gradient(circle, hsl(174 35% 35% / 0.25) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-1/3 w-[250px] h-[250px] rounded-full blur-[80px]" style={{ background: "radial-gradient(circle, hsl(174 35% 35% / 0.2) 0%, transparent 70%)" }} />
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
          <br className="hidden sm:block" /> To Strengthen Your Mental Health
        </motion.h2>
      </div>
    </div>
  </section>
);

export default FeatureSection;
