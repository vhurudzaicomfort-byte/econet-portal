import { useMemo } from "react";
import {
  ONBOARDING_STEPS,
  useOnboarding,
  type OnboardingStepId,
} from "../context/OnboardingContext";

const GATE_STEPS: OnboardingStepId[] = ["register", "verify", "organization"];

const STEP_LABEL: Record<OnboardingStepId, string> = {
  register: "Register",
  verify: "Verify email",
  organization: "Create organization",
  application: "Create application",
  "select-apis": "Select APIs",
  "generate-keys": "Generate keys",
  "sandbox-testing": "Sandbox testing",
  "go-live": "Go live",
};

export type OnboardingGate = {
  unlocked: boolean;
  missingSteps: OnboardingStepId[];
  primaryBlocker: OnboardingStepId | null;
  primaryBlockerLabel: string;
  gateSteps: OnboardingStepId[];
  gateProgressPct: number;
};

export function useOnboardingGate(): OnboardingGate {
  const { state } = useOnboarding();

  return useMemo(() => {
    const missing = GATE_STEPS.filter((s) => !state[s]);
    const unlocked = missing.length === 0;
    const primary = missing[0] ?? null;
    const completed = GATE_STEPS.filter((s) => state[s]).length;
    const pct = Math.round((completed / GATE_STEPS.length) * 100);
    return {
      unlocked,
      missingSteps: missing,
      primaryBlocker: primary,
      primaryBlockerLabel: primary ? STEP_LABEL[primary] : "",
      gateSteps: GATE_STEPS,
      gateProgressPct: pct,
    };
  }, [state]);
}

export function stepLabel(id: OnboardingStepId): string {
  return STEP_LABEL[id];
}

export { GATE_STEPS, ONBOARDING_STEPS };
