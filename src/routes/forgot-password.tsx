import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, LoaderCircle } from "lucide-react";
import { PasswordPage } from "@/components/password-page";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
  head: () => ({ meta: [
    { title: "Forgot Password | Notions in Pattern" },
    { name: "description", content: "Recover your Notions in Pattern account securely by email." },
    { property: "og:title", content: "Forgot Password | Notions in Pattern" },
    { property: "og:description", content: "Request a secure link to reset your account password." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  return <PasswordPage title="Forgot password?">
    {sent ? <p role="status" className="text-center text-sm leading-relaxed">If an account exists for this email, you’ll receive a password reset link. Please check your inbox and spam folder.</p> :
      <form onSubmit={async (event) => {
        event.preventDefault();
        setBusy(true); setError("");
        try {
          const { error: failure } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
            redirectTo: `${window.location.origin}/reset-password`,
          });
          if (failure) setError(failure.message);
          else setSent(true);
        } catch { setError("Unable to send the reset link. Please try again."); }
        finally { setBusy(false); }
      }}>
        <label htmlFor="recovery-email" className="mb-2 block text-xs">Email ID</label>
        <input id="recovery-email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@email.com" className="w-full border border-foreground/50 bg-transparent px-3 py-3 text-sm outline-none focus:border-foreground" />
        {error && <p role="alert" className="mt-3 text-sm text-destructive">{error}</p>}
        <Button type="submit" disabled={busy} className="mt-5 h-11 w-full rounded-none">{busy ? <LoaderCircle className="animate-spin" /> : <Mail />} Send reset link</Button>
      </form>}
  </PasswordPage>;
}