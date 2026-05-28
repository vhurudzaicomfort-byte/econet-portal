import PolicyShell from "../components/PolicyShell";

const anchors = [
  { id: "scope", label: "1. Scope" },
  { id: "acceptable", label: "2. Acceptable use" },
  { id: "fair", label: "3. Fair use and rate limits" },
  { id: "auth", label: "4. Authentication and credentials" },
  { id: "webhooks", label: "5. Webhook signing and delivery" },
  { id: "data", label: "6. Subscriber data handling" },
  { id: "versioning", label: "7. Versioning, deprecation and sunset" },
  { id: "errors", label: "8. Error handling and idempotency" },
  { id: "abuse", label: "9. Abuse prevention" },
  { id: "disclosure", label: "10. Responsible disclosure" },
  { id: "changes", label: "11. Changes to these policies" },
];

export default function ApiPolicies() {
  return (
    <PolicyShell
      title="API Policies"
      intro="These API Policies set out the technical and operational rules that govern your use of the Econet APIs. They are incorporated into the Terms and are binding on all Applications. They are intended to keep the Platform safe for Subscribers, fair across developers and stable for production traffic. Where a specific API publishes additional rules in its endpoint reference, those rules prevail to the extent of any conflict."
      lastUpdated="22 May 2026"
      anchors={anchors}
    >
      <h2 id="scope">1. Scope</h2>
      <p>
        These policies apply to every Sandbox and Production endpoint exposed under api.econet.co.zw,
        auth.econet.co.zw, voice.econet.co.zw, ai.econet.co.zw and ads.econet.co.zw, and to every
        webhook delivered by Econet to a developer endpoint.
      </p>

      <h2 id="acceptable">2. Acceptable use</h2>
      <p>You must not use the APIs to:</p>
      <ul>
        <li>send unsolicited marketing to Subscribers who have not opted in;</li>
        <li>
          generate or send content that is unlawful, defamatory, obscene, harmful to children, or in
          contravention of the Postal and Telecommunications Act;
        </li>
        <li>
          attempt to enumerate MSISDNs, KYC fields, or other Subscriber data by brute force or
          inference;
        </li>
        <li>circumvent the consent flow described in section 6 or capture Subscriber data through means other than the consent prompt;</li>
        <li>introduce malicious code, fuzzers, or scanners that are not part of the published Responsible Disclosure programme;</li>
        <li>
          create derivative datasets that are linked to, or could be re-linked to, an identifiable
          Subscriber and shared with a third party.
        </li>
      </ul>

      <h2 id="fair">3. Fair use and rate limits</h2>
      <p>
        Each API publishes a per-second, per-day and burst rate limit. The limit applies per
        Application identifier. Requests that exceed the burst budget are answered with HTTP 429 and
        carry a <code>Retry-After</code> header indicating either seconds to wait or an HTTP-date. We
        reserve the right to throttle, queue or shed traffic that is degrading the Platform for other
        tenants without prior notice. Sustained breach of rate limits beyond a calendar week is treated
        as a breach of the Terms.
      </p>
      <p>
        Applications that need a permanently higher limit may apply through the platform team. We will
        consider the technical reason, your historic success ratio, your error budget consumption and
        the capacity head-room of the target API.
      </p>

      <h2 id="auth">4. Authentication and credentials</h2>
      <ul>
        <li>
          Server-to-server flows must use OAuth 2.0 client-credentials with PKCE, or, for high-value
          wallet APIs, mTLS with a client certificate issued by the Econet Issuing CA.
        </li>
        <li>
          Access tokens must be transmitted in the <code>Authorization: Bearer</code> header and must
          not be included in URLs, query strings or referer headers.
        </li>
        <li>
          Tokens expire after a maximum of one (1) hour. Refresh tokens, where issued, expire after
          ninety (90) days of non-use.
        </li>
        <li>
          Sandbox keys may not be used against Production endpoints and Production keys may not be used
          against Sandbox endpoints.
        </li>
        <li>
          Credentials must be rotated at least every twelve (12) months. The Platform will automatically
          flag and revoke any credential that has not been rotated in eighteen (18) months.
        </li>
        <li>
          You must allow-list the source IP ranges from which your Application calls the Production
          APIs by adding them in the portal under Access Tokens. Requests from non-listed addresses
          will be rejected with HTTP 403.
        </li>
      </ul>

      <h2 id="webhooks">5. Webhook signing and delivery</h2>
      <p>
        Every webhook delivered by Econet is signed with HMAC-SHA-256. The signature is placed in the
        <code>Econet-Signature</code> header in the format <code>t=&lt;unix-timestamp&gt;,v1=&lt;hex-signature&gt;</code>.
        Verify the signature using the per-Application webhook secret, and reject any request whose
        timestamp differs from server time by more than three hundred (300) seconds.
      </p>
      <p>
        Webhook endpoints must respond with an HTTP 2xx within five (5) seconds. Non-2xx responses are
        retried with exponential backoff at 30 s, 2 min, 10 min, 1 h, 6 h and 24 h. After the final
        retry the event is moved to the dead-letter queue and surfaced on the Webhooks page. Endpoints
        must be idempotent: the same event identifier may be delivered more than once.
      </p>

      <h2 id="data">6. Subscriber data handling</h2>
      <ul>
        <li>
          Subscriber data may only be accessed after the Subscriber has been presented with the
          standard Econet consent prompt and has affirmed consent. Consent receipts are returned in
          the OAuth token response.
        </li>
        <li>
          Mask MSISDNs and national identifiers in your logs, support tooling, screenshots, error
          tracking and analytics dashboards. Where a partial value is required for support workflows,
          show only the last four (4) digits.
        </li>
        <li>
          Subscriber EcoCash PINs and line numbers may not be captured, displayed or transmitted by
          the Application under any circumstances.
        </li>
        <li>
          Honour Subscriber consent revocation events within sixty (60) minutes of receipt of the
          revocation webhook.
        </li>
        <li>
          Do not retain Subscriber data longer than necessary for the purpose for which it was shared,
          and in no event longer than the retention period stated in your Application's consent
          prompt.
        </li>
      </ul>

      <h2 id="versioning">7. Versioning, deprecation and sunset</h2>
      <p>
        The Platform uses URI-segment versioning (for example <code>/v1/</code>, <code>/v2/</code>).
        Non-breaking additions may be made within a version without notice. Breaking changes are
        announced as a new version. Each Production version is supported for a minimum of eighteen
        (18) months from the date a successor version is generally available.
      </p>
      <p>
        Deprecation cadence: at least one hundred and eighty (180) days written notice via the
        Changelog and direct email to the primary contact on the account; deprecated endpoints
        respond with a <code>Sunset</code> header indicating the sunset date; calls in the final
        thirty (30) days return a deprecation warning in the <code>Warning</code> header; after the
        sunset date the endpoint returns HTTP 410 Gone.
      </p>
      <p>
        Security-critical changes (for example revoking a compromised TLS root or disabling a weak
        cipher suite) may be deployed without the standard notice period. Where this is necessary we
        will publish the change on the Changelog within twenty-four (24) hours.
      </p>

      <h2 id="errors">8. Error handling and idempotency</h2>
      <ul>
        <li>
          Errors follow RFC 7807 Problem Details. The response body always includes <code>type</code>,
          <code> title</code>, <code>status</code>, <code>detail</code> and a request-scoped
          <code> instance</code> identifier.
        </li>
        <li>
          For state-changing requests, send an idempotency key in the <code>Idempotency-Key</code>{" "}
          header. Keys are scoped per Application per endpoint and are valid for twenty-four (24)
          hours.
        </li>
        <li>
          Retry only on 408, 425, 429 and 5xx responses, and only with exponential backoff and jitter.
          Retrying 4xx responses other than these will not change the outcome.
        </li>
        <li>
          Treat 200 responses with <code>status: PENDING_CONFIRMATION</code> as in-flight; rely on the
          status webhook or a subsequent GET to confirm the final outcome rather than re-issuing the
          original request.
        </li>
      </ul>

      <h2 id="abuse">9. Abuse prevention</h2>
      <p>
        Econet operates platform-wide controls to detect and disrupt abuse, including:
      </p>
      <ul>
        <li>per-Application anomaly detection on volume, error rate and recipient diversity;</li>
        <li>SMS sender-ID screening and prefix-throttling on traffic that appears to be smishing;</li>
        <li>
          mandatory STIR/SHAKEN-equivalent attestation for outbound voice (with attestation level
          downgraded for unverified IPs);
        </li>
        <li>velocity controls on EcoCash collections and disbursements;</li>
        <li>
          sanctions, PEP and adverse-media screening on every counterparty in monetary flows, refreshed
          daily.
        </li>
      </ul>
      <p>
        Where abuse is detected, Econet will suspend the affected Application without notice, notify
        the developer organisation's primary contact within sixty (60) minutes, and refer evidence to
        the appropriate authority where required by law.
      </p>

      <h2 id="disclosure">10. Responsible disclosure</h2>
      <p>
        Security researchers acting in good faith are encouraged to report vulnerabilities through
        security@econet.co.zw. The PGP key fingerprint is published at /.well-known/security.txt on
        the developer portal. We commit to an initial acknowledgement within forty-eight (48) hours, a
        triage outcome within ten (10) business days, and a public credit where the researcher
        consents. We will not pursue legal action against researchers who (a) act in good faith, (b)
        avoid any disruption to Subscribers or Subscriber data, (c) do not exfiltrate Subscriber data
        beyond the minimum required to demonstrate the issue, and (d) give Econet a reasonable window
        to remediate before publication.
      </p>

      <h2 id="changes">11. Changes to these policies</h2>
      <p>
        Material changes to these policies are notified at least thirty (30) days before they take
        effect. Non-material changes (clarifications, typo fixes) may be made at any time. The
        effective date at the top of this page is updated on every change. Historical versions are
        preserved in the Changelog.
      </p>
    </PolicyShell>
  );
}
