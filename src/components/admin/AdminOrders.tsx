import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import { toast } from "sonner";

const PER_PAGE = 10;
const STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"] as const;

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-destructive/10 text-destructive",
};

const AdminOrders = () => {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: expandedItems = [] } = useQuery({
    queryKey: ["admin-order-items", expandedId],
    queryFn: async () => {
      if (!expandedId) return [];
      const { data, error } = await supabase.from("order_items").select("*").eq("order_id", expandedId);
      if (error) throw error;
      return data;
    },
    enabled: !!expandedId,
  });

  const updateStatusMut = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("orders").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-orders"] }); toast.success("Order status updated"); },
    onError: (e) => toast.error(e.message),
  });

  const filtered = useMemo(() => {
    let result = orders.filter(o =>
      o.order_number.toLowerCase().includes(search.toLowerCase()) ||
      o.first_name.toLowerCase().includes(search.toLowerCase()) ||
      o.last_name.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase())
    );
    if (filterStatus !== "all") result = result.filter(o => o.status === filterStatus);
    return result;
  }, [orders, search, filterStatus]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search orders..." />
          <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }} className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground">
            <option value="all">All Status</option>
            {STATUSES.map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
          </select>
        </div>
        <p className="text-sm text-muted-foreground">{filtered.length} order(s)</p>
      </div>

      {isLoading && <p className="text-muted-foreground text-sm">Loading...</p>}

      <div className="grid gap-3">
        {paginated.map((order) => (
          <div key={order.id} className="rounded-xl bg-card border border-border shadow-soft overflow-hidden hover:shadow-card transition-shadow">
            <button onClick={() => setExpandedId(expandedId === order.id ? null : order.id)} className="w-full p-5 text-left">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-medium text-foreground">#{order.order_number}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[order.status] || "bg-muted text-muted-foreground"}`}>{order.status}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{order.first_name} {order.last_name} · {order.email}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{new Date(order.created_at).toLocaleString()}</p>
                </div>
                <p className="font-heading text-lg font-bold text-primary">${Number(order.total).toFixed(2)}</p>
              </div>
            </button>

            {expandedId === order.id && (
              <div className="border-t border-border px-5 pb-5 pt-3 space-y-4">
                {/* Status update */}
                <div className="flex items-center gap-3">
                  <label className="text-xs font-medium text-muted-foreground uppercase">Update Status:</label>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatusMut.mutate({ id: order.id, status: e.target.value })}
                    className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground"
                  >
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Shipping</p>
                    <p className="text-sm text-foreground">{order.first_name} {order.last_name}</p>
                    <p className="text-sm text-muted-foreground">{order.street}</p>
                    <p className="text-sm text-muted-foreground">{order.city}, {order.state} {order.zip}</p>
                    <p className="text-sm text-muted-foreground">{order.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Payment</p>
                    <p className="text-sm text-foreground capitalize">{order.payment_method}</p>
                    {order.notes && (<><p className="text-xs font-medium text-muted-foreground uppercase mt-2 mb-1">Notes</p><p className="text-sm text-muted-foreground">{order.notes}</p></>)}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Items</p>
                  <div className="space-y-2">
                    {expandedItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        {item.product_image && <img src={item.product_image} alt={item.product_name} className="h-10 w-10 rounded-lg object-cover bg-muted border border-border" />}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{item.product_name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-semibold text-foreground">${(Number(item.price) * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-border flex justify-end gap-6 text-sm">
                  <span className="text-muted-foreground">Subtotal: ${Number(order.subtotal).toFixed(2)}</span>
                  <span className="text-muted-foreground">Shipping: ${Number(order.shipping).toFixed(2)}</span>
                  <span className="font-bold text-foreground">Total: ${Number(order.total).toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        ))}
        {!isLoading && paginated.length === 0 && <p className="text-sm text-muted-foreground">No orders found.</p>}
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default AdminOrders;
