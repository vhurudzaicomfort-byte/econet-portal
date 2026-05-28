import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppShellSearchBridge from "../components/AppShellSearchBridge";
import Card from "../components/Card";
import Tabs from "../components/Tabs";
import StatusChip, { statusFromAppStatus } from "../components/StatusChip";
import Button from "../components/Button";
import Input from "../components/Input";
import Modal from "../components/Modal";
import Tooltip from "../components/Tooltip";
import IconEye from "../icons/IconEye";
import IconEyeOff from "../icons/IconEyeOff";
import IconCopy from "../icons/IconCopy";
import IconCheck from "../icons/IconCheck";
import IconPlus from "../icons/IconPlus";
import IconClock from "../icons/IconClock";
import { useApps } from "../context/AppsContext";
import { useToast } from "../context/ToastContext";
import { products } from "../data/products";
import { useClipboard } from "../hooks/useClipboard";

function formatDateTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("en-ZW", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const { copied, copy } = useClipboard();
  return (
    <button
      type="button"
      onClick={() => copy(value)}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      className="inline-flex items-center gap-1 text-xs font-semibold text-econet-navy hover:text-econet-navy-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30 rounded px-1.5 py-0.5"
    >
      {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
      <span>{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}

export default function AppDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    apps,
    rotateSecret,
    setEnvironment,
    deleteApp,
    promoteApp,
    updateApp,
  } = useApps();
  const { showToast } = useToast();
  const app = useMemo(() => apps.find((a) => a.id === id), [apps, id]);
  const [showSecret, setShowSecret] = useState(false);
  const [rotateOpen, setRotateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editName, setEditName] = useState(app?.name || "");
  const [editContact, setEditContact] = useState(app?.contact || "");

  if (!app) {
    return (
      <AppShellSearchBridge>
        <Card>
          <h1 className="text-xl font-bold text-econet-ink">App not found</h1>
          <p className="text-sm text-econet-grey mt-2">
            The application you are looking for does not exist.
          </p>
          <div className="mt-4">
            <Button variant="secondary" onClick={() => navigate("/dashboard")}>
              Back to my apps
            </Button>
          </div>
        </Card>
      </AppShellSearchBridge>
    );
  }

  const isProductionAllowed = app.status === "Approved" || app.status === "Live";

  const onRotate = () => {
    rotateSecret(app.id);
    setRotateOpen(false);
    showToast({
      kind: "success",
      title: "Secret rotated",
      body: "Update your servers within 24 hours. The old secret will keep working until then.",
    });
  };

  const onDelete = () => {
    deleteApp(app.id);
    setDeleteOpen(false);
    showToast({
      kind: "info",
      title: "App deleted",
      body: `${app.name} has been removed from your workspace.`,
    });
    navigate("/dashboard");
  };

  const onPromote = () => {
    promoteApp(app.id);
    showToast({
      kind: "success",
      title: "Promotion requested",
      body: "A reviewer will be in touch within three business days.",
    });
  };

  const onEnvChange = (env: "Sandbox" | "Production") => {
    if (env === "Production" && !isProductionAllowed) {
      showToast({
        kind: "error",
        title: "Production requires approval",
        body: "Submit a promotion request to switch this app to production.",
      });
      return;
    }
    setEnvironment(app.id, env);
    showToast({
      kind: "info",
      title: `Switched to ${env}`,
      body:
        env === "Production"
          ? "All requests now hit the live Econet endpoints."
          : "Calls now hit the isolated sandbox.",
    });
  };

  const onSaveSettings = () => {
    if (!editName.trim()) return;
    updateApp(app.id, { name: editName.trim(), contact: editContact.trim() });
    showToast({
      kind: "success",
      title: "Settings saved",
      body: "Application details updated.",
    });
  };

  return (
    <AppShellSearchBridge>
      <div className="flex flex-col gap-6">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="self-start text-sm font-semibold text-econet-navy hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30 rounded"
        >
          Back to my apps
        </button>

        <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-econet-grey">
              {app.partner}
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-econet-ink mt-1">
              {app.name}
            </h1>
            <p className="text-sm text-econet-grey mt-1 max-w-2xl">
              {app.description}
            </p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-3">
            <StatusChip status={statusFromAppStatus(app.status)} />
            <div
              className="inline-flex items-center rounded-full border border-econet-border bg-white p-1"
              role="group"
              aria-label="Environment"
            >
              <button
                type="button"
                onClick={() => onEnvChange("Sandbox")}
                aria-pressed={app.environment === "Sandbox"}
                className={
                  "h-8 px-3 rounded-full text-xs font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30 " +
                  (app.environment === "Sandbox"
                    ? "bg-econet-navy text-white"
                    : "text-econet-ink hover:bg-econet-surface")
                }
              >
                Sandbox
              </button>
              <Tooltip
                label={
                  isProductionAllowed
                    ? "Switch to live traffic"
                    : "Promote to production for live access"
                }
              >
                <button
                  type="button"
                  onClick={() => onEnvChange("Production")}
                  aria-pressed={app.environment === "Production"}
                  className={
                    "h-8 px-3 rounded-full text-xs font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30 " +
                    (app.environment === "Production"
                      ? "bg-econet-navy text-white"
                      : !isProductionAllowed
                      ? "text-econet-grey/70 cursor-not-allowed"
                      : "text-econet-ink hover:bg-econet-surface")
                  }
                >
                  Production
                </button>
              </Tooltip>
            </div>
          </div>
        </header>

        <Tabs
          items={[
            {
              id: "credentials",
              label: "Credentials",
              content: (
                <div className="grid gap-4">
                  <Card>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-econet-grey">
                          Client ID
                        </p>
                        <div className="mt-1 flex items-center justify-between gap-3">
                          <code className="text-sm text-econet-ink font-mono break-all">
                            {app.clientId}
                          </code>
                          <CopyButton value={app.clientId} label="Client ID" />
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-econet-grey">
                          Client secret
                        </p>
                        <div className="mt-1 flex items-center justify-between gap-3">
                          <code className="text-sm text-econet-ink font-mono break-all">
                            {showSecret
                              ? app.clientSecret
                              : `${app.clientSecret.slice(0, 8)}${"•".repeat(22)}`}
                          </code>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => setShowSecret((s) => !s)}
                              aria-label={showSecret ? "Hide secret" : "Show secret"}
                              className="text-econet-navy hover:text-econet-navy-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30 rounded p-1"
                            >
                              {showSecret ? <IconEyeOff size={16} /> : <IconEye size={16} />}
                            </button>
                            <CopyButton value={app.clientSecret} label="Client secret" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-econet-grey">
                          Webhook signing secret
                        </p>
                        <div className="mt-1 flex items-center justify-between gap-3">
                          <code className="text-sm text-econet-ink font-mono break-all">
                            {app.webhookSecret}
                          </code>
                          <CopyButton value={app.webhookSecret} label="Webhook secret" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-econet-border pt-4">
                      <p className="text-xs text-econet-grey">
                        Created on {formatDateTime(app.createdAt)}
                      </p>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => setRotateOpen(true)}
                      >
                        Rotate secret
                      </Button>
                    </div>
                  </Card>
                </div>
              ),
            },
            {
              id: "products",
              label: "Products",
              content: (
                <Card>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-bold text-econet-ink">
                        Subscribed products
                      </h2>
                      <p className="text-sm text-econet-grey mt-1">
                        Active subscriptions on the {app.environment.toLowerCase()} environment.
                      </p>
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      iconLeft={<IconPlus size={16} />}
                      onClick={() => navigate("/products")}
                    >
                      Add product
                    </Button>
                  </div>
                  <ul className="mt-4 divide-y divide-econet-border border border-econet-border rounded-lg">
                    {app.subscribedProductSlugs.length === 0 ? (
                      <li className="p-6 text-center text-sm text-econet-grey">
                        No products yet. Browse the catalogue to add one.
                      </li>
                    ) : (
                      app.subscribedProductSlugs.map((slug) => {
                        const p = products.find((x) => x.slug === slug);
                        if (!p) return null;
                        return (
                          <li key={slug} className="flex items-center justify-between gap-3 p-4">
                            <div>
                              <p className="text-sm font-bold text-econet-ink">{p.name}</p>
                              <p className="text-xs text-econet-grey">{p.shortDescription}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => navigate(`/products/${p.slug}`)}
                            >
                              Manage
                            </Button>
                          </li>
                        );
                      })
                    )}
                  </ul>
                </Card>
              ),
            },
            {
              id: "promotion",
              label: "Promotion",
              content: (
                <Card>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-bold text-econet-ink">
                        Promotion timeline
                      </h2>
                      <p className="text-sm text-econet-grey mt-1">
                        Track the journey from draft to live across reviewers.
                      </p>
                    </div>
                    {app.status !== "Approved" && app.status !== "Live" ? (
                      <Button variant="primary" size="sm" onClick={onPromote}>
                        Request promotion
                      </Button>
                    ) : null}
                  </div>
                  <ol className="mt-6 flex flex-col gap-0 relative">
                    {app.promotion.map((evt, idx) => {
                      const isLast = idx === app.promotion.length - 1;
                      const color =
                        evt.status === "Approved"
                          ? "bg-econet-success"
                          : evt.status === "Rejected"
                          ? "bg-econet-red"
                          : evt.status === "In Review"
                          ? "bg-econet-orange"
                          : "bg-econet-navy";
                      return (
                        <li key={`${evt.status}-${evt.date}`} className="flex gap-4 pb-6">
                          <div className="relative flex flex-col items-center">
                            <span
                              className={
                                "h-3 w-3 rounded-full ring-4 ring-white " + color
                              }
                              aria-hidden="true"
                            />
                            {!isLast ? (
                              <span
                                className="flex-1 w-px bg-econet-border mt-1"
                                aria-hidden="true"
                              />
                            ) : null}
                          </div>
                          <div className="flex flex-col pb-1">
                            <p className="text-sm font-bold text-econet-ink">
                              {evt.status}
                            </p>
                            <p className="text-xs text-econet-grey flex items-center gap-1 mt-0.5">
                              <IconClock size={12} />
                              {formatDateTime(evt.date)}
                            </p>
                            {evt.note ? (
                              <p className="text-sm text-econet-ink mt-1 leading-6">
                                {evt.note}
                              </p>
                            ) : null}
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </Card>
              ),
            },
            {
              id: "settings",
              label: "Settings",
              content: (
                <div className="grid gap-4">
                  <Card>
                    <h2 className="text-lg font-bold text-econet-ink">
                      Application details
                    </h2>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <Input
                        label="Application name"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                      <Input
                        label="Contact"
                        value={editContact}
                        onChange={(e) => setEditContact(e.target.value)}
                      />
                    </div>
                    <div className="mt-4">
                      <Button variant="primary" onClick={onSaveSettings}>
                        Save changes
                      </Button>
                    </div>
                  </Card>
                  <Card className="border-econet-red/30">
                    <h2 className="text-lg font-bold text-econet-red">Danger zone</h2>
                    <p className="text-sm text-econet-grey mt-1">
                      Deleting this app will revoke its credentials immediately.
                      This cannot be undone.
                    </p>
                    <div className="mt-4">
                      <Button variant="danger" onClick={() => setDeleteOpen(true)}>
                        Delete app
                      </Button>
                    </div>
                  </Card>
                </div>
              ),
            },
          ]}
        />
      </div>

      <Modal
        open={rotateOpen}
        onClose={() => setRotateOpen(false)}
        title="Rotate client secret?"
        description="A new secret will be generated. The current secret will be revoked within 24 hours."
        footer={
          <>
            <Button variant="ghost" onClick={() => setRotateOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={onRotate}>
              Rotate secret
            </Button>
          </>
        }
      >
        <p className="text-sm text-econet-ink leading-6">
          We recommend running the rotation when your servers are ready to pick
          up the new secret from your secrets manager.
        </p>
      </Modal>

      <Modal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title={`Delete ${app.name}?`}
        description="This action cannot be undone."
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={onDelete}>
              Delete app
            </Button>
          </>
        }
      >
        <p className="text-sm text-econet-ink leading-6">
          All credentials, webhook configuration and subscribed products for
          this app will be removed.
        </p>
      </Modal>
    </AppShellSearchBridge>
  );
}
