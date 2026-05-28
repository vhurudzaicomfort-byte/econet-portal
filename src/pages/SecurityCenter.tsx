import Card from "../components/Card";
import Button from "../components/Button";
import Breadcrumb from "../components/Breadcrumb";
import IconShield from "../icons/IconShield";
import IconCheck from "../icons/IconCheck";
import { useToast } from "../context/ToastContext";

const posture = 92;

const cards = [
  {
    title: "TLS and data encryption",
    body: "TLS 1.2+ enforced on every endpoint. Data encrypted at rest with AES-256 and in transit with modern ciphers.",
  },
  {
    title: "OAuth 2.0 and mTLS",
    body: "OAuth 2.0 with PKCE for subscriber-facing flows. mTLS required for KYC and SIM APIs.",
  },
  {
    title: "Secret rotation",
    body: "Default 90-day rotation policy. Old secrets remain valid for 24 hours after rotation to enable zero-downtime cutovers.",
  },
  {
    title: "Audit logging",
    body: "Every administrative action is logged. Logs are immutable and retained for 12 months.",
  },
  {
    title: "SOC 2 and ISO 27001",
    body: "Annual SOC 2 Type II audit completed. ISO 27001 certification renewed every two years.",
  },
];

function PostureGauge({ value }: { value: number }) {
  const radius = 60;
  const circ = 2 * Math.PI * radius;
  const offset = circ * (1 - value / 100);
  return (
    <svg viewBox="0 0 160 160" width={140} height={140} role="img" aria-label={`Security posture ${value}%`}>
      <circle cx="80" cy="80" r={radius} stroke="#E3E8EC" strokeWidth="14" fill="none" />
      <circle
        cx="80"
        cy="80"
        r={radius}
        stroke="#4C8C40"
        strokeWidth="14"
        fill="none"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 80 80)"
      />
      <text
        x="80"
        y="76"
        textAnchor="middle"
        fontSize="28"
        fontWeight="700"
        className="fill-econet-ink dark:fill-white"
      >
        {value}
      </text>
      <text
        x="80"
        y="98"
        textAnchor="middle"
        fontSize="11"
        className="fill-econet-grey dark:fill-white/70"
      >
        Posture score
      </text>
    </svg>
  );
}

export default function SecurityCenter() {
  const { showToast } = useToast();
  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: "Dashboard", to: "/dashboard" }, { label: "Security Center" }]} />
      <header>
        <p className="text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60">
          Trust and platform security
        </p>
        <h1 className="text-econet-ink dark:text-white">Security Center</h1>
      </header>

      <Card className="grid gap-6 lg:grid-cols-[160px_1fr]">
        <div className="flex items-center justify-center">
          <PostureGauge value={posture} />
        </div>
        <div>
          <h2 className="text-econet-ink dark:text-white">Strong security posture</h2>
          <p className="text-sm text-econet-grey dark:text-white/70 mt-1">
            Your organisation has 92 out of 100 controls in place. Tighten the remaining controls to reach the gold standard.
          </p>
          <ul className="mt-3 space-y-1.5 text-sm">
            <li className="flex items-start gap-2 text-econet-ink dark:text-white/85">
              <IconCheck size={16} className="text-econet-success mt-0.5" /> TLS 1.2+ enforced
            </li>
            <li className="flex items-start gap-2 text-econet-ink dark:text-white/85">
              <IconCheck size={16} className="text-econet-success mt-0.5" /> Secrets rotated within last 90 days
            </li>
            <li className="flex items-start gap-2 text-econet-ink dark:text-white/85">
              <IconCheck size={16} className="text-econet-success mt-0.5" /> All admins enrolled in MFA
            </li>
          </ul>
        </div>
      </Card>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Card key={c.title} className="flex flex-col gap-2">
            <span className="h-10 w-10 inline-flex items-center justify-center rounded-lg bg-econet-navy/10 text-econet-navy">
              <IconShield size={20} />
            </span>
            <h3 className="text-econet-ink dark:text-white">{c.title}</h3>
            <p className="text-sm text-econet-grey dark:text-white/70 leading-7">{c.body}</p>
          </Card>
        ))}
      </div>

      <Card className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h3 className="text-econet-ink dark:text-white">Report a vulnerability</h3>
          <p className="text-sm text-econet-grey dark:text-white/70 mt-1">
            Found a security issue? We respond within one business day.
          </p>
        </div>
        <a
          href="mailto:security@econet.co.zw"
          className="inline-flex items-center justify-center h-11 px-4 rounded-md bg-econet-red text-white font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-red/40"
        >
          security@econet.co.zw
        </a>
      </Card>

      <Card>
        <h3 className="text-econet-ink dark:text-white">Bug bounty</h3>
        <p className="text-sm text-econet-grey dark:text-white/70 mt-1">
          Our bug bounty programme launches in Q3 2026. Pre-register to be notified.
        </p>
        <div className="mt-3">
          <Button
            variant="ghost"
            onClick={() => showToast({ kind: "success", title: "Pre-registered for bug bounty" })}
          >
            Pre-register
          </Button>
        </div>
      </Card>
    </div>
  );
}
