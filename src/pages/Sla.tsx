import PolicyShell from "../components/PolicyShell";

const anchors = [
  { id: "tiers", label: "1. Uptime tiers" },
  { id: "credits", label: "2. Service credits" },
  { id: "exclusions", label: "3. Exclusions" },
  { id: "claims", label: "4. Claims" },
];

export default function Sla() {
  return (
    <PolicyShell
      title="Service Level Agreement"
      intro="The SLA describes the uptime commitments we make on each subscription tier and the credits available if we fall short."
      lastUpdated="22 May 2026"
      anchors={anchors}
    >
      <h2 id="tiers">1. Uptime tiers</h2>
      <div className="overflow-x-auto my-3">
        <table className="min-w-full text-sm border border-econet-border dark:border-econet-dark-border rounded-md">
          <thead>
            <tr className="bg-econet-surface dark:bg-econet-dark-border text-econet-grey dark:text-white/70 text-left text-xs uppercase tracking-wide">
              <th className="px-4 py-2">Tier</th>
              <th className="px-4 py-2">Monthly uptime</th>
              <th className="px-4 py-2">Support response</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-econet-border dark:divide-econet-dark-border">
            <tr className="text-econet-ink dark:text-white">
              <td className="px-4 py-2 font-semibold">Free</td>
              <td className="px-4 py-2">99.0%</td>
              <td className="px-4 py-2">Best effort</td>
            </tr>
            <tr className="text-econet-ink dark:text-white">
              <td className="px-4 py-2 font-semibold">Growth</td>
              <td className="px-4 py-2">99.5%</td>
              <td className="px-4 py-2">4 business hours</td>
            </tr>
            <tr className="text-econet-ink dark:text-white">
              <td className="px-4 py-2 font-semibold">Enterprise</td>
              <td className="px-4 py-2">99.95%</td>
              <td className="px-4 py-2">1 hour, 24/7</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="credits">2. Service credits</h2>
      <div className="overflow-x-auto my-3">
        <table className="min-w-full text-sm border border-econet-border dark:border-econet-dark-border rounded-md">
          <thead>
            <tr className="bg-econet-surface dark:bg-econet-dark-border text-econet-grey dark:text-white/70 text-left text-xs uppercase tracking-wide">
              <th className="px-4 py-2">Actual uptime</th>
              <th className="px-4 py-2">Credit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-econet-border dark:divide-econet-dark-border">
            <tr className="text-econet-ink dark:text-white">
              <td className="px-4 py-2">Less than 99.5% but at least 99.0%</td>
              <td className="px-4 py-2">10%</td>
            </tr>
            <tr className="text-econet-ink dark:text-white">
              <td className="px-4 py-2">Less than 99.0% but at least 95.0%</td>
              <td className="px-4 py-2">25%</td>
            </tr>
            <tr className="text-econet-ink dark:text-white">
              <td className="px-4 py-2">Less than 95.0%</td>
              <td className="px-4 py-2">50%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="exclusions">3. Exclusions</h2>
      <ul>
        <li>Scheduled maintenance announced at least 72 hours in advance.</li>
        <li>Force majeure events including national network outages outside our control.</li>
        <li>Issues caused by your application code or misconfigured webhook endpoints.</li>
      </ul>

      <h2 id="claims">4. Claims</h2>
      <p>
        Credit claims must be lodged within 30 days of the month in which the SLA was missed by emailing
        billing@econet.co.zw.
      </p>
    </PolicyShell>
  );
}
