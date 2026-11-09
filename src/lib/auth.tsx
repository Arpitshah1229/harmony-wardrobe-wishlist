import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

export type AppUser = { name: string; mobile: string; email: string };
export type AuthResult = { ok: true; confirmationRequired?: boolean } | { ok: false; error: string };
type AuthContextValue = {
  user: AppUser | null;
  isLoggedIn: boolean;
  register: (user: AppUser & { password: string }) => Promise<AuthResult>;
  login: (email: string, password: string) => Promise<AuthResult>;
  logout: () => void;
};
const AuthContext = createContext<AuthContextValue | null>(null);
export function normalizeMobile(value: string) { return value.replace(/\D/g, "").slice(-10); }
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  useEffect(() => {
    let alive = true;
    async function refresh() {
      const { data } = await supabase.auth.getUser();
      if (alive) setUser(data.user ? { name: "", mobile: "", email: data.user.email ?? "" } : null);
    }
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") setUser(null);
      else window.setTimeout(() => { if (alive) void refresh(); }, 0);
    });
    window.localStorage.removeItem("nip-auth-v1");
    window.localStorage.removeItem("nip-users-v2");
    void refresh();
    return () => { alive = false; subscription.unsubscribe(); };
  }, []);
  const register = useCallback(async (next: AppUser & { password: string }): Promise<AuthResult> => {
    const { data, error } = await supabase.auth.signUp({
      email: next.email.trim().toLowerCase(), password: next.password,
      options: { emailRedirectTo: window.location.origin },
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true, confirmationRequired: !data.session };
  }, []);
  const login = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password });
    if (error) return { ok: false, error: error.message };
    const { data, error: verificationError } = await supabase.auth.getUser();
    if (verificationError || !data.user) return { ok: false, error: "Unable to verify your account. Please try again." };
    setUser({ name: "", mobile: "", email: data.user.email ?? "" });
    return { ok: true };
  }, []);
  const logout = useCallback(() => { void supabase.auth.signOut().then(({ error }) => { if (!error) setUser(null); }); }, []);
  const value = useMemo(() => ({ user, isLoggedIn: !!user, register, login, logout }), [user, register, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
