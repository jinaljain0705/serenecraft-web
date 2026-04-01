import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const { data: testimonials = [] } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at");
      if (error) throw error;
      return data;
    },
  });

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  if (!testimonials.length) return null;
  const t = testimonials[current];

  return (
    <section id="testimonials" className="py-24 bg-secondary/50">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">Testimonials</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
            What Families <span className="text-gradient-teal">Say</span>
          </h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl bg-card p-10 shadow-card text-center border border-border"
            >
              <Quote className="h-10 w-10 text-primary/30 mx-auto mb-6" />
              <p className="text-foreground text-lg leading-relaxed mb-6 font-body italic">
                "{t.quote}"
              </p>
              <div className="flex justify-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < t.rating ? "text-primary fill-primary" : "text-border"}`} />
                ))}
              </div>
              <p className="font-heading font-semibold text-foreground">{t.author}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-3 mt-8">
            <button onClick={prev} className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} className={`h-2.5 w-2.5 rounded-full transition-colors ${i === current ? "bg-primary" : "bg-border"}`} />
            ))}
            <button onClick={next} className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
