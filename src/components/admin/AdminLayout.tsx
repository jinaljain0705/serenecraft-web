import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import {
  Heart, LogOut, LayoutDashboard, LayoutGrid, Users, MessageSquare,
  Mail, FileText, ShoppingBag, Settings, Newspaper, Menu, X, ChevronLeft
} from "lucide-react";

export type AdminTab = "overview" | "services" | "team" | "testimonials" | "submissions" | "blog" | "orders" | "subscribers" | "settings";

interface AdminLayoutProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  children: React.ReactNode;
}

const sidebarItems: { key: AdminTab; label: string; icon: typeof LayoutDashboard; group: string }[] = [
  { key: "overview", label: "Dashboard", icon: LayoutDashboard, group: "Main" },
  { key: "orders", label: "Orders", icon: ShoppingBag, group: "Main" },
  { key: "services", label: "Services", icon: LayoutGrid, group: "Content" },
  { key: "team", label: "Team Members", icon: Users, group: "Content" },
  { key: "testimonials", label: "Testimonials", icon: MessageSquare, group: "Content" },
  { key: "blog", label: "Blog Posts", icon: FileText, group: "Content" },
  { key: "submissions", label: "Contact Forms", icon: Mail, group: "Customers" },
  { key: "subscribers", label: "Newsletter", icon: Newspaper, group: "Customers" },
  { key: "settings", label: "Settings", icon: Settings, group: "System" },
];

const groups = ["Main", "Content", "Customers", "System"];

const AdminLayout = ({ activeTab, onTabChange, children }: AdminLayoutProps) => {
  const { user, loading, isAdmin, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground text-sm">Loading...</p>
      </div>
    </div>
  );
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

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary shrink-0" fill="hsl(var(--primary))" />
          {sidebarOpen && <span className="font-heading text-lg font-bold text-sidebar-foreground">Careold Admin</span>}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {groups.map((group) => {
          const items = sidebarItems.filter((i) => i.group === group);
          return (
            <div key={group}>
              {sidebarOpen && (
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2 px-3">{group}</p>
              )}
              <div className="space-y-1">
                {items.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      onTabChange(item.key);
                      setMobileOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                      activeTab === item.key
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-sidebar-foreground hover:bg-sidebar-accent"
                    }`}
                    title={!sidebarOpen ? item.label : undefined}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {sidebarOpen && <span>{item.label}</span>}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="border-t border-sidebar-border p-4">
        {sidebarOpen ? (
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-xs font-medium text-sidebar-foreground truncate">{user.email}</p>
              <p className="text-[10px] text-muted-foreground">Administrator</p>
            </div>
            <button onClick={signOut} className="text-muted-foreground hover:text-foreground transition-colors shrink-0" title="Sign Out">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button onClick={signOut} className="w-full flex justify-center text-muted-foreground hover:text-foreground transition-colors" title="Sign Out">
            <LogOut className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop sidebar */}
      <aside className={`hidden lg:flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 ${sidebarOpen ? "w-64" : "w-[68px]"}`}>
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-sidebar border-r border-sidebar-border shadow-elevated z-10">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-14 border-b border-border bg-card/80 backdrop-blur-md flex items-center px-4 gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-muted-foreground hover:text-foreground transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex text-muted-foreground hover:text-foreground transition-colors"
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <ChevronLeft className={`h-5 w-5 transition-transform ${!sidebarOpen ? "rotate-180" : ""}`} />
          </button>
          <h1 className="font-heading text-lg font-bold text-foreground capitalize">
            {activeTab === "overview" ? "Dashboard" : sidebarItems.find(i => i.key === activeTab)?.label}
          </h1>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
