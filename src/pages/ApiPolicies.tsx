import PolicyShell from "../components/PolicyShell";

const anchors = [
  { id: "use", label: "1. Acceptable use" },
  { id: "fair", label: "2. Fair use" },
  { id: "depr", label: "3. Deprecation policy" },
  { id: "breaking", label: "4. Breaking change notice" },
  { id: "security", label: "5. Security and abuse" },
];

export default function ApiPolicies() {
  return (
    <PolicyShell
      title="API Policies"
      intro="Policies that govern how you may use the Econet APIs and how we evolve the platform over time."
      lastUpdated="22 May 2026"
      anchors={anchors}
    >
      <h2 id="use">1. Acceptable use</h2>
      <p>
        You may not use the APIs to send unsolicited marketing, mass-message non-consenting subscribers, or
        attempt to bypass rate limits.
      </p>
      <h2 id="fair">2. Fair use</h2>
      <p>
        Rate limits are enforced per application. We reserve the right to throttle apps whose usage degrades
        platform performance for other tenants.
      </p>
      <h2 id="depr">3. Deprecation policy</h2>
      <p>
        We give a minimum of 6 months notice for deprecating any endpoint or breaking change. Critical
        security changes may be deployed with shorter notice.
      </p>
      <h2 id="breaking">4. Breaking change notice</h2>
      <p>
        Breaking changes are announced in the changelog, broadcast via email to all developers, and reflected
        in a new API version. The previous version remains available until the announced sunset date.
      </p>
      <h2 id="security">5. Security and abuse</h2>
      <p>
        We may suspend any application that breaches the security policy or that is observed engaging in
        abuse of subscribers or of the platform.
      </p>
    </PolicyShell>
  );
}
