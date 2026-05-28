import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const ONBOARDING_STEPS = [
  "register",
  "verify",
  "organization",
  "application",
  "select-apis",
  "generate-keys",
  "sandbox-testing",
  "go-live",
] as const;

export type OnboardingStepId = (typeof ONBOARDING_STEPS)[number];

type OnboardingState = Record<OnboardingStepId, boolean>;

const initialState: OnboardingState = {
  register: true,
  verify: true,
  organization: false,
  application: false,
  "select-apis": false,
  "generate-keys": false,
  "sandbox-testing": false,
  "go-live": false,
};

type OnboardingContextValue = {
  state: OnboardingState;
  markComplete: (id: OnboardingStepId, done?: boolean) => void;
  progress: number;
  resetOnboarding: () => void;
};

const OnboardingContext = createContext<OnboardingContextValue | null>(null);
const STORAGE_KEY = "econet.onboarding";

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OnboardingState>(() => {
    if (typeof window === "undefined") return initialState;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) return initialState;
      const parsed = JSON.parse(stored) as Partial<OnboardingState>;
      return { ...initialState, ...parsed };
    } catch {
      return initialState;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const markComplete = useCallback((id: OnboardingStepId, done = true) => {
    setState((prev) => ({ ...prev, [id]: done }));
  }, []);

  const resetOnboarding = useCallback(() => setState(initialState), []);

  const progress = useMemo(() => {
    const total = ONBOARDING_STEPS.length;
    const done = ONBOARDING_STEPS.filter((s) => state[s]).length;
    return Math.round((done / total) * 100);
  }, [state]);

  const value = useMemo(
    () => ({ state, markComplete, progress, resetOnboarding }),
    [state, markComplete, progress, resetOnboarding]
  );

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

export function useOnboarding(): OnboardingContextValue {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used inside OnboardingProvider");
  return ctx;
}
