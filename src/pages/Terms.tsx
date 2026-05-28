import PolicyShell from "../components/PolicyShell";

const anchors = [
  { id: "acceptance", label: "1. Acceptance" },
  { id: "use", label: "2. Use of the platform" },
  { id: "credentials", label: "3. Credentials and security" },
  { id: "sandbox", label: "4. Sandbox usage" },
  { id: "production", label: "5. Production access" },
  { id: "fees", label: "6. Fees" },
  { id: "termination", label: "7. Termination" },
  { id: "liability", label: "8. Limitation of liability" },
  { id: "law", label: "9. Governing law" },
];

export default function Terms() {
  return (
    <PolicyShell
      title="Terms and Conditions"
      intro="These terms govern your access to and use of the Econet Developer Platform. By using the platform you agree to be bound by them."
      lastUpdated="22 May 2026"
      anchors={anchors}
    >
      <h2 id="acceptance">1. Acceptance</h2>
      <p>
        By creating an account, you confirm that you have authority to bind your organisation and that the
        information you provide is accurate.
      </p>
      <h2 id="use">2. Use of the platform</h2>
      <p>
        You agree to use the platform only for lawful purposes and not to interfere with the integrity or
        performance of the platform or the underlying networks.
      </p>
      <h2 id="credentials">3. Credentials and security</h2>
      <p>
        You are responsible for safeguarding the credentials issued to you. We may suspend any application
        whose credentials are suspected to be compromised.
      </p>
      <h2 id="sandbox">4. Sandbox usage</h2>
      <p>
        The sandbox is for development and testing only. We may reset sandbox state at any time and without
        notice.
      </p>
      <h2 id="production">5. Production access</h2>
      <p>
        Production access requires successful review by the Econet platform team and acceptance of any
        applicable schedules to these terms.
      </p>
      <h2 id="fees">6. Fees</h2>
      <p>Fees are invoiced monthly. Late fees attract interest at the prevailing bank lending rate.</p>
      <h2 id="termination">7. Termination</h2>
      <p>
        Either party may terminate on 30 days written notice. We may terminate immediately for material
        breach.
      </p>
      <h2 id="liability">8. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, our aggregate liability is capped at the fees paid in the 12
        months preceding the event giving rise to liability.
      </p>
      <h2 id="law">9. Governing law</h2>
      <p>These terms are governed by the laws of Zimbabwe. Disputes shall be resolved in the High Court of Zimbabwe.</p>
    </PolicyShell>
  );
}
