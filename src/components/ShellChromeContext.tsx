import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ShellChrome = {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (v: string) => void;
  primaryAction?: ReactNode;
  showDemoToggle?: boolean;
};

type ShellChromeContextValue = {
  chrome: ShellChrome;
  setChrome: (chrome: ShellChrome) => void;
};

const ShellChromeContext = createContext<ShellChromeContextValue | null>(null);

export function ShellChromeProvider({ children }: { children: ReactNode }) {
  const [chrome, setChromeState] = useState<ShellChrome>({});
  const setChrome = useCallback((next: ShellChrome) => setChromeState(next), []);
  const value = useMemo(() => ({ chrome, setChrome }), [chrome, setChrome]);
  return (
    <ShellChromeContext.Provider value={value}>
      {children}
    </ShellChromeContext.Provider>
  );
}

export function useShellChrome(): ShellChromeContextValue {
  const ctx = useContext(ShellChromeContext);
  if (!ctx) throw new Error("useShellChrome must be inside ShellChromeProvider");
  return ctx;
}
