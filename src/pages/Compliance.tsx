import Card from "../components/Card";
import Button from "../components/Button";
import Breadcrumb from "../components/Breadcrumb";
import { useToast } from "../context/ToastContext";

const frameworks = [
  {
    title: "POPIA",
    body: "Compliant with the Protection of Personal Information Act (South Africa) for cross-border data transfers.",
  },
  {
    title: "GDPR (where applicable)",
    body: "Data-subject rights honoured for EU residents who use applications built on the platform.",
  },
  {
    title: "Zimbabwe Data Protection Act 2021",
    body: "Local data is processed and stored on Zimbabwean infrastructure with explicit subscriber consent receipts.",
  },
  {
    title: "KYC and AML",
    body: "Tier 1 to Tier 4 wallet KYC enforced at the Econet customer master. AML monitoring on every wallet flow.",
  },
];

export default function Compliance() {
  const { showToast } = useToast();
  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: "Dashboard", to: "/dashboard" }, { label: "Compliance" }]} />
      <header>
        <p className="text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60">
          Regulatory standing
        </p>
        <h1 className="text-econet-ink dark:text-white">Compliance</h1>
      </header>

      <div className="grid gap-5 sm:grid-cols-2">
        {frameworks.map((f) => (
          <Card key={f.title}>
            <h3 className="text-econet-ink dark:text-white">{f.title}</h3>
            <p className="text-sm text-econet-grey dark:text-white/70 mt-1 leading-7">{f.body}</p>
          </Card>
        ))}
      </div>

      <Card>
        <h3 className="text-econet-ink dark:text-white">Lawful intercept</h3>
        <p className="text-sm text-econet-grey dark:text-white/70 mt-1 leading-7">
          Econet complies with lawful intercept obligations under the Interception of Communications Act
          [Chapter 11:20]. Disclosures are made only on receipt of a valid court order or instrument signed
          by an authorised officer.
        </p>
      </Card>

      <Card>
        <h3 className="text-econet-ink dark:text-white mb-3">Data residency</h3>
        <p className="text-sm text-econet-grey dark:text-white/70 mb-4 leading-7">
          All subscriber data is stored at Econet's Tier III data centres in Harare with disaster-recovery in Bulawayo.
        </p>
        <div className="flex items-center justify-center">
          <svg viewBox="0 0 220 220" width={220} height={220} role="img" aria-label="Map of Africa highlighting Zimbabwe">
            <title>Map of Africa with Zimbabwe highlighted</title>
            <path
              d="M110 10c25 0 50 18 60 45 8 22 5 50-5 75-8 21-22 38-30 55-5 12-4 24 0 30-15 5-30 0-40-10-10-12-15-30-25-50-12-25-20-45-15-70 5-30 30-75 55-75z"
              fill="#E3E8EC"
              stroke="#677A81"
              strokeWidth="1.2"
            />
            <path
              d="M95 122c5-2 15-3 22-2 8 2 12 6 14 12-1 9-5 18-15 22-7 2-15-1-20-7-5-8-7-18-1-25z"
              fill="#E2231A"
              stroke="#001E96"
              strokeWidth="1.2"
            />
            <text x="108" y="148" fontSize="9" fontWeight="700" fill="#FFFFFF" textAnchor="middle">
              ZW
            </text>
          </svg>
        </div>
      </Card>

      <Card className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h3 className="text-econet-ink dark:text-white">Data Processing Agreement</h3>
          <p className="text-sm text-econet-grey dark:text-white/70 mt-1">
            Standard DPA template available for legal review.
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => showToast({ kind: "info", title: "DPA download queued", body: "Email link sent." })}
        >
          Download DPA template
        </Button>
      </Card>
    </div>
  );
}
