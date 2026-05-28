import { useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Breadcrumb from "../components/Breadcrumb";
import MultiSelect from "../components/MultiSelect";
import Select from "../components/Select";
import Input from "../components/Input";
import CodeBlock from "../components/CodeBlock";
import IconKey from "../icons/IconKey";
import { useToast } from "../context/ToastContext";
import { useEnv } from "../context/EnvContext";

type Token = {
  id: string;
  name: string;
  scopes: string[];
  expiresAt: string;
  lastUsed: string;
  preview: string;
  env: "Sandbox" | "Production";
};

const availableScopes = [
  "ecocash:read",
  "ecocash:write",
  "sms:send",
  "ussd:receive",
  "kyc:read",
  "airtime:write",
  "analytics:read",
];

function genTokenString(env: "Sandbox" | "Production"): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = env === "Production" ? "ec_live_" : "ec_sand_";
  for (let i = 0; i < 32; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

export default function AccessTokens() {
  const { showToast } = useToast();
  const { env } = useEnv();
  const [tokens, setTokens] = useState<Token[]>([
    {
      id: "tok_1",
      name: "Production API",
      scopes: ["ecocash:read", "ecocash:write"],
      expiresAt: "2026-08-12",
      lastUsed: "4 minutes ago",
      preview: "ec_live_8c2b…f44d",
      env: "Production",
    },
    {
      id: "tok_2",
      name: "CI/CD pipeline",
      scopes: ["sms:send", "analytics:read"],
      expiresAt: "2026-12-31",
      lastUsed: "2 hours ago",
      preview: "ec_sand_d491…7d56",
      env: "Sandbox",
    },
  ]);
  const [createModal, setCreateModal] = useState(false);
  const [shownToken, setShownToken] = useState<{ value: string; meta: Token } | null>(null);
  const [copyAck, setCopyAck] = useState(false);
  const [revoke, setRevoke] = useState<Token | null>(null);

  const [name, setName] = useState("");
  const [scopes, setScopes] = useState<string[]>([]);
  const [expiry, setExpiry] = useState("90");

  const onCreate = () => {
    if (!name.trim() || scopes.length === 0) {
      showToast({ kind: "error", title: "Missing fields", body: "Token name and at least one scope are required." });
      return;
    }
    const value = genTokenString(env);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + Number(expiry));
    const newToken: Token = {
      id: `tok_${tokens.length + 1}`,
      name,
      scopes,
      expiresAt: expiresAt.toISOString().slice(0, 10),
      lastUsed: "Never",
      preview: `${value.slice(0, 9)}…${value.slice(-4)}`,
      env,
    };
    setTokens((prev) => [newToken, ...prev]);
    setCreateModal(false);
    setShownToken({ value, meta: newToken });
    setName("");
    setScopes([]);
    setExpiry("90");
    setCopyAck(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: "Dashboard", to: "/dashboard" }, { label: "Access Tokens" }]} />
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60">
            Authentication
          </p>
          <h1 className="text-econet-ink dark:text-white">Access Tokens</h1>
          <p className="text-sm text-econet-grey dark:text-white/70 mt-1">
            Long-lived API tokens scoped to specific capabilities and environments.
          </p>
        </div>
        <Button variant="primary" onClick={() => setCreateModal(true)}>
          Generate token
        </Button>
      </header>

      <Card padded={false}>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-econet-surface dark:bg-econet-dark-border text-left text-xs font-semibold uppercase tracking-wide text-econet-grey dark:text-white/70">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Token</th>
                <th className="px-4 py-3">Scopes</th>
                <th className="px-4 py-3">Environment</th>
                <th className="px-4 py-3">Expires</th>
                <th className="px-4 py-3">Last used</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-econet-border dark:divide-econet-dark-border">
              {tokens.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-econet-grey dark:text-white/60">
                    No tokens yet. Generate one to start calling the APIs.
                  </td>
                </tr>
              ) : (
                tokens.map((t) => (
                  <tr key={t.id} className="text-econet-ink dark:text-white">
                    <td className="px-4 py-3 font-semibold">
                      <span className="inline-flex items-center gap-2">
                        <IconKey size={14} className="text-econet-grey" />
                        {t.name}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">{t.preview}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {t.scopes.map((s) => (
                          <span key={s} className="inline-flex items-center rounded bg-econet-navy/5 dark:bg-white/10 text-econet-navy dark:text-white text-[10px] font-semibold px-1.5 py-0.5">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">{t.env}</td>
                    <td className="px-4 py-3">{t.expiresAt}</td>
                    <td className="px-4 py-3 text-econet-grey dark:text-white/60">{t.lastUsed}</td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="danger" size="sm" onClick={() => setRevoke(t)}>
                        Revoke
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal open={createModal} onClose={() => setCreateModal(false)} title="Generate token">
        <div className="flex flex-col gap-3">
          <Input label="Token name" value={name} onChange={(e) => setName(e.target.value)} />
          <MultiSelect
            label="Scopes"
            selected={scopes}
            onChange={setScopes}
            options={availableScopes}
          />
          <Select
            label="Expires in"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            options={[
              { value: "30", label: "30 days" },
              { value: "90", label: "90 days" },
              { value: "180", label: "180 days" },
              { value: "365", label: "1 year" },
            ]}
          />
        </div>
        <div className="flex justify-end gap-2 mt-5">
          <Button variant="ghost" onClick={() => setCreateModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onCreate}>
            Generate
          </Button>
        </div>
      </Modal>

      <Modal
        open={!!shownToken}
        onClose={() => {
          if (copyAck) setShownToken(null);
        }}
        title="Your new token"
        description="This is the only time we will show this token in full. Copy it now and store it securely."
      >
        {shownToken ? (
          <div className="flex flex-col gap-3">
            <CodeBlock code={shownToken.value} language={shownToken.meta.env.toLowerCase()} />
            <label className="flex items-center gap-2 text-sm text-econet-ink dark:text-white">
              <input
                type="checkbox"
                checked={copyAck}
                onChange={(e) => setCopyAck(e.target.checked)}
                className="h-4 w-4 rounded border-econet-border"
              />
              I have copied this token and stored it securely.
            </label>
          </div>
        ) : null}
        <div className="flex justify-end gap-2 mt-5">
          <Button
            variant="primary"
            disabled={!copyAck}
            onClick={() => setShownToken(null)}
          >
            Done
          </Button>
        </div>
      </Modal>

      <Modal open={!!revoke} onClose={() => setRevoke(null)} title="Revoke token?">
        <p className="text-sm text-econet-ink dark:text-white">
          Any service using <span className="font-mono font-semibold">{revoke?.preview}</span> will start returning 401. This cannot be undone.
        </p>
        <div className="flex justify-end gap-2 mt-5">
          <Button variant="ghost" onClick={() => setRevoke(null)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (!revoke) return;
              setTokens((prev) => prev.filter((t) => t.id !== revoke.id));
              setRevoke(null);
              showToast({ kind: "success", title: "Token revoked" });
            }}
          >
            Revoke
          </Button>
        </div>
      </Modal>
    </div>
  );
}
