import PolicyShell from "../components/PolicyShell";

const anchors = [
  { id: "scope", label: "1. Scope and definitions" },
  { id: "tiers", label: "2. Service tiers" },
  { id: "calculation", label: "3. Uptime calculation" },
  { id: "support", label: "4. Support response and resolution" },
  { id: "maintenance", label: "5. Maintenance windows" },
  { id: "credits", label: "6. Service credits" },
  { id: "exclusions", label: "7. Exclusions" },
  { id: "claims", label: "8. Claims process" },
  { id: "review", label: "9. Continuous improvement and review" },
];

export default function Sla() {
  return (
    <PolicyShell
      title="Service Level Agreement"
      intro="This Service Level Agreement (SLA) describes the availability, performance and support commitments that Econet Wireless Zimbabwe makes for the Econet Onboarding Automation Portal. It applies to the Production endpoints listed in your Service Order. Sandbox endpoints are provided on a best-effort basis and are out of scope. The SLA is part of the Terms and the API Policies. Where there is a conflict the Terms prevail."
      lastUpdated="22 May 2026"
      anchors={anchors}
    >
      <h2 id="scope">1. Scope and definitions</h2>
      <p>For the purposes of this SLA:</p>
      <ul>
        <li>
          <strong>Availability</strong> means the percentage of total minutes in the calendar month in
          which the Service was Available, calculated as set out in section 3.
        </li>
        <li>
          <strong>Available</strong> means an API endpoint returns a 2xx or 4xx HTTP response within the
          target latency for that endpoint, as measured by the Econet platform observability stack.
        </li>
        <li>
          <strong>Critical incident</strong> (Severity 1) means a total Production outage affecting all
          or substantially all developers.
        </li>
        <li>
          <strong>Major incident</strong> (Severity 2) means a Production outage affecting a single
          API family or a single region.
        </li>
        <li>
          <strong>Minor incident</strong> (Severity 3) means a partial degradation or a workaround is
          available.
        </li>
      </ul>

      <h2 id="tiers">2. Service tiers</h2>
      <div className="overflow-x-auto my-3">
        <table className="min-w-full text-sm border border-econet-border dark:border-econet-dark-border rounded-md">
          <thead>
            <tr className="bg-econet-surface dark:bg-econet-dark-border text-econet-grey dark:text-white/70 text-left text-xs uppercase tracking-wide">
              <th className="px-4 py-2">Tier</th>
              <th className="px-4 py-2">Monthly availability</th>
              <th className="px-4 py-2">Support hours</th>
              <th className="px-4 py-2">Severity 1 response</th>
              <th className="px-4 py-2">Severity 2 response</th>
              <th className="px-4 py-2">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-econet-border dark:divide-econet-dark-border">
            <tr className="text-econet-ink dark:text-white">
              <td className="px-4 py-2 font-semibold">Free</td>
              <td className="px-4 py-2">99.0%</td>
              <td className="px-4 py-2">Best effort</td>
              <td className="px-4 py-2">8 business hours</td>
              <td className="px-4 py-2">Next business day</td>
              <td className="px-4 py-2">Community + FAQs only.</td>
            </tr>
            <tr className="text-econet-ink dark:text-white">
              <td className="px-4 py-2 font-semibold">Growth</td>
              <td className="px-4 py-2">99.5%</td>
              <td className="px-4 py-2">07:00–22:00 CAT, Mon–Sat</td>
              <td className="px-4 py-2">4 business hours</td>
              <td className="px-4 py-2">8 business hours</td>
              <td className="px-4 py-2">Email tickets, named CSM at &ge; USD 5k/mo.</td>
            </tr>
            <tr className="text-econet-ink dark:text-white">
              <td className="px-4 py-2 font-semibold">Enterprise</td>
              <td className="px-4 py-2">99.95%</td>
              <td className="px-4 py-2">24×7</td>
              <td className="px-4 py-2">1 hour</td>
              <td className="px-4 py-2">2 hours</td>
              <td className="px-4 py-2">Phone bridge, named TAM, change-freeze rights.</td>
            </tr>
            <tr className="text-econet-ink dark:text-white">
              <td className="px-4 py-2 font-semibold">Carrier (custom)</td>
              <td className="px-4 py-2">99.99%</td>
              <td className="px-4 py-2">24×7</td>
              <td className="px-4 py-2">30 minutes</td>
              <td className="px-4 py-2">1 hour</td>
              <td className="px-4 py-2">Multi-region active-active, hot-DR rehearsal annually.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="calculation">3. Uptime calculation</h2>
      <p>
        Availability for a calendar month is calculated as:
        <em> (Total minutes − Unavailable minutes − Excluded minutes) ÷ (Total minutes − Excluded minutes) × 100</em>.
        We measure from synthetic probes located in Harare and Bulawayo issued every thirty (30) seconds
        and from real-traffic success ratios sampled every minute. The status page at
        status.econet.co.zw is the system of record. Where the two sources disagree, the real-traffic
        signal prevails.
      </p>

      <h2 id="support">4. Support response and resolution</h2>
      <p>
        Severity is assigned by Econet on receipt of the ticket and is reviewable on request. Response
        time is the elapsed wall-clock time from ticket receipt until a named engineer responds with an
        initial assessment. Resolution time is not guaranteed but Econet targets the following
        resolution windows on the Enterprise and Carrier tiers: Severity 1 within four (4) hours,
        Severity 2 within one (1) business day, Severity 3 within five (5) business days. Where the
        root cause is upstream of Econet (for example a NetOne or Telecel interconnect), Econet will
        coordinate with the upstream operator on your behalf but cannot guarantee their performance.
      </p>

      <h2 id="maintenance">5. Maintenance windows</h2>
      <p>
        Planned maintenance is scheduled for the following standing windows and is published at least
        seventy-two (72) hours in advance via email and the status page:
      </p>
      <ul>
        <li>Sunday 02:00–05:00 CAT (carrier-wide changes).</li>
        <li>Wednesday 23:00–01:00 CAT (single-API changes).</li>
      </ul>
      <p>
        Emergency maintenance may be performed without notice where required to address a security
        vulnerability, a fraud incident, a regulator directive, or to prevent imminent loss of
        Subscriber data. Planned maintenance is excluded from Availability. Emergency maintenance is
        excluded only where Econet has obtained advance approval from the affected Enterprise and
        Carrier customers or where exclusion is required by law.
      </p>

      <h2 id="credits">6. Service credits</h2>
      <p>
        Where actual Availability falls below the tier target, you may claim a service credit calculated
        as a percentage of the monthly fees paid for the affected API:
      </p>
      <div className="overflow-x-auto my-3">
        <table className="min-w-full text-sm border border-econet-border dark:border-econet-dark-border rounded-md">
          <thead>
            <tr className="bg-econet-surface dark:bg-econet-dark-border text-econet-grey dark:text-white/70 text-left text-xs uppercase tracking-wide">
              <th className="px-4 py-2">Actual availability</th>
              <th className="px-4 py-2">Growth credit</th>
              <th className="px-4 py-2">Enterprise credit</th>
              <th className="px-4 py-2">Carrier credit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-econet-border dark:divide-econet-dark-border">
            <tr className="text-econet-ink dark:text-white">
              <td className="px-4 py-2">Less than tier target but at least 99.0%</td>
              <td className="px-4 py-2">10%</td>
              <td className="px-4 py-2">15%</td>
              <td className="px-4 py-2">25%</td>
            </tr>
            <tr className="text-econet-ink dark:text-white">
              <td className="px-4 py-2">Less than 99.0% but at least 95.0%</td>
              <td className="px-4 py-2">25%</td>
              <td className="px-4 py-2">30%</td>
              <td className="px-4 py-2">50%</td>
            </tr>
            <tr className="text-econet-ink dark:text-white">
              <td className="px-4 py-2">Less than 95.0%</td>
              <td className="px-4 py-2">50%</td>
              <td className="px-4 py-2">50%</td>
              <td className="px-4 py-2">100%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Service credits are the sole and exclusive remedy for failure to meet the Availability target.
        Credits are applied to the next invoice and may not be carried beyond twelve (12) months. Total
        credits in any calendar month shall not exceed one hundred per cent (100%) of the affected API's
        monthly fee.
      </p>

      <h2 id="exclusions">7. Exclusions</h2>
      <p>Unavailability arising from any of the following is excluded from Availability:</p>
      <ul>
        <li>scheduled maintenance announced in accordance with section 5;</li>
        <li>
          force majeure events including national grid failure, cable cuts on the SEACOM, EASSy or
          WACS submarine cables, lawful seizure, or an Act of State;
        </li>
        <li>
          incidents caused by your application code, your hosting provider, your DNS provider, or
          mis-configured webhook endpoints;
        </li>
        <li>incidents caused by your call rates exceeding the published rate limits;</li>
        <li>
          incidents on upstream networks (NetOne, Telecel, ZIPIT) where Econet has provided correct
          requests and traffic is queued for upstream delivery;
        </li>
        <li>any period during which the Service has been suspended by Econet for breach of the Terms;</li>
        <li>regulator-mandated suspensions of the Service.</li>
      </ul>

      <h2 id="claims">8. Claims process</h2>
      <p>
        Claims must be submitted by emailing billing@econet.co.zw within thirty (30) calendar days of
        the end of the month in which the SLA was missed. A valid claim must reference the affected
        API, the incident references on status.econet.co.zw, and your calculation of the credit due.
        Econet will respond within ten (10) business days. Disputes are escalated under section 17 of
        the Terms.
      </p>

      <h2 id="review">9. Continuous improvement and review</h2>
      <p>
        Enterprise and Carrier customers receive a written quarterly business review of platform
        availability, incident root causes, planned changes and capacity outlook. We publish a public
        annual transparency report that summarises platform availability, security incidents and
        regulatory disclosures (without identifying any individual developer or Subscriber).
      </p>
    </PolicyShell>
  );
}
