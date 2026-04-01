import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const TestimonialsHome = () => {
  const { data: testimonials = [] } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase.from("testimonials").select("*").order("created_at").limit(2);
      if (error) throw error;
      return data;
    },
  });

  if (!testimonials.length) return null;

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary tracking-wider uppercase">◇ Our Testimonials ◇</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">
            See Why 1,264 People Last<br />Year Choose Careold
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-soft border border-border"
            >
              <div className="flex items-center justify-between mb-4">
                <Quote className="h-8 w-8 text-teal" />
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className={`h-4 w-4 ${j < t.rating ? "text-primary fill-primary" : "text-border"}`} />
                  ))}
                </div>
              </div>
              <div className="h-1 w-full bg-teal/30 rounded mb-4" />
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {t.quote}
              </p>
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-heading font-semibold text-foreground text-sm">{t.author}</p>
                  <p className="text-xs text-muted-foreground">Senior Care & Family</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsHome;
