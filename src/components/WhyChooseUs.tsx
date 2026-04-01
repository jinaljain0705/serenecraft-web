import { motion } from "framer-motion";
import { HeartPulse, Heart, Accessibility, MonitorCheck } from "lucide-react";

const items = [
  { icon: HeartPulse, title: "Emotional Support", desc: "Compassionate emotional care for every resident", bg: "bg-lemon" },
  { icon: Heart, title: "More Value", desc: "Premium care services at competitive pricing", bg: "bg-peach" },
  { icon: Accessibility, title: "More Support", desc: "Expanded support systems for families", bg: "bg-mint" },
  { icon: MonitorCheck, title: "More Control", desc: "Full transparency and family involvement", bg: "bg-teal/20" },
];

const WhyChooseUs = () => (
  <section className="py-24">
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-medium text-primary tracking-wider uppercase">◇ Why Choose Us</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3 mb-6">
            We Think We Can<br />Preserve More Lives
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Our commitment to excellence in senior care sets us apart. With decades of experience
            and a team of dedicated professionals, we provide unmatched support for our residents.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`${item.bg} rounded-2xl p-6 text-center`}
            >
              <div className="h-12 w-12 rounded-lg bg-muted/30 flex items-center justify-center mx-auto mb-4">
                <item.icon className="h-6 w-6 text-foreground/70" />
              </div>
              <h4 className="font-heading font-semibold text-foreground mb-2">{item.title}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
