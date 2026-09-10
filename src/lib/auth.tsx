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
const USERS_KEY = "nip-users-v1";

/** Demo build: any mobile number logs in with this code. */
export const DEMO_OTP = "1234";

export type AppUser = {
  name: string;
  mobile: string;
  email: string;
};

type AuthContextValue = {
  user: AppUser | null;
  isLoggedIn: boolean;
  findUser: (mobile: string) => AppUser | null;
  register: (user: AppUser) => void;
  login: (mobile: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readUsers(): AppUser[] {
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as AppUser[]) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: AppUser[]) {
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
    return readUsers().find((u) => normalizeMobile(u.mobile) === m) ?? null;
  }, []);

  const register = useCallback(
    (next: AppUser) => {
      const m = normalizeMobile(next.mobile);
      const record: AppUser = { ...next, mobile: m };
      const users = readUsers().filter((u) => normalizeMobile(u.mobile) !== m);
      writeUsers([...users, record]);
      persist(record);
    },
    [persist],
  );

  const login = useCallback(
    (mobile: string) => {
      const m = normalizeMobile(mobile);
      const existing = readUsers().find((u) => normalizeMobile(u.mobile) === m);
      persist(existing ?? { name: "Guest", mobile: m, email: "" });
    },
    [persist],
  );

  const logout = useCallback(() => persist(null), [persist]);

  const value = useMemo(
    () => ({ user, isLoggedIn: !!user, findUser, register, login, logout }),
    [user, findUser, register, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
