import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { LogOut, Plus, Pencil, Trash2, Heart, LayoutGrid, Users, MessageSquare, Mail, FileText, ShoppingBag } from "lucide-react";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

type Tab = "services" | "team" | "testimonials" | "submissions" | "blog" | "orders";

const AdminDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const [tab, setTab] = useState<Tab>("services");

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><p className="text-muted-foreground">Loading...</p></div>;
  if (!user) return <Navigate to="/admin/login" />;
  if (!isAdmin) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <p className="text-foreground font-heading text-xl mb-2">Access Denied</p>
        <p className="text-muted-foreground text-sm mb-4">You don't have admin privileges.</p>
        <button onClick={signOut} className="text-sm text-primary underline">Sign Out</button>
      </div>
    </div>
  );

  const tabs: { key: Tab; label: string; icon: typeof LayoutGrid }[] = [
    { key: "services", label: "Services", icon: LayoutGrid },
    { key: "team", label: "Team", icon: Users },
    { key: "testimonials", label: "Testimonials", icon: MessageSquare },
    { key: "submissions", label: "Submissions", icon: Mail },
    { key: "blog", label: "Blog Posts", icon: FileText },
    { key: "orders", label: "Orders", icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" fill="hsl(var(--primary))" />
            <span className="font-heading text-xl font-bold text-foreground">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">{user.email}</span>
            <button onClick={signOut} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors whitespace-nowrap ${
                tab === t.key ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </div>

        {tab === "services" && <ServicesPanel />}
        {tab === "team" && <TeamPanel />}
        {tab === "testimonials" && <TestimonialsPanel />}
        {tab === "submissions" && <SubmissionsPanel />}
        {tab === "blog" && <BlogPanel />}
        {tab === "orders" && <OrdersPanel />}
      </div>
    </div>
  );
};

// --- Reusable CRUD components ---
const inputClass = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition";

function ServicesPanel() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Tables<"services"> | null>(null);
  const [adding, setAdding] = useState(false);

  const { data: items = [] } = useQuery({
    queryKey: ["admin-services"],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const deleteMut = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-services"] }),
  });

  const upsertMut = useMutation({
    mutationFn: async (item: TablesInsert<"services"> & { id?: string }) => {
      if (item.id) {
        const { id, ...rest } = item;
        const { error } = await supabase.from("services").update(rest as TablesUpdate<"services">).eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("services").insert([item]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-services"] });
      setEditing(null);
      setAdding(false);
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold text-foreground">Services</h2>
        <button onClick={() => setAdding(true)} className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-teal-dark transition-colors">
          <Plus className="h-4 w-4" /> Add Service
        </button>
      </div>

      {(adding || editing) && (
        <ServiceForm
          initial={editing}
          onSave={(data) => upsertMut.mutate(data)}
          onCancel={() => { setAdding(false); setEditing(null); }}
          saving={upsertMut.isPending}
        />
      )}

      <div className="grid gap-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-xl bg-card p-4 border border-border shadow-soft">
            <div>
              <p className="font-medium text-foreground">{item.title}</p>
              <p className="text-sm text-muted-foreground truncate max-w-md">{item.description}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditing(item)} className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <Pencil className="h-4 w-4" />
              </button>
              <button onClick={() => deleteMut.mutate(item.id)} className="h-8 w-8 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive hover:bg-destructive/20 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServiceForm({ initial, onSave, onCancel, saving }: {
  initial: Tables<"services"> | null;
  onSave: (data: TablesInsert<"services"> & { id?: string }) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [icon, setIcon] = useState(initial?.icon ?? "heart");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [sortOrder, setSortOrder] = useState(initial?.sort_order ?? 0);

  return (
    <div className="rounded-xl bg-card p-6 border border-primary/30 shadow-card mb-6 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className={inputClass} />
        <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="Slug" className={inputClass} />
      </div>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" rows={3} className={inputClass} />
      <div className="grid sm:grid-cols-2 gap-4">
        <input value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="Icon (e.g. heart, shield)" className={inputClass} />
        <input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} placeholder="Sort Order" className={inputClass} />
      </div>
      <div className="flex gap-3">
        <button onClick={() => onSave({ id: initial?.id, title, description, icon, slug, sort_order: sortOrder })} disabled={saving} className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-teal-dark transition-colors disabled:opacity-50">
          {saving ? "Saving..." : initial ? "Update" : "Create"}
        </button>
        <button onClick={onCancel} className="rounded-lg bg-secondary px-5 py-2 text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors">Cancel</button>
      </div>
    </div>
  );
}

function TeamPanel() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Tables<"team_members"> | null>(null);
  const [adding, setAdding] = useState(false);

  const { data: items = [] } = useQuery({
    queryKey: ["admin-team"],
    queryFn: async () => {
      const { data, error } = await supabase.from("team_members").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const deleteMut = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("team_members").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-team"] }),
  });

  const upsertMut = useMutation({
    mutationFn: async (item: TablesInsert<"team_members"> & { id?: string }) => {
      if (item.id) {
        const { id, ...rest } = item;
        const { error } = await supabase.from("team_members").update(rest as TablesUpdate<"team_members">).eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("team_members").insert([item]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-team"] });
      setEditing(null);
      setAdding(false);
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold text-foreground">Team Members</h2>
        <button onClick={() => setAdding(true)} className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-teal-dark transition-colors">
          <Plus className="h-4 w-4" /> Add Member
        </button>
      </div>

      {(adding || editing) && (
        <TeamForm
          initial={editing}
          onSave={(data) => upsertMut.mutate(data)}
          onCancel={() => { setAdding(false); setEditing(null); }}
          saving={upsertMut.isPending}
        />
      )}

      <div className="grid gap-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-xl bg-card p-4 border border-border shadow-soft">
            <div>
              <p className="font-medium text-foreground">{item.name}</p>
              <p className="text-sm text-primary">{item.role}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditing(item)} className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <Pencil className="h-4 w-4" />
              </button>
              <button onClick={() => deleteMut.mutate(item.id)} className="h-8 w-8 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive hover:bg-destructive/20 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamForm({ initial, onSave, onCancel, saving }: {
  initial: Tables<"team_members"> | null;
  onSave: (data: TablesInsert<"team_members"> & { id?: string }) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [role, setRole] = useState(initial?.role ?? "");
  const [imageUrl, setImageUrl] = useState(initial?.image_url ?? "");
  const [sortOrder, setSortOrder] = useState(initial?.sort_order ?? 0);

  return (
    <div className="rounded-xl bg-card p-6 border border-primary/30 shadow-card mb-6 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className={inputClass} />
        <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" className={inputClass} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL" className={inputClass} />
        <input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} placeholder="Sort Order" className={inputClass} />
      </div>
      <div className="flex gap-3">
        <button onClick={() => onSave({ id: initial?.id, name, role, image_url: imageUrl || null, sort_order: sortOrder })} disabled={saving} className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-teal-dark transition-colors disabled:opacity-50">
          {saving ? "Saving..." : initial ? "Update" : "Create"}
        </button>
        <button onClick={onCancel} className="rounded-lg bg-secondary px-5 py-2 text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors">Cancel</button>
      </div>
    </div>
  );
}

function TestimonialsPanel() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Tables<"testimonials"> | null>(null);
  const [adding, setAdding] = useState(false);

  const { data: items = [] } = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase.from("testimonials").select("*").order("created_at");
      if (error) throw error;
      return data;
    },
  });

  const deleteMut = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-testimonials"] }),
  });

  const upsertMut = useMutation({
    mutationFn: async (item: TablesInsert<"testimonials"> & { id?: string }) => {
      if (item.id) {
        const { id, ...rest } = item;
        const { error } = await supabase.from("testimonials").update(rest as TablesUpdate<"testimonials">).eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("testimonials").insert([item]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-testimonials"] });
      setEditing(null);
      setAdding(false);
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold text-foreground">Testimonials</h2>
        <button onClick={() => setAdding(true)} className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-teal-dark transition-colors">
          <Plus className="h-4 w-4" /> Add Testimonial
        </button>
      </div>

      {(adding || editing) && (
        <TestimonialForm
          initial={editing}
          onSave={(data) => upsertMut.mutate(data)}
          onCancel={() => { setAdding(false); setEditing(null); }}
          saving={upsertMut.isPending}
        />
      )}

      <div className="grid gap-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-xl bg-card p-4 border border-border shadow-soft">
            <div>
              <p className="font-medium text-foreground">{item.author} — ⭐ {item.rating}</p>
              <p className="text-sm text-muted-foreground truncate max-w-md">{item.quote}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditing(item)} className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <Pencil className="h-4 w-4" />
              </button>
              <button onClick={() => deleteMut.mutate(item.id)} className="h-8 w-8 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive hover:bg-destructive/20 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TestimonialForm({ initial, onSave, onCancel, saving }: {
  initial: Tables<"testimonials"> | null;
  onSave: (data: TablesInsert<"testimonials"> & { id?: string }) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [author, setAuthor] = useState(initial?.author ?? "");
  const [quote, setQuote] = useState(initial?.quote ?? "");
  const [rating, setRating] = useState(initial?.rating ?? 5);

  return (
    <div className="rounded-xl bg-card p-6 border border-primary/30 shadow-card mb-6 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author Name" className={inputClass} />
        <input type="number" min={1} max={5} value={rating} onChange={(e) => setRating(Number(e.target.value))} placeholder="Rating (1-5)" className={inputClass} />
      </div>
      <textarea value={quote} onChange={(e) => setQuote(e.target.value)} placeholder="Quote" rows={3} className={inputClass} />
      <div className="flex gap-3">
        <button onClick={() => onSave({ id: initial?.id, author, quote, rating })} disabled={saving} className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-teal-dark transition-colors disabled:opacity-50">
          {saving ? "Saving..." : initial ? "Update" : "Create"}
        </button>
        <button onClick={onCancel} className="rounded-lg bg-secondary px-5 py-2 text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors">Cancel</button>
      </div>
    </div>
  );
}

function SubmissionsPanel() {
  const qc = useQueryClient();

  const { data: items = [] } = useQuery({
    queryKey: ["admin-submissions"],
    queryFn: async () => {
      const { data, error } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const deleteMut = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-submissions"] }),
  });

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Contact Submissions</h2>
      {items.length === 0 && <p className="text-muted-foreground text-sm">No submissions yet.</p>}
      <div className="grid gap-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-xl bg-card p-5 border border-border shadow-soft">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-foreground">{item.name}</p>
                <p className="text-sm text-primary">{item.email} · {item.phone}</p>
                <p className="text-xs text-muted-foreground mt-1">Service: {item.service} · {new Date(item.created_at).toLocaleDateString()}</p>
                <p className="text-sm text-muted-foreground mt-2">{item.message}</p>
              </div>
              <button onClick={() => deleteMut.mutate(item.id)} className="h-8 w-8 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive hover:bg-destructive/20 transition-colors shrink-0">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlogPanel() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Tables<"blog_posts"> | null>(null);
  const [adding, setAdding] = useState(false);

  const { data: items = [] } = useQuery({
    queryKey: ["admin-blog"],
    queryFn: async () => {
      const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const deleteMut = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-blog"] }),
  });

  const upsertMut = useMutation({
    mutationFn: async (item: TablesInsert<"blog_posts"> & { id?: string }) => {
      if (item.id) {
        const { id, ...rest } = item;
        const { error } = await supabase.from("blog_posts").update(rest as TablesUpdate<"blog_posts">).eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("blog_posts").insert([item]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-blog"] });
      setEditing(null);
      setAdding(false);
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold text-foreground">Blog Posts</h2>
        <button onClick={() => setAdding(true)} className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-teal-dark transition-colors">
          <Plus className="h-4 w-4" /> Add Post
        </button>
      </div>

      {(adding || editing) && (
        <BlogForm
          initial={editing}
          onSave={(data) => upsertMut.mutate(data)}
          onCancel={() => { setAdding(false); setEditing(null); }}
          saving={upsertMut.isPending}
        />
      )}

      <div className="grid gap-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-xl bg-card p-4 border border-border shadow-soft">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium text-foreground">{item.title}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${item.published ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                  {item.published ? "Published" : "Draft"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground truncate max-w-md">{item.excerpt}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditing(item)} className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <Pencil className="h-4 w-4" />
              </button>
              <button onClick={() => deleteMut.mutate(item.id)} className="h-8 w-8 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive hover:bg-destructive/20 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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

  return (
    <div className="rounded-xl bg-card p-6 border border-primary/30 shadow-card mb-6 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input value={title} onChange={(e) => { setTitle(e.target.value); if (!initial) setSlug(autoSlug(e.target.value)); }} placeholder="Post Title" className={inputClass} />
        <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="slug-url" className={inputClass} />
      </div>
      <input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Short excerpt..." className={inputClass} />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Full content (supports ## headings, - lists, **bold**)" rows={10} className={inputClass} />
      <div className="grid sm:grid-cols-3 gap-4">
        <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" className={inputClass} />
        <input value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} placeholder="Cover Image URL (optional)" className={inputClass} />
        <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="rounded border-border" />
          Published
        </label>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => onSave({
            id: initial?.id,
            title,
            slug,
            excerpt,
            content,
            author,
            cover_image_url: coverUrl || null,
            published,
            published_at: published ? (initial?.published_at ?? new Date().toISOString()) : null,
          })}
          disabled={saving}
          className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-teal-dark transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : initial ? "Update" : "Create"}
        </button>
        <button onClick={onCancel} className="rounded-lg bg-secondary px-5 py-2 text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors">Cancel</button>
      </div>
    </div>
  );
}

export default AdminDashboard;
