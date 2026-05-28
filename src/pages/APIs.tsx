import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import Card from "../components/Card";
import Button from "../components/Button";
import Breadcrumb from "../components/Breadcrumb";
import StatusChip from "../components/StatusChip";
import SearchField from "../components/SearchField";
import IconArrowRight from "../icons/IconArrowRight";
import IconEcocash from "../icons/IconEcocash";
import IconSms from "../icons/IconSms";
import IconAuth from "../icons/IconAuth";
import IconAirtime from "../icons/IconAirtime";
import IconUssd from "../icons/IconUssd";
import IconCustomer from "../icons/IconCustomer";
import IconAnalytics from "../icons/IconAnalytics";
import IconResource from "../icons/IconResource";
import IconTicket from "../icons/IconTicket";
import {
  apiCatalogue,
  apiCategories,
  type ApiProduct,
} from "../data/apiCatalogue";

const iconForKey = (key?: string) => {
  switch (key) {
    case "ecocash":
      return IconEcocash;
    case "sms":
      return IconSms;
    case "auth":
      return IconAuth;
    case "airtime":
      return IconAirtime;
    case "ussd":
      return IconUssd;
    case "customer":
      return IconCustomer;
    case "analytics":
      return IconAnalytics;
    case "ticket":
      return IconTicket;
    default:
      return IconResource;
  }
};

const statusToChip = (status: ApiProduct["status"]) => {
  switch (status) {
    case "Live":
      return "live" as const;
    case "Beta":
      return "in-review" as const;
    case "Sandbox":
      return "sandbox" as const;
    default:
      return "draft" as const;
  }
};

type FilterChip = "All" | "Featured" | "Popular" | "Recently updated" | "Recommended";

function ApiProductCard({ api }: { api: ApiProduct }) {
  const navigate = useNavigate();
  const Icon = iconForKey(api.iconKey);
  return (
    <Card className="flex flex-col gap-3 h-full" hoverable>
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-econet-navy/10 dark:bg-white/10 text-econet-navy dark:text-white">
          <Icon size={24} />
        </div>
        <StatusChip status={statusToChip(api.status)} label={api.status} />
      </div>
      <div>
        <h3 className="text-base font-bold text-econet-ink dark:text-white">{api.name}</h3>
        <p className="text-sm text-econet-grey dark:text-white/70 line-clamp-2 mt-1">
          {api.summary}
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        <span className="inline-flex items-center rounded-full bg-econet-navy/5 dark:bg-white/10 text-econet-navy dark:text-white text-xs font-semibold px-2 py-0.5">
          {api.authType}
        </span>
        <span className="inline-flex items-center rounded-full bg-econet-info/10 text-econet-info text-xs font-semibold px-2 py-0.5">
          {api.environments.includes("Both") ? "Sandbox + Production" : api.environments.join(" / ")}
        </span>
        <span className="inline-flex items-center rounded-full bg-econet-surface dark:bg-econet-dark-border text-econet-grey dark:text-white/70 text-xs font-semibold px-2 py-0.5 border border-econet-border dark:border-econet-dark-border">
          {api.pricingTier}
        </span>
      </div>
      <p className="text-xs text-econet-grey dark:text-white/60">
        {api.rateLimit.perSecond}/s, {api.rateLimit.perDay.toLocaleString()}/day
      </p>
      <div className="flex items-center justify-between gap-2 mt-auto pt-3 border-t border-econet-border dark:border-econet-dark-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(`/docs/${api.slug}`)}
        >
          Documentation
        </Button>
        <Button
          variant="primary"
          size="sm"
          iconRight={<IconArrowRight size={14} />}
          onClick={() => navigate(`/sandbox?product=${api.slug}`)}
        >
          Try in Sandbox
        </Button>
      </div>
    </Card>
  );
}

export default function APIs() {
  const [search, setSearch] = useState("");
  const [chip, setChip] = useState<FilterChip>("All");

  const filtered = useMemo(() => {
    return apiCatalogue.filter((a) => {
      if (chip === "Featured" && !a.featured) return false;
      if (chip === "Popular" && !a.popular) return false;
      if (chip === "Recently updated" && !a.recentlyUpdated) return false;
      if (chip === "Recommended" && !a.recommended) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !a.name.toLowerCase().includes(q) &&
          !a.summary.toLowerCase().includes(q) &&
          !a.category.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [search, chip]);

  const grouped = useMemo(() => {
    const map = new Map<string, ApiProduct[]>();
    for (const a of filtered) {
      const arr = map.get(a.category) || [];
      arr.push(a);
      map.set(a.category, arr);
    }
    return apiCategories
      .map((cat) => ({ cat, items: map.get(cat) || [] }))
      .filter((g) => g.items.length > 0);
  }, [filtered]);

  const chips: FilterChip[] = ["All", "Featured", "Popular", "Recently updated", "Recommended"];

  return (
    <div className="flex flex-col gap-8">
      <Breadcrumb items={[{ label: "Dashboard", to: "/dashboard" }, { label: "APIs" }]} />
      <header className="flex flex-col gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60">
            Marketplace
          </p>
          <h1 className="text-econet-ink dark:text-white">APIs</h1>
          <p className="text-sm text-econet-grey dark:text-white/70 mt-1 max-w-2xl">
            Every API in the Econet developer platform, organised by capability. Sandbox access is
            self-service. Production access requires a quick review.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="max-w-xl">
            <SearchField
              placeholder="Search APIs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClear={() => setSearch("")}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {chips.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setChip(c)}
                className={clsx(
                  "h-8 px-3 rounded-full text-xs font-semibold border transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30",
                  chip === c
                    ? "bg-econet-navy text-white border-econet-navy"
                    : "bg-white dark:bg-econet-dark-surface text-econet-ink dark:text-white border-econet-border dark:border-econet-dark-border hover:border-econet-grey"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </header>

      {grouped.length === 0 ? (
        <Card>
          <p className="text-sm text-econet-grey dark:text-white/70">
            No APIs match the current filters.
          </p>
        </Card>
      ) : (
        <div className="flex flex-col gap-10">
          {grouped.map(({ cat, items }) => (
            <section key={cat}>
              <div className="flex items-baseline justify-between mb-4">
                <h2 className="text-econet-ink dark:text-white">{cat}</h2>
                <p className="text-xs font-semibold uppercase tracking-wider text-econet-grey dark:text-white/60">
                  {items.length} {items.length === 1 ? "API" : "APIs"}
                </p>
              </div>
              <div className="flex gap-4 overflow-x-auto lg:overflow-visible lg:grid lg:grid-cols-2 xl:grid-cols-3 scrollbar-thin pb-2">
                {items.map((api) => (
                  <div key={api.id} className="min-w-[280px] lg:min-w-0">
                    <ApiProductCard api={api} />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
