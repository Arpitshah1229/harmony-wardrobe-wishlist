import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check, LoaderCircle, Save } from "lucide-react";
import { PasswordPage } from "@/components/password-page";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { isRecoveryLink, validateNewPassword } from "@/lib/password-recovery";

export const Route = createFileRoute("/reset-password")({
  component: ResetPasswordPage,
  head: () => ({ meta: [
    { title: "Reset Password | Notions in Pattern" },
    { name: "description", content: "Choose and confirm a new password for your Notions in Pattern account." },
    { property: "og:title", content: "Reset Password | Notions in Pattern" },
    { property: "og:description", content: "Securely save a new password after email verification." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [verified, setVerified] = useState(false);
  const [checking, setChecking] = useState(true);
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    let recovery = isRecoveryLink(window.location.hash);
    async function verify() {
      const { data, error: failure } = await supabase.auth.getUser();
      if (!alive) return;
      setVerified(recovery && !failure && !!data.user);
      setEmail(data.user?.email ?? "");
      setChecking(false);
    }
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        recovery = true;
        window.setTimeout(() => { if (alive) void verify(); }, 0);
      }
    });
    void verify();
    return () => { alive = false; subscription.unsubscribe(); };
  }, []);

  useEffect(() => {
    if (!success) return;
    const timer = window.setTimeout(() => { void navigate({ to: "/login", search: { redirect: "/cart" } }); }, 2500);
    return () => window.clearTimeout(timer);
  }, [success, navigate]);

  return <PasswordPage title="Create new password">
    {checking ? <p role="status" className="text-center text-sm">Checking your reset link…</p> : !verified ? <div className="text-center text-sm leading-relaxed">
      <p>This reset link is missing or expired. Request a new link to continue.</p>
      <Button className="mt-5 rounded-none" onClick={() => navigate({ to: "/forgot-password" })}>Request new link</Button>
    </div> : <form onSubmit={async (event) => {
      event.preventDefault();
      const validation = validateNewPassword(password, confirmation);
      if (validation) { setError(validation); return; }
      setBusy(true); setError("");
      try {
        const { error: failure } = await supabase.auth.updateUser({ password });
        if (failure) { setError(failure.message); return; }
        await supabase.auth.signOut();
        setPassword(""); setConfirmation(""); setSuccess(true);
      } catch { setError("Unable to change your password. Please try again."); }
      finally { setBusy(false); }
    }}>
      <label htmlFor="reset-email" className="mb-2 block text-xs">Email ID</label>
      <input id="reset-email" type="email" readOnly value={email} autoComplete="email" className="w-full border border-foreground/50 bg-transparent px-3 py-3 text-sm" />
      <label htmlFor="new-password" className="mb-2 mt-4 block text-xs">Create new password</label>
      <input id="new-password" type="password" required autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full border border-foreground/50 bg-transparent px-3 py-3 text-sm" />
      <label htmlFor="confirm-password" className="mb-2 mt-4 block text-xs">Confirm password</label>
      <input id="confirm-password" type="password" required autoComplete="new-password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} className="w-full border border-foreground/50 bg-transparent px-3 py-3 text-sm" />
      {error && <p role="alert" className="mt-3 text-sm text-destructive">{error}</p>}
      <Button type="submit" disabled={busy || success} className="mt-5 h-11 w-full rounded-none">{busy ? <LoaderCircle className="animate-spin" /> : <Save />} Save</Button>
    </form>}
    <Dialog open={success} onOpenChange={(open) => { if (!open) void navigate({ to: "/login", search: { redirect: "/cart" } }); }}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-md">
        <Check className="mx-auto h-8 w-8 text-primary" />
        <DialogTitle className="text-center font-serif text-2xl">Your password has been changed successfully.</DialogTitle>
        <DialogDescription className="text-center">Returning to login…</DialogDescription>
      </DialogContent>
    </Dialog>
  </PasswordPage>;
}