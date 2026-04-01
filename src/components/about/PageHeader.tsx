import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  breadcrumbs: { label: string; to?: string }[];
}

const PageHeader = ({ title, breadcrumbs }: PageHeaderProps) => (
  <section className="relative py-20 overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(174 35% 20%) 0%, hsl(174 40% 12%) 100%)" }}>
    {/* Decorative shape */}
    <div className="absolute inset-0 pointer-events-none opacity-10">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-teal blur-[80px]" />
    </div>
    <div className="container mx-auto px-4 relative z-10 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4"
      >
        {title}
      </motion.h2>
      <ul className="flex items-center justify-center gap-2 text-sm">
        {breadcrumbs.map((crumb, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span className="text-white/50">›</span>}
            {crumb.to ? (
              <Link to={crumb.to} className="text-white/70 hover:text-primary transition-colors">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-primary">{crumb.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default PageHeader;
