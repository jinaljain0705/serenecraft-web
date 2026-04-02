import { useState } from "react";
import AdminLayout, { type AdminTab } from "@/components/admin/AdminLayout";
import AdminOverview from "@/components/admin/AdminOverview";
import AdminServices from "@/components/admin/AdminServices";
import AdminTeam from "@/components/admin/AdminTeam";
import AdminTestimonials from "@/components/admin/AdminTestimonials";
import AdminSubmissions from "@/components/admin/AdminSubmissions";
import AdminBlog from "@/components/admin/AdminBlog";
import AdminOrders from "@/components/admin/AdminOrders";
import AdminSubscribers from "@/components/admin/AdminSubscribers";
import AdminSettings from "@/components/admin/AdminSettings";

const AdminDashboard = () => {
  const [tab, setTab] = useState<AdminTab>("overview");

  return (
    <AdminLayout activeTab={tab} onTabChange={setTab}>
      {tab === "overview" && <AdminOverview />}
      {tab === "services" && <AdminServices />}
      {tab === "team" && <AdminTeam />}
      {tab === "testimonials" && <AdminTestimonials />}
      {tab === "submissions" && <AdminSubmissions />}
      {tab === "blog" && <AdminBlog />}
      {tab === "orders" && <AdminOrders />}
      {tab === "subscribers" && <AdminSubscribers />}
      {tab === "settings" && <AdminSettings />}
    </AdminLayout>
  );
};

export default AdminDashboard;
