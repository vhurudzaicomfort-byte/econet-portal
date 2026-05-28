import Card from "../components/Card";
import Button from "../components/Button";
import Breadcrumb from "../components/Breadcrumb";
import IconShield from "../icons/IconShield";
import IconCheck from "../icons/IconCheck";
import IconDocument from "../icons/IconDocument";
import { useToast } from "../context/ToastContext";

type Framework = {
  title: string;
  authority: string;
  body: string;
  status: "Active" | "In review" | "Renewing";
  reference: string;
};

const frameworks: Framework[] = [
  {
    title: "Telecommunications operator licence",
    authority: "POTRAZ",
    body: "Econet Wireless Zimbabwe holds a Cellular Telecommunications Service Provider (CTSP) licence under the Postal and Telecommunications Act [Chapter 12:05]. The licence covers voice, SMS, USSD, mobile data and value-added services across all ten provinces.",
    status: "Active",
    reference: "POTRAZ/CTSP/02/EWZ",
  },
  {
    title: "National Payment System designation",
    authority: "Reserve Bank of Zimbabwe",
    body: "EcoCash is a designated payment system under the National Payment Systems Act [Chapter 24:23]. Operations are supervised by the Financial Markets and National Payment Systems Division of the Reserve Bank of Zimbabwe.",
    status: "Active",
    reference: "RBZ/NPS/DSG/008",
  },
  {
    title: "Anti-Money Laundering and Counter-Terrorism Financing",
    authority: "Financial Intelligence Unit",
    body: "Compliance with the Money Laundering and Proceeds of Crime Act [Chapter 9:24] and the FIU AML/CFT Directive. Customer due diligence, ongoing monitoring, sanctions screening and Suspicious Transaction Reporting are operational and audited annually.",
    status: "Active",
    reference: "FIU/AML/EWZ/2024",
  },
  {
    title: "Cyber and Data Protection Act compliance",
    authority: "Data Protection Authority (POTRAZ)",
    body: "Registration of personal information processing as required by section 14 of the CDPA. Standing Data Protection Officer notified to the Authority. Annual compliance return filed.",
    status: "Active",
    reference: "DPA/EWZ/2025",
  },
  {
    title: "Lawful Intercept",
    authority: "Office of the President and Cabinet",
    body: "Section 9 of the Interception of Communications Act [Chapter 11:20] obliges service providers to maintain interception capability. Disclosures are made only on receipt of a valid warrant signed by an authorised officer.",
    status: "Active",
    reference: "ICA/2007/§9",
  },
  {
    title: "ISO/IEC 27001 information security",
    authority: "External assessor",
    body: "Annual third-party certification of the information security management system covering the developer platform, payments stack, identity service and supporting infrastructure.",
    status: "Renewing",
    reference: "Certificate 28-IS-9314 (2026 audit in progress)",
  },
  {
    title: "PCI DSS v4.0 for wallet rails",
    authority: "Qualified Security Assessor",
    body: "Wallet and card-on-file flows are scoped against PCI DSS v4.0. Annual Report on Compliance signed by a Visa-listed Qualified Security Assessor.",
    status: "Active",
    reference: "ROC 2025/EWZ",
  },
  {
    title: "Exchange Control compliance",
    authority: "Exchange Control Department, RBZ",
    body: "Cross-border collections and disbursements are reported in accordance with the Exchange Control Act [Chapter 22:05] and the Exchange Control Regulations. Authorised Dealer mandates are reconciled monthly with Steward Bank.",
    status: "Active",
    reference: "ECD/EWZ/2025",
  },
];

const auditCadence = [
  { name: "External information security audit", frequency: "Annual", lastRun: "Mar 2026" },
  { name: "PCI DSS Report on Compliance", frequency: "Annual", lastRun: "Feb 2026" },
  { name: "Internal AML/CFT audit", frequency: "Quarterly", lastRun: "Q1 2026" },
  { name: "Penetration test (external)", frequency: "Quarterly", lastRun: "Apr 2026" },
  { name: "Disaster recovery rehearsal", frequency: "Bi-annual", lastRun: "Nov 2025" },
  { name: "Independent CDPA gap assessment", frequency: "Annual", lastRun: "Jan 2026" },
];

const statusStyle: Record<Framework["status"], string> = {
  Active: "bg-econet-success/10 text-econet-success border-econet-success/30",
  "In review": "bg-econet-info/10 text-econet-info border-econet-info/30",
  Renewing: "bg-econet-orange/10 text-econet-orange border-econet-orange/30",
};

export default function Compliance() {
  const { showToast } = useToast();
  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: "Dashboard", to: "/dashboard" }, { label: "Compliance" }]} />
      <header className="flex flex-col gap-2">
        <p className="text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60">
          Regulatory standing
        </p>
        <h1 className="text-econet-ink dark:text-white">Compliance</h1>
        <p className="text-sm text-econet-grey dark:text-white/70 max-w-3xl">
          Econet Wireless Zimbabwe operates under the supervision of the Postal and
          Telecommunications Regulatory Authority of Zimbabwe (POTRAZ) and the Reserve Bank of
          Zimbabwe. The frameworks below set out the regulatory posture of the Econet Onboarding
          Automation Portal. All licences, certifications and audit letters are available for
          inspection on request.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        {frameworks.map((f) => (
          <Card key={f.title} className="flex flex-col gap-2">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-econet-navy/10 dark:bg-white/10 text-econet-navy dark:text-white">
                  <IconShield size={20} />
                </span>
                <div>
                  <h3 className="text-econet-ink dark:text-white">{f.title}</h3>
                  <p className="text-xs font-semibold text-econet-grey dark:text-white/60 mt-0.5">
                    {f.authority}
                  </p>
                </div>
              </div>
              <span
                className={`inline-flex items-center rounded-full text-xs font-semibold border px-2.5 py-0.5 ${statusStyle[f.status]}`}
              >
                {f.status}
              </span>
            </div>
            <p className="text-sm text-econet-grey dark:text-white/70 leading-7">{f.body}</p>
            <p className="text-xs text-econet-grey dark:text-white/60 font-mono">{f.reference}</p>
          </Card>
        ))}
      </div>

      <Card>
        <h3 className="text-econet-ink dark:text-white">Audit cadence</h3>
        <p className="text-sm text-econet-grey dark:text-white/70 mt-1">
          Recurring assurance activities and last completion dates.
        </p>
        <ul className="divide-y divide-econet-border dark:divide-econet-dark-border mt-3">
          {auditCadence.map((a) => (
            <li key={a.name} className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <div className="flex items-start gap-2">
                <span className="text-econet-success mt-0.5">
                  <IconCheck size={16} />
                </span>
                <p className="text-sm font-semibold text-econet-ink dark:text-white">{a.name}</p>
              </div>
              <div className="flex items-center gap-6 text-xs text-econet-grey dark:text-white/60 pl-6 sm:pl-0">
                <span>{a.frequency}</span>
                <span>Last run: {a.lastRun}</span>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <h3 className="text-econet-ink dark:text-white">Lawful intercept disclosure framework</h3>
          <p className="text-sm text-econet-grey dark:text-white/70 mt-1 leading-7">
            Disclosures are made only on receipt of a warrant or court order that meets the
            requirements of the Interception of Communications Act [Chapter 11:20], the Criminal
            Procedure and Evidence Act [Chapter 9:07] and the CDPA. Each request is reviewed by the
            General Counsel before any data is released. We publish an annual transparency report
            summarising the number, source and category of requests received.
          </p>
        </Card>

        <Card>
          <h3 className="text-econet-ink dark:text-white">Whistleblower channel</h3>
          <p className="text-sm text-econet-grey dark:text-white/70 mt-1 leading-7">
            A confidential whistleblower channel is operated by Deloitte Zimbabwe on behalf of the
            Econet Board Audit Committee at <span className="font-semibold">tip-offs@econet.co.zw</span>{" "}
            or by toll-free phone on 08008 8888. Reports may be made anonymously. Retaliation against
            any person who raises a concern in good faith is prohibited under company policy.
          </p>
        </Card>
      </div>

      <Card>
        <h3 className="text-econet-ink dark:text-white mb-3">Data residency</h3>
        <p className="text-sm text-econet-grey dark:text-white/70 mb-4 leading-7">
          Subscriber data is stored at Econet's Tier III data centres in Harare (primary) and Bulawayo
          (disaster recovery), interconnected by dedicated dark fibre on the Liquid Intelligent
          Technologies backbone. Daily encrypted backups are held in a third Zimbabwean location.
          Cross-border transfers occur only under standard contractual clauses approved by the Data
          Protection Authority and only for limited Developer Data.
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
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-econet-navy/10 dark:bg-white/10 text-econet-navy dark:text-white">
            <IconDocument size={20} />
          </span>
          <div>
            <h3 className="text-econet-ink dark:text-white">Data Processing Addendum</h3>
            <p className="text-sm text-econet-grey dark:text-white/70 mt-1 max-w-xl">
              The standard Data Processing Addendum (DPA) covers Econet's obligations as data controller
              under the CDPA and is required for any Application that processes Subscriber Data through
              the Platform. Legal review takes approximately five business days.
            </p>
          </div>
        </div>
        <Button
          variant="primary"
          onClick={() =>
            showToast({
              kind: "success",
              title: "DPA download queued",
              body: "We'll email a signed copy to your account address.",
            })
          }
        >
          Download DPA template
        </Button>
      </Card>
    </div>
  );
}
