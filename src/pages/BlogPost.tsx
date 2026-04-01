import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, ArrowLeft, User } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug!)
        .eq("published", true)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-24 flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-2xl font-bold text-foreground mb-2">Post Not Found</h1>
            <Link to="/blog" className="text-primary hover:underline text-sm">← Back to Blog</Link>
          </div>
        </div>
      </>
    );
  }

  // Simple markdown-like rendering: split by ## headings and paragraphs
  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, i) => {
      if (block.startsWith("## ")) {
        return <h2 key={i} className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">{block.replace("## ", "")}</h2>;
      }
      if (block.startsWith("- ")) {
        const items = block.split("\n").filter(l => l.startsWith("- "));
        return (
          <ul key={i} className="list-disc list-inside space-y-2 mb-6 text-muted-foreground">
            {items.map((item, j) => {
              const text = item.replace("- ", "");
              // Handle bold
              const parts = text.split(/\*\*(.*?)\*\*/g);
              return (
                <li key={j}>
                  {parts.map((part, k) => k % 2 === 1 ? <strong key={k} className="text-foreground">{part}</strong> : part)}
                </li>
              );
            })}
          </ul>
        );
      }
      if (/^\d+\./.test(block)) {
        const items = block.split("\n").filter(l => /^\d+\./.test(l));
        return (
          <ol key={i} className="list-decimal list-inside space-y-2 mb-6 text-muted-foreground">
            {items.map((item, j) => (
              <li key={j}>{item.replace(/^\d+\.\s*/, "")}</li>
            ))}
          </ol>
        );
      }
      return <p key={i} className="text-muted-foreground leading-relaxed mb-4">{block}</p>;
    });
  };

  return (
    <>
      <Navbar />
      <article className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Link>

            {post.cover_image_url && (
              <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-8 shadow-card">
                <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-1.5"><User className="h-4 w-4" /> {post.author}</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {post.published_at && new Date(post.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-8">{post.title}</h1>

            <div className="prose-like">
              {renderContent(post.content)}
            </div>
          </motion.div>
        </div>
      </article>
      <Footer />
    </>
  );
};

export default BlogPost;
