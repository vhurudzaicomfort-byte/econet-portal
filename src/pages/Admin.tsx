import { useState } from "react";
import AppShellSearchBridge from "../components/AppShellSearchBridge";
import Card from "../components/Card";
import Tabs from "../components/Tabs";
import Table from "../components/Table";
import Button from "../components/Button";
import StatusChip from "../components/StatusChip";
import Modal from "../components/Modal";
import Badge from "../components/Badge";
import { useApps } from "../context/AppsContext";
import { useToast } from "../context/ToastContext";
import type { Submission } from "../data/submissions";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-ZW", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function Admin() {
  const { submissions, approveSubmission, rejectSubmission, teams } = useApps();
  const { showToast } = useToast();
  const [viewing, setViewing] = useState<Submission | null>(null);

  return (
    <AppShellSearchBridge>
      <div className="flex flex-col gap-6">
        <header>
          <p className="text-xs font-bold uppercase tracking-wider text-econet-grey">
            Admin
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-econet-ink">
            Operations console
          </h1>
          <p className="text-sm text-econet-grey mt-1 max-w-2xl">
            Approve or reject app submissions, and manage organisation-wide team
            membership.
          </p>
        </header>

        <Tabs
          items={[
            {
              id: "submissions",
              label: "Submissions queue",
              content: (
                <Card padded={false} className="overflow-hidden">
                  <Table
                    rowKey={(r) => r.id}
                    rows={submissions}
                    emptyMessage="No submissions awaiting review."
                    columns={[
                      {
                        key: "app",
                        header: "App",
                        cell: (r) => (
                          <div>
                            <p className="text-sm font-bold text-econet-ink">
                              {r.appName}
                            </p>
                            <p className="text-xs text-econet-grey">
                              {r.description}
                            </p>
                          </div>
                        ),
                      },
                      {
                        key: "partner",
                        header: "Partner",
                        cell: (r) => (
                          <span className="text-sm text-econet-ink">
                            {r.partner}
                          </span>
                        ),
                      },
                      {
                        key: "submitted",
                        header: "Submitted",
                        cell: (r) => (
                          <span className="text-sm text-econet-grey">
                            {formatDate(r.submittedOn)}
                          </span>
                        ),
                      },
                      {
                        key: "channels",
                        header: "Channels",
                        cell: (r) => (
                          <div className="flex flex-wrap gap-1">
                            {r.channels.map((c) => (
                              <Badge key={c} variant="soft">
                                {c}
                              </Badge>
                            ))}
                          </div>
                        ),
                      },
                      {
                        key: "status",
                        header: "Status",
                        cell: (r) => (
                          <StatusChip
                            status={
                              r.status === "Pending"
                                ? "pending"
                                : r.status === "Approved"
                                ? "approved"
                                : "rejected"
                            }
                          />
                        ),
                      },
                      {
                        key: "actions",
                        header: "Actions",
                        align: "right",
                        cell: (r) => (
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setViewing(r)}
                            >
                              View
                            </Button>
                            {r.status === "Pending" ? (
                              <>
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  onClick={() => {
                                    approveSubmission(r.id);
                                    showToast({
                                      kind: "success",
                                      title: "Submission approved",
                                      body: `${r.appName} can now go live.`,
                                    });
                                  }}
                                >
                                  Approve
                                </Button>
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => {
                                    rejectSubmission(r.id);
                                    showToast({
                                      kind: "info",
                                      title: "Submission rejected",
                                      body: `${r.appName} was sent back to the partner.`,
                                    });
                                  }}
                                >
                                  Reject
                                </Button>
                              </>
                            ) : null}
                          </div>
                        ),
                      },
                    ]}
                  />
                </Card>
              ),
            },
            {
              id: "teams",
              label: "Teams admin",
              content: (
                <Card padded={false} className="overflow-hidden">
                  <Table
                    rowKey={(r) => r.id}
                    rows={teams}
                    columns={[
                      {
                        key: "name",
                        header: "Team",
                        cell: (r) => (
                          <div>
                            <p className="text-sm font-bold text-econet-ink">
                              {r.name}
                            </p>
                            <p className="text-xs text-econet-grey">
                              {r.description}
                            </p>
                          </div>
                        ),
                      },
                      {
                        key: "members",
                        header: "Members",
                        cell: (r) => (
                          <span className="text-sm text-econet-ink">
                            {r.members.length}
                          </span>
                        ),
                      },
                      {
                        key: "created",
                        header: "Created",
                        cell: (r) => (
                          <span className="text-sm text-econet-grey">
                            {formatDate(r.createdAt)}
                          </span>
                        ),
                      },
                      {
                        key: "owner",
                        header: "Owner",
                        cell: (r) => {
                          const owner = r.members.find((m) => m.role === "Owner");
                          return (
                            <span className="text-sm text-econet-ink">
                              {owner ? owner.name : "Unassigned"}
                            </span>
                          );
                        },
                      },
                      {
                        key: "actions",
                        header: "Actions",
                        align: "right",
                        cell: () => (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              showToast({
                                kind: "info",
                                title: "Team detail",
                                body: "Open the Teams page to manage members.",
                              })
                            }
                          >
                            Manage
                          </Button>
                        ),
                      },
                    ]}
                  />
                </Card>
              ),
            },
          ]}
        />
      </div>

      <Modal
        open={viewing !== null}
        onClose={() => setViewing(null)}
        title={viewing?.appName || "Submission"}
        description={viewing ? `${viewing.partner}` : undefined}
        size="lg"
        footer={
          viewing && viewing.status === "Pending" ? (
            <>
              <Button
                variant="danger"
                onClick={() => {
                  rejectSubmission(viewing.id);
                  showToast({
                    kind: "info",
                    title: "Submission rejected",
                    body: `${viewing.appName} was sent back.`,
                  });
                  setViewing(null);
                }}
              >
                Reject
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  approveSubmission(viewing.id);
                  showToast({
                    kind: "success",
                    title: "Submission approved",
                    body: `${viewing.appName} can now go live.`,
                  });
                  setViewing(null);
                }}
              >
                Approve
              </Button>
            </>
          ) : (
            <Button variant="ghost" onClick={() => setViewing(null)}>
              Close
            </Button>
          )
        }
      >
        {viewing ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <DetailRow label="Submitted" value={formatDate(viewing.submittedOn)} />
            <DetailRow label="Contact" value={viewing.contact} />
            <DetailRow
              label="Channels"
              value={viewing.channels.join(", ")}
            />
            <DetailRow label="Status" value={viewing.status} />
            <div className="sm:col-span-2">
              <DetailRow label="Description" value={viewing.description} />
            </div>
          </div>
        ) : null}
      </Modal>
    </AppShellSearchBridge>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border border-econet-border rounded-md bg-econet-surface/50 px-4 py-3">
      <span className="text-xs font-bold uppercase tracking-wider text-econet-grey">
        {label}
      </span>
      <span className="text-sm text-econet-ink break-words">{value}</span>
    </div>
  );
}
