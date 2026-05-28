import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type EnvMode = "Sandbox" | "Production";

type EnvContextValue = {
  env: EnvMode;
  setEnv: (env: EnvMode) => void;
};

const EnvContext = createContext<EnvContextValue | null>(null);
const STORAGE_KEY = "econet.env";

export function EnvProvider({ children }: { children: ReactNode }) {
  const [env, setEnvState] = useState<EnvMode>(() => {
    if (typeof window === "undefined") return "Sandbox";
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "Production" ? "Production" : "Sandbox";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, env);
  }, [env]);

  const setEnv = useCallback((next: EnvMode) => setEnvState(next), []);

  const value = useMemo(() => ({ env, setEnv }), [env, setEnv]);

  return <EnvContext.Provider value={value}>{children}</EnvContext.Provider>;
}

export function useEnv(): EnvContextValue {
  const ctx = useContext(EnvContext);
  if (!ctx) throw new Error("useEnv must be used inside EnvProvider");
  return ctx;
}
