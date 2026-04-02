import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Heart, KeyRound } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    if (hashParams.get("type") === "recovery") {
      setIsRecovery(true);
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsRecovery(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
    } else {
      toast({ title: "Password updated", description: "You can now sign in with your new password." });
      navigate("/auth");
    }
    setLoading(false);
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition";

  if (!isRecovery) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-md text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Heart className="h-8 w-8 text-primary" fill="hsl(var(--primary))" />
            <span className="font-heading text-3xl font-bold text-foreground">Careold</span>
          </div>
          <div className="rounded-2xl bg-card p-8 shadow-card border border-border">
            <p className="text-muted-foreground text-sm mb-4">
              Invalid or expired reset link. Please request a new password reset.
            </p>
            <button onClick={() => navigate("/auth")} className="text-sm text-primary hover:underline">
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-8 w-8 text-primary" fill="hsl(var(--primary))" />
            <span className="font-heading text-3xl font-bold text-foreground">Careold</span>
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Set New Password</h1>
          <p className="text-muted-foreground text-sm mt-1">Enter your new password below</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl bg-card p-8 shadow-card border border-border space-y-5">
          {error && (
            <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>
          )}
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">New Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={inputClass} required minLength={6} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className={inputClass} required minLength={6} />
          </div>
          <button type="submit" disabled={loading} className="w-full rounded-lg bg-primary px-7 py-3 text-sm font-medium text-primary-foreground hover:bg-teal-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
            <KeyRound className="h-4 w-4" />
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
