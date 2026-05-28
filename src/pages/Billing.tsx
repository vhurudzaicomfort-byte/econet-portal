import { useState } from "react";
import clsx from "clsx";
import Card from "../components/Card";
import Button from "../components/Button";
import Breadcrumb from "../components/Breadcrumb";
import Modal from "../components/Modal";
import Input from "../components/Input";
import IconBilling from "../icons/IconBilling";
import IconCheck from "../icons/IconCheck";
import { useToast } from "../context/ToastContext";

type Plan = {
  id: "free" | "growth" | "enterprise";
  name: string;
  price: string;
  perks: string[];
};

const plans: Plan[] = [
  { id: "free", name: "Free", price: "USD 0", perks: ["Sandbox only", "20 req/s", "Community support"] },
  { id: "growth", name: "Growth", price: "USD 49 / mo", perks: ["Production access", "100 req/s", "Email support", "99.5% SLA"] },
  { id: "enterprise", name: "Enterprise", price: "Custom", perks: ["mTLS APIs", "500 req/s", "Dedicated CSM", "99.95% SLA"] },
];

type UsageMeter = { label: string; used: number; limit: number; unit: string };
const meters: UsageMeter[] = [
  { label: "EcoCash transactions", used: 18420, limit: 50000, unit: "txns" },
  { label: "SMS sent", used: 84120, limit: 250000, unit: "msgs" },
  { label: "KYC lookups", used: 412, limit: 5000, unit: "lookups" },
  { label: "Airtime top-ups", used: 7012, limit: 25000, unit: "topups" },
];

type Invoice = { date: string; amount: string; status: "Paid" | "Due" };
const invoices: Invoice[] = [
  { date: "2026-05-01", amount: "USD 412.40", status: "Paid" },
  { date: "2026-04-01", amount: "USD 388.10", status: "Paid" },
  { date: "2026-03-01", amount: "USD 401.55", status: "Paid" },
  { date: "2026-02-01", amount: "USD 372.20", status: "Paid" },
  { date: "2026-01-01", amount: "USD 312.78", status: "Paid" },
];

type PaymentMethod = { id: string; label: string };

export default function Billing() {
  const { showToast } = useToast();
  const [plan, setPlan] = useState<Plan["id"]>("growth");
  const [planModal, setPlanModal] = useState(false);
  const [pmModal, setPmModal] = useState(false);
  const [methods, setMethods] = useState<PaymentMethod[]>([
    { id: "pm_1", label: "Visa ending 4242" },
  ]);
  const [newCard, setNewCard] = useState({ name: "", number: "", expiry: "", cvc: "" });

  const addPaymentMethod = () => {
    if (!newCard.number || newCard.number.length < 4) {
      showToast({ kind: "error", title: "Invalid card", body: "Enter at least the last 4 digits." });
      return;
    }
    setMethods((prev) => [
      ...prev,
      { id: `pm_${prev.length + 1}`, label: `Card ending ${newCard.number.slice(-4)}` },
    ]);
    setNewCard({ name: "", number: "", expiry: "", cvc: "" });
    setPmModal(false);
    showToast({ kind: "success", title: "Payment method added" });
  };

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: "Dashboard", to: "/dashboard" }, { label: "Billing" }]} />
      <header>
        <p className="text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60">
          Plans, usage and invoices
        </p>
        <h1 className="text-econet-ink dark:text-white">Billing</h1>
      </header>

      <Card className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex items-start gap-3">
            <span className="h-12 w-12 flex items-center justify-center rounded-lg bg-econet-navy/10 text-econet-navy">
              <IconBilling size={24} />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60">
                Current plan
              </p>
              <h2 className="text-econet-ink dark:text-white">
                {plans.find((p) => p.id === plan)?.name}
              </h2>
              <p className="text-sm text-econet-grey dark:text-white/70">
                Renews on 01 June 2026 in USD.
              </p>
            </div>
          </div>
          <Button variant="ghost" onClick={() => setPlanModal(true)}>
            Change plan
          </Button>
        </div>
      </Card>

      <Card>
        <h3 className="text-econet-ink dark:text-white mb-4">Usage this month</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {meters.map((m) => {
            const pct = Math.min(100, (m.used / m.limit) * 100);
            return (
              <div key={m.label}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-econet-ink dark:text-white">{m.label}</p>
                  <p className="text-xs text-econet-grey dark:text-white/70">
                    {m.used.toLocaleString()} / {m.limit.toLocaleString()} {m.unit}
                  </p>
                </div>
                <div className="h-2 rounded-full bg-econet-surface dark:bg-econet-dark-border overflow-hidden">
                  <div
                    className={clsx(
                      "h-full",
                      pct < 80 ? "bg-econet-navy" : pct < 95 ? "bg-econet-orange" : "bg-econet-red"
                    )}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <h3 className="text-econet-ink dark:text-white mb-3">Invoices</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-econet-surface dark:bg-econet-dark-border text-left text-xs font-semibold uppercase tracking-wide text-econet-grey dark:text-white/70">
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-econet-border dark:divide-econet-dark-border">
              {invoices.map((inv) => (
                <tr key={inv.date} className="text-econet-ink dark:text-white">
                  <td className="px-4 py-3">{inv.date}</td>
                  <td className="px-4 py-3">{inv.amount}</td>
                  <td className="px-4 py-3">
                    <span
                      className={clsx(
                        "inline-flex items-center rounded-full text-xs font-semibold px-2.5 py-0.5",
                        inv.status === "Paid"
                          ? "bg-econet-success/10 text-econet-success"
                          : "bg-econet-orange/10 text-econet-orange"
                      )}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        showToast({
                          kind: "info",
                          title: "Invoice PDF queued",
                          body: `${inv.date} invoice will email shortly.`,
                        })
                      }
                    >
                      Download PDF
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-econet-ink dark:text-white">Payment methods</h3>
          <Button variant="ghost" size="sm" onClick={() => setPmModal(true)}>
            Add payment method
          </Button>
        </div>
        <ul className="divide-y divide-econet-border dark:divide-econet-dark-border">
          {methods.map((m) => (
            <li
              key={m.id}
              className="flex items-center justify-between py-3 text-sm text-econet-ink dark:text-white"
            >
              <span>{m.label}</span>
              <button
                type="button"
                onClick={() => {
                  setMethods((prev) => prev.filter((x) => x.id !== m.id));
                  showToast({ kind: "info", title: "Payment method removed" });
                }}
                className="text-xs font-semibold text-econet-red hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-red/30 rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </Card>

      <Modal
        open={planModal}
        onClose={() => setPlanModal(false)}
        title="Change plan"
        description="Pick the tier that matches your traffic."
        size="lg"
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {plans.map((p) => {
            const active = p.id === plan;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setPlan(p.id)}
                className={clsx(
                  "text-left rounded-lg border p-4 transition-colors",
                  active
                    ? "border-econet-navy bg-econet-navy/5 dark:bg-white/10"
                    : "border-econet-border dark:border-econet-dark-border hover:border-econet-grey"
                )}
              >
                <p className="text-sm font-bold text-econet-ink dark:text-white">{p.name}</p>
                <p className="text-2xl font-bold text-econet-navy dark:text-white">{p.price}</p>
                <ul className="mt-2 space-y-1">
                  {p.perks.map((pk) => (
                    <li key={pk} className="flex items-start gap-1.5 text-xs text-econet-ink dark:text-white/85">
                      <IconCheck size={14} className="text-econet-success mt-0.5" />
                      <span>{pk}</span>
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>
        <div className="flex justify-end gap-2 mt-5">
          <Button variant="ghost" onClick={() => setPlanModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setPlanModal(false);
              showToast({
                kind: "success",
                title: "Plan updated",
                body: `You are now on the ${plans.find((p) => p.id === plan)?.name} plan.`,
              });
            }}
          >
            Confirm
          </Button>
        </div>
      </Modal>

      <Modal
        open={pmModal}
        onClose={() => setPmModal(false)}
        title="Add payment method"
      >
        <div className="flex flex-col gap-3">
          <Input
            label="Cardholder name"
            value={newCard.name}
            onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
          />
          <Input
            label="Card number"
            value={newCard.number}
            onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
            placeholder="4242 4242 4242 4242"
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Expiry"
              value={newCard.expiry}
              onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
              placeholder="MM / YY"
            />
            <Input
              label="CVC"
              value={newCard.cvc}
              onChange={(e) => setNewCard({ ...newCard, cvc: e.target.value })}
              placeholder="123"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-5">
          <Button variant="ghost" onClick={() => setPmModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={addPaymentMethod}>
            Add card
          </Button>
        </div>
      </Modal>
    </div>
  );
}
