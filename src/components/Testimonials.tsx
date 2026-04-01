import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  { author: "Alen Martin", quote: "Careold has been a blessing for our family. The staff treats my mother with such warmth and professionalism. We couldn't ask for better care.", rating: 5 },
  { author: "Jessica Lee", quote: "The compassion and dedication of the entire team gave us peace of mind. My father has never been happier since joining Careold.", rating: 5 },
  { author: "Michael Brooks", quote: "Outstanding service from day one. The personalized care plan made all the difference for our grandmother's recovery.", rating: 4 },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

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
