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

const AdminTestimonials = () => {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Tables<"testimonials"> | null>(null);
  const [adding, setAdding] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data: items = [] } = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: async () => { const { data, error } = await supabase.from("testimonials").select("*").order("created_at"); if (error) throw error; return data; },
  });

  const filtered = useMemo(() => items.filter(i => i.author.toLowerCase().includes(search.toLowerCase()) || i.quote.toLowerCase().includes(search.toLowerCase())), [items, search]);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const deleteMut = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("testimonials").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-testimonials"] }); toast.success("Testimonial deleted"); },
  });

  const upsertMut = useMutation({
    mutationFn: async (item: TablesInsert<"testimonials"> & { id?: string }) => {
      if (item.id) { const { id, ...rest } = item; const { error } = await supabase.from("testimonials").update(rest as TablesUpdate<"testimonials">).eq("id", id); if (error) throw error; }
      else { const { error } = await supabase.from("testimonials").insert([item]); if (error) throw error; }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-testimonials"] }); setEditing(null); setAdding(false); toast.success("Testimonial saved"); },
    onError: (e) => toast.error(e.message),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search testimonials..." />
        <button onClick={() => setAdding(true)} className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"><Plus className="h-4 w-4" /> Add Testimonial</button>
      </div>

      {(adding || editing) && (
        <form onSubmit={(e) => { e.preventDefault(); }} className="rounded-xl bg-card p-6 border border-primary/30 shadow-card space-y-4">
          <TestimonialForm initial={editing} onSave={(data) => upsertMut.mutate(data)} onCancel={() => { setAdding(false); setEditing(null); }} saving={upsertMut.isPending} />
        </form>
      )}

      <div className="grid gap-3">
        {paginated.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-xl bg-card p-4 border border-border shadow-soft hover:shadow-card transition-shadow">
            <div className="min-w-0">
              <p className="font-medium text-foreground">{item.author} — ⭐ {item.rating}</p>
              <p className="text-sm text-muted-foreground truncate max-w-md">{item.quote}</p>
            </div>
            <div className="flex gap-2 shrink-0 ml-4">
              <button onClick={() => setEditing(item)} className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"><Pencil className="h-4 w-4" /></button>
              <button onClick={() => { if (confirm("Delete?")) deleteMut.mutate(item.id); }} className="h-8 w-8 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive hover:bg-destructive/20 transition-colors"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
        {paginated.length === 0 && <p className="text-sm text-muted-foreground">No testimonials found.</p>}
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

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
    <>
      <div className="grid sm:grid-cols-2 gap-4">
        <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author Name *" className={inputClass} required />
        <input type="number" min={1} max={5} value={rating} onChange={(e) => setRating(Number(e.target.value))} placeholder="Rating (1-5)" className={inputClass} />
      </div>
      <textarea value={quote} onChange={(e) => setQuote(e.target.value)} placeholder="Quote *" rows={3} className={inputClass} required />
      <div className="flex gap-3">
        <button type="button" onClick={() => { if (!author.trim() || !quote.trim()) { toast.error("Author and quote are required"); return; } onSave({ id: initial?.id, author, quote, rating }); }} disabled={saving} className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50">{saving ? "Saving..." : initial ? "Update" : "Create"}</button>
        <button type="button" onClick={onCancel} className="rounded-lg bg-secondary px-5 py-2 text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors">Cancel</button>
      </div>
    </>
  );
}

export default AdminTestimonials;
