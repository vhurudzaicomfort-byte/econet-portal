import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import Card from "../components/Card";
import Button from "../components/Button";
import Breadcrumb from "../components/Breadcrumb";
import IconCloud from "../icons/IconCloud";
import IconArrowRight from "../icons/IconArrowRight";
import { useApps } from "../context/AppsContext";

type EnvPanel = {
  name: "Sandbox" | "Production";
  baseUrl: string;
  authUrl: string;
  webhookSig: string;
  tone: "navy" | "red";
};

const panels: EnvPanel[] = [
  {
    name: "Sandbox",
    baseUrl: "https://sandbox.api.econet.co.zw",
    authUrl: "https://sandbox.auth.econet.co.zw",
    webhookSig: "ecwh_sand_demo_q5J9wRzZ1hF8nKlX",
    tone: "navy",
  },
  {
    name: "Production",
    baseUrl: "https://api.econet.co.zw",
    authUrl: "https://auth.econet.co.zw",
    webhookSig: "ecwh_live_demo_g7N3xQpY2nB6mTzD",
    tone: "red",
  },
];

export default function Environments() {
  const navigate = useNavigate();
  const { apps } = useApps();
  const hasLive = apps.some((a) => a.environment === "Production" && a.status === "Live");

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: "Dashboard", to: "/dashboard" }, { label: "Environments" }]} />
      <header>
        <p className="text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60">
          Per-environment configuration
        </p>
        <h1 className="text-econet-ink dark:text-white">Environments</h1>
        <p className="text-sm text-econet-grey dark:text-white/70 mt-1 max-w-2xl">
          Sandbox is self-service. Production requires a quick review by the Econet platform team.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        {panels.map((p) => (
          <Card key={p.name} className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <span
                className={clsx(
                  "h-12 w-12 flex items-center justify-center rounded-lg",
                  p.tone === "navy" ? "bg-econet-navy/10 text-econet-navy" : "bg-econet-red/10 text-econet-red"
                )}
              >
                <IconCloud size={24} />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60">
                  Environment
                </p>
                <h2 className="text-econet-ink dark:text-white">{p.name}</h2>
              </div>
            </div>
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="text-xs font-semibold text-econet-grey dark:text-white/60 uppercase tracking-wide">
                  Base URL
                </dt>
                <dd className="font-mono text-econet-ink dark:text-white">{p.baseUrl}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold text-econet-grey dark:text-white/60 uppercase tracking-wide">
                  Auth URL
                </dt>
                <dd className="font-mono text-econet-ink dark:text-white">{p.authUrl}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold text-econet-grey dark:text-white/60 uppercase tracking-wide">
                  Webhook signing key (preview)
                </dt>
                <dd className="font-mono text-econet-ink dark:text-white">{p.webhookSig.slice(0, 12)}…</dd>
              </div>
            </dl>
            <div className="pt-3 border-t border-econet-border dark:border-econet-dark-border flex items-center justify-between gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigate("/tokens")}>
                Manage credentials
              </Button>
              <Button
                variant="primary"
                size="sm"
                iconRight={<IconArrowRight size={14} />}
                onClick={() =>
                  navigate(p.name === "Sandbox" ? "/sandbox" : "/apps")
                }
              >
                Open
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {!hasLive ? (
        <Card className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h3 className="text-econet-ink dark:text-white">Ready to go live?</h3>
            <p className="text-sm text-econet-grey dark:text-white/70 mt-1">
              Request production access for one of your sandbox apps. Reviews typically complete within 3 business days.
            </p>
          </div>
          <Button variant="primary" onClick={() => navigate("/apps")}>
            Request production access
          </Button>
        </Card>
      ) : null}

      <Card>
        <h3 className="text-econet-ink dark:text-white mb-3">Recent promotions</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center justify-between border-b border-econet-border dark:border-econet-dark-border pb-2">
            <span className="text-econet-ink dark:text-white">Pindula Wallet promoted to Production</span>
            <span className="text-econet-grey dark:text-white/60">22 Jan 2026</span>
          </li>
          <li className="flex items-center justify-between border-b border-econet-border dark:border-econet-dark-border pb-2">
            <span className="text-econet-ink dark:text-white">Steward OTP Service submitted for review</span>
            <span className="text-econet-grey dark:text-white/60">18 May 2026</span>
          </li>
          <li className="flex items-center justify-between pb-1">
            <span className="text-econet-ink dark:text-white">Cassava Care Bot created in Sandbox</span>
            <span className="text-econet-grey dark:text-white/60">20 May 2026</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
