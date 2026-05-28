import PolicyShell from "../components/PolicyShell";

const anchors = [
  { id: "acceptance", label: "1. Acceptance and changes" },
  { id: "definitions", label: "2. Definitions" },
  { id: "eligibility", label: "3. Eligibility" },
  { id: "account", label: "4. Accounts and credentials" },
  { id: "sandbox", label: "5. Sandbox access" },
  { id: "production", label: "6. Production access and review" },
  { id: "acceptable", label: "7. Acceptable and fair use" },
  { id: "subscriber-data", label: "8. Subscriber-data obligations" },
  { id: "monetary", label: "9. Wallet, monetary and AML obligations" },
  { id: "fees", label: "10. Fees and invoicing" },
  { id: "ip", label: "11. Intellectual property and branding" },
  { id: "suspension", label: "12. Suspension and termination" },
  { id: "confidentiality", label: "13. Confidentiality" },
  { id: "liability", label: "14. Limitation of liability" },
  { id: "indemnity", label: "15. Indemnity" },
  { id: "force", label: "16. Force majeure" },
  { id: "law", label: "17. Governing law and disputes" },
  { id: "notices", label: "18. Notices" },
];

export default function Terms() {
  return (
    <PolicyShell
      title="Terms and Conditions"
      intro="These Terms govern your access to and use of the Econet Onboarding Automation Portal, including the sandbox, production APIs, SDKs, documentation, and any associated services (together, the Platform). The Platform is operated by Econet Wireless Zimbabwe (Private) Limited, a Postal and Telecommunications Regulatory Authority of Zimbabwe (POTRAZ) licensed operator with its registered office at Econet Park, 2 Old Mutare Road, Msasa, Harare. By creating a developer account or calling any endpoint you, on behalf of yourself and your organisation, agree to be bound by these Terms."
      lastUpdated="22 May 2026"
      anchors={anchors}
    >
      <h2 id="acceptance">1. Acceptance and changes</h2>
      <p>
        By signing up for or using the Platform you confirm that you have authority to bind your
        organisation and that the information you have provided is accurate and complete. We may amend
        these Terms from time to time. Material changes are posted in the changelog and notified to the
        primary contact on the account at least thirty (30) days before they take effect, except where
        the change is required immediately by law, by a regulator, or to address a security or fraud risk.
        Your continued use of the Platform after a change takes effect constitutes acceptance of the
        amended Terms.
      </p>

      <h2 id="definitions">2. Definitions</h2>
      <p>In these Terms, capitalised terms have the meanings given below:</p>
      <ul>
        <li>
          <strong>Application</strong> means a software application you register on the Platform.
        </li>
        <li>
          <strong>Credentials</strong> means any client identifier, client secret, access token,
          refresh token, signing key, mTLS certificate, or webhook signing secret issued to you.
        </li>
        <li>
          <strong>Customer</strong> or <strong>Subscriber</strong> means an Econet Wireless Zimbabwe
          mobile customer whose data is processed through an Application with their consent.
        </li>
        <li>
          <strong>Production Environment</strong> means the Platform endpoints serving real Subscribers,
          real money, and real settlement.
        </li>
        <li>
          <strong>Sandbox Environment</strong> means the simulated Platform endpoints used solely for
          development, testing and demonstration.
        </li>
        <li>
          <strong>CDPA</strong> means the Cyber and Data Protection Act [Chapter 11:24] of Zimbabwe and
          any regulations issued under it.
        </li>
        <li>
          <strong>NPS Act</strong> means the National Payment Systems Act [Chapter 24:23] of Zimbabwe.
        </li>
      </ul>

      <h2 id="eligibility">3. Eligibility</h2>
      <p>
        You may only use the Platform if you are at least eighteen (18) years of age and your
        organisation is duly incorporated, registered or otherwise legally constituted in Zimbabwe or in
        a jurisdiction from which lawful cross-border access is permitted. Organisations that are
        sanctioned by the United Nations Security Council, the Reserve Bank of Zimbabwe, or any
        applicable authority may not use the Platform.
      </p>

      <h2 id="account">4. Accounts and credentials</h2>
      <p>
        You are responsible for safeguarding your Credentials and for all activity that occurs under
        them. You must store Credentials in a hardware-backed secret manager or equivalent and must not
        commit them to source control, log them in plain text, or share them with third parties other
        than your sub-processors who are themselves bound by equivalent confidentiality obligations.
      </p>
      <p>
        You must notify the Econet platform security team within twenty-four (24) hours of becoming
        aware of any actual or suspected compromise of Credentials by emailing
        security@econet.co.zw. We may rotate or revoke Credentials at any time without notice where we
        reasonably suspect compromise, abuse, or breach of these Terms.
      </p>

      <h2 id="sandbox">5. Sandbox access</h2>
      <p>
        The Sandbox Environment is for development and testing only. Data in the Sandbox is synthetic.
        Phone numbers, transactions, balances and identifiers in the Sandbox do not correspond to real
        Subscribers. We may reset the Sandbox state, rotate Sandbox keys, change Sandbox endpoints, or
        impose Sandbox rate limits at any time and without notice. Sandbox responses are not warranted to
        match Production behaviour byte-for-byte and must not be relied upon for capacity planning.
      </p>

      <h2 id="production">6. Production access and review</h2>
      <p>
        Production access for any API requires (a) a completed promotion request submitted from the
        Platform, (b) successful review by the Econet platform team within an indicative ten (10)
        business days, (c) a counter-signed Service Order setting out the commercial terms applicable to
        that API, and where required by the NPS Act or by the Reserve Bank of Zimbabwe, (d) appropriate
        regulatory clearance for the Application's intended use.
      </p>
      <p>
        Production access is conditional on, and may be withdrawn for, failure to maintain the
        eligibility criteria, breach of these Terms, breach of the API Policies, or any instruction by a
        regulator or court of competent jurisdiction.
      </p>

      <h2 id="acceptable">7. Acceptable and fair use</h2>
      <p>You must not use the Platform to:</p>
      <ul>
        <li>send unsolicited marketing to Subscribers who have not opted in;</li>
        <li>
          probe, scan, fuzz, or otherwise test the vulnerability of the Platform outside the published
          Responsible Disclosure programme;
        </li>
        <li>circumvent or attempt to circumvent any rate limit, allow-list, or access control;</li>
        <li>
          reverse-engineer, decompile, or otherwise derive the source code or trade secrets of the
          Platform, except to the limited extent allowed by mandatory law;
        </li>
        <li>
          build a service that competes directly with the Platform using data, telemetry or design
          materials obtained from the Platform;
        </li>
        <li>process data of any Subscriber who is under the age of sixteen (16) without verified parental consent.</li>
      </ul>
      <p>
        Rate limits are enforced per Application as published in the API Policies. We may throttle or
        suspend Applications whose usage degrades the Platform for other tenants.
      </p>

      <h2 id="subscriber-data">8. Subscriber-data obligations</h2>
      <p>
        For all personal data processed through the Platform, you act as an independent or joint data
        controller (as the case may be) under the CDPA and you warrant that you have a lawful basis to
        process the data. In particular you must:
      </p>
      <ul>
        <li>
          obtain and retain explicit, time-stamped consent from each Subscriber before processing their
          MSISDN, KYC fields, location, wallet balance, or wallet history;
        </li>
        <li>
          mask personal identifiers (MSISDN, ID number, EcoCash PIN, line number) in your logs,
          analytics dashboards, error reports, and customer support tooling;
        </li>
        <li>
          honour Subscriber requests to access, correct or delete their personal data within thirty (30)
          calendar days, and forward to us any request that we are better placed to fulfil;
        </li>
        <li>
          notify the Econet Data Protection Officer at dpo@econet.co.zw within seventy-two (72) hours of
          becoming aware of a personal data breach involving Subscriber data, in accordance with section
          27 of the CDPA;
        </li>
        <li>
          not transfer Subscriber personal data outside Zimbabwe except where the destination provides
          an adequate level of protection as recognised by the Data Protection Authority, or where you
          have put in place standard contractual clauses approved by the Authority.
        </li>
      </ul>

      <h2 id="monetary">9. Wallet, monetary and AML obligations</h2>
      <p>
        Where your Application initiates EcoCash collections, disbursements, recurring debits, settlements,
        or any other monetary movement, you must comply with the NPS Act, the Banking Act
        [Chapter 24:20], the Bank Use Promotion Act [Chapter 24:24], the Anti-Money Laundering and
        Counter-Terrorism Financing Directive issued by the Reserve Bank of Zimbabwe, the Exchange
        Control Act [Chapter 22:05], and any directives issued by the Financial Intelligence Unit.
      </p>
      <p>
        Without limiting the above, you must screen counterparties against the United Nations
        Consolidated Sanctions List, file Suspicious Transaction Reports as required, retain transaction
        records for at least seven (7) years, and respond to Reserve Bank of Zimbabwe requests for
        information within the time stipulated. You shall not enable currency arbitrage, structuring,
        or layering of transactions to evade reporting thresholds.
      </p>

      <h2 id="fees">10. Fees and invoicing</h2>
      <p>
        Fees are as set out in your Service Order. Unless otherwise agreed, usage is metered per API
        call, per SMS, per minute of voice, per IVR connection, per active wallet check or per
        provisioned shortcode, and invoiced monthly in arrears in United States Dollars. Invoices are
        payable within thirty (30) days of issue. Late payment attracts interest at the prevailing
        Reserve Bank of Zimbabwe overnight accommodation rate plus three percent (3%) per annum,
        compounded monthly.
      </p>

      <h2 id="ip">11. Intellectual property and branding</h2>
      <p>
        We retain all rights, title and interest in the Platform, the SDKs, the documentation and the
        Econet trade marks. We grant you a limited, non-exclusive, non-transferable, revocable licence
        to use the SDKs solely to develop and operate Applications on the Platform. You may use the
        "Powered by Econet" wordmark in accordance with the Brand Guidelines published with the
        documentation, provided you comply with section 7 (Acceptable and fair use).
      </p>
      <p>
        You retain ownership of the code of your Application and of any non-Econet data you submit. You
        grant us a non-exclusive licence to use Platform telemetry generated by your Application to
        operate, secure and improve the Platform.
      </p>

      <h2 id="suspension">12. Suspension and termination</h2>
      <p>
        You may terminate your account at any time by sending written notice to
        developers@econet.co.zw and ceasing all use of the Platform. We may suspend or terminate your
        access immediately for: material breach of these Terms, repeated breach of the API Policies,
        non-payment after thirty (30) days written notice, regulatory direction, fraud or money
        laundering risk, or where continued provision becomes unlawful or commercially impracticable.
        On termination, your right to call the APIs ceases, but the obligations in sections 8, 9, 11,
        13, 14 and 15 survive.
      </p>

      <h2 id="confidentiality">13. Confidentiality</h2>
      <p>
        Each party shall keep confidential all non-public information disclosed by the other party in
        connection with the Platform, including unreleased features, security architectures, pricing,
        Service Orders and customer lists. This obligation survives for three (3) years after
        termination. It does not apply to information that is public through no fault of the receiving
        party, was lawfully known prior to disclosure, or is independently developed without reference
        to the disclosed information.
      </p>

      <h2 id="liability">14. Limitation of liability</h2>
      <p>
        Nothing in these Terms limits liability for death or personal injury caused by negligence, for
        fraud or fraudulent misrepresentation, or for any other liability that cannot be excluded by
        law. Subject to that, neither party shall be liable for indirect, special, incidental,
        consequential, exemplary or punitive damages, or for loss of profit, revenue, goodwill,
        anticipated savings, or business opportunity, however caused.
      </p>
      <p>
        To the maximum extent permitted by law, our aggregate liability under or in connection with
        these Terms in any twelve (12) month period is capped at the lesser of (a) the fees actually
        paid by you to us under the affected Service Order in that period and (b) United States Dollars
        Fifty Thousand (USD 50,000).
      </p>

      <h2 id="indemnity">15. Indemnity</h2>
      <p>
        You shall defend, indemnify and hold harmless Econet Wireless Zimbabwe, its directors, officers,
        employees and affiliates from and against any third-party claim, loss, damage, penalty or
        reasonable legal cost arising out of (a) your Application or its use of the Platform, (b) your
        breach of section 7, 8 or 9, (c) any infringement of intellectual property rights by content
        you submit, or (d) any unlawful or fraudulent activity carried out using your Credentials.
      </p>

      <h2 id="force">16. Force majeure</h2>
      <p>
        Neither party shall be liable for failure to perform obligations under these Terms to the extent
        such failure is caused by events beyond reasonable control, including national network outages,
        acts of state, currency controls, war, civil unrest, lawful seizure, fire, earthquake, pandemic
        or industrial action. The affected party shall use reasonable endeavours to mitigate the impact
        and to resume performance promptly. If a force majeure event continues for more than ninety (90)
        consecutive days either party may terminate the affected Service Order on written notice.
      </p>

      <h2 id="law">17. Governing law and disputes</h2>
      <p>
        These Terms are governed by, and shall be construed in accordance with, the laws of Zimbabwe.
        Subject to the next paragraph, the parties submit to the exclusive jurisdiction of the High
        Court of Zimbabwe sitting at Harare.
      </p>
      <p>
        The parties shall use reasonable endeavours to resolve any dispute by good-faith negotiation at
        senior-executive level within thirty (30) days. Failing resolution, either party may refer the
        dispute to arbitration in Harare under the Commercial Arbitration Rules of the High Court, by a
        single arbitrator appointed by agreement or, failing agreement within fourteen (14) days, by
        the President for the time being of the Law Society of Zimbabwe. The seat of arbitration shall
        be Harare and the language English.
      </p>

      <h2 id="notices">18. Notices</h2>
      <p>
        Notices to you are deemed given when emailed to the primary contact address on your account.
        Notices to us must be sent to developers@econet.co.zw, copied to the Company Secretary at
        legal@econet.co.zw. Notices to the Data Protection Officer must additionally be sent to
        dpo@econet.co.zw. Notices regarding security incidents must additionally be sent to
        security@econet.co.zw.
      </p>
    </PolicyShell>
  );
}
