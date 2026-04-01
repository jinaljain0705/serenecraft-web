import { motion } from "framer-motion";
import { Stethoscope, Home, Heart, Clock, Users, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const iconMap: Record<string, LucideIcon> = {
  stethoscope: Stethoscope,
  home: Home,
  heart: Heart,
  clock: Clock,
  users: Users,
  shield: Shield,
};

const Services = () => {
  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  return (
    <section id="services" className="py-24 bg-secondary/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">Our Services</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Comprehensive Care <span className="text-gradient-teal">Solutions</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We offer a wide range of senior care services designed to enhance quality of life.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services?.map((s, i) => {
            const Icon = iconMap[s.icon] || Heart;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl bg-card p-8 shadow-soft hover:shadow-card transition-all duration-300 border border-border hover:border-primary/30"
              >
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
