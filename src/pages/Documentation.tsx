import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import clsx from "clsx";
import Card from "../components/Card";
import Button from "../components/Button";
import Breadcrumb from "../components/Breadcrumb";
import CodeBlock from "../components/CodeBlock";
import Select from "../components/Select";
import IconArrowRight from "../icons/IconArrowRight";
import IconBook from "../icons/IconBook";
import { docSections, errorTable, rateLimitTable, type DocSection } from "../data/docs";

const languages = ["cURL", "Node.js", "Python", "PHP", "Go"];

function codeSampleFor(slug: string, language: string): string {
  if (language === "cURL") {
    return `curl -X POST https://api.econet.co.zw/v1/${slug.replace(/-/g, "/")} \\
  -H "Authorization: Bearer $ECONET_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{ "msisdn": "+263774129034" }'`;
  }
  if (language === "Node.js") {
    return `import { EconetClient } from "@econet/sdk";

const econet = new EconetClient({ token: process.env.ECONET_TOKEN });

const result = await econet["${slug}"].call({ msisdn: "+263774129034" });`;
  }
  if (language === "Python") {
    return `from econet import EconetClient

econet = EconetClient(token=os.environ["ECONET_TOKEN"])

result = econet["${slug}"].call(msisdn="+263774129034")`;
  }
  if (language === "PHP") {
    return `<?php
require 'vendor/autoload.php';

$econet = new Econet\\Client(getenv('ECONET_TOKEN'));
$result = $econet->call('${slug}', ['msisdn' => '+263774129034']);`;
  }
  if (language === "Go") {
    return `client := econet.New(os.Getenv("ECONET_TOKEN"))
result, err := client.Call("${slug}", econet.Params{"msisdn": "+263774129034"})`;
  }
  return "";
}

function DocBody({ section }: { section: DocSection }) {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<string>("cURL");
  const [version, setVersion] = useState<"v1" | "v2">("v1");

  const anchors = useMemo(
    () => section.body.filter((b) => b.kind === "h2" && b.text).map((b) => b.text as string),
    [section]
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_220px]">
      <article className="prose-econet">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center rounded-md border border-econet-border dark:border-econet-dark-border bg-white dark:bg-econet-dark-surface p-0.5">
            {(["v1", "v2"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setVersion(v)}
                className={clsx(
                  "px-3 h-8 text-xs font-bold rounded-[5px] transition-colors duration-150",
                  version === v
                    ? "bg-econet-navy text-white"
                    : "text-econet-grey dark:text-white/60 hover:text-econet-ink dark:hover:text-white"
                )}
                aria-pressed={version === v}
              >
                {v} {v === "v2" ? "(beta)" : "(stable)"}
              </button>
            ))}
          </div>
          <p className="text-xs text-econet-grey dark:text-white/60">
            Last updated 25 May 2026
          </p>
        </div>
        <h1 className="text-econet-ink dark:text-white">{section.title}</h1>
        <p>{section.intro}</p>
        {section.body.map((b, idx) => {
          if (b.kind === "p") return <p key={idx}>{b.text}</p>;
          if (b.kind === "h2")
            return (
              <h2
                key={idx}
                id={(b.text || "").toLowerCase().replace(/\s+/g, "-")}
                className="text-econet-ink dark:text-white"
              >
                {b.text}
              </h2>
            );
          if (b.kind === "h3")
            return (
              <h3 key={idx} className="text-econet-ink dark:text-white">
                {b.text}
              </h3>
            );
          if (b.kind === "ul")
            return (
              <ul key={idx}>
                {(b.items || []).map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ul>
            );
          if (b.kind === "code")
            return <CodeBlock key={idx} code={b.text || ""} language={b.language} />;
          return null;
        })}

        {section.showTryButton ? (
          <div className="my-6">
            <h2 className="text-econet-ink dark:text-white">Code samples</h2>
            <div className="inline-flex items-center rounded-md border border-econet-border dark:border-econet-dark-border bg-white dark:bg-econet-dark-surface p-0.5 mb-3">
              {languages.map((lng) => (
                <button
                  key={lng}
                  type="button"
                  onClick={() => setLanguage(lng)}
                  className={clsx(
                    "px-3 h-8 text-xs font-bold rounded-[5px] transition-colors",
                    language === lng
                      ? "bg-econet-navy text-white"
                      : "text-econet-grey dark:text-white/60 hover:text-econet-ink dark:hover:text-white"
                  )}
                >
                  {lng}
                </button>
              ))}
            </div>
            <CodeBlock code={codeSampleFor(section.endpointSlug || section.slug, language)} language={language} />
            <div className="mt-4">
              <Button
                variant="primary"
                iconRight={<IconArrowRight size={16} />}
                onClick={() => navigate(`/sandbox?product=${section.endpointSlug || section.slug}`)}
              >
                Try in Sandbox
              </Button>
            </div>
          </div>
        ) : null}

        {section.showErrorTable ? (
          <div className="my-6">
            <h2 className="text-econet-ink dark:text-white">Error codes</h2>
            <div className="overflow-x-auto bg-white dark:bg-econet-dark-surface border border-econet-border dark:border-econet-dark-border rounded-lg">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-econet-surface dark:bg-econet-dark-border text-left text-xs font-semibold uppercase tracking-wide text-econet-grey dark:text-white/70">
                    <th className="px-4 py-3">Code</th>
                    <th className="px-4 py-3">Message</th>
                    <th className="px-4 py-3">HTTP</th>
                    <th className="px-4 py-3">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-econet-border dark:divide-econet-dark-border">
                  {errorTable.map((e) => (
                    <tr key={e.code} className="text-econet-ink dark:text-white">
                      <td className="px-4 py-3 font-mono text-xs">{e.code}</td>
                      <td className="px-4 py-3">{e.message}</td>
                      <td className="px-4 py-3">{e.http}</td>
                      <td className="px-4 py-3 text-econet-grey dark:text-white/70">{e.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        {section.showRateLimitTable ? (
          <div className="my-6">
            <h2 className="text-econet-ink dark:text-white">Rate limits</h2>
            <div className="overflow-x-auto bg-white dark:bg-econet-dark-surface border border-econet-border dark:border-econet-dark-border rounded-lg">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-econet-surface dark:bg-econet-dark-border text-left text-xs font-semibold uppercase tracking-wide text-econet-grey dark:text-white/70">
                    <th className="px-4 py-3">Tier</th>
                    <th className="px-4 py-3">Per second</th>
                    <th className="px-4 py-3">Per day</th>
                    <th className="px-4 py-3">Burst</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-econet-border dark:divide-econet-dark-border">
                  {rateLimitTable.map((r) => (
                    <tr key={r.tier} className="text-econet-ink dark:text-white">
                      <td className="px-4 py-3 font-semibold">{r.tier}</td>
                      <td className="px-4 py-3">{r.perSecond}</td>
                      <td className="px-4 py-3">{r.perDay.toLocaleString()}</td>
                      <td className="px-4 py-3">{r.burst}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </article>

      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <p className="text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60 mb-2">
            On this page
          </p>
          <ul className="space-y-1.5 text-sm">
            {anchors.map((a) => (
              <li key={a}>
                <a
                  href={`#${a.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-econet-ink dark:text-white/80 hover:text-econet-navy dark:hover:text-white"
                >
                  {a}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default function Documentation() {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const activeSlug = slug || docSections[0].slug;
  const section = docSections.find((s) => s.slug === activeSlug) || docSections[0];

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb
        items={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Documentation", to: "/docs" },
          ...(slug ? [{ label: section.title }] : []),
        ]}
      />
      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60 mb-3">
              <IconBook size={14} /> Documentation
            </p>
            <nav>
              <ul className="space-y-0.5">
                {docSections.map((s) => (
                  <li key={s.slug}>
                    <button
                      type="button"
                      onClick={() => navigate(`/docs/${s.slug}`)}
                      className={clsx(
                        "block w-full text-left rounded-md pl-3 pr-2 h-8 text-sm border-l-[3px]",
                        activeSlug === s.slug
                          ? "bg-econet-navy/5 dark:bg-white/10 text-econet-navy dark:text-white border-econet-navy dark:border-white font-semibold"
                          : "text-econet-ink dark:text-white/80 border-transparent hover:bg-econet-surface dark:hover:bg-econet-dark-surface"
                      )}
                    >
                      {s.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        <div className="flex flex-col gap-4">
          <div className="lg:hidden">
            <Select
              label="Section"
              hideLabel
              value={activeSlug}
              onChange={(e) => navigate(`/docs/${e.target.value}`)}
              options={docSections.map((s) => ({ value: s.slug, label: s.title }))}
            />
          </div>
          <Card>
            <DocBody section={section} />
          </Card>
        </div>
      </div>
    </div>
  );
}
