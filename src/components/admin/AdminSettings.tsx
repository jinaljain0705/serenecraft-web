import { useAuth } from "@/hooks/useAuth";
import { Heart } from "lucide-react";

const AdminSettings = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="rounded-xl bg-card border border-border p-6 shadow-soft space-y-4">
        <h3 className="font-heading text-lg font-bold text-foreground">Admin Account</h3>
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Email</p>
            <p className="text-sm text-foreground">{user?.email}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Role</p>
            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">Administrator</span>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Account Created</p>
            <p className="text-sm text-muted-foreground">{user?.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-card border border-border p-6 shadow-soft space-y-4">
        <h3 className="font-heading text-lg font-bold text-foreground">Site Info</h3>
        <div className="flex items-center gap-3">
          <Heart className="h-8 w-8 text-primary" fill="hsl(var(--primary))" />
          <div>
            <p className="font-heading font-bold text-foreground">Careold</p>
            <p className="text-xs text-muted-foreground">Senior Care Services</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
