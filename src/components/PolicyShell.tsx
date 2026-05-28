import type { ReactNode } from "react";
import Card from "./Card";
import Button from "./Button";
import Breadcrumb from "./Breadcrumb";
import { useToast } from "../context/ToastContext";

export type PolicyAnchor = {
  id: string;
  label: string;
};

type Props = {
  title: string;
  intro: string;
  lastUpdated: string;
  anchors: PolicyAnchor[];
  children: ReactNode;
  breadcrumbLabel?: string;
};

export default function PolicyShell({
  title,
  intro,
  lastUpdated,
  anchors,
  children,
  breadcrumbLabel,
}: Props) {
  const { showToast } = useToast();
  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb
        items={[
          { label: "Dashboard", to: "/dashboard" },
          { label: breadcrumbLabel || title },
        ]}
      />
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60">
            Policy document
          </p>
          <h1 className="text-econet-ink dark:text-white">{title}</h1>
          <p className="text-sm text-econet-grey dark:text-white/70 mt-1">Last updated {lastUpdated}</p>
        </div>
        <Button
          variant="ghost"
          onClick={() => showToast({ kind: "info", title: "PDF queued", body: `${title} PDF will email shortly.` })}
        >
          Download PDF
        </Button>
      </header>
      <p className="text-sm text-econet-ink dark:text-white/85 max-w-prose leading-7">{intro}</p>
      <div className="grid gap-8 lg:grid-cols-[1fr_220px]">
        <Card>
          <article className="prose-econet">{children}</article>
        </Card>
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60 mb-2">
              Contents
            </p>
            <ul className="space-y-1.5 text-sm">
              {anchors.map((a) => (
                <li key={a.id}>
                  <a
                    href={`#${a.id}`}
                    className="text-econet-ink dark:text-white/80 hover:text-econet-navy dark:hover:text-white"
                  >
                    {a.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
