import { useMemo, useState } from "react";
import clsx from "clsx";
import Card from "../components/Card";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Breadcrumb from "../components/Breadcrumb";
import Input from "../components/Input";
import MultiSelect from "../components/MultiSelect";
import Select from "../components/Select";
import CodeBlock from "../components/CodeBlock";
import IconWebhook from "../icons/IconWebhook";
import IconArrowRight from "../icons/IconArrowRight";
import { useToast } from "../context/ToastContext";

type Endpoint = {
  id: string;
  url: string;
  events: string[];
  status: "Active" | "Disabled";
};

type DeliveryAttempt = {
  id: string;
  time: string;
  event: string;
  endpoint: string;
  status: number;
  latencyMs: number;
  retry: number;
};

const allEvents = [
  "payment.success",
  "payment.failed",
  "payment.refunded",
  "sms.delivered",
  "sms.failed",
  "ussd.session.started",
  "ussd.session.ended",
  "kyc.consent.granted",
];

const samplePayloads: Record<string, unknown> = {
  "payment.success": {
    id: "evt_8c2bb0",
    type: "payment.success",
    data: { transactionId: "txn_8c2bb017", msisdn: "+263774129034", amount: "25.00", currency: "USD" },
  },
  "payment.failed": {
    id: "evt_8c2bb1",
    type: "payment.failed",
    data: { transactionId: "txn_8c2bb018", reason: "WALLET_INSUFFICIENT_FUNDS" },
  },
  "payment.refunded": {
    id: "evt_8c2bb2",
    type: "payment.refunded",
    data: { transactionId: "txn_8c2bb019", amount: "25.00" },
  },
  "sms.delivered": {
    id: "evt_8c2bb3",
    type: "sms.delivered",
    data: { messageId: "sms_4d23", to: "+263774129034" },
  },
  "sms.failed": {
    id: "evt_8c2bb4",
    type: "sms.failed",
    data: { messageId: "sms_4d24", reason: "ABSENT_SUBSCRIBER" },
  },
  "ussd.session.started": {
    id: "evt_8c2bb5",
    type: "ussd.session.started",
    data: { sessionId: "sess_8c2b", shortCode: "*151#" },
  },
  "ussd.session.ended": {
    id: "evt_8c2bb6",
    type: "ussd.session.ended",
    data: { sessionId: "sess_8c2b" },
  },
  "kyc.consent.granted": {
    id: "evt_8c2bb7",
    type: "kyc.consent.granted",
    data: { msisdn: "+263774129034", scope: "name,id" },
  },
};

export default function Webhooks() {
  const { showToast } = useToast();
  const [endpoints, setEndpoints] = useState<Endpoint[]>([
    {
      id: "wh_4c8a",
      url: "https://api.pindula.co.zw/callbacks/econet",
      events: ["payment.success", "payment.failed"],
      status: "Active",
    },
    {
      id: "wh_88a1",
      url: "https://otp.stewardbank.co.zw/hooks/econet",
      events: ["sms.delivered", "sms.failed"],
      status: "Active",
    },
  ]);

  const [addModal, setAddModal] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newEvents, setNewEvents] = useState<string[]>([]);

  const [simEvent, setSimEvent] = useState<string>(allEvents[0]);
  const [simEndpointId, setSimEndpointId] = useState<string>(endpoints[0]?.id || "");
  const [simBody, setSimBody] = useState<string>(
    JSON.stringify(samplePayloads[allEvents[0]], null, 2)
  );

  const [deliveries, setDeliveries] = useState<DeliveryAttempt[]>([
    { id: "d1", time: "2 minutes ago", event: "payment.success", endpoint: "wh_4c8a", status: 200, latencyMs: 142, retry: 0 },
    { id: "d2", time: "5 minutes ago", event: "payment.success", endpoint: "wh_4c8a", status: 200, latencyMs: 138, retry: 0 },
    { id: "d3", time: "12 minutes ago", event: "sms.delivered", endpoint: "wh_88a1", status: 500, latencyMs: 8024, retry: 2 },
    { id: "d4", time: "21 minutes ago", event: "payment.failed", endpoint: "wh_4c8a", status: 200, latencyMs: 156, retry: 0 },
  ]);

  const onSendSim = () => {
    const ok = Math.random() > 0.2;
    const status = ok ? 200 : Math.random() > 0.5 ? 500 : 408;
    const attempt: DeliveryAttempt = {
      id: `d${deliveries.length + 1}`,
      time: "Just now",
      event: simEvent,
      endpoint: simEndpointId,
      status,
      latencyMs: 80 + Math.round(Math.random() * 800),
      retry: 0,
    };
    setDeliveries((prev) => [attempt, ...prev]);
    showToast({
      kind: status === 200 ? "success" : "info",
      title: status === 200 ? "Webhook accepted" : `Endpoint returned ${status}`,
      body: `Event ${simEvent} delivered in ${attempt.latencyMs}ms.`,
    });
  };

  const endpointOptions = useMemo(
    () => endpoints.map((e) => ({ value: e.id, label: `${e.id} — ${e.url}` })),
    [endpoints]
  );

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: "Dashboard", to: "/dashboard" }, { label: "Webhooks" }]} />
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60">
            Event delivery
          </p>
          <h1 className="text-econet-ink dark:text-white">Webhooks</h1>
        </div>
        <Button variant="primary" onClick={() => setAddModal(true)}>
          Add endpoint
        </Button>
      </header>

      <Card padded={false}>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-econet-surface dark:bg-econet-dark-border text-left text-xs font-semibold uppercase tracking-wide text-econet-grey dark:text-white/70">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">URL</th>
                <th className="px-4 py-3">Events</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-econet-border dark:divide-econet-dark-border">
              {endpoints.map((e) => (
                <tr key={e.id} className="text-econet-ink dark:text-white">
                  <td className="px-4 py-3 font-mono text-xs">
                    <span className="inline-flex items-center gap-2">
                      <IconWebhook size={14} className="text-econet-grey" />
                      {e.id}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs break-all">{e.url}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {e.events.map((ev) => (
                        <span key={ev} className="inline-flex items-center rounded bg-econet-navy/5 text-econet-navy text-[10px] font-semibold px-1.5 py-0.5">
                          {ev}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">{e.status}</td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        setEndpoints((prev) => prev.filter((x) => x.id !== e.id));
                        showToast({ kind: "info", title: "Endpoint removed" });
                      }}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h3 className="text-econet-ink dark:text-white mb-3">Webhook simulator</h3>
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="flex flex-col gap-3">
            <Select
              label="Event"
              value={simEvent}
              onChange={(e) => {
                setSimEvent(e.target.value);
                setSimBody(JSON.stringify(samplePayloads[e.target.value], null, 2));
              }}
              options={allEvents.map((ev) => ({ value: ev, label: ev }))}
            />
            <Select
              label="Endpoint"
              value={simEndpointId}
              onChange={(e) => setSimEndpointId(e.target.value)}
              options={endpointOptions}
            />
            <label className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-econet-ink dark:text-white">
                Payload
              </span>
              <textarea
                value={simBody}
                onChange={(e) => setSimBody(e.target.value)}
                spellCheck={false}
                className="h-48 rounded-md border border-econet-border dark:border-econet-dark-border bg-white dark:bg-econet-dark-surface text-econet-ink dark:text-white text-xs font-mono p-3 focus:outline-none focus:ring-2 focus:ring-econet-navy/30 scrollbar-thin"
              />
            </label>
            <Button variant="primary" iconRight={<IconArrowRight size={16} />} onClick={onSendSim}>
              Send to my endpoint
            </Button>
          </div>
          <div>
            <p className="text-sm font-semibold text-econet-ink dark:text-white mb-2">
              Sample payload
            </p>
            <CodeBlock code={JSON.stringify(samplePayloads[simEvent], null, 2)} language="json" />
          </div>
        </div>
      </Card>

      <Card padded={false}>
        <div className="p-4 border-b border-econet-border dark:border-econet-dark-border">
          <h3 className="text-econet-ink dark:text-white">Delivery log</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-econet-surface dark:bg-econet-dark-border text-left text-xs font-semibold uppercase tracking-wide text-econet-grey dark:text-white/70">
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Event</th>
                <th className="px-4 py-3">Endpoint</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Latency</th>
                <th className="px-4 py-3">Retry</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-econet-border dark:divide-econet-dark-border">
              {deliveries.map((d) => (
                <tr key={d.id} className="text-econet-ink dark:text-white">
                  <td className="px-4 py-3 text-econet-grey dark:text-white/60">{d.time}</td>
                  <td className="px-4 py-3 font-mono text-xs">{d.event}</td>
                  <td className="px-4 py-3 font-mono text-xs">{d.endpoint}</td>
                  <td className="px-4 py-3">
                    <span
                      className={clsx(
                        "inline-flex items-center rounded font-mono text-xs font-bold px-2 py-0.5",
                        d.status < 300
                          ? "bg-econet-success/15 text-econet-success"
                          : d.status < 500
                          ? "bg-econet-orange/15 text-econet-orange"
                          : "bg-econet-red/15 text-econet-red"
                      )}
                    >
                      {d.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{d.latencyMs} ms</td>
                  <td className="px-4 py-3">{d.retry}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal open={addModal} onClose={() => setAddModal(false)} title="Add webhook endpoint">
        <div className="flex flex-col gap-3">
          <Input
            label="Endpoint URL"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="https://example.com/hooks/econet"
          />
          <MultiSelect
            label="Events"
            selected={newEvents}
            onChange={setNewEvents}
            options={allEvents}
          />
        </div>
        <div className="flex justify-end gap-2 mt-5">
          <Button variant="ghost" onClick={() => setAddModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (!newUrl.startsWith("https://")) {
                showToast({ kind: "error", title: "HTTPS required", body: "Webhook endpoints must use HTTPS." });
                return;
              }
              setEndpoints((prev) => [
                ...prev,
                {
                  id: `wh_${Math.random().toString(36).slice(2, 6)}`,
                  url: newUrl,
                  events: newEvents,
                  status: "Active",
                },
              ]);
              setAddModal(false);
              setNewUrl("");
              setNewEvents([]);
              showToast({ kind: "success", title: "Webhook endpoint added" });
            }}
          >
            Add
          </Button>
        </div>
      </Modal>
    </div>
  );
}
