import PolicyShell from "../components/PolicyShell";

const anchors = [
  { id: "scope", label: "1. Scope and roles" },
  { id: "data", label: "2. Categories of personal data" },
  { id: "purposes", label: "3. Purposes and lawful bases" },
  { id: "subscriber", label: "4. Subscriber data via Applications" },
  { id: "sharing", label: "5. Sub-processors and onward sharing" },
  { id: "cross-border", label: "6. Cross-border transfers" },
  { id: "retention", label: "7. Retention" },
  { id: "rights", label: "8. Your rights under the CDPA" },
  { id: "security", label: "9. Security measures" },
  { id: "breaches", label: "10. Personal data breaches" },
  { id: "children", label: "11. Children" },
  { id: "contact", label: "12. Contact and Data Protection Officer" },
];

export default function Privacy() {
  return (
    <PolicyShell
      title="Privacy Policy"
      intro="This Privacy Policy explains how Econet Wireless Zimbabwe (Private) Limited (Econet, we, us, our) collects, uses, discloses, retains and protects personal data processed through the Econet Onboarding Automation Portal (the Platform). It is issued under the Cyber and Data Protection Act [Chapter 11:24] of 2021 (CDPA) and is supplementary to the Econet Group Customer Privacy Notice. Where there is a conflict, the CDPA prevails."
      lastUpdated="22 May 2026"
      anchors={anchors}
    >
      <h2 id="scope">1. Scope and roles</h2>
      <p>
        This Policy covers two categories of personal data: (i) personal data we process about
        developers, partner organisations and their authorised users (Developer Data), for which Econet
        is the controller; and (ii) personal data about Econet Subscribers that we make available to
        Applications through the APIs (Subscriber Data). For Subscriber Data, Econet is the controller
        of the underlying record. The partner operating the Application is an independent controller
        for the purposes for which it processes the data. In some cases Econet and the partner are joint
        controllers; such arrangements are set out in the relevant Data Processing Addendum (DPA).
      </p>

      <h2 id="data">2. Categories of personal data</h2>
      <p>
        <strong>Developer Data:</strong> name, work email, employer, role, IP address, browser
        fingerprint, two-factor secrets, hashed passwords, API call telemetry, billing addresses, tax
        identifiers, and signed contractual documents.
      </p>
      <p>
        <strong>Subscriber Data made available via the Platform (with consent):</strong> mobile number
        (MSISDN), masked national identifier, name as registered on the Econet customer master,
        registered residential ward, KYC tier, account opening date, EcoCash wallet balance band,
        recent (last 90 days) wallet transactions, SIM provisioning date, last SIM-swap date, serving
        cell-tower identifier, and device class. We do not expose Subscriber EcoCash PINs, national
        identifier full digits, biometric templates, or precise GPS coordinates through the Platform.
      </p>

      <h2 id="purposes">3. Purposes and lawful bases</h2>
      <p>We process personal data for the following purposes and on the following lawful bases under section 13 of the CDPA:</p>
      <ul>
        <li>
          <strong>Provision of the Platform</strong> — performance of contract with the developer
          organisation.
        </li>
        <li>
          <strong>Authentication, fraud and abuse prevention</strong> — legitimate interest of Econet in
          maintaining a secure network.
        </li>
        <li>
          <strong>Billing and revenue assurance</strong> — performance of contract; legal obligation
          under the Income Tax Act and the Value Added Tax Act.
        </li>
        <li>
          <strong>Service improvement and capacity planning</strong> — legitimate interest, balanced
          against minimisation and aggregation.
        </li>
        <li>
          <strong>Regulatory reporting and lawful intercept</strong> — legal obligation under the
          Postal and Telecommunications Act [Chapter 12:05], the National Payment Systems Act, the
          Interception of Communications Act [Chapter 11:20] and directives of the Reserve Bank of
          Zimbabwe.
        </li>
        <li>
          <strong>Exposure of Subscriber Data to an Application</strong> — explicit, recorded consent
          obtained from the Subscriber over a verified channel (typically *151#).
        </li>
      </ul>

      <h2 id="subscriber">4. Subscriber data via Applications</h2>
      <p>
        Applications may access Subscriber Data only after the Subscriber has been presented with a
        consent prompt that (a) names the Application, (b) lists the categories of data to be shared,
        (c) sets out the purposes, (d) indicates the retention period, and (e) explains how to revoke
        consent. Consent receipts are returned in the OAuth token response and retained by Econet for
        twenty-four (24) months for audit purposes. Subscribers may revoke consent at any time by
        dialling *151*9# or via the Econet self-care portal; revocation propagates to Applications
        within sixty (60) minutes via the Consent webhook.
      </p>

      <h2 id="sharing">5. Sub-processors and onward sharing</h2>
      <p>We share Developer Data only with sub-processors that we have approved in writing. Current sub-processors are:</p>
      <ul>
        <li>
          <strong>Liquid Intelligent Technologies Zimbabwe</strong> — colocation and connectivity
          (Harare and Bulawayo data centres).
        </li>
        <li>
          <strong>Cassava Technologies</strong> — cloud infrastructure within the Econet Group.
        </li>
        <li>
          <strong>Steward Bank</strong> — settlement and collections processing for fee invoicing.
        </li>
        <li>
          <strong>Atlassian Pty Ltd</strong> — support ticketing (data residency in Australia under
          standard contractual clauses).
        </li>
        <li>
          <strong>Postmark by ActiveCampaign Inc.</strong> — transactional email delivery for portal
          notifications.
        </li>
      </ul>
      <p>
        Subscriber Data is not shared with sub-processors other than for the purposes of operating the
        Platform; specifically we do not sell, monetise, or share Subscriber Data with advertising
        networks or data brokers. We may disclose Subscriber Data to law-enforcement agencies, the
        Postal and Telecommunications Regulatory Authority of Zimbabwe (POTRAZ), the Financial
        Intelligence Unit, the Reserve Bank of Zimbabwe, or other competent authorities pursuant to a
        valid court order, warrant or instrument that meets the requirements of the Interception of
        Communications Act and the CDPA.
      </p>

      <h2 id="cross-border">6. Cross-border transfers</h2>
      <p>
        Subscriber Data is processed and stored within Zimbabwe. Limited Developer Data may be
        transferred outside Zimbabwe to support sub-processors. Such transfers are made only to
        jurisdictions that the Data Protection Authority has determined provide adequate protection, or
        under standard contractual clauses approved by the Authority. A copy of the standard contractual
        clauses applicable to your data is available on request from dpo@econet.co.zw.
      </p>

      <h2 id="retention">7. Retention</h2>
      <p>We retain personal data for the periods set out below or for such longer periods as we are required by law to retain them:</p>
      <ul>
        <li>Account identifiers and contract documents — duration of the relationship plus six (6) years.</li>
        <li>Authentication logs and security telemetry — twelve (12) months.</li>
        <li>API call logs (with masked Subscriber identifiers) — twelve (12) months.</li>
        <li>Billing records — seven (7) years (Income Tax Act).</li>
        <li>Anti-money-laundering records — seven (7) years (AML/CFT Directive).</li>
        <li>Subscriber consent receipts — twenty-four (24) months from revocation.</li>
        <li>Aggregated, non-identifying telemetry — retained indefinitely.</li>
      </ul>

      <h2 id="rights">8. Your rights under the CDPA</h2>
      <p>Subject to the conditions in the CDPA, you have the right to:</p>
      <ul>
        <li>be informed about the processing of your personal data;</li>
        <li>access the personal data we hold about you;</li>
        <li>correct inaccurate or incomplete personal data;</li>
        <li>request erasure of personal data we no longer have a lawful basis to process;</li>
        <li>object to processing for direct marketing;</li>
        <li>restrict processing where you contest accuracy or where erasure is not appropriate;</li>
        <li>port your personal data to another controller in a machine-readable format;</li>
        <li>
          lodge a complaint with the Data Protection Authority hosted within POTRAZ at
          dataprotection@potraz.gov.zw.
        </li>
      </ul>
      <p>
        To exercise any of these rights, email dpo@econet.co.zw with sufficient detail to identify your
        account. We respond within thirty (30) calendar days. We may need to verify your identity
        before disclosing personal data.
      </p>

      <h2 id="security">9. Security measures</h2>
      <p>
        We maintain administrative, technical and physical safeguards designed to protect personal
        data, including: ISO/IEC 27001-aligned information security controls; PCI DSS v4.0 controls
        across the wallet and payments stack; mandatory two-factor authentication on all developer
        accounts; mTLS for production wallet APIs; tokenisation of MSISDN and national identifiers at
        the warehouse; least-privilege access; quarterly access reviews; annual third-party penetration
        tests; and a 24/7 Security Operations Centre.
      </p>

      <h2 id="breaches">10. Personal data breaches</h2>
      <p>
        We will notify the Data Protection Authority of any personal data breach likely to result in a
        risk to the rights and freedoms of natural persons without undue delay and, where feasible, not
        later than seventy-two (72) hours after becoming aware of it, in accordance with section 27 of
        the CDPA. Where the breach is likely to result in a high risk, we will also notify affected
        data subjects without undue delay. Developers must notify Econet of any breach involving
        Subscriber Data exposed through their Application as set out in section 8 of the Terms.
      </p>

      <h2 id="children">11. Children</h2>
      <p>
        The Platform is not directed at children under sixteen (16). We do not knowingly enable
        Applications to process Subscriber Data of children under sixteen without verified parental
        consent. Where we become aware that such data has been processed in error we will delete it
        promptly and notify the Application of the deletion.
      </p>

      <h2 id="contact">12. Contact and Data Protection Officer</h2>
      <p>
        For any question about this Policy or about how your personal data is processed, contact our
        Data Protection Officer:
      </p>
      <ul>
        <li>Email: dpo@econet.co.zw</li>
        <li>Postal: The Data Protection Officer, Econet Wireless Zimbabwe, Econet Park, 2 Old Mutare Road, Msasa, Harare.</li>
        <li>Privacy operations: privacy@econet.co.zw</li>
        <li>Security incidents: security@econet.co.zw</li>
      </ul>
    </PolicyShell>
  );
}
