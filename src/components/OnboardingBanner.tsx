import { useNavigate, useLocation } from "react-router-dom";
import { useOnboardingGate, stepLabel } from "../hooks/useOnboardingGate";

function ProgressBar({ value }: { value: number }) {
  return (
    <div
      className="w-full h-1.5 rounded-full bg-econet-border dark:bg-econet-dark-border overflow-hidden"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <span
        className="block h-full bg-econet-navy dark:bg-white transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default function OnboardingBanner() {
  const navigate = useNavigate();
  const location = useLocation();
  const { unlocked, missingSteps, gateProgressPct } = useOnboardingGate();

  if (unlocked) return null;
  if (location.pathname === "/onboarding") return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="border-b border-econet-border dark:border-econet-dark-border bg-econet-navy/5 dark:bg-white/5"
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 py-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
          <span
            className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full bg-econet-navy text-white text-xs font-bold shrink-0"
            aria-hidden="true"
          >
            {gateProgressPct}%
          </span>
          <div className="min-w-0">
            <p className="text-sm font-bold text-econet-ink dark:text-white">
              Finish onboarding to unlock the rest of the portal
            </p>
            <p className="text-xs text-econet-grey dark:text-white/70 mt-0.5">
              {missingSteps.length === 1
                ? `One step remaining: ${stepLabel(missingSteps[0])}.`
                : `${missingSteps.length} steps remaining — next: ${stepLabel(
                    missingSteps[0]
                  )}.`}
            </p>
            <div className="mt-2 max-w-md">
              <ProgressBar value={gateProgressPct} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:shrink-0">
          <button
            type="button"
            onClick={() => navigate("/onboarding")}
            className="inline-flex items-center justify-center h-9 px-3 rounded-md bg-econet-navy text-white text-sm font-semibold hover:bg-econet-navy/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/40"
          >
            Continue onboarding
          </button>
        </div>
      </div>
    </div>
  );
}
