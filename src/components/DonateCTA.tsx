import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const DonateCTA = () => (
  <section className="py-16">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-3xl bg-teal/20 overflow-hidden px-8 py-16 text-center"
      >
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-peach rounded-full translate-x-1/2 translate-y-1/2" />

        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4 relative z-10">
          Help Us Help Others
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto mb-8 relative z-10">
          Your generous support helps us provide exceptional care to seniors in need.
          Please donate today to help us save, support, and change lives.
        </p>
        <Link
          to="/contact"
          className="inline-block relative z-10 rounded-lg border-2 border-foreground px-8 py-3 text-sm font-medium text-foreground hover:bg-foreground hover:text-background transition-colors"
        >
          Donate Today
        </Link>
      </motion.div>
    </div>
  </section>
);

export default DonateCTA;
