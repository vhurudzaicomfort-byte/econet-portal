import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import EconetLogo from "../components/EconetLogo";
import StarBurstBackground from "../components/StarBurstBackground";
import Tabs from "../components/Tabs";
import Input from "../components/Input";
import Button from "../components/Button";
import IconArrowRight from "../icons/IconArrowRight";
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
  const onAuthed = () => navigate("/dashboard");

  return (
    <div className="min-h-screen relative bg-white dark:bg-econet-dark-bg overflow-hidden text-econet-ink dark:text-white transition-colors">
      <StarBurstBackground
        className="pointer-events-none absolute inset-0 h-full w-full"
        opacity={0.08}
      />
      <header className="relative z-10 flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-10 py-4 lg:py-5 border-b border-transparent">
        <div className="flex items-center gap-3 min-w-0">
          <EconetLogo size={150} />
          <span
            aria-hidden="true"
            className="hidden md:inline-block h-8 w-px bg-econet-border dark:bg-econet-dark-border"
          />
          <h1 className="hidden md:flex flex-col leading-tight min-w-0">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-econet-grey dark:text-white/60">
              Developer Platform
            </span>
            <span className="text-base lg:text-lg font-extrabold text-econet-navy dark:text-white truncate">
              Onboarding Automation Portal
            </span>
          </h1>
        </div>
        <nav className="hidden md:flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="text-sm font-semibold text-econet-ink dark:text-white px-3 h-10 rounded-md hover:bg-econet-surface dark:hover:bg-econet-dark-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30 transition-colors"
          >
            Browse products
          </button>
          <button
            type="button"
            onClick={() => navigate("/docs")}
            className="text-sm font-semibold text-econet-ink dark:text-white px-3 h-10 rounded-md hover:bg-econet-surface dark:hover:bg-econet-dark-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30 transition-colors"
          >
            Documentation
          </button>
          <button
            type="button"
            onClick={() => navigate("/support")}
            className="text-sm font-semibold text-econet-ink dark:text-white px-3 h-10 rounded-md hover:bg-econet-surface dark:hover:bg-econet-dark-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30 transition-colors"
          >
            Support
          </button>
        </nav>
      </header>

      <div className="md:hidden relative z-10 px-4 pb-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-econet-grey dark:text-white/60">
          Developer Platform
        </p>
        <p className="text-base font-extrabold text-econet-navy dark:text-white">
          Onboarding Automation Portal
        </p>
      </div>

      <section className="relative z-10 grid gap-10 lg:grid-cols-2 px-4 sm:px-6 lg:px-10 pt-6 pb-16 lg:pb-24 max-w-screen-2xl mx-auto items-start">
        <div className="flex flex-col gap-6 max-w-xl">
          <p className="text-sm font-semibold tracking-wide text-econet-red uppercase">
            Inspired to change your world
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-econet-navy dark:text-white leading-tight tracking-tight">
            Build on Econet.
          </h2>
          <p className="text-base sm:text-lg leading-7 text-econet-ink dark:text-white/85">
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

        </div>

        <div id="auth-card" className="relative">
          <div className="relative bg-white dark:bg-econet-dark-surface border border-econet-border dark:border-econet-dark-border rounded-xl shadow-lift p-6 sm:p-8">
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

      <footer className="relative z-10 border-t border-econet-border dark:border-econet-dark-border bg-white dark:bg-econet-dark-bg">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-econet-grey dark:text-white/60">
          <p>
            Econet Wireless Zimbabwe. Sandbox preview for partner onboarding.
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => navigate("/privacy")}
              className="px-2 h-8 rounded font-semibold text-econet-ink dark:text-white hover:bg-econet-surface dark:hover:bg-econet-dark-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30 transition-colors"
            >
              Privacy
            </button>
            <button
              type="button"
              onClick={() => navigate("/terms")}
              className="px-2 h-8 rounded font-semibold text-econet-ink dark:text-white hover:bg-econet-surface dark:hover:bg-econet-dark-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30 transition-colors"
            >
              Terms
            </button>
            <button
              type="button"
              onClick={() => navigate("/support")}
              className="px-2 h-8 rounded font-semibold text-econet-ink dark:text-white hover:bg-econet-surface dark:hover:bg-econet-dark-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30 transition-colors"
            >
              Support
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
