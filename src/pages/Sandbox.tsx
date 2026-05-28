import { useMemo, useState } from "react";
import AppShellSearchBridge from "../components/AppShellSearchBridge";
import Card from "../components/Card";
import Select from "../components/Select";
import Input from "../components/Input";
import Button from "../components/Button";
import Badge from "../components/Badge";
import StatusChip from "../components/StatusChip";
import IconArrowRight from "../icons/IconArrowRight";
import { products } from "../data/products";
import { useApps } from "../context/AppsContext";

type SandboxFormField = {
  name: string;
  label: string;
  placeholder: string;
  initial: string;
};

const formSchemas: Record<string, SandboxFormField[]> = {
  "ussd-aggregator": [
    { name: "shortCode", label: "Short code", placeholder: "*151#", initial: "*151#" },
    { name: "sessionId", label: "Session ID", placeholder: "sess_8c2b", initial: "sess_8c2b" },
    { name: "msisdn", label: "MSISDN", placeholder: "+263 77 412 9034", initial: "+263774129034" },
    { name: "input", label: "Subscriber input", placeholder: "1", initial: "1" },
  ],
  "ecocash-collect": [
    { name: "msisdn", label: "MSISDN", placeholder: "+263 77 412 9034", initial: "+263774129034" },
    { name: "amount", label: "Amount", placeholder: "25.00", initial: "25.00" },
    { name: "currency", label: "Currency", placeholder: "USD", initial: "USD" },
    { name: "reference", label: "Reference", placeholder: "ORDER-19044", initial: "ORDER-19044" },
  ],
  "ecocash-disburse": [
    { name: "msisdn", label: "MSISDN", placeholder: "+263 77 412 9034", initial: "+263774129034" },
    { name: "amount", label: "Amount", placeholder: "120.00", initial: "120.00" },
    { name: "currency", label: "Currency", placeholder: "USD", initial: "USD" },
    { name: "reference", label: "Reference", placeholder: "PAYROLL-001", initial: "PAYROLL-001" },
  ],
  "bulk-sms": [
    { name: "from", label: "Sender ID", placeholder: "PINDULA", initial: "PINDULA" },
    { name: "to", label: "Recipient", placeholder: "+263 77 412 9034", initial: "+263774129034" },
    { name: "body", label: "Message", placeholder: "Your OTP is 348201", initial: "Your OTP is 348201. Valid for 5 minutes." },
  ],
  "econet-id": [
    { name: "code", label: "Authorisation code", placeholder: "4l2k...", initial: "4l2kZ9Nc8h" },
    { name: "redirect_uri", label: "Redirect URI", placeholder: "https://example.co.zw/cb", initial: "https://pindula.co.zw/cb" },
  ],
  "airtime-topup": [
    { name: "msisdn", label: "MSISDN", placeholder: "+263 77 412 9034", initial: "+263774129034" },
    { name: "amount", label: "Amount", placeholder: "5.00", initial: "5.00" },
    { name: "currency", label: "Currency", placeholder: "USD", initial: "USD" },
  ],
  "customer-lookup": [
    { name: "msisdn", label: "MSISDN", placeholder: "+263 77 412 9034", initial: "+263774129034" },
  ],
  "ecosure-premium": [
    { name: "policyNo", label: "Policy number", placeholder: "EC-1208765", initial: "EC-1208765" },
  ],
  "buddie-bundles": [
    { name: "msisdn", label: "MSISDN", placeholder: "+263 77 412 9034", initial: "+263774129034" },
    { name: "bundleId", label: "Bundle ID", placeholder: "data-1gb", initial: "data-1gb-30d" },
  ],
  "network-analytics": [
    { name: "province", label: "Province", placeholder: "Harare", initial: "Harare" },
  ],
  "service-tickets": [
    { name: "msisdn", label: "MSISDN", placeholder: "+263 77 412 9034", initial: "+263774129034" },
    { name: "subject", label: "Subject", placeholder: "Data slow", initial: "Data not loading" },
    { name: "body", label: "Description", placeholder: "Detail", initial: "Customer reports slow downloads in Borrowdale." },
  ],
  "documentation-resources": [
    { name: "product", label: "Product slug", placeholder: "ecocash-collect", initial: "ecocash-collect" },
  ],
};

const endpointBySlug: Record<string, { method: string; path: string }> = {
  "ussd-aggregator": { method: "POST", path: "/v1/ussd/sessions" },
  "ecocash-collect": { method: "POST", path: "/v1/ecocash/collect" },
  "ecocash-disburse": { method: "POST", path: "/v1/ecocash/disburse" },
  "bulk-sms": { method: "POST", path: "/v1/sms/messages" },
  "econet-id": { method: "POST", path: "/v1/oauth/token" },
  "airtime-topup": { method: "POST", path: "/v1/airtime/topup" },
  "customer-lookup": { method: "GET", path: "/v1/customers/{msisdn}" },
  "ecosure-premium": { method: "GET", path: "/v1/ecosure/policies/{policyNo}" },
  "buddie-bundles": { method: "POST", path: "/v1/bundles/purchase" },
  "network-analytics": { method: "GET", path: "/v1/analytics/cells" },
  "service-tickets": { method: "POST", path: "/v1/tickets" },
  "documentation-resources": { method: "GET", path: "/v1/resources/openapi/{product}" },
};

type HistoryEntry = {
  id: string;
  slug: string;
  status: number;
  durationMs: number;
  timestamp: string;
};

function buildResponseBody(slug: string, body: Record<string, string>): unknown {
  const now = new Date().toISOString();
  switch (slug) {
    case "ecocash-collect":
    case "ecocash-disburse":
      return {
        transactionId: `ec_txn_${Math.random().toString(36).slice(2, 10)}`,
        status: "PENDING_CONFIRMATION",
        msisdn: body.msisdn,
        amount: body.amount,
        currency: body.currency,
        reference: body.reference,
        prompt: "EcoCash PIN prompt sent to the subscriber.",
        createdAt: now,
      };
    case "bulk-sms":
      return {
        messageId: `sms_${Math.random().toString(36).slice(2, 10)}`,
        from: body.from,
        to: [body.to],
        status: "QUEUED",
        segments: 1,
        createdAt: now,
      };
    case "ussd-aggregator":
      return {
        sessionId: body.sessionId,
        continueSession: true,
        message: "Welcome to Pindula Pay\\n1. Send money\\n2. Buy airtime",
        receivedInput: body.input,
        respondedAt: now,
      };
    case "econet-id":
      return {
        access_token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWI...",
        token_type: "Bearer",
        expires_in: 3600,
        scope: "openid profile msisdn",
        id_token: "eyJraWQiOiJlY28tMjAyNiJ9.eyJzdWIiOiIyNjM3NzQxMjkwMzQiLCJpc3MiOiJodHRwczovL2lkLmVjb25ldC5jby56dy8iLCJhdWQiOiJlY19zYW5kXzhjMmJiMDE3ZjQ0ZDJjOTEifQ...",
      };
    case "airtime-topup":
      return {
        topupId: `at_${Math.random().toString(36).slice(2, 10)}`,
        msisdn: body.msisdn,
        amount: body.amount,
        currency: body.currency,
        status: "DELIVERED",
        balanceAfter: "12.45",
        completedAt: now,
      };
    case "customer-lookup":
      return {
        msisdn: body.msisdn,
        firstName: "Tariro",
        surname: "Chikomba",
        kycTier: "ENHANCED",
        consentReceiptId: "cr_201b9c7",
      };
    case "ecosure-premium":
      return {
        policyNo: body.policyNo,
        product: "EcoSure Family Plan",
        status: "ACTIVE",
        nextPremiumDate: "2026-06-12",
        sumInsured: "5000.00",
        currency: "USD",
      };
    case "buddie-bundles":
      return {
        purchaseId: `bn_${Math.random().toString(36).slice(2, 10)}`,
        bundle: body.bundleId,
        msisdn: body.msisdn,
        status: "ACTIVATED",
        validityDays: 30,
      };
    case "network-analytics":
      return {
        province: body.province,
        windowStart: "2026-05-27T00:00:00Z",
        windowEnd: "2026-05-28T00:00:00Z",
        cells: [
          { id: "ZW-HRE-088", coveragePct: 96.3, congestionPct: 41.2 },
          { id: "ZW-HRE-127", coveragePct: 88.7, congestionPct: 67.8 },
        ],
      };
    case "service-tickets":
      return {
        ticketId: `tkt_${Math.random().toString(36).slice(2, 10)}`,
        msisdn: body.msisdn,
        subject: body.subject,
        status: "OPEN",
        priority: "NORMAL",
        createdAt: now,
      };
    case "documentation-resources":
      return {
        product: body.product,
        version: "1.4.0",
        openapi: "https://api.econet.co.zw/v1/resources/openapi/" + body.product,
        postman: "https://api.econet.co.zw/v1/resources/postman/" + body.product,
        changelogEntries: 12,
      };
    default:
      return { ok: true };
  }
}

function formatJson(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

function highlightJson(value: string) {
  return value
    .replace(/(&)/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/("[^"]*")(\s*:)/g, '<span style="color:#7DD3FC">$1</span>$2')
    .replace(/:\s*("[^"]*")/g, ': <span style="color:#FCA5A5">$1</span>')
    .replace(/:\s*(true|false|null)/g, ': <span style="color:#FDE68A">$1</span>')
    .replace(/:\s*(-?\d+\.?\d*)/g, ': <span style="color:#FDE68A">$1</span>');
}

export default function Sandbox() {
  const { apps } = useApps();
  const subscribedProductSlugs = useMemo(() => {
    const all = new Set<string>();
    apps.forEach((a) => a.subscribedProductSlugs.forEach((s) => all.add(s)));
    return all;
  }, [apps]);

  const availableProducts = useMemo(
    () =>
      products.filter(
        (p) => formSchemas[p.slug] && subscribedProductSlugs.has(p.slug)
      ),
    [subscribedProductSlugs]
  );

  const fallbackProducts = useMemo(
    () => products.filter((p) => formSchemas[p.slug]),
    []
  );

  const candidateProducts =
    availableProducts.length > 0 ? availableProducts : fallbackProducts;

  const [slug, setSlug] = useState<string>(candidateProducts[0]?.slug || "");
  const product = useMemo(() => products.find((p) => p.slug === slug), [slug]);
  const schema = slug ? formSchemas[slug] || [] : [];
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(schema.map((f) => [f.name, f.initial]))
  );
  const [sending, setSending] = useState(false);
  const [response, setResponse] = useState<{
    status: number;
    body: string;
    durationMs: number;
  } | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const onSlugChange = (next: string) => {
    setSlug(next);
    const fields = formSchemas[next] || [];
    setValues(Object.fromEntries(fields.map((f) => [f.name, f.initial])));
    setResponse(null);
  };

  const endpoint = slug ? endpointBySlug[slug] : null;

  const onSend = () => {
    if (!product || !endpoint) return;
    setSending(true);
    const start = Date.now();
    const delay = 600 + Math.floor(Math.random() * 600);
    setTimeout(() => {
      const body = buildResponseBody(product.slug, values);
      const json = formatJson(body);
      const durationMs = Date.now() - start;
      setResponse({ status: 200, body: json, durationMs });
      setHistory((prev) => [
        {
          id: `h_${Math.random().toString(36).slice(2, 8)}`,
          slug: product.slug,
          status: 200,
          durationMs,
          timestamp: new Date().toISOString(),
        },
        ...prev.slice(0, 9),
      ]);
      setSending(false);
    }, delay);
  };

  return (
    <AppShellSearchBridge>
      <div className="flex flex-col gap-6">
        <header>
          <p className="text-xs font-bold uppercase tracking-wider text-econet-grey">
            Discover
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-econet-ink">
            Sandbox tester
          </h1>
          <p className="text-sm text-econet-grey mt-1 max-w-2xl">
            Try any Econet product without writing a line of code. Pick an
            endpoint, fill in the form, and inspect the simulated response.
          </p>
        </header>

        <div className="grid gap-5 lg:grid-cols-2">
          <Card className="flex flex-col gap-4">
            <Select
              label="Product"
              value={slug}
              onChange={(e) => onSlugChange(e.target.value)}
              options={candidateProducts.map((p) => ({
                value: p.slug,
                label: p.name,
              }))}
              helper={
                availableProducts.length > 0
                  ? "Showing products your apps are subscribed to."
                  : "No subscriptions yet, showing the full catalogue."
              }
            />

            {endpoint && product ? (
              <div className="flex items-center gap-2 rounded-md bg-econet-surface border border-econet-border px-3 py-2">
                <Badge variant="navy">{endpoint.method}</Badge>
                <code className="text-xs text-econet-ink">
                  https://api.econet.co.zw{endpoint.path}
                </code>
              </div>
            ) : null}

            <div className="grid gap-3 sm:grid-cols-2">
              {schema.map((f) => (
                <Input
                  key={f.name}
                  label={f.label}
                  value={values[f.name] || ""}
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, [f.name]: e.target.value }))
                  }
                  placeholder={f.placeholder}
                />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              <p className="text-xs text-econet-grey">
                Requests run against the isolated sandbox. No live charges occur.
              </p>
              <Button
                variant="primary"
                onClick={onSend}
                loading={sending}
                iconRight={<IconArrowRight size={16} />}
              >
                Send request
              </Button>
            </div>
          </Card>

          <Card padded={false} className="overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-econet-border">
              <h2 className="text-sm font-bold text-econet-ink">Response</h2>
              {response ? (
                <div className="flex items-center gap-2">
                  <StatusChip status="approved" label={`${response.status} OK`} />
                  <span className="text-xs text-econet-grey">
                    {response.durationMs} ms
                  </span>
                </div>
              ) : (
                <span className="text-xs text-econet-grey">
                  No request sent yet
                </span>
              )}
            </div>
            <div className="bg-econet-navy text-white p-4">
              {response ? (
                <pre
                  className="text-xs leading-6 font-mono whitespace-pre-wrap break-words"
                  dangerouslySetInnerHTML={{
                    __html: highlightJson(response.body),
                  }}
                />
              ) : (
                <pre className="text-xs leading-6 font-mono text-white/60">
{`{
  "info": "Run the request to see the response here."
}`}
                </pre>
              )}
            </div>
          </Card>
        </div>

        <Card>
          <h2 className="text-lg font-bold text-econet-ink">Recent calls</h2>
          <p className="text-sm text-econet-grey mt-1">
            Local history is cleared when you leave the page.
          </p>
          <ul className="mt-4 divide-y divide-econet-border border border-econet-border rounded-lg">
            {history.length === 0 ? (
              <li className="p-4 text-sm text-econet-grey">
                Nothing yet. Send your first request above.
              </li>
            ) : (
              history.map((h) => {
                const p = products.find((x) => x.slug === h.slug);
                return (
                  <li
                    key={h.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant="soft">{endpointBySlug[h.slug]?.method}</Badge>
                      <p className="text-sm font-semibold text-econet-ink">
                        {p?.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-econet-grey">
                      <span>{h.durationMs} ms</span>
                      <StatusChip status="approved" label={`${h.status}`} />
                      <span>{new Date(h.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </Card>
      </div>
    </AppShellSearchBridge>
  );
}
