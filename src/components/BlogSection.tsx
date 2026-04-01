import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const BlogSection = () => {
  const { data: posts } = useQuery({
    queryKey: ["blog-posts-home"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, author, cover_image_url, published_at")
        .eq("published", true)
        .order("published_at", { ascending: false })
        .limit(3);
      if (error) throw error;
      return data;
    },
  });

  if (!posts?.length) return null;

  return (
    <section className="py-24">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary tracking-wider uppercase">◇ Latest Blog ◇</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">
            Read Our Latest Articles<br />Post From Blog
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="group block rounded-2xl bg-card border border-border shadow-soft hover:shadow-card transition-all duration-300 overflow-hidden"
              >
                <div className="relative aspect-[16/10] bg-cream-dark overflow-hidden">
                  {post.cover_image_url && (
                    <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  )}
                  {post.published_at && (
                    <div className="absolute bottom-4 left-4 bg-teal rounded-lg px-3 py-2 text-card text-center leading-tight">
                      <div className="text-lg font-bold">{new Date(post.published_at).getDate().toString().padStart(2, "0")}</div>
                      <div className="text-[10px] uppercase">{new Date(post.published_at).toLocaleDateString("en-US", { month: "short" })}</div>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <span>By {post.author}</span>
                  </div>
                  <h3 className="font-heading text-base font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                    → Learn More
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
