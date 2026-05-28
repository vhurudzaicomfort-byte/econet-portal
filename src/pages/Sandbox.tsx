import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AppShellSearchBridge from "../components/AppShellSearchBridge";
import Card from "../components/Card";
import Select from "../components/Select";
import Input from "../components/Input";
import Button from "../components/Button";
import Badge from "../components/Badge";
import StatusChip from "../components/StatusChip";
import Tabs from "../components/Tabs";
import Breadcrumb from "../components/Breadcrumb";
import IconArrowRight from "../icons/IconArrowRight";
import { products } from "../data/products";
import { useApps } from "../context/AppsContext";
import { useToast } from "../context/ToastContext";

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

type TestWallet = { id: string; msisdn: string; balance: number };
const initialWallets: TestWallet[] = [
  { id: "w1", msisdn: "+263774129034", balance: 250.0 },
  { id: "w2", msisdn: "+263782219988", balance: 85.5 },
  { id: "w3", msisdn: "+263779984421", balance: 0.0 },
  { id: "w4", msisdn: "+263773212223", balance: 1432.4 },
];

export default function Sandbox() {
  const { apps } = useApps();
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();
  const productQuery = searchParams.get("product");
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

  const initialSlug =
    productQuery && formSchemas[productQuery]
      ? productQuery
      : candidateProducts[0]?.slug || "";
  const [slug, setSlug] = useState<string>(initialSlug);
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

  const [wallets, setWallets] = useState<TestWallet[]>(initialWallets);
  const [whEvent, setWhEvent] = useState<string>("payment.success");
  const [whTarget, setWhTarget] = useState<string>("wh_4c8a");
  const [whBody, setWhBody] = useState<string>(
    JSON.stringify(
      { id: "evt_8c2bb0", type: "payment.success", data: { msisdn: "+263774129034", amount: "25.00" } },
      null,
      2
    )
  );
  const [whLog, setWhLog] = useState<
    { id: string; event: string; status: number; latency: number; time: string }[]
  >([]);

  useEffect(() => {
    if (productQuery && formSchemas[productQuery] && productQuery !== slug) {
      setSlug(productQuery);
      const fields = formSchemas[productQuery] || [];
      setValues(Object.fromEntries(fields.map((f) => [f.name, f.initial])));
    }
  }, [productQuery, slug]);

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

  const consoleTab = (
    <div className="flex flex-col gap-5">
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
  );

  const webhookTab = (
    <Card className="flex flex-col gap-4">
      <h3 className="text-econet-ink dark:text-white">Webhook simulator</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <Select
          label="Event"
          value={whEvent}
          onChange={(e) => setWhEvent(e.target.value)}
          options={[
            { value: "payment.success", label: "payment.success" },
            { value: "payment.failed", label: "payment.failed" },
            { value: "sms.delivered", label: "sms.delivered" },
            { value: "ussd.session.started", label: "ussd.session.started" },
          ]}
        />
        <Select
          label="Target endpoint"
          value={whTarget}
          onChange={(e) => setWhTarget(e.target.value)}
          options={[
            { value: "wh_4c8a", label: "wh_4c8a — pindula callback" },
            { value: "wh_88a1", label: "wh_88a1 — steward bank" },
          ]}
        />
      </div>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-econet-ink">Payload</span>
        <textarea
          value={whBody}
          onChange={(e) => setWhBody(e.target.value)}
          rows={8}
          spellCheck={false}
          className="rounded-md border border-econet-border bg-white text-sm text-econet-ink font-mono p-3 focus:outline-none focus:ring-2 focus:ring-econet-navy/30"
        />
      </label>
      <div>
        <Button
          variant="primary"
          iconRight={<IconArrowRight size={16} />}
          onClick={() => {
            const ok = Math.random() > 0.2;
            const status = ok ? 200 : 500;
            const latency = 90 + Math.round(Math.random() * 500);
            setWhLog((prev) =>
              [
                {
                  id: `wl${prev.length + 1}`,
                  event: whEvent,
                  status,
                  latency,
                  time: new Date().toLocaleTimeString(),
                },
                ...prev,
              ].slice(0, 10)
            );
            showToast({
              kind: ok ? "success" : "info",
              title: ok ? "Webhook delivered" : `Endpoint returned ${status}`,
            });
          }}
        >
          Send to my endpoint
        </Button>
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-econet-grey mb-2">
          Delivery log
        </p>
        <ul className="divide-y divide-econet-border border border-econet-border rounded-lg">
          {whLog.length === 0 ? (
            <li className="p-3 text-sm text-econet-grey">No deliveries yet.</li>
          ) : (
            whLog.map((l) => (
              <li
                key={l.id}
                className="flex items-center justify-between p-3 text-sm text-econet-ink"
              >
                <span className="font-mono text-xs">{l.event}</span>
                <span className="font-mono text-xs font-bold">{l.status}</span>
                <span className="text-xs text-econet-grey">{l.latency} ms</span>
                <span className="text-xs text-econet-grey">{l.time}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </Card>
  );

  const walletsTab = (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h3 className="text-econet-ink dark:text-white">Test wallets</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setWallets(initialWallets);
            showToast({ kind: "info", title: "Test wallets reset" });
          }}
        >
          Reset all
        </Button>
      </div>
      <ul className="divide-y divide-econet-border border border-econet-border rounded-lg">
        {wallets.map((w) => (
          <li key={w.id} className="flex items-center justify-between p-3">
            <div>
              <p className="text-sm font-mono text-econet-ink">{w.msisdn}</p>
              <p className="text-xs text-econet-grey">Balance USD {w.balance.toFixed(2)}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setWallets((prev) =>
                  prev.map((x) => (x.id === w.id ? { ...x, balance: x.balance + 50 } : x))
                );
                showToast({ kind: "success", title: "Topped up USD 50.00" });
              }}
            >
              Top up
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  );

  const transactionsTab = (
    <Card>
      <h3 className="text-econet-ink dark:text-white mb-3">Transaction logs</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-econet-surface text-left text-xs font-semibold uppercase tracking-wide text-econet-grey">
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Endpoint</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Latency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-econet-border">
            {history.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-econet-grey">
                  No transactions yet. Use the Console tab to send sample requests.
                </td>
              </tr>
            ) : (
              history.map((h) => {
                const p = products.find((x) => x.slug === h.slug);
                return (
                  <tr key={h.id} className="text-econet-ink">
                    <td className="px-4 py-3 text-xs text-econet-grey">
                      {new Date(h.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">{p?.name}</td>
                    <td className="px-4 py-3">
                      <StatusChip status="approved" label={`${h.status}`} />
                    </td>
                    <td className="px-4 py-3">{h.durationMs} ms</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );

  return (
    <AppShellSearchBridge>
      <div className="flex flex-col gap-6">
        <Breadcrumb items={[{ label: "Dashboard", to: "/dashboard" }, { label: "Sandbox" }]} />
        <header>
          <p className="text-xs font-bold uppercase tracking-wider text-econet-grey">
            Discover
          </p>
          <h1 className="text-econet-ink">Sandbox</h1>
          <p className="text-sm text-econet-grey mt-1 max-w-2xl">
            Try any Econet product, simulate webhook deliveries and inspect mock wallets.
          </p>
        </header>
        <Tabs
          items={[
            { id: "console", label: "Console", content: consoleTab },
            { id: "webhooks", label: "Webhook simulator", content: webhookTab },
            { id: "wallets", label: "Test wallets", content: walletsTab },
            { id: "transactions", label: "Transaction logs", content: transactionsTab },
          ]}
        />
      </div>
    </AppShellSearchBridge>
  );
}
