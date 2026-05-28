import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import Card from "../components/Card";
import Select from "../components/Select";
import StatusChip from "../components/StatusChip";
import AppShellSearchBridge from "../components/AppShellSearchBridge";
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
import {
  productCategories,
  productProviders,
  products,
  type ProductCategory,
  type ProductProvider,
} from "../data/products";

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

export default function Products() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"All" | ProductCategory>("All");
  const [provider, setProvider] = useState<"All" | ProductProvider>("All");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (provider !== "All" && p.provider !== provider) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !p.name.toLowerCase().includes(q) &&
          !p.shortDescription.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [search, category, provider]);

  return (
    <AppShellSearchBridge
      searchPlaceholder="Search products by name"
      searchValue={search}
      onSearchChange={setSearch}
    >
      <div className="flex flex-col gap-6">
        <header>
          <p className="text-xs font-bold uppercase tracking-wider text-econet-grey">
            Discover
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-econet-ink">
            Products catalogue
          </h1>
          <p className="text-sm text-econet-grey mt-1 max-w-2xl">
            A single searchable catalogue of every API offered by Econet Wireless,
            EcoCash and EcoSure. Filter by capability or provider to find what
            you need.
          </p>
        </header>

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setCategory("All")}
              className={clsx(
                "h-8 px-3 rounded-full text-xs font-semibold border transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30",
                category === "All"
                  ? "bg-econet-navy text-white border-econet-navy"
                  : "bg-white text-econet-ink border-econet-border hover:border-econet-grey"
              )}
            >
              All
            </button>
            {productCategories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={clsx(
                  "h-8 px-3 rounded-full text-xs font-semibold border transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30",
                  category === c
                    ? "bg-econet-navy text-white border-econet-navy"
                    : "bg-white text-econet-ink border-econet-border hover:border-econet-grey"
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="w-full sm:max-w-xs">
              <Select
                label="Provider"
                hideLabel
                value={provider}
                onChange={(e) => setProvider(e.target.value as typeof provider)}
                options={[
                  { value: "All", label: "All providers" },
                  ...productProviders.map((p) => ({ value: p, label: p })),
                ]}
              />
            </div>
            <p className="text-xs text-econet-grey">
              Showing {filtered.length} of {products.length} products
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.length === 0 ? (
            <Card padded className="col-span-full">
              <p className="text-sm text-econet-grey">
                No products match the current filters.
              </p>
            </Card>
          ) : (
            filtered.map((p) => {
              const Icon = iconMap[p.iconKey];
              return (
                <Card
                  key={p.slug}
                  hoverable
                  className="flex flex-col gap-4 cursor-pointer"
                  onClick={() => navigate(`/products/${p.slug}`)}
                  role="link"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      navigate(`/products/${p.slug}`);
                    }
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-econet-navy/10 text-econet-navy">
                      <Icon size={28} />
                    </div>
                    <StatusChip
                      status={availabilityToStatus[p.availability]}
                      label={p.availability}
                    />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-econet-ink">
                      {p.name}
                    </h2>
                    <p className="text-xs text-econet-grey mt-0.5">
                      {p.provider}
                    </p>
                  </div>
                  <p className="text-sm text-econet-ink leading-6 line-clamp-2">
                    {p.shortDescription}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-econet-grey">
                      {p.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-econet-navy">
                      View
                      <IconArrowRight size={16} />
                    </span>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </AppShellSearchBridge>
  );
}
