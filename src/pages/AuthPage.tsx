import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Heart, LogIn, UserPlus, ArrowLeft, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AuthPage = () => {
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (mode === "forgot") {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) {
        setError(error.message);
      } else {
        setResetSent(true);
        toast({ title: "Reset link sent", description: "Check your email for the password reset link." });
      }
      setLoading(false);
      return;
    }

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: window.location.origin,
        },
      });
      if (error) {
        setError(error.message);
      } else {
        setEmailSent(true);
        toast({
          title: "Check your email",
          description: "We've sent you a verification link to confirm your account.",
        });
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        navigate("/");
      }
    }
    setLoading(false);
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition";

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-md text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Heart className="h-8 w-8 text-primary" fill="hsl(var(--primary))" />
            <span className="font-heading text-3xl font-bold text-foreground">Careold</span>
          </div>
          <div className="rounded-2xl bg-card p-8 shadow-card border border-border">
            <h2 className="font-heading text-xl font-bold text-foreground mb-2">Check your email</h2>
            <p className="text-muted-foreground text-sm">
              We've sent a verification link to <strong>{email}</strong>. Please click the link to verify your account.
            </p>
            <button onClick={() => { setEmailSent(false); setMode("signin"); }} className="mt-6 text-sm text-primary hover:underline">
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (resetSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-md text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Heart className="h-8 w-8 text-primary" fill="hsl(var(--primary))" />
            <span className="font-heading text-3xl font-bold text-foreground">Careold</span>
          </div>
          <div className="rounded-2xl bg-card p-8 shadow-card border border-border">
            <h2 className="font-heading text-xl font-bold text-foreground mb-2">Reset link sent</h2>
            <p className="text-muted-foreground text-sm">
              We've sent a password reset link to <strong>{email}</strong>. Check your inbox and follow the link to set a new password.
            </p>
            <button onClick={() => { setResetSent(false); setMode("signin"); }} className="mt-6 text-sm text-primary hover:underline">
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
          <h1 className="font-heading text-2xl font-bold text-foreground">
            {mode === "signup" ? "Create Account" : mode === "forgot" ? "Forgot Password" : "Welcome Back"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {mode === "signup" ? "Sign up to get started" : mode === "forgot" ? "Enter your email to receive a reset link" : "Sign in to your account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl bg-card p-8 shadow-card border border-border space-y-5">
          {error && (
            <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {mode === "signup" && (
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className={inputClass}
                required
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={inputClass}
              required
            />
          </div>

          {mode !== "forgot" && (
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={inputClass}
                required
                minLength={6}
              />
            </div>
          )}

          {mode === "signin" && (
            <div className="text-right -mt-2">
              <button type="button" onClick={() => { setMode("forgot"); setError(""); }} className="text-xs text-primary hover:underline">
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary px-7 py-3 text-sm font-medium text-primary-foreground hover:bg-teal-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {mode === "signup" ? <UserPlus className="h-4 w-4" /> : mode === "forgot" ? <ArrowLeft className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
            {loading
              ? (mode === "signup" ? "Creating account..." : mode === "forgot" ? "Sending..." : "Signing in...")
              : (mode === "signup" ? "Sign Up" : mode === "forgot" ? "Send Reset Link" : "Sign In")}
          </button>

          <p className="text-center text-sm text-muted-foreground">
            {mode === "signup" ? "Already have an account?" : mode === "forgot" ? "Remember your password?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => { setMode(mode === "signup" ? "signin" : mode === "forgot" ? "signin" : "signup"); setError(""); }}
              className="text-primary hover:underline font-medium"
            >
              {mode === "signup" ? "Sign In" : mode === "forgot" ? "Sign In" : "Sign Up"}
            </button>
          </p>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full rounded-lg border border-border bg-background px-7 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-2"
          >
            <Home className="h-4 w-4" />
            Back to Website
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
