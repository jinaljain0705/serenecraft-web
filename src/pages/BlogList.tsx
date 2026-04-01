import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Calendar, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const BlogList = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts-all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, author, cover_image_url, published_at")
        .eq("published", true)
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <PageTransition>
      <Navbar />
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
            <h1 className="font-heading text-4xl font-bold text-foreground mb-4">
              Our <span className="text-gradient-teal">Blog</span>
            </h1>
            <p className="text-muted-foreground max-w-xl">
              Insights, guides, and stories from our senior care experts.
            </p>
          </motion.div>

          {isLoading && <p className="text-muted-foreground">Loading posts...</p>}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts?.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
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
                    <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
};

export default BlogList;
