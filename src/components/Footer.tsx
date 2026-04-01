import { useState } from "react";
import { Heart, Facebook, Twitter, Linkedin, Instagram, Calendar, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

const links = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "About us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const socials = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: posts } = useQuery({
    queryKey: ["footer-blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("title, slug, cover_image_url, published_at")
        .eq("published", true)
        .order("published_at", { ascending: false })
        .limit(2);
      if (error) throw error;
      return data;
    },
  });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    const { error } = await supabase.from("newsletter_subscribers").insert({ email: email.trim() });
    setLoading(false);
    if (error) {
      if (error.code === "23505") toast.error("You're already subscribed!");
      else toast.error("Something went wrong. Please try again.");
    } else {
      toast.success("Successfully subscribed!");
      setEmail("");
    }
  };

  return (
    <footer>
      {/* Main footer */}
      <div className="bg-foreground pt-16 pb-12">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <Link to="/" className="flex items-center gap-2 mb-5">
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="text-primary">
                  <path d="M8 24V14L16 8L24 14V24H20V18H12V24H8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M4 28H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span className="font-heading text-2xl font-bold text-card">Careold</span>
              </Link>
              <p className="text-sm text-card/60 leading-relaxed mb-8">
                Over 20 years of experience we'll ensure you get the best guidance Senior Care.
              </p>
              <div className="text-teal">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M20 5L23 12L30 12L24.5 17L26.5 24L20 20L13.5 24L15.5 17L10 12L17 12Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M12 28H28" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M14 32H26" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-heading text-lg font-semibold text-card mb-6">Links</h4>
              <ul className="space-y-4">
                {links.map((l) => (
                  <li key={l.to} className="flex items-center gap-2">
                    <Heart className="h-3 w-3 text-primary" fill="hsl(var(--primary))" />
                    <Link to={l.to} className="text-sm text-card/60 hover:text-primary transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Post */}
            <div>
              <h4 className="font-heading text-lg font-semibold text-card mb-6">Popular Post</h4>
              <div className="space-y-5">
                {posts?.map((post) => (
                  <Link key={post.slug} to={`/blog/${post.slug}`} className="flex items-start gap-3 group">
                    <div className="h-14 w-14 rounded-full overflow-hidden shrink-0 bg-card/10">
                      {post.cover_image_url && (
                        <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover" loading="lazy" />
                      )}
                    </div>
                    <div>
                      {post.published_at && (
                        <div className="flex items-center gap-1.5 text-xs text-card/40 mb-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.published_at).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                        </div>
                      )}
                      <p className="text-sm text-card/80 font-medium leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <h4 className="font-heading text-lg font-semibold text-card">Newsletter</h4>
                <span className="text-card/20 text-2xl">✦</span>
              </div>
              <p className="text-sm text-card/60 leading-relaxed mb-6">
                Mental health and wellness tips, our latest guides, resources, and more.
              </p>
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 rounded-full bg-card/10 border border-card/20 pl-5 pr-14 text-sm text-card placeholder:text-card/40 focus:outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-1.5 top-1.5 h-9 w-9 rounded-full bg-teal flex items-center justify-center text-card hover:bg-teal-dark transition-colors disabled:opacity-50"
                >
                  <Send className="h-4 w-4 -rotate-45" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-primary py-4">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-primary-foreground/80">
            © Copyright {new Date().getFullYear()} by Careold. All rights reserved.
          </p>
          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="h-8 w-8 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/70 hover:bg-primary-foreground/20 transition-colors"
              >
                <s.icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
