import PolicyShell from "../components/PolicyShell";

const anchors = [
  { id: "scope", label: "1. Scope" },
  { id: "data", label: "2. Data we collect" },
  { id: "uses", label: "3. How we use data" },
  { id: "sharing", label: "4. Sharing" },
  { id: "retention", label: "5. Retention" },
  { id: "rights", label: "6. Your rights" },
  { id: "contact", label: "7. Contact" },
];

export default function Privacy() {
  return (
    <PolicyShell
      title="Privacy Policy"
      intro="This policy explains how Econet Wireless Zimbabwe collects, uses and protects personal information processed through the developer platform."
      lastUpdated="22 May 2026"
      anchors={anchors}
    >
      <h2 id="scope">1. Scope</h2>
      <p>
        This policy applies to personal data we process about developers using the platform and about
        subscribers whose data is processed by applications built on the platform.
      </p>
      <h2 id="data">2. Data we collect</h2>
      <p>We collect: account identifiers, application metadata, API call logs and billing information.</p>
      <h2 id="uses">3. How we use data</h2>
      <p>We use data to provide the service, prevent abuse, meet legal obligations, and improve the platform.</p>
      <h2 id="sharing">4. Sharing</h2>
      <p>
        We share data only with sub-processors necessary to deliver the platform and with regulators on
        receipt of a valid instrument.
      </p>
      <h2 id="retention">5. Retention</h2>
      <p>Log data is retained for 12 months. Billing data is retained for 7 years to meet statutory requirements.</p>
      <h2 id="rights">6. Your rights</h2>
      <p>
        You may request access, correction or deletion of your personal data by emailing
        privacy@econet.co.zw.
      </p>
      <h2 id="contact">7. Contact</h2>
      <p>For questions about this policy, contact our Data Protection Officer at dpo@econet.co.zw.</p>
    </PolicyShell>
  );
}
