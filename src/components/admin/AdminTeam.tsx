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

const AdminTeam = () => {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Tables<"team_members"> | null>(null);
  const [adding, setAdding] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data: items = [] } = useQuery({
    queryKey: ["admin-team"],
    queryFn: async () => {
      const { data, error } = await supabase.from("team_members").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const filtered = useMemo(() => items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.role.toLowerCase().includes(search.toLowerCase())), [items, search]);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const deleteMut = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("team_members").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-team"] }); toast.success("Member deleted"); },
  });

  const upsertMut = useMutation({
    mutationFn: async (item: TablesInsert<"team_members"> & { id?: string }) => {
      if (item.id) { const { id, ...rest } = item; const { error } = await supabase.from("team_members").update(rest as TablesUpdate<"team_members">).eq("id", id); if (error) throw error; }
      else { const { error } = await supabase.from("team_members").insert([item]); if (error) throw error; }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-team"] }); setEditing(null); setAdding(false); toast.success("Member saved"); },
    onError: (e) => toast.error(e.message),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search team..." />
        <button onClick={() => setAdding(true)} className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" /> Add Member
        </button>
      </div>

      {(adding || editing) && (
        <TeamForm initial={editing} onSave={(data) => upsertMut.mutate(data)} onCancel={() => { setAdding(false); setEditing(null); }} saving={upsertMut.isPending} />
      )}

      <div className="grid gap-3">
        {paginated.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-xl bg-card p-4 border border-border shadow-soft hover:shadow-card transition-shadow">
            <div className="flex items-center gap-3">
              {item.image_url && <img src={item.image_url} alt={item.name} className="h-10 w-10 rounded-full object-cover border border-border" />}
              <div>
                <p className="font-medium text-foreground">{item.name}</p>
                <p className="text-sm text-primary">{item.role}</p>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => setEditing(item)} className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"><Pencil className="h-4 w-4" /></button>
              <button onClick={() => { if (confirm("Delete this member?")) deleteMut.mutate(item.id); }} className="h-8 w-8 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive hover:bg-destructive/20 transition-colors"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
        {paginated.length === 0 && <p className="text-sm text-muted-foreground">No team members found.</p>}
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

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
  const [facebook, setFacebook] = useState(initial?.social_facebook ?? "");
  const [twitter, setTwitter] = useState(initial?.social_twitter ?? "");
  const [linkedin, setLinkedin] = useState(initial?.social_linkedin ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role.trim()) { toast.error("Name and role are required"); return; }
    onSave({ id: initial?.id, name, role, image_url: imageUrl || null, sort_order: sortOrder, social_facebook: facebook || null, social_twitter: twitter || null, social_linkedin: linkedin || null });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl bg-card p-6 border border-primary/30 shadow-card space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name *" className={inputClass} required />
        <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role *" className={inputClass} required />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL" className={inputClass} />
        <input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} placeholder="Sort Order" className={inputClass} />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <input value={facebook} onChange={(e) => setFacebook(e.target.value)} placeholder="Facebook URL" className={inputClass} />
        <input value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder="Twitter URL" className={inputClass} />
        <input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="LinkedIn URL" className={inputClass} />
      </div>
      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50">{saving ? "Saving..." : initial ? "Update" : "Create"}</button>
        <button type="button" onClick={onCancel} className="rounded-lg bg-secondary px-5 py-2 text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors">Cancel</button>
      </div>
    </form>
  );
}

export default AdminTeam;
