import { useMemo, useState } from "react";
import Card from "../components/Card";
import Breadcrumb from "../components/Breadcrumb";
import SearchField from "../components/SearchField";
import Accordion from "../components/Accordion";
import { faqs, faqCategories } from "../data/faqs";

export default function FAQs() {
  const [search, setSearch] = useState("");

  const grouped = useMemo(() => {
    const q = search.toLowerCase();
    return faqCategories
      .map((cat) => ({
        cat,
        items: faqs.filter(
          (f) =>
            f.category === cat &&
            (q.length === 0 ||
              f.question.toLowerCase().includes(q) ||
              f.answer.toLowerCase().includes(q))
        ),
      }))
      .filter((g) => g.items.length > 0);
  }, [search]);

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: "Dashboard", to: "/dashboard" }, { label: "FAQs" }]} />
      <header>
        <p className="text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60">
          Self-service answers
        </p>
        <h1 className="text-econet-ink dark:text-white">Frequently asked questions</h1>
      </header>

      <div className="max-w-xl">
        <SearchField
          placeholder="Search FAQs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
        />
      </div>

      {grouped.length === 0 ? (
        <Card>
          <p className="text-sm text-econet-grey dark:text-white/70">
            Nothing matched "{search}". Try the Support page if you cannot find an answer.
          </p>
        </Card>
      ) : (
        grouped.map(({ cat, items }) => (
          <Card key={cat}>
            <h2 className="text-econet-ink dark:text-white mb-3">{cat}</h2>
            <Accordion
              items={items.map((f) => ({
                id: f.id,
                title: f.question,
                content: (
                  <p className="text-sm text-econet-ink dark:text-white/85 leading-7">
                    {f.answer}
                  </p>
                ),
              }))}
            />
          </Card>
        ))
      )}
    </div>
  );
}
