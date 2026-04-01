import { Heart } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground py-12">
    <div className="container mx-auto text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Heart className="h-6 w-6 text-primary" fill="hsl(var(--primary))" />
        <span className="font-heading text-xl font-bold text-primary-foreground">Careold</span>
      </div>
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Careold. Compassionate Senior Care.
      </p>
    </div>
  </footer>
);

export default Footer;
