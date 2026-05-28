import { useState, type FormEvent } from "react";
import clsx from "clsx";
import Card from "../components/Card";
import Button from "../components/Button";
import Breadcrumb from "../components/Breadcrumb";
import Input from "../components/Input";
import Select from "../components/Select";
import {
  initialTickets,
  type Ticket,
  type TicketCategory,
  type TicketPriority,
  type TicketStatus,
} from "../data/tickets";
import { useToast } from "../context/ToastContext";

const statusColor: Record<TicketStatus, string> = {
  Open: "bg-econet-info/10 text-econet-info",
  "Awaiting Response": "bg-econet-orange/10 text-econet-orange",
  Resolved: "bg-econet-success/10 text-econet-success",
  Closed: "bg-econet-surface dark:bg-econet-dark-border text-econet-grey dark:text-white/60",
};

const categories: TicketCategory[] = [
  "Authentication",
  "Billing",
  "Webhook",
  "Integration",
  "Compliance",
  "Other",
];

const priorities: TicketPriority[] = ["Low", "Normal", "High", "Urgent"];

export default function Support() {
  const { showToast } = useToast();
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [reply, setReply] = useState("");

  const [category, setCategory] = useState<TicketCategory>("Authentication");
  const [priority, setPriority] = useState<TicketPriority>("Normal");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const onSubmitTicket = (e: FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      showToast({ kind: "error", title: "Missing fields", body: "Subject and description are required." });
      return;
    }
    const t: Ticket = {
      id: `t${tickets.length + 1}`,
      ref: `ECN-${23600 + tickets.length}`,
      subject,
      category,
      priority,
      status: "Open",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: "m1",
          author: "Tariro Chikomba",
          authorRole: "you",
          timestamp: new Date().toISOString(),
          body: description,
        },
      ],
    };
    setTickets((prev) => [t, ...prev]);
    setSubject("");
    setDescription("");
    showToast({ kind: "success", title: "Ticket opened", body: `Ref ${t.ref}` });
  };

  const onReply = (id: string) => {
    if (!reply.trim()) return;
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: "Awaiting Response",
              updatedAt: new Date().toISOString(),
              messages: [
                ...t.messages,
                {
                  id: `m${t.messages.length + 1}`,
                  author: "Tariro Chikomba",
                  authorRole: "you",
                  timestamp: new Date().toISOString(),
                  body: reply,
                },
              ],
            }
          : t
      )
    );
    setReply("");
    showToast({ kind: "success", title: "Reply sent" });
  };

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: "Dashboard", to: "/dashboard" }, { label: "Support" }]} />
      <header>
        <p className="text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60">
          We are here to help
        </p>
        <h1 className="text-econet-ink dark:text-white">Support</h1>
      </header>

      <div className="grid gap-5 lg:grid-cols-[1fr_1fr_280px]">
        <Card className="flex flex-col gap-3">
          <h3 className="text-econet-ink dark:text-white">Open a ticket</h3>
          <form onSubmit={onSubmitTicket} className="flex flex-col gap-3">
            <Select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value as TicketCategory)}
              options={categories.map((c) => ({ value: c, label: c }))}
            />
            <Select
              label="Priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as TicketPriority)}
              options={priorities.map((p) => ({ value: p, label: p }))}
            />
            <Input
              label="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <label className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-econet-ink dark:text-white">
                Description
              </span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="rounded-md border border-econet-border dark:border-econet-dark-border bg-white dark:bg-econet-dark-surface text-sm text-econet-ink dark:text-white p-3 focus:outline-none focus:ring-2 focus:ring-econet-navy/30"
              />
            </label>
            <p className="text-xs text-econet-grey dark:text-white/60">
              Attachments: drag files anywhere into this form to attach (sandbox demo).
            </p>
            <Button type="submit" variant="primary">
              Submit ticket
            </Button>
          </form>
        </Card>

        <Card>
          <h3 className="text-econet-ink dark:text-white mb-3">My tickets</h3>
          <ul className="space-y-2 max-h-[600px] overflow-y-auto scrollbar-thin pr-1">
            {tickets.map((t) => (
              <li key={t.id} className="border border-econet-border dark:border-econet-dark-border rounded-md">
                <button
                  type="button"
                  onClick={() => setExpanded(expanded === t.id ? null : t.id)}
                  className="w-full flex items-start justify-between gap-2 p-3 text-left hover:bg-econet-surface dark:hover:bg-econet-dark-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30 rounded"
                >
                  <div>
                    <p className="text-xs font-mono text-econet-grey dark:text-white/60">{t.ref}</p>
                    <p className="text-sm font-semibold text-econet-ink dark:text-white">{t.subject}</p>
                    <p className="text-xs text-econet-grey dark:text-white/60">
                      Updated {new Date(t.updatedAt).toLocaleString("en-ZW")}
                    </p>
                  </div>
                  <span
                    className={clsx(
                      "shrink-0 inline-flex items-center rounded-full text-xs font-semibold px-2.5 py-0.5",
                      statusColor[t.status]
                    )}
                  >
                    {t.status}
                  </span>
                </button>
                {expanded === t.id ? (
                  <div className="border-t border-econet-border dark:border-econet-dark-border p-3">
                    <ul className="space-y-3 mb-3">
                      {t.messages.map((m) => (
                        <li
                          key={m.id}
                          className={clsx(
                            "rounded-md p-3 text-sm",
                            m.authorRole === "you"
                              ? "bg-econet-navy/5 dark:bg-white/5 text-econet-ink dark:text-white"
                              : "bg-econet-surface dark:bg-econet-dark-border text-econet-ink dark:text-white"
                          )}
                        >
                          <p className="text-xs font-semibold text-econet-grey dark:text-white/60 mb-1">
                            {m.author} · {new Date(m.timestamp).toLocaleString("en-ZW")}
                          </p>
                          <p>{m.body}</p>
                        </li>
                      ))}
                    </ul>
                    <label className="flex flex-col gap-1">
                      <span className="sr-only">Reply</span>
                      <textarea
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        rows={3}
                        placeholder="Type a reply"
                        className="rounded-md border border-econet-border dark:border-econet-dark-border bg-white dark:bg-econet-dark-surface text-sm text-econet-ink dark:text-white p-2 focus:outline-none focus:ring-2 focus:ring-econet-navy/30"
                      />
                    </label>
                    <div className="flex justify-end mt-2">
                      <Button variant="primary" size="sm" onClick={() => onReply(t.id)}>
                        Send reply
                      </Button>
                    </div>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h3 className="text-econet-ink dark:text-white mb-3">Contact</h3>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-xs font-semibold text-econet-grey dark:text-white/60 uppercase tracking-wide">
                Email
              </dt>
              <dd className="text-econet-ink dark:text-white">developers@econet.co.zw</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-econet-grey dark:text-white/60 uppercase tracking-wide">
                Phone
              </dt>
              <dd className="text-econet-ink dark:text-white">+263 8677 100 100</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-econet-grey dark:text-white/60 uppercase tracking-wide">
                Hours
              </dt>
              <dd className="text-econet-ink dark:text-white">Mon to Fri, 08:00 to 18:00 CAT</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-econet-grey dark:text-white/60 uppercase tracking-wide">
                Head office
              </dt>
              <dd className="text-econet-ink dark:text-white">Econet Park, 2 Old Mutare Road, Msasa, Harare</dd>
            </div>
          </dl>
        </Card>
      </div>
    </div>
  );
}
