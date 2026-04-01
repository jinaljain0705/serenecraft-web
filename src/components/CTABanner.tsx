import { Link } from "react-router-dom";

const CTABanner = () => (
  <section className="py-6">
    <div className="container mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border-2 border-foreground px-8 py-4">
        <div className="flex items-center gap-3">
          <span className="text-primary text-xl">⭐</span>
          <p className="font-heading font-semibold text-foreground text-sm sm:text-base">
            We Have A Track Record Of Providing Excellent Care.
          </p>
        </div>
        <Link
          to="/contact"
          className="shrink-0 rounded-lg border-2 border-foreground px-6 py-2.5 text-sm font-medium text-foreground hover:bg-foreground hover:text-background transition-colors"
        >
          Get In Touch
        </Link>
      </div>
    </div>
  </section>
);

export default CTABanner;
