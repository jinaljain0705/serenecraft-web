import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const TestimonialsSection = () => {
  const { data: testimonials = [] } = useQuery({
    queryKey: ["about-testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(4);
      if (error) throw error;
      return data;
    },
  });

  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-3 h-3 rounded-full border-2 border-primary" />
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">Our Testimonials</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
            What People Say About Us
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-8 shadow-sm relative"
            >
              <div className="flex items-center justify-between mb-4">
                <Quote className="h-8 w-8 text-primary/30" />
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">{t.quote}</p>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/15 flex items-center justify-center font-heading font-bold text-primary text-lg">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground">{t.author}</h4>
                  <p className="text-xs text-muted-foreground">Senior Care & Founder</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
