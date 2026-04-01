import { motion } from "framer-motion";
import { Heart, Gem, PersonStanding, Settings } from "lucide-react";

const items = [
  {
    icon: Heart,
    title: "Emotional Support",
    description: "Various versions have evolved over the years, sometimes",
    accent: "bg-primary/15",
  },
  {
    icon: Gem,
    title: "More Value",
    description: "Various versions have evolved over the years, sometimes",
    accent: "bg-peach/60",
  },
  {
    icon: PersonStanding,
    title: "More Support",
    description: "Various versions have evolved over the years, sometimes",
    accent: "bg-secondary",
  },
  {
    icon: Settings,
    title: "More Control",
    description: "Various versions have evolved over the years, sometimes",
    accent: "bg-accent/50",
  },
];

const WhyChooseSection = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-4">
      {/* Header row */}
      <div className="grid xl:grid-cols-12 gap-8 mb-12">
        <div className="xl:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-3 h-3 rounded-full border-2 border-primary" />
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">Why Choose Us</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              We Think We Can Preserve More Lives
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing do eiusmod tempor incididunt labore et dolore magna.
            </p>
          </motion.div>
        </div>

        <div className="xl:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden h-64 xl:h-full"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&h=400&fit=crop)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-foreground/40" />
            <div className="absolute bottom-6 left-6 bg-card rounded-2xl shadow-lg p-5 flex items-center gap-4">
              <div>
                <p className="font-heading text-3xl font-bold text-foreground">20+</p>
                <p className="text-sm text-muted-foreground">Years Of Experience</p>
              </div>
              <span className="text-primary text-2xl">✦</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow"
          >
            <div className={`${item.accent} h-14 w-14 rounded-xl flex items-center justify-center mb-4`}>
              <item.icon className="h-7 w-7 text-foreground/70" />
            </div>
            <h4 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseSection;
