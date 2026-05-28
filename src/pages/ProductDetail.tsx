import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import StatusChip from "../components/StatusChip";
import Tabs from "../components/Tabs";
import Table from "../components/Table";
import Badge from "../components/Badge";
import Select from "../components/Select";
import CodeBlock from "../components/CodeBlock";
import IconUssd from "../icons/IconUssd";
import IconSms from "../icons/IconSms";
import IconAuth from "../icons/IconAuth";
import IconEcocash from "../icons/IconEcocash";
import IconAirtime from "../icons/IconAirtime";
import IconCustomer from "../icons/IconCustomer";
import IconAnalytics from "../icons/IconAnalytics";
import IconTicket from "../icons/IconTicket";
import IconResource from "../icons/IconResource";
import IconArrowRight from "../icons/IconArrowRight";
import IconInfo from "../icons/IconInfo";
import IconCheck from "../icons/IconCheck";
import { products, type ProductEndpoint } from "../data/products";
import { useApps } from "../context/AppsContext";
import { useToast } from "../context/ToastContext";
import AppShellSearchBridge from "../components/AppShellSearchBridge";

const iconMap = {
  ussd: IconUssd,
  sms: IconSms,
  auth: IconAuth,
  ecocash: IconEcocash,
  airtime: IconAirtime,
  customer: IconCustomer,
  analytics: IconAnalytics,
  ticket: IconTicket,
  resource: IconResource,
};

const availabilityToStatus: Record<
  string,
  "live" | "in-review" | "sandbox"
> = {
  Live: "live",
  Beta: "in-review",
  Sandbox: "sandbox",
};

const methodColor: Record<ProductEndpoint["method"], string> = {
  GET: "bg-econet-info/10 text-econet-info border-econet-info/30",
  POST: "bg-econet-navy/10 text-econet-navy border-econet-navy/30",
  PUT: "bg-econet-orange/10 text-econet-orange border-econet-orange/30",
  DELETE: "bg-econet-red/10 text-econet-red border-econet-red/30",
};

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = useMemo(() => products.find((p) => p.slug === slug), [slug]);
  const { apps, subscribeProduct } = useApps();
  const { showToast } = useToast();
  const [language, setLanguage] = useState<"cURL" | "Node.js" | "Python">("cURL");
  const [targetAppId, setTargetAppId] = useState<string>(apps[0]?.id || "");

  if (!product) {
    return (
      <AppShellSearchBridge>
        <Card>
          <h1 className="text-xl font-bold text-econet-ink">Product not found</h1>
          <p className="text-sm text-econet-grey mt-2">
            That product slug does not exist in the catalogue.
          </p>
          <div className="mt-4">
            <Button variant="secondary" onClick={() => navigate("/products")}>
              Back to catalogue
            </Button>
          </div>
        </Card>
      </AppShellSearchBridge>
    );
  }

  const Icon = iconMap[product.iconKey];
  const sample = product.samples.find((s) => s.language === language) || product.samples[0];

  const onAddToApp = () => {
    if (!targetAppId) {
      showToast({
        kind: "error",
        title: "Select an app",
        body: "You need at least one app before subscribing to a product.",
      });
      return;
    }
    subscribeProduct(targetAppId, product.slug);
    const app = apps.find((a) => a.id === targetAppId);
    showToast({
      kind: "success",
      title: "Subscription added",
      body: `Subscribed ${app?.name || "your app"} to ${product.name}.`,
    });
  };

  return (
    <AppShellSearchBridge>
      <div className="flex flex-col gap-6">
        <button
          type="button"
          onClick={() => navigate("/products")}
          className="self-start text-sm font-semibold text-econet-navy hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30 rounded"
        >
          Back to catalogue
        </button>

        <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 flex-none items-center justify-center rounded-lg bg-econet-navy text-white">
              <Icon size={32} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-econet-grey">
                {product.category} | {product.provider}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-econet-ink mt-1">
                {product.name}
              </h1>
              <p className="text-sm text-econet-grey mt-1 max-w-2xl leading-6">
                {product.shortDescription}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <StatusChip
              status={availabilityToStatus[product.availability]}
              label={product.availability}
            />
            <Button
              variant="primary"
              size="sm"
              iconRight={<IconArrowRight size={16} />}
              onClick={onAddToApp}
            >
              Add to app
            </Button>
          </div>
        </header>

        <Tabs
          items={[
            {
              id: "overview",
              label: "Overview",
              content: (
                <div className="grid gap-5 md:grid-cols-3">
                  <Card className="md:col-span-2">
                    <h2 className="text-lg font-bold text-econet-ink">About</h2>
                    <p className="text-sm leading-7 text-econet-ink mt-2">
                      {product.description}
                    </p>
                    <h3 className="text-sm font-bold text-econet-ink mt-6">
                      Key features
                    </h3>
                    <ul className="mt-2 flex flex-col gap-2">
                      {product.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-econet-ink">
                          <IconCheck size={18} className="text-econet-success mt-0.5 flex-none" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                  <Card>
                    <div className="flex items-start gap-2">
                      <IconInfo size={20} className="text-econet-navy mt-0.5" />
                      <div>
                        <h3 className="text-sm font-bold text-econet-ink">Rate limits</h3>
                        <p className="text-sm text-econet-ink leading-6 mt-1">
                          {product.rateLimit}
                        </p>
                      </div>
                    </div>
                    <div className="border-t border-econet-border mt-5 pt-5">
                      <h3 className="text-sm font-bold text-econet-ink">Base URL</h3>
                      <p className="text-sm font-mono text-econet-navy mt-1 break-all">
                        https://api.econet.co.zw
                      </p>
                    </div>
                    <div className="border-t border-econet-border mt-5 pt-5">
                      <h3 className="text-sm font-bold text-econet-ink">Status</h3>
                      <div className="mt-2">
                        <StatusChip
                          status={availabilityToStatus[product.availability]}
                          label={product.availability}
                        />
                      </div>
                    </div>
                  </Card>
                </div>
              ),
            },
            {
              id: "endpoints",
              label: "Endpoints",
              content: (
                <Table
                  rowKey={(r) => `${r.method}-${r.path}`}
                  rows={product.endpoints}
                  columns={[
                    {
                      key: "method",
                      header: "Method",
                      width: "120px",
                      cell: (r) => (
                        <span
                          className={
                            "inline-flex items-center rounded border px-2 py-0.5 text-xs font-bold " +
                            methodColor[r.method]
                          }
                        >
                          {r.method}
                        </span>
                      ),
                    },
                    {
                      key: "path",
                      header: "Path",
                      cell: (r) => (
                        <code className="text-sm text-econet-ink">{r.path}</code>
                      ),
                    },
                    {
                      key: "summary",
                      header: "Summary",
                      cell: (r) => (
                        <span className="text-sm text-econet-ink">{r.summary}</span>
                      ),
                    },
                    {
                      key: "auth",
                      header: "Auth",
                      width: "120px",
                      cell: (r) =>
                        r.authRequired ? (
                          <Badge variant="navy">Required</Badge>
                        ) : (
                          <Badge variant="grey">Public</Badge>
                        ),
                    },
                  ]}
                />
              ),
            },
            {
              id: "samples",
              label: "Code samples",
              content: (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    {product.samples.map((s) => (
                      <button
                        key={s.language}
                        type="button"
                        onClick={() => setLanguage(s.language)}
                        className={
                          "h-9 px-3 rounded-md text-sm font-semibold border transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30 " +
                          (language === s.language
                            ? "bg-econet-navy text-white border-econet-navy"
                            : "bg-white text-econet-ink border-econet-border hover:border-econet-grey")
                        }
                      >
                        {s.language}
                      </button>
                    ))}
                  </div>
                  <CodeBlock language={sample.language} code={sample.code} />
                </div>
              ),
            },
            {
              id: "add",
              label: "Add to app",
              content: (
                <Card>
                  <h2 className="text-lg font-bold text-econet-ink">
                    Subscribe an app to {product.name}
                  </h2>
                  <p className="text-sm text-econet-grey leading-6 mt-1">
                    Pick one of your applications below. We will activate the
                    sandbox keys for {product.name} right away. Production access
                    follows the usual promotion workflow.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2 mt-4">
                    <Select
                      label="Target app"
                      value={targetAppId}
                      onChange={(e) => setTargetAppId(e.target.value)}
                      options={
                        apps.length === 0
                          ? [{ value: "", label: "No apps yet" }]
                          : apps.map((a) => ({ value: a.id, label: a.name }))
                      }
                    />
                    <div className="flex items-end">
                      <Button
                        variant="primary"
                        onClick={onAddToApp}
                        disabled={apps.length === 0}
                      >
                        Add to app
                      </Button>
                    </div>
                  </div>
                </Card>
              ),
            },
          ]}
        />
      </div>
    </AppShellSearchBridge>
  );
}
