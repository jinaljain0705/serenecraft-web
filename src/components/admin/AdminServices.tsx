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

const AdminServices = () => {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Tables<"services"> | null>(null);
  const [adding, setAdding] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data: items = [] } = useQuery({
    queryKey: ["admin-services"],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const filtered = useMemo(() =>
    items.filter(i => i.title.toLowerCase().includes(search.toLowerCase()) || i.description.toLowerCase().includes(search.toLowerCase())),
    [items, search]
  );
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const deleteMut = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-services"] }); toast.success("Service deleted"); },
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
      setEditing(null); setAdding(false);
      toast.success("Service saved");
    },
    onError: (e) => toast.error(e.message),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search services..." />
        <button onClick={() => setAdding(true)} className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" /> Add Service
        </button>
      </div>

      {(adding || editing) && (
        <ServiceForm initial={editing} onSave={(data) => upsertMut.mutate(data)} onCancel={() => { setAdding(false); setEditing(null); }} saving={upsertMut.isPending} />
      )}

      <div className="grid gap-3">
        {paginated.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-xl bg-card p-4 border border-border shadow-soft hover:shadow-card transition-shadow">
            <div className="min-w-0">
              <p className="font-medium text-foreground">{item.title}</p>
              <p className="text-sm text-muted-foreground truncate max-w-md">{item.description}</p>
            </div>
            <div className="flex gap-2 shrink-0 ml-4">
              <button onClick={() => setEditing(item)} className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <Pencil className="h-4 w-4" />
              </button>
              <button onClick={() => { if (confirm("Delete this service?")) deleteMut.mutate(item.id); }} className="h-8 w-8 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive hover:bg-destructive/20 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {paginated.length === 0 && <p className="text-sm text-muted-foreground">No services found.</p>}
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) { toast.error("Title and slug are required"); return; }
    onSave({ id: initial?.id, title, description, icon, slug, sort_order: sortOrder });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl bg-card p-6 border border-primary/30 shadow-card space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title *" className={inputClass} required />
        <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="Slug *" className={inputClass} required />
      </div>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" rows={3} className={inputClass} />
      <div className="grid sm:grid-cols-2 gap-4">
        <input value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="Icon name" className={inputClass} />
        <input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} placeholder="Sort Order" className={inputClass} />
      </div>
      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50">
          {saving ? "Saving..." : initial ? "Update" : "Create"}
        </button>
        <button type="button" onClick={onCancel} className="rounded-lg bg-secondary px-5 py-2 text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors">Cancel</button>
      </div>
    </form>
  );
}

export default AdminServices;
