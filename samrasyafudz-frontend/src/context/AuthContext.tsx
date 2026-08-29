import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface AuthUser {
  userId: number;
  email: string;
  phone: string;
  fullName: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
  updateUser: (updates: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  function login(token: string, user: AuthUser) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

function updateUser(updates: Partial<AuthUser>) {
  setUser((prev) => {
    if (!prev) return prev;
    const next = { ...prev, ...updates };
    localStorage.setItem("user", JSON.stringify(next));
    return next;
  });
}
  

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
