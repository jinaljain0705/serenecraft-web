import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, ArrowRight } from "lucide-react";
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
    <section id="blog" className="py-24 bg-secondary/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">Our Blog</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Latest <span className="text-gradient-teal">Insights</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Tips, guides, and stories from our care experts.
          </p>
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
                <div className="aspect-[16/9] bg-cream-dark overflow-hidden">
                  {post.cover_image_url && (
                    <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Calendar className="h-3.5 w-3.5" />
                    {post.published_at && new Date(post.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    <span>·</span>
                    <span>{post.author}</span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    Read More <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/blog" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-teal-dark transition-colors">
            View All Posts <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
