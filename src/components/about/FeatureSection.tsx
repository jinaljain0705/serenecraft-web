import { motion } from "framer-motion";
import { Heart, Shield, Sparkles, Leaf } from "lucide-react";

const stats = [
  { value: "10K+", label: "Lives Touched" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "15+", label: "Years Experience" },
  { value: "50+", label: "Expert Advisors" },
];

const FeatureSection = () => (
  <section className="relative">
    {/* Dark green section */}
    <div
      className="relative overflow-hidden py-24 lg:py-32"
      style={{
        background:
          "linear-gradient(180deg, hsl(174 35% 18%) 0%, hsl(174 40% 13%) 100%)",
      }}
    >
      {/* Radial glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, hsl(174 40% 40% / 0.35) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full blur-[80px]"
          style={{
            background:
              "radial-gradient(circle, hsl(174 35% 35% / 0.25) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/3 w-[250px] h-[250px] rounded-full blur-[80px]"
          style={{
            background:
              "radial-gradient(circle, hsl(174 35% 35% / 0.2) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Decorative floating icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[Heart, Shield, Sparkles, Leaf].map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `${20 + i * 18}%`,
              left: i % 2 === 0 ? `${5 + i * 3}%` : undefined,
              right: i % 2 !== 0 ? `${5 + i * 3}%` : undefined,
            }}
            animate={{
              y: [0, -12, 0],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          >
            <Icon
              className="h-8 w-8 lg:h-10 lg:w-10"
              style={{ color: "hsl(174 40% 55% / 0.3)" }}
              strokeWidth={1}
            />
          </motion.div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Empowerment text */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl sm:text-4xl lg:text-[3.5rem] font-bold max-w-4xl mx-auto leading-[1.2] text-center mb-16 lg:mb-20"
          style={{ color: "hsl(45 33% 90%)" }}
        >
          We <span className="text-primary">Empower</span> You With The
          <br className="hidden sm:block" /> Knowledge And Skills You Need
          <br className="hidden sm:block" /> To Strengthen Your Mental Health
        </motion.h2>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 100 }}
              className="text-center group"
            >
              <div
                className="mx-auto mb-3 h-[2px] w-10 rounded-full opacity-40"
                style={{ background: "hsl(var(--primary))" }}
              />
              <p
                className="font-heading text-4xl lg:text-5xl font-bold mb-1"
                style={{ color: "hsl(var(--primary))" }}
              >
                {stat.value}
              </p>
              <p
                className="text-sm lg:text-base font-medium tracking-wide uppercase"
                style={{ color: "hsl(45 33% 80%)" }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default FeatureSection;
