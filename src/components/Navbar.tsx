import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ShoppingCart, Lock } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/hooks/useCart";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Pricing", to: "/pricing" },
  { label: "Shop", to: "/shop" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-5">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-foreground">
            <path d="M8 24V14L16 8L24 14V24H20V18H12V24H8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M4 28H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="font-heading text-2xl font-bold text-foreground">Careold</span>
        </Link>

        {/* Desktop nav - centered */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`text-sm font-body font-medium transition-colors ${
                  location.pathname === l.to ? "text-primary" : "text-foreground hover:text-primary"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side - phone + cart */}
        <div className="hidden lg:flex items-center gap-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Phone className="h-4 w-4 text-foreground" />
            </div>
            <span className="text-sm font-medium text-foreground">+1 (800) 123-4567</span>
          </div>
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-5 w-5 text-foreground" />
            <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-teal text-[10px] font-bold text-card flex items-center justify-center">
              {totalItems}
            </span>
          </Link>
          <Link to="/admin/login" className="text-muted-foreground hover:text-primary transition-colors" title="Admin">
            <Lock className="h-4 w-4" />
          </Link>
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-5 w-5 text-foreground" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-teal text-[10px] font-bold text-card flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button onClick={() => setOpen(!open)} className="text-foreground" aria-label="Toggle menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-card border-b border-border"
          >
            <ul className="flex flex-col gap-4 p-6">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={`font-body transition-colors ${
                      location.pathname === l.to ? "text-primary font-medium" : "text-foreground hover:text-primary"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/admin/login" onClick={() => setOpen(false)} className="font-body text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Lock className="h-4 w-4" /> Admin
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
