import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { defaultUser, type CurrentUser, type UserRole } from "../data/user";

type AuthContextValue = {
  user: CurrentUser | null;
  isAuthenticated: boolean;
  signIn: (email: string) => void;
  signOut: () => void;
  setRole: (role: UserRole) => void;
  updateProfile: (patch: Partial<CurrentUser>) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CurrentUser | null>(null);

  const signIn = useCallback((email: string) => {
    setUser({ ...defaultUser, email: email || defaultUser.email });
  }, []);

  const signOut = useCallback(() => setUser(null), []);

  const setRole = useCallback((role: UserRole) => {
    setUser((prev) => (prev ? { ...prev, role } : prev));
  }, []);

  const updateProfile = useCallback((patch: Partial<CurrentUser>) => {
    setUser((prev) => (prev ? { ...prev, ...patch } : prev));
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      signIn,
      signOut,
      setRole,
      updateProfile,
    }),
    [user, signIn, signOut, setRole, updateProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
