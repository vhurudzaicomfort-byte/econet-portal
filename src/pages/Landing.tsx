import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import EconetLogo from "../components/EconetLogo";
import StarBurstBackground from "../components/StarBurstBackground";
import Tabs from "../components/Tabs";
import Input from "../components/Input";
import Button from "../components/Button";
import IconArrowRight from "../icons/IconArrowRight";
import IconShield from "../icons/IconShield";
import IconClock from "../icons/IconClock";
import IconCheck from "../icons/IconCheck";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function SignInForm({ onAuthed }: { onAuthed: () => void }) {
  const { signIn } = useAuth();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!email) next.email = "Email is required.";
    else if (!isEmail(email)) next.email = "Enter a valid email address.";
    if (!password) next.password = "Password is required.";
    else if (password.length < 8) next.password = "Use at least 8 characters.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    signIn(email);
    showToast({
      kind: "success",
      title: "Signed in",
      body: "Welcome to the Econet Onboarding Automation Portal.",
    });
    onAuthed();
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit} noValidate>
      <Input
        label="Work email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        helper="Demo: any email and 8+ char password works."
      />
      <Input
        label="Password"
        type="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />
      <Button type="submit" variant="primary" fullWidth iconRight={<IconArrowRight size={18} />}>
        Sign in
      </Button>
    </form>
  );
}

function RegisterForm({ onAuthed }: { onAuthed: () => void }) {
  const { signIn } = useAuth();
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    org?: string;
    password?: string;
  }>({});

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Your full name is required.";
    if (!email) next.email = "Email is required.";
    else if (!isEmail(email)) next.email = "Enter a valid email address.";
    if (!org.trim()) next.org = "Organisation is required.";
    if (!password) next.password = "Password is required.";
    else if (password.length < 8) next.password = "Use at least 8 characters.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    signIn(email);
    showToast({
      kind: "success",
      title: "Account created",
      body: "You now have access to the sandbox.",
    });
    onAuthed();
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit} noValidate>
      <Input
        label="Full name"
        autoComplete="name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
      />
      <Input
        label="Work email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />
      <Input
        label="Organisation"
        autoComplete="organization"
        required
        value={org}
        onChange={(e) => setOrg(e.target.value)}
        error={errors.org}
      />
      <Input
        label="Password"
        type="password"
        autoComplete="new-password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        helper="At least 8 characters."
      />
      <Button type="submit" variant="primary" fullWidth iconRight={<IconArrowRight size={18} />}>
        Create account
      </Button>
    </form>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const onAuthed = () => navigate("/dashboard");

  return (
    <div className="min-h-screen relative bg-white overflow-hidden">
      <StarBurstBackground
        className="pointer-events-none absolute inset-0 h-full w-full"
        opacity={0.08}
      />
      <header className="relative z-10 flex items-center justify-between px-6 lg:px-10 h-20">
        <EconetLogo size={180} />
        <nav className="hidden md:flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="text-sm font-semibold text-econet-ink px-3 h-10 rounded-md hover:bg-econet-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30"
          >
            Browse products
          </button>
          <button
            type="button"
            onClick={() =>
              showToast({
                kind: "info",
                title: "Documentation portal",
                body: "Full docs land at docs.econet.co.zw post-launch.",
              })
            }
            className="text-sm font-semibold text-econet-ink px-3 h-10 rounded-md hover:bg-econet-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30"
          >
            Documentation
          </button>
          <button
            type="button"
            onClick={() =>
              showToast({
                kind: "info",
                title: "Support",
                body: "Reach the developer support desk on developers@econet.co.zw.",
              })
            }
            className="text-sm font-semibold text-econet-ink px-3 h-10 rounded-md hover:bg-econet-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30"
          >
            Support
          </button>
        </nav>
      </header>

      <section className="relative z-10 grid gap-10 lg:grid-cols-2 px-6 lg:px-10 pt-6 pb-16 lg:pb-24 max-w-screen-2xl mx-auto items-start">
        <div className="flex flex-col gap-6 max-w-xl">
          <p className="text-sm font-semibold tracking-wide text-econet-red uppercase">
            Inspired to change your world
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-econet-navy leading-tight tracking-tight">
            Build on Econet.
          </h1>
          <p className="text-base sm:text-lg leading-7 text-econet-ink">
            Integrate USSD, SMS, EcoCash, Auth and Airtime through a single
            developer portal. Get sandbox access in minutes, ship to millions of
            Zimbabwean subscribers when you are ready.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              size="lg"
              iconRight={<IconArrowRight size={18} />}
              onClick={() => {
                const node = document.getElementById("auth-card");
                if (node) {
                  node.scrollIntoView({ behavior: "smooth", block: "center" });
                  const first = node.querySelector<HTMLInputElement>("input");
                  setTimeout(() => first?.focus(), 250);
                }
              }}
            >
              Get started
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => navigate("/products")}
            >
              Browse products
            </Button>
          </div>

          <ul className="grid sm:grid-cols-3 gap-4 mt-6">
            <li className="flex items-start gap-3 p-4 rounded-lg border border-econet-border bg-white">
              <span className="text-econet-navy mt-0.5">
                <IconShield size={20} />
              </span>
              <div>
                <p className="text-sm font-bold text-econet-ink">Bank-grade</p>
                <p className="text-xs text-econet-grey leading-5">
                  Signed webhooks, mTLS, role-based access.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3 p-4 rounded-lg border border-econet-border bg-white">
              <span className="text-econet-navy mt-0.5">
                <IconClock size={20} />
              </span>
              <div>
                <p className="text-sm font-bold text-econet-ink">Minutes to start</p>
                <p className="text-xs text-econet-grey leading-5">
                  Self-service sandbox keys with no upfront contract.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3 p-4 rounded-lg border border-econet-border bg-white">
              <span className="text-econet-navy mt-0.5">
                <IconCheck size={20} />
              </span>
              <div>
                <p className="text-sm font-bold text-econet-ink">Approvals tracked</p>
                <p className="text-xs text-econet-grey leading-5">
                  Promotion to production with a clear audit trail.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div id="auth-card" className="relative">
          <div className="relative bg-white border border-econet-border rounded-xl shadow-lift p-6 sm:p-8">
            <Tabs
              variant="pill"
              items={[
                {
                  id: "signin",
                  label: "Sign in",
                  content: <SignInForm onAuthed={onAuthed} />,
                },
                {
                  id: "register",
                  label: "Register",
                  content: <RegisterForm onAuthed={onAuthed} />,
                },
              ]}
            />
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-econet-border bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-econet-grey">
          <p>
            Econet Wireless Zimbabwe. Sandbox preview for partner onboarding.
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() =>
                showToast({
                  kind: "info",
                  title: "Privacy",
                  body: "Privacy policy is available on request from compliance@econet.co.zw.",
                })
              }
              className="px-2 h-8 rounded font-semibold text-econet-ink hover:bg-econet-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30"
            >
              Privacy
            </button>
            <button
              type="button"
              onClick={() =>
                showToast({
                  kind: "info",
                  title: "Terms",
                  body: "Sandbox terms apply during the partner onboarding period.",
                })
              }
              className="px-2 h-8 rounded font-semibold text-econet-ink hover:bg-econet-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30"
            >
              Terms
            </button>
            <button
              type="button"
              onClick={() =>
                showToast({
                  kind: "info",
                  title: "Support",
                  body: "developers@econet.co.zw responds within one business day.",
                })
              }
              className="px-2 h-8 rounded font-semibold text-econet-ink hover:bg-econet-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30"
            >
              Support
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
