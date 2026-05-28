import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import Stepper from "../components/Stepper";
import Breadcrumb from "../components/Breadcrumb";
import IconCheck from "../icons/IconCheck";
import IconArrowRight from "../icons/IconArrowRight";
import {
  ONBOARDING_STEPS,
  useOnboarding,
  type OnboardingStepId,
} from "../context/OnboardingContext";
import { useToast } from "../context/ToastContext";

const stepMeta: Record<
  OnboardingStepId,
  {
    label: string;
    description: string;
    tasks: string[];
    ctaLabel: string;
    ctaTo?: string;
  }
> = {
  register: {
    label: "Register",
    description: "Create your developer account.",
    tasks: ["Sign up with a work email", "Accept the developer terms"],
    ctaLabel: "View profile",
    ctaTo: "/profile",
  },
  verify: {
    label: "Verify email",
    description: "Confirm your address.",
    tasks: ["Click the verification link sent to your inbox"],
    ctaLabel: "Resend verification",
    ctaTo: "/profile",
  },
  organization: {
    label: "Create organization",
    description: "Set up the legal entity for your applications.",
    tasks: ["Add organization name", "Add registration number", "Add primary contact"],
    ctaLabel: "Open profile",
    ctaTo: "/profile",
  },
  application: {
    label: "Create application",
    description: "Spin up your first sandbox application.",
    tasks: ["Choose a name", "Pick a callback URL", "Assign a team"],
    ctaLabel: "Build app",
    ctaTo: "/apps/new",
  },
  "select-apis": {
    label: "Select APIs",
    description: "Subscribe the application to the APIs you need.",
    tasks: ["Browse the API catalogue", "Subscribe one or more APIs"],
    ctaLabel: "Browse APIs",
    ctaTo: "/apis",
  },
  "generate-keys": {
    label: "Generate keys",
    description: "Issue sandbox credentials.",
    tasks: ["Generate a sandbox access token", "Store it in your secret manager"],
    ctaLabel: "Open Access Tokens",
    ctaTo: "/tokens",
  },
  "sandbox-testing": {
    label: "Sandbox testing",
    description: "Confirm calls work end-to-end.",
    tasks: ["Run a sandbox call from the API Explorer", "Receive a sandbox webhook"],
    ctaLabel: "Open API Explorer",
    ctaTo: "/api-explorer",
  },
  "go-live": {
    label: "Go live",
    description: "Promote your application to production.",
    tasks: [
      "Submit production review",
      "Receive production credentials",
      "Run your first live transaction",
    ],
    ctaLabel: "Open My Apps",
    ctaTo: "/apps",
  },
};

export default function Onboarding() {
  const navigate = useNavigate();
  const { state, markComplete, progress, resetOnboarding } = useOnboarding();
  const { showToast } = useToast();

  const activeIndex = ONBOARDING_STEPS.findIndex((s) => !state[s]);
  const safeActive = activeIndex === -1 ? ONBOARDING_STEPS.length - 1 : activeIndex;

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: "Dashboard", to: "/dashboard" }, { label: "Onboarding" }]} />
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60">
            Get set up
          </p>
          <h1 className="text-econet-ink dark:text-white">Onboarding</h1>
          <p className="text-sm text-econet-grey dark:text-white/70 mt-1 max-w-2xl">
            Eight steps from a sign-up to your first production transaction. Progress is saved automatically.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-econet-ink dark:text-white">
            {progress}%
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              resetOnboarding();
              showToast({ kind: "info", title: "Onboarding reset" });
            }}
          >
            Reset
          </Button>
        </div>
      </header>

      <Card>
        <Stepper
          steps={ONBOARDING_STEPS.map((id) => ({
            id,
            label: stepMeta[id].label,
            description: stepMeta[id].description,
          }))}
          activeIndex={safeActive}
        />
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        {ONBOARDING_STEPS.map((id, idx) => {
          const meta = stepMeta[id];
          const done = state[id];
          return (
            <Card key={id} className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60">
                    Step {idx + 1}
                  </p>
                  <h3 className="text-econet-ink dark:text-white">{meta.label}</h3>
                  <p className="text-sm text-econet-grey dark:text-white/70 mt-1">
                    {meta.description}
                  </p>
                </div>
                {done ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-econet-success/10 text-econet-success text-xs font-semibold px-2.5 py-1">
                    <IconCheck size={14} aria-hidden="true" />
                    Done
                  </span>
                ) : null}
              </div>
              <ul className="space-y-2">
                {meta.tasks.map((t, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-econet-ink dark:text-white/90"
                  >
                    <span
                      className={`mt-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center ${
                        done ? "bg-econet-navy text-white" : "border border-econet-border dark:border-econet-dark-border"
                      }`}
                      aria-hidden="true"
                    >
                      {done ? <IconCheck size={10} /> : null}
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2 pt-2 border-t border-econet-border dark:border-econet-dark-border">
                <Button
                  variant={done ? "ghost" : "primary"}
                  size="sm"
                  iconRight={<IconArrowRight size={16} />}
                  onClick={() => {
                    markComplete(id, true);
                    if (meta.ctaTo) navigate(meta.ctaTo);
                  }}
                >
                  {done ? "Revisit" : meta.ctaLabel}
                </Button>
                {!done ? (
                  <button
                    type="button"
                    onClick={() => markComplete(id, true)}
                    className="ml-auto text-xs font-semibold text-econet-grey dark:text-white/60 hover:text-econet-ink dark:hover:text-white px-2 h-8 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30"
                  >
                    Skip for now
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => markComplete(id, false)}
                    className="ml-auto text-xs font-semibold text-econet-grey dark:text-white/60 hover:text-econet-ink dark:hover:text-white px-2 h-8 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30"
                  >
                    Mark incomplete
                  </button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
