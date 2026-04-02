import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Trash2 } from "lucide-react";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import { toast } from "sonner";

const PER_PAGE = 10;

const AdminSubmissions = () => {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data: items = [] } = useQuery({
    queryKey: ["admin-submissions"],
    queryFn: async () => {
      const { data, error } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const filtered = useMemo(() =>
    items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.email.toLowerCase().includes(search.toLowerCase()) || i.service.toLowerCase().includes(search.toLowerCase())),
    [items, search]
  );
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const deleteMut = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("contact_submissions").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-submissions"] }); toast.success("Submission deleted"); },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search submissions..." />
        <p className="text-sm text-muted-foreground">{filtered.length} submission(s)</p>
      </div>

      <div className="grid gap-3">
        {paginated.map((item) => (
          <div key={item.id} className="rounded-xl bg-card p-5 border border-border shadow-soft hover:shadow-card transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-foreground">{item.name}</p>
                <p className="text-sm text-primary">{item.email} · {item.phone}</p>
                <p className="text-xs text-muted-foreground mt-1">Service: {item.service} · {new Date(item.created_at).toLocaleDateString()}</p>
                <p className="text-sm text-muted-foreground mt-2">{item.message}</p>
              </div>
              <button onClick={() => { if (confirm("Delete this submission?")) deleteMut.mutate(item.id); }} className="h-8 w-8 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive hover:bg-destructive/20 transition-colors shrink-0">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {paginated.length === 0 && <p className="text-sm text-muted-foreground">No submissions found.</p>}
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default AdminSubmissions;
