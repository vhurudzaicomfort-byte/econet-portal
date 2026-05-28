import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShellSearchBridge from "../components/AppShellSearchBridge";
import Card from "../components/Card";
import Stepper from "../components/Stepper";
import Input from "../components/Input";
import Select from "../components/Select";
import MultiSelect from "../components/MultiSelect";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { useApps } from "../context/AppsContext";
import { useToast } from "../context/ToastContext";

const CHANNEL_OPTIONS = [
  "MyEcoApp",
  "SMS",
  "USSD",
  "Voice",
  "Email",
  "WhatsApp",
  "EcoCash",
  "Other",
];

const steps = [
  { id: "basics", label: "Basics", description: "App and partner" },
  { id: "channels", label: "Channels", description: "How customers reach you" },
  { id: "team", label: "Team & callbacks", description: "Owners and webhooks" },
  { id: "review", label: "Review", description: "Confirm and submit" },
];

function digitsOnly(s: string) {
  return s.replace(/\D/g, "");
}

function formatZimContact(raw: string) {
  const digits = digitsOnly(raw).slice(0, 9);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
  return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
}

function isValidUrl(v: string) {
  try {
    const u = new URL(v);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

export default function CreateApp() {
  const navigate = useNavigate();
  const { teams, createApp, createTeam } = useApps();
  const { showToast } = useToast();
  const [stepIdx, setStepIdx] = useState(0);

  const [name, setName] = useState("");
  const [partner, setPartner] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [channels, setChannels] = useState<string[]>([]);
  const [callbackUrl, setCallbackUrl] = useState("");
  const [teamId, setTeamId] = useState<string>(teams[0]?.id || "");
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamDesc, setNewTeamDesc] = useState("");

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const basicsErrors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Application name is required.";
    if (!partner.trim()) e.partner = "Partner name is required.";
    if (!contact.trim()) e.contact = "Contact number is required.";
    else if (digitsOnly(contact).length < 9)
      e.contact = "Enter a 9-digit Zimbabwean mobile number.";
    return e;
  }, [name, partner, contact]);

  const channelsErrors = useMemo(() => {
    const e: Record<string, string> = {};
    if (channels.length === 0) e.channels = "Select at least one channel.";
    return e;
  }, [channels]);

  const teamErrors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!callbackUrl.trim()) e.callbackUrl = "Callback URL is required.";
    else if (!isValidUrl(callbackUrl))
      e.callbackUrl = "Enter a valid http(s) URL.";
    if (!teamId) e.teamId = "Select or create a team.";
    return e;
  }, [callbackUrl, teamId]);

  const errorsByStep = [basicsErrors, channelsErrors, teamErrors, {}];
  const currentErrors = errorsByStep[stepIdx];
  const isCurrentValid = Object.keys(currentErrors).length === 0;

  const onNext = () => {
    if (!isCurrentValid) {
      setTouched((t) => ({
        ...t,
        ...Object.fromEntries(Object.keys(currentErrors).map((k) => [k, true])),
      }));
      return;
    }
    setStepIdx((i) => Math.min(i + 1, steps.length - 1));
  };

  const onBack = () => setStepIdx((i) => Math.max(0, i - 1));

  const onSubmit = () => {
    if (
      Object.keys(basicsErrors).length > 0 ||
      Object.keys(channelsErrors).length > 0 ||
      Object.keys(teamErrors).length > 0
    ) {
      showToast({
        kind: "error",
        title: "Some fields are missing",
        body: "Go back and complete all required fields.",
      });
      return;
    }
    const created = createApp({
      name: name.trim(),
      partner: partner.trim(),
      contact: `+263 ${contact}`,
      description: description.trim(),
      channels,
      callbackUrl: callbackUrl.trim(),
      teamId,
    });
    showToast({
      kind: "success",
      title: "App submitted for review",
      body: `${created.name} has sandbox credentials and is awaiting approval.`,
    });
    navigate(`/apps/${created.id}`);
  };

  const onCreateTeam = () => {
    if (!newTeamName.trim()) return;
    const t = createTeam({
      name: newTeamName.trim(),
      description: newTeamDesc.trim(),
    });
    setTeamId(t.id);
    setNewTeamName("");
    setNewTeamDesc("");
    setTeamModalOpen(false);
    showToast({
      kind: "success",
      title: "Team created",
      body: `${t.name} is ready to receive app owners.`,
    });
  };

  return (
    <AppShellSearchBridge>
      <div className="flex flex-col gap-6 pb-24">
        <header>
          <p className="text-xs font-bold uppercase tracking-wider text-econet-grey">
            New application
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-econet-ink">
            Build a new app
          </h1>
          <p className="text-sm text-econet-grey mt-1 max-w-2xl">
            Tell us about the application you are integrating with Econet. The
            sandbox starts in minutes; production approval follows.
          </p>
        </header>

        <Card>
          <Stepper steps={steps} activeIndex={stepIdx} />

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {stepIdx === 0 ? (
              <>
                <Input
                  label="Application name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                  error={touched.name ? basicsErrors.name : undefined}
                  helper="Shown to subscribers during sign-in."
                />
                <Input
                  label="Partner name"
                  required
                  value={partner}
                  onChange={(e) => setPartner(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, partner: true }))}
                  error={touched.partner ? basicsErrors.partner : undefined}
                  helper="Your registered company."
                />
                <Input
                  label="Contact number"
                  required
                  value={contact}
                  onChange={(e) => setContact(formatZimContact(e.target.value))}
                  onBlur={() => setTouched((t) => ({ ...t, contact: true }))}
                  error={touched.contact ? basicsErrors.contact : undefined}
                  adornmentLeft={
                    <span className="text-sm font-semibold text-econet-ink">+263</span>
                  }
                  helper="Zimbabwean mobile only."
                />
                <Input
                  label="Short description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  helper="One sentence on what the app does."
                />
              </>
            ) : null}

            {stepIdx === 1 ? (
              <div className="sm:col-span-2">
                <MultiSelect
                  label="Channels"
                  required
                  options={CHANNEL_OPTIONS}
                  selected={channels}
                  onChange={setChannels}
                  helper="Choose all the touchpoints this app will use."
                  error={touched.channels ? channelsErrors.channels : undefined}
                />
              </div>
            ) : null}

            {stepIdx === 2 ? (
              <>
                <Input
                  label="Callback URL"
                  required
                  value={callbackUrl}
                  onChange={(e) => setCallbackUrl(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, callbackUrl: true }))}
                  error={touched.callbackUrl ? teamErrors.callbackUrl : undefined}
                  placeholder="https://api.example.co.zw/econet/hooks"
                  helper="HTTPS recommended. Used for transaction and OAuth callbacks."
                />
                <div className="flex flex-col gap-2">
                  <Select
                    label="Team"
                    required
                    value={teamId}
                    onChange={(e) => setTeamId(e.target.value)}
                    options={
                      teams.length === 0
                        ? [{ value: "", label: "No teams yet" }]
                        : teams.map((t) => ({ value: t.id, label: t.name }))
                    }
                    error={touched.teamId ? teamErrors.teamId : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setTeamModalOpen(true)}
                    className="self-start text-sm font-semibold text-econet-navy hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30 rounded"
                  >
                    Create new team
                  </button>
                </div>
              </>
            ) : null}

            {stepIdx === 3 ? (
              <div className="sm:col-span-2 grid gap-5 sm:grid-cols-2">
                <ReviewRow label="Application name" value={name || "Not set"} />
                <ReviewRow label="Partner" value={partner || "Not set"} />
                <ReviewRow
                  label="Contact number"
                  value={contact ? `+263 ${contact}` : "Not set"}
                />
                <ReviewRow label="Description" value={description || "—"} />
                <ReviewRow
                  label="Channels"
                  value={channels.length ? channels.join(", ") : "None"}
                />
                <ReviewRow label="Callback URL" value={callbackUrl || "Not set"} />
                <ReviewRow
                  label="Team"
                  value={teams.find((t) => t.id === teamId)?.name || "Not set"}
                />
              </div>
            ) : null}
          </div>
        </Card>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-econet-border lg:left-72">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs text-econet-grey">
            {isCurrentValid
              ? stepIdx === steps.length - 1
                ? "Ready when you are. Submit for review to activate sandbox keys."
                : "All set on this step. Continue to the next."
              : "Complete all required fields to continue."}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="md"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={onBack}
              disabled={stepIdx === 0}
            >
              Back
            </Button>
            {stepIdx < steps.length - 1 ? (
              <Button variant="primary" size="md" onClick={onNext}>
                Next
              </Button>
            ) : (
              <Button variant="primary" size="md" onClick={onSubmit}>
                Submit for review
              </Button>
            )}
          </div>
        </div>
      </div>

      <Modal
        open={teamModalOpen}
        onClose={() => setTeamModalOpen(false)}
        title="Create a new team"
        description="Teams group developers who share access to a set of apps."
        footer={
          <>
            <Button variant="ghost" onClick={() => setTeamModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={onCreateTeam}
              disabled={!newTeamName.trim()}
            >
              Create team
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Input
            label="Team name"
            required
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
          />
          <Input
            label="Description"
            value={newTeamDesc}
            onChange={(e) => setNewTeamDesc(e.target.value)}
            helper="Optional. Explain what this team owns."
          />
        </div>
      </Modal>
    </AppShellSearchBridge>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border border-econet-border rounded-md bg-econet-surface/50 px-4 py-3">
      <span className="text-xs font-bold uppercase tracking-wider text-econet-grey">
        {label}
      </span>
      <span className="text-sm text-econet-ink break-words">{value}</span>
    </div>
  );
}
