import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ShoppingBag, LayoutGrid, Users, FileText, MessageSquare, Newspaper, TrendingUp, DollarSign } from "lucide-react";

const AdminOverview = () => {
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [orders, services, team, blog, testimonials, submissions, subscribers] = await Promise.all([
        supabase.from("orders").select("id, total, status, created_at"),
        supabase.from("services").select("id", { count: "exact", head: true }),
        supabase.from("team_members").select("id", { count: "exact", head: true }),
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        supabase.from("testimonials").select("id", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
        supabase.from("newsletter_subscribers").select("id", { count: "exact", head: true }),
      ]);

      const ordersData = orders.data || [];
      const totalRevenue = ordersData.reduce((sum, o) => sum + Number(o.total), 0);
      const pendingOrders = ordersData.filter(o => o.status === "pending").length;

      return {
        totalOrders: ordersData.length,
        totalRevenue,
        pendingOrders,
        services: services.count || 0,
        team: team.count || 0,
        blog: blog.count || 0,
        testimonials: testimonials.count || 0,
        submissions: submissions.count || 0,
        subscribers: subscribers.count || 0,
      };
    },
  });

  const cards = [
    { label: "Total Revenue", value: `$${(stats?.totalRevenue || 0).toFixed(2)}`, icon: DollarSign, color: "bg-primary/10 text-primary" },
    { label: "Total Orders", value: stats?.totalOrders || 0, icon: ShoppingBag, color: "bg-teal/20 text-teal-dark" },
    { label: "Pending Orders", value: stats?.pendingOrders || 0, icon: TrendingUp, color: "bg-peach text-destructive" },
    { label: "Services", value: stats?.services || 0, icon: LayoutGrid, color: "bg-mint text-teal-dark" },
    { label: "Team Members", value: stats?.team || 0, icon: Users, color: "bg-lemon text-gold-dark" },
    { label: "Blog Posts", value: stats?.blog || 0, icon: FileText, color: "bg-accent text-accent-foreground" },
    { label: "Testimonials", value: stats?.testimonials || 0, icon: MessageSquare, color: "bg-secondary text-secondary-foreground" },
    { label: "Subscribers", value: stats?.subscribers || 0, icon: Newspaper, color: "bg-primary/10 text-primary" },
  ];

  return (
    <div className="space-y-8">
      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl bg-card border border-border p-5 shadow-soft hover:shadow-card transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{card.label}</span>
              <div className={`h-9 w-9 rounded-lg ${card.color} flex items-center justify-center`}>
                <card.icon className="h-4 w-4" />
              </div>
            </div>
            <p className="font-heading text-2xl font-bold text-foreground">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <RecentOrders />

      {/* Recent submissions */}
      <RecentSubmissions />
    </div>
  );
};

function RecentOrders() {
  const { data: orders = [] } = useQuery({
    queryKey: ["admin-recent-orders"],
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(5);
      if (error) throw error;
      return data;
    },
  });

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-destructive/10 text-destructive",
  };

  return (
    <div className="rounded-xl bg-card border border-border p-6 shadow-soft">
      <h3 className="font-heading text-lg font-bold text-foreground mb-4">Recent Orders</h3>
      {orders.length === 0 ? (
        <p className="text-sm text-muted-foreground">No orders yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium uppercase">Order</th>
                <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium uppercase">Customer</th>
                <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium uppercase">Status</th>
                <th className="text-right py-2 px-3 text-xs text-muted-foreground font-medium uppercase">Total</th>
                <th className="text-right py-2 px-3 text-xs text-muted-foreground font-medium uppercase">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-border/50 last:border-0">
                  <td className="py-3 px-3 font-medium text-foreground">#{order.order_number}</td>
                  <td className="py-3 px-3 text-muted-foreground">{order.first_name} {order.last_name}</td>
                  <td className="py-3 px-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${statusColors[order.status] || "bg-muted text-muted-foreground"}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-medium text-foreground">${Number(order.total).toFixed(2)}</td>
                  <td className="py-3 px-3 text-right text-muted-foreground text-xs">{new Date(order.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function RecentSubmissions() {
  const { data: submissions = [] } = useQuery({
    queryKey: ["admin-recent-submissions"],
    queryFn: async () => {
      const { data, error } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }).limit(5);
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="rounded-xl bg-card border border-border p-6 shadow-soft">
      <h3 className="font-heading text-lg font-bold text-foreground mb-4">Recent Contact Submissions</h3>
      {submissions.length === 0 ? (
        <p className="text-sm text-muted-foreground">No submissions yet.</p>
      ) : (
        <div className="space-y-3">
          {submissions.map((s) => (
            <div key={s.id} className="flex items-start justify-between border-b border-border/50 pb-3 last:border-0">
              <div>
                <p className="text-sm font-medium text-foreground">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.email} · {s.service}</p>
              </div>
              <span className="text-xs text-muted-foreground">{new Date(s.created_at).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminOverview;
