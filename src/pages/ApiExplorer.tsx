import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import Card from "../components/Card";
import Button from "../components/Button";
import Breadcrumb from "../components/Breadcrumb";
import CodeBlock from "../components/CodeBlock";
import Skeleton from "../components/Skeleton";
import IconChevronRight from "../icons/IconChevronRight";
import IconArrowRight from "../icons/IconArrowRight";
import { apiCatalogue, type ApiEndpointDef, type ApiProduct } from "../data/apiCatalogue";

type Selection = { apiSlug: string; endpointId: string };
const STORAGE_KEY = "econet.api-explorer.last";
const LANG_KEY = "econet.api-explorer.lang";

const methodColors: Record<string, string> = {
  GET: "bg-econet-info/15 text-econet-info border-econet-info/30",
  POST: "bg-econet-success/15 text-econet-success border-econet-success/30",
  PUT: "bg-econet-orange/15 text-econet-orange border-econet-orange/30",
  DELETE: "bg-econet-red/15 text-econet-red border-econet-red/30",
  PATCH: "bg-econet-purple/15 text-econet-purple border-econet-purple/30",
};

const languages = ["cURL", "Node.js", "Python", "PHP", "Go"];

function codeFor(api: ApiProduct, endpoint: ApiEndpointDef, language: string): string {
  const fullUrl = `${api.baseUrl}${endpoint.path}`;
  if (language === "cURL") {
    return `curl -X ${endpoint.method} ${fullUrl} \\
  -H "Authorization: Bearer $ECONET_TOKEN" \\
  -H "Content-Type: application/json"${endpoint.requestBodyExample ? ` \\\n  -d '${endpoint.requestBodyExample}'` : ""}`;
  }
  if (language === "Node.js") {
    return `const res = await fetch("${fullUrl}", {
  method: "${endpoint.method}",
  headers: {
    Authorization: \`Bearer \${process.env.ECONET_TOKEN}\`,
    "Content-Type": "application/json",
  },${endpoint.requestBodyExample ? `\n  body: JSON.stringify(${endpoint.requestBodyExample}),` : ""}
});
const data = await res.json();`;
  }
  if (language === "Python") {
    return `import requests, os
res = requests.${endpoint.method.toLowerCase()}(
    "${fullUrl}",
    headers={
        "Authorization": f"Bearer {os.environ['ECONET_TOKEN']}",
        "Content-Type": "application/json",
    },${endpoint.requestBodyExample ? `\n    json=${endpoint.requestBodyExample},` : ""}
)
data = res.json()`;
  }
  if (language === "PHP") {
    return `<?php
$ch = curl_init("${fullUrl}");
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "${endpoint.method}");
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  "Authorization: Bearer " . getenv("ECONET_TOKEN"),
  "Content-Type: application/json",
]);
${endpoint.requestBodyExample ? `curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(${endpoint.requestBodyExample}));\n` : ""}curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);`;
  }
  if (language === "Go") {
    return `req, _ := http.NewRequest("${endpoint.method}", "${fullUrl}", strings.NewReader(\`${endpoint.requestBodyExample || ""}\`))
req.Header.Set("Authorization", "Bearer "+os.Getenv("ECONET_TOKEN"))
req.Header.Set("Content-Type", "application/json")
res, _ := http.DefaultClient.Do(req)`;
  }
  return "";
}

export default function ApiExplorer() {
  const [selection, setSelection] = useState<Selection>(() => {
    if (typeof window === "undefined") return { apiSlug: apiCatalogue[0].slug, endpointId: apiCatalogue[0].endpoints[0].id };
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Selection;
        const api = apiCatalogue.find((a) => a.slug === parsed.apiSlug);
        const ep = api?.endpoints.find((e) => e.id === parsed.endpointId);
        if (api && ep) return parsed;
      } catch {
        // fall through
      }
    }
    return { apiSlug: apiCatalogue[0].slug, endpointId: apiCatalogue[0].endpoints[0].id };
  });

  const [language, setLanguage] = useState<string>(() => {
    if (typeof window === "undefined") return "cURL";
    return window.localStorage.getItem(LANG_KEY) || "cURL";
  });

  const [groupOpen, setGroupOpen] = useState<Record<string, boolean>>({});
  const [requestBody, setRequestBody] = useState("");
  const [sending, setSending] = useState(false);
  const [response, setResponse] = useState<{
    status: number;
    statusText: string;
    headers: Record<string, string>;
    body: string;
  } | null>(null);

  const grouped = useMemo(() => {
    const map = new Map<string, ApiProduct[]>();
    for (const a of apiCatalogue) {
      const list = map.get(a.category) || [];
      list.push(a);
      map.set(a.category, list);
    }
    return Array.from(map.entries());
  }, []);

  const api = apiCatalogue.find((a) => a.slug === selection.apiSlug);
  const endpoint = api?.endpoints.find((e) => e.id === selection.endpointId);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
    }
  }, [selection]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LANG_KEY, language);
    }
  }, [language]);

  useEffect(() => {
    setRequestBody(endpoint?.requestBodyExample || "");
    setResponse(null);
  }, [endpoint?.id]);

  const onSend = () => {
    if (!api || !endpoint) return;
    setSending(true);
    setResponse(null);
    const delay = 600 + Math.random() * 600;
    window.setTimeout(() => {
      const ok = Math.random() > 0.12;
      const status = ok ? 200 : Math.random() > 0.5 ? 400 : 503;
      const statusText = ok ? "OK" : status === 400 ? "Bad Request" : "Service Unavailable";
      const body = ok
        ? endpoint.responseExample ||
          JSON.stringify({ id: `req_${Math.random().toString(36).slice(2, 10)}`, status: "ok" }, null, 2)
        : JSON.stringify(
            {
              error: {
                code: status === 400 ? "VALIDATION_FAILED" : "UPSTREAM_TIMEOUT",
                message: status === 400 ? "Request validation failed." : "Upstream did not respond in time.",
                requestId: `req_${Math.random().toString(36).slice(2, 10)}`,
              },
            },
            null,
            2
          );
      setResponse({
        status,
        statusText,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "X-Request-Id": `req_${Math.random().toString(36).slice(2, 10)}`,
          "X-RateLimit-Remaining": String(Math.floor(Math.random() * api.rateLimit.perSecond)),
        },
        body,
      });
      setSending(false);
    }, delay);
  };

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: "Dashboard", to: "/dashboard" }, { label: "API Explorer" }]} />
      <header>
        <p className="text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60">
          Try the API
        </p>
        <h1 className="text-econet-ink dark:text-white">API Explorer</h1>
        <p className="text-sm text-econet-grey dark:text-white/70 mt-1 max-w-2xl">
          Browse every endpoint, edit a request body and send a simulated call. Responses use sandbox-grade mock data.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[260px_1fr_280px]">
        <Card padded={false} className="overflow-hidden">
          <div className="p-3 border-b border-econet-border dark:border-econet-dark-border">
            <p className="text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60">
              Endpoints
            </p>
          </div>
          <ul className="max-h-[60vh] overflow-y-auto scrollbar-thin py-2">
            {grouped.map(([cat, items]) => {
              const open = groupOpen[cat] !== false;
              return (
                <li key={cat} className="mb-1">
                  <button
                    type="button"
                    onClick={() => setGroupOpen((p) => ({ ...p, [cat]: !open }))}
                    className="flex w-full items-center justify-between px-3 h-8 text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/70 hover:text-econet-ink dark:hover:text-white"
                    aria-expanded={open}
                  >
                    <span>{cat}</span>
                    <IconChevronRight
                      size={12}
                      className={clsx("transition-transform", open && "rotate-90")}
                    />
                  </button>
                  {open ? (
                    <ul className="space-y-0.5">
                      {items.flatMap((a) =>
                        a.endpoints.map((ep) => {
                          const active =
                            selection.apiSlug === a.slug && selection.endpointId === ep.id;
                          return (
                            <li key={`${a.slug}-${ep.id}`}>
                              <button
                                type="button"
                                onClick={() => setSelection({ apiSlug: a.slug, endpointId: ep.id })}
                                className={clsx(
                                  "w-full flex items-center gap-2 px-3 py-1.5 text-left text-xs rounded",
                                  active
                                    ? "bg-econet-navy/5 dark:bg-white/10 text-econet-navy dark:text-white"
                                    : "text-econet-ink dark:text-white/85 hover:bg-econet-surface dark:hover:bg-econet-dark-surface"
                                )}
                              >
                                <span
                                  className={clsx(
                                    "inline-flex items-center justify-center rounded border px-1 py-0.5 font-mono text-[10px] font-bold",
                                    methodColors[ep.method] || "border-econet-border"
                                  )}
                                >
                                  {ep.method}
                                </span>
                                <span className="font-mono truncate">{ep.path}</span>
                              </button>
                            </li>
                          );
                        })
                      )}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </Card>

        <Card className="flex flex-col gap-4">
          {api && endpoint ? (
            <>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={clsx(
                    "inline-flex items-center rounded-md border px-2 py-1 font-mono text-xs font-bold",
                    methodColors[endpoint.method]
                  )}
                >
                  {endpoint.method}
                </span>
                <code className="text-sm font-mono text-econet-ink dark:text-white break-all">
                  {api.baseUrl}
                  {endpoint.path}
                </code>
              </div>
              <h2 className="text-econet-ink dark:text-white">{endpoint.summary}</h2>
              <p className="text-sm text-econet-grey dark:text-white/70">{api.summary}</p>
              <div>
                <h3 className="text-sm font-bold text-econet-ink dark:text-white mb-2">Parameters</h3>
                <div className="overflow-x-auto bg-white dark:bg-econet-dark-surface border border-econet-border dark:border-econet-dark-border rounded-md">
                  <table className="min-w-full text-xs">
                    <thead>
                      <tr className="bg-econet-surface dark:bg-econet-dark-border text-left text-econet-grey dark:text-white/70">
                        <th className="px-3 py-2">Name</th>
                        <th className="px-3 py-2">In</th>
                        <th className="px-3 py-2">Type</th>
                        <th className="px-3 py-2">Required</th>
                        <th className="px-3 py-2">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-econet-border dark:divide-econet-dark-border">
                      {endpoint.parameters.map((p) => (
                        <tr key={p.name} className="text-econet-ink dark:text-white/90">
                          <td className="px-3 py-2 font-mono">{p.name}</td>
                          <td className="px-3 py-2">{p.in}</td>
                          <td className="px-3 py-2">{p.type}</td>
                          <td className="px-3 py-2">{p.required ? "Yes" : "No"}</td>
                          <td className="px-3 py-2 text-econet-grey dark:text-white/70">{p.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-econet-ink dark:text-white mb-2">
                  Try it
                </h3>
                <label className="block">
                  <span className="text-xs font-semibold text-econet-grey dark:text-white/70 uppercase tracking-wide">
                    Request body (JSON)
                  </span>
                  <textarea
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                    spellCheck={false}
                    className="mt-1 w-full h-40 rounded-md border border-econet-border dark:border-econet-dark-border bg-white dark:bg-econet-dark-surface text-econet-ink dark:text-white text-xs font-mono p-3 focus:outline-none focus:ring-2 focus:ring-econet-navy/30 scrollbar-thin"
                  />
                </label>
                <div className="flex items-center gap-2 mt-3">
                  <Button
                    variant="primary"
                    onClick={onSend}
                    loading={sending}
                    iconRight={<IconArrowRight size={16} />}
                  >
                    Send
                  </Button>
                  <p className="text-xs text-econet-grey dark:text-white/60">
                    Calls are simulated with realistic latency and status codes.
                  </p>
                </div>
              </div>

              {sending ? (
                <div className="flex flex-col gap-2">
                  <Skeleton height={20} width="40%" />
                  <Skeleton height={120} />
                </div>
              ) : response ? (
                <div>
                  <h3 className="text-sm font-bold text-econet-ink dark:text-white mb-2">
                    Response
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={clsx(
                        "inline-flex items-center rounded px-2 py-0.5 font-mono text-xs font-bold",
                        response.status < 300
                          ? "bg-econet-success/15 text-econet-success"
                          : response.status < 500
                          ? "bg-econet-orange/15 text-econet-orange"
                          : "bg-econet-red/15 text-econet-red"
                      )}
                    >
                      {response.status} {response.statusText}
                    </span>
                    {Object.entries(response.headers).map(([k, v]) => (
                      <span
                        key={k}
                        className="text-xs text-econet-grey dark:text-white/60 font-mono"
                      >
                        {k}: {v}
                      </span>
                    ))}
                  </div>
                  <CodeBlock code={response.body} language="json" />
                </div>
              ) : null}
            </>
          ) : (
            <p className="text-sm text-econet-grey dark:text-white/70">Select an endpoint.</p>
          )}
        </Card>

        <Card padded={false} className="overflow-hidden">
          <div className="p-3 border-b border-econet-border dark:border-econet-dark-border">
            <p className="text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60">
              Code samples
            </p>
          </div>
          <div className="p-3">
            <div className="inline-flex items-center rounded-md border border-econet-border dark:border-econet-dark-border bg-white dark:bg-econet-dark-surface p-0.5 mb-3">
              {languages.map((lng) => (
                <button
                  key={lng}
                  type="button"
                  onClick={() => setLanguage(lng)}
                  className={clsx(
                    "px-2 h-7 text-xs font-bold rounded transition-colors",
                    language === lng
                      ? "bg-econet-navy text-white"
                      : "text-econet-grey dark:text-white/60 hover:text-econet-ink dark:hover:text-white"
                  )}
                >
                  {lng}
                </button>
              ))}
            </div>
            {api && endpoint ? (
              <CodeBlock code={codeFor(api, endpoint, language)} language={language} />
            ) : null}
          </div>
        </Card>
      </div>
    </div>
  );
}
