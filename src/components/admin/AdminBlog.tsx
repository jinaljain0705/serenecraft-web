import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import { toast } from "sonner";

const PER_PAGE = 8;
const inputClass = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition";

const AdminBlog = () => {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Tables<"blog_posts"> | null>(null);
  const [adding, setAdding] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");

  const { data: items = [] } = useQuery({
    queryKey: ["admin-blog"],
    queryFn: async () => { const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false }); if (error) throw error; return data; },
  });

  const filtered = useMemo(() => {
    let result = items.filter(i => i.title.toLowerCase().includes(search.toLowerCase()) || i.author.toLowerCase().includes(search.toLowerCase()));
    if (filterStatus === "published") result = result.filter(i => i.published);
    if (filterStatus === "draft") result = result.filter(i => !i.published);
    return result;
  }, [items, search, filterStatus]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const deleteMut = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("blog_posts").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-blog"] }); toast.success("Post deleted"); },
  });

  const upsertMut = useMutation({
    mutationFn: async (item: TablesInsert<"blog_posts"> & { id?: string }) => {
      if (item.id) { const { id, ...rest } = item; const { error } = await supabase.from("blog_posts").update(rest as TablesUpdate<"blog_posts">).eq("id", id); if (error) throw error; }
      else { const { error } = await supabase.from("blog_posts").insert([item]); if (error) throw error; }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-blog"] }); setEditing(null); setAdding(false); toast.success("Post saved"); },
    onError: (e) => toast.error(e.message),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search posts..." />
          <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value as typeof filterStatus); setPage(1); }} className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground">
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
        <button onClick={() => setAdding(true)} className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"><Plus className="h-4 w-4" /> Add Post</button>
      </div>

      {(adding || editing) && <BlogForm initial={editing} onSave={(data) => upsertMut.mutate(data)} onCancel={() => { setAdding(false); setEditing(null); }} saving={upsertMut.isPending} />}

      <div className="grid gap-3">
        {paginated.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-xl bg-card p-4 border border-border shadow-soft hover:shadow-card transition-shadow">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium text-foreground">{item.title}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${item.published ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>{item.published ? "Published" : "Draft"}</span>
              </div>
              <p className="text-sm text-muted-foreground truncate max-w-md">{item.excerpt}</p>
            </div>
            <div className="flex gap-2 shrink-0 ml-4">
              <button onClick={() => setEditing(item)} className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"><Pencil className="h-4 w-4" /></button>
              <button onClick={() => { if (confirm("Delete this post?")) deleteMut.mutate(item.id); }} className="h-8 w-8 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive hover:bg-destructive/20 transition-colors"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
        {paginated.length === 0 && <p className="text-sm text-muted-foreground">No posts found.</p>}
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

function BlogForm({ initial, onSave, onCancel, saving }: {
  initial: Tables<"blog_posts"> | null;
  onSave: (data: TablesInsert<"blog_posts"> & { id?: string }) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [author, setAuthor] = useState(initial?.author ?? "Careold Team");
  const [coverUrl, setCoverUrl] = useState(initial?.cover_image_url ?? "");
  const [published, setPublished] = useState(initial?.published ?? false);

  const autoSlug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) { toast.error("Title and slug are required"); return; }
    onSave({ id: initial?.id, title, slug, excerpt, content, author, cover_image_url: coverUrl || null, published, published_at: published ? (initial?.published_at ?? new Date().toISOString()) : null });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl bg-card p-6 border border-primary/30 shadow-card space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input value={title} onChange={(e) => { setTitle(e.target.value); if (!initial) setSlug(autoSlug(e.target.value)); }} placeholder="Post Title *" className={inputClass} required />
        <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="slug-url *" className={inputClass} required />
      </div>
      <input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Short excerpt..." className={inputClass} />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Full content..." rows={10} className={inputClass} />
      <div className="grid sm:grid-cols-3 gap-4 items-center">
        <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" className={inputClass} />
        <input value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} placeholder="Cover Image URL" className={inputClass} />
        <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="rounded border-border" /> Published
        </label>
      </div>
      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50">{saving ? "Saving..." : initial ? "Update" : "Create"}</button>
        <button type="button" onClick={onCancel} className="rounded-lg bg-secondary px-5 py-2 text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors">Cancel</button>
      </div>
    </form>
  );
}

export default AdminBlog;
