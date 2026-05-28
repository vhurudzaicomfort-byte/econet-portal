import { useMemo, useState } from "react";
import clsx from "clsx";
import Card from "../components/Card";
import Button from "../components/Button";
import Breadcrumb from "../components/Breadcrumb";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Avatar from "../components/Avatar";
import Tabs from "../components/Tabs";
import {
  initialThreads,
  topContributors,
  trendingTags,
  type Thread,
  type ThreadKind,
} from "../data/community";
import { useToast } from "../context/ToastContext";

function ThreadList({ kind, threads }: { kind: ThreadKind; threads: Thread[] }) {
  const list = threads.filter((t) => t.kind === kind);
  return (
    <ul className="space-y-3">
      {list.length === 0 ? (
        <li>
          <Card>
            <p className="text-sm text-econet-grey dark:text-white/70">No threads yet.</p>
          </Card>
        </li>
      ) : (
        list.map((t) => (
          <li key={t.id}>
            <Card hoverable className="flex items-start gap-4">
              <Avatar name={t.author} size="md" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-econet-ink dark:text-white">{t.title}</p>
                <p className="text-sm text-econet-grey dark:text-white/70 mt-1 line-clamp-2">{t.snippet}</p>
                <div className="flex items-center gap-2 flex-wrap mt-2">
                  {t.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-econet-navy/5 dark:bg-white/10 text-econet-navy dark:text-white text-xs font-semibold px-2 py-0.5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right text-xs text-econet-grey dark:text-white/60 shrink-0">
                <p>{t.replies} replies</p>
                <p>{t.views} views</p>
                <p>{t.lastActivity}</p>
              </div>
            </Card>
          </li>
        ))
      )}
    </ul>
  );
}

export default function Community() {
  const { showToast } = useToast();
  const [threads, setThreads] = useState<Thread[]>(initialThreads);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [body, setBody] = useState("");
  const [kind, setKind] = useState<ThreadKind>("Discussion");

  const tabs = useMemo(
    () => [
      { id: "Discussion", label: "Discussions", content: <ThreadList kind="Discussion" threads={threads} /> },
      { id: "Showcase", label: "Showcases", content: <ThreadList kind="Showcase" threads={threads} /> },
      { id: "Announcement", label: "Announcements", content: <ThreadList kind="Announcement" threads={threads} /> },
    ],
    [threads]
  );

  const onCreate = () => {
    if (!title.trim() || !body.trim()) {
      showToast({ kind: "error", title: "Missing fields" });
      return;
    }
    const t: Thread = {
      id: `th${threads.length + 1}`,
      kind,
      title,
      snippet: body.slice(0, 140),
      author: "Tariro Chikomba",
      tags: tagInput.split(",").map((x) => x.trim()).filter(Boolean),
      replies: 0,
      views: 0,
      lastActivity: "Just now",
    };
    setThreads((prev) => [t, ...prev]);
    setTitle("");
    setTagInput("");
    setBody("");
    setModalOpen(false);
    showToast({ kind: "success", title: "Thread posted" });
  };

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: "Dashboard", to: "/dashboard" }, { label: "Community" }]} />
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60">
            Builders' forum
          </p>
          <h1 className="text-econet-ink dark:text-white">Community</h1>
        </div>
        <Button variant="primary" onClick={() => setModalOpen(true)}>
          Start a discussion
        </Button>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div>
          <Tabs items={tabs} />
        </div>
        <aside className="flex flex-col gap-4">
          <Card>
            <h3 className="text-econet-ink dark:text-white mb-3">Top contributors</h3>
            <ul className="space-y-2">
              {topContributors.map((c) => (
                <li key={c.name} className="flex items-center gap-3">
                  <Avatar name={c.name} size="sm" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-econet-ink dark:text-white">{c.name}</p>
                    <p className="text-xs text-econet-grey dark:text-white/60">{c.org}</p>
                  </div>
                  <span className="text-xs text-econet-grey dark:text-white/60">{c.posts}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="text-econet-ink dark:text-white mb-3">Trending tags</h3>
            <div className="flex flex-wrap gap-2">
              {trendingTags.map((tag) => (
                <span
                  key={tag}
                  className={clsx(
                    "inline-flex items-center rounded-full bg-econet-navy/5 dark:bg-white/10 text-econet-navy dark:text-white text-xs font-semibold px-2.5 py-1"
                  )}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </Card>
        </aside>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Start a discussion">
        <div className="flex flex-col gap-3">
          <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-econet-ink dark:text-white">Kind</span>
            <div className="flex gap-2">
              {(["Discussion", "Showcase", "Announcement"] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setKind(k)}
                  className={clsx(
                    "h-9 px-3 rounded-full text-sm font-semibold border",
                    kind === k
                      ? "bg-econet-navy text-white border-econet-navy"
                      : "bg-white text-econet-ink border-econet-border hover:border-econet-grey"
                  )}
                >
                  {k}
                </button>
              ))}
            </div>
          </label>
          <Input
            label="Tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="ecocash, ussd"
            helper="Comma separated."
          />
          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-econet-ink dark:text-white">Body</span>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={5}
              className="rounded-md border border-econet-border dark:border-econet-dark-border bg-white dark:bg-econet-dark-surface text-sm text-econet-ink dark:text-white p-3 focus:outline-none focus:ring-2 focus:ring-econet-navy/30"
            />
          </label>
        </div>
        <div className="flex justify-end gap-2 mt-5">
          <Button variant="ghost" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onCreate}>
            Post
          </Button>
        </div>
      </Modal>
    </div>
  );
}
