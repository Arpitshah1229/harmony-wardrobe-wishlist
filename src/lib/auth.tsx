import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "nip-auth-v1";
const USERS_KEY = "nip-users-v2";

/** Demo build: any mobile number logs in with this code. */
export const DEMO_OTP = "1234";

export type AppUser = {
  name: string;
  mobile: string;
  email: string;
};

/** What we keep on file for a registered account, including the password. */
type StoredUser = AppUser & { password: string };

export type AuthResult = { ok: true } | { ok: false; error: string };

type AuthContextValue = {
  user: AppUser | null;
  isLoggedIn: boolean;
  findUser: (mobile: string) => AppUser | null;
  emailExists: (email: string) => boolean;
  register: (user: AppUser & { password: string }) => AuthResult;
  login: (mobile: string, password: string) => AuthResult;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readUsers(): StoredUser[] {
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  try {
    window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    /* ignore */
  }
}

export function normalizeMobile(value: string) {
  return value.replace(/\D/g, "").slice(-10);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw) as AppUser);
    } catch {
      /* ignore */
    }
  }, []);

  const persist = useCallback((next: AppUser | null) => {
    setUser(next);
    try {
      if (next) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      else window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const findUser = useCallback((mobile: string) => {
    const m = normalizeMobile(mobile);
    const found = readUsers().find((u) => normalizeMobile(u.mobile) === m);
    return found ? { name: found.name, mobile: found.mobile, email: found.email } : null;
  }, []);

  const emailExists = useCallback((email: string) => {
    const e = email.trim().toLowerCase();
    return readUsers().some((u) => u.email.toLowerCase() === e);
  }, []);

  const register = useCallback(
    (next: AppUser & { password: string }): AuthResult => {
      const m = normalizeMobile(next.mobile);
      const email = next.email.trim().toLowerCase();

      if (m.length !== 10) return { ok: false, error: "Enter a valid 10 digit mobile number." };
      if (next.password.length < 6)
        return { ok: false, error: "Create a password with at least 6 characters." };

      const users = readUsers();
      if (users.some((u) => normalizeMobile(u.mobile) === m))
        return { ok: false, error: "An account with this mobile number already exists. Please login." };
      if (users.some((u) => u.email.toLowerCase() === email))
        return { ok: false, error: "An account with this email already exists. Please login." };

      const record: StoredUser = {
        name: next.name.trim(),
        mobile: m,
        email,
        password: next.password,
      };
      writeUsers([...users, record]);
      persist({ name: record.name, mobile: record.mobile, email: record.email });
      return { ok: true };
    },
    [persist],
  );

  const login = useCallback(
    (mobile: string, password: string): AuthResult => {
      const m = normalizeMobile(mobile);
      if (m.length !== 10) return { ok: false, error: "Enter a valid 10 digit mobile number." };

      const found = readUsers().find((u) => normalizeMobile(u.mobile) === m);
      if (!found)
        return {
          ok: false,
          error: "No account found for this mobile number. Please create an account.",
        };
      if (found.password !== password)
        return { ok: false, error: "Incorrect password. Please try again." };

      persist({ name: found.name, mobile: found.mobile, email: found.email });
      return { ok: true };
    },
    [persist],
  );

  const logout = useCallback(() => persist(null), [persist]);

  const value = useMemo(
    () => ({
      user,
      isLoggedIn: !!user,
      findUser,
      emailExists,
      register,
      login,
      logout,
    }),
    [user, findUser, emailExists, register, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
