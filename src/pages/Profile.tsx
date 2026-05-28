import { useEffect, useState } from "react";
import AppShellSearchBridge from "../components/AppShellSearchBridge";
import Card from "../components/Card";
import Input from "../components/Input";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Breadcrumb from "../components/Breadcrumb";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useOnboarding } from "../context/OnboardingContext";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();
  const { state: onboardingState, markComplete } = useOnboarding();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    contact: user?.contact || "",
    organisation: user?.organisation || "",
  });
  const [errors, setErrors] = useState<{ organisation?: string; email?: string; name?: string }>({});

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        contact: user.contact,
        organisation: user.organisation,
      });
    }
  }, [user]);

  const onSave = () => {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Full name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    if (!form.organisation.trim()) next.organisation = "Organisation name is required to unlock the portal.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      showToast({
        kind: "error",
        title: "Some fields are missing",
        body: "Fill the highlighted fields and try again.",
      });
      return;
    }

    updateProfile({
      name: form.name,
      email: form.email,
      contact: form.contact,
      organisation: form.organisation,
    });

    const wasOrgIncomplete = !onboardingState.organization;
    if (wasOrgIncomplete) {
      markComplete("organization", true);
      showToast({
        kind: "success",
        title: "Organization saved · portal unlocked",
        body: "Sandbox, apps, analytics and admin tools are now available.",
      });
    } else {
      showToast({
        kind: "success",
        title: "Profile updated",
        body: "Your changes have been saved.",
      });
    }
  };

  return (
    <AppShellSearchBridge>
      <div className="flex flex-col gap-6 max-w-3xl">
        <Breadcrumb items={[{ label: "Dashboard", to: "/dashboard" }, { label: "Profile" }]} />
        <header>
          <p className="text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60">
            Manage
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-econet-ink dark:text-white">
            My profile
          </h1>
          <p className="text-sm text-econet-grey dark:text-white/70 mt-1">
            Update how Econet contacts you about your applications.
          </p>
        </header>

        {!onboardingState.organization ? (
          <Card className="border-econet-navy/30 bg-econet-navy/5 dark:bg-white/5">
            <h2 className="text-econet-ink dark:text-white">Create your organization to unlock the portal</h2>
            <p className="text-sm text-econet-grey dark:text-white/75 mt-2 leading-7">
              The Econet Onboarding Automation Portal is gated on a verified organisation. Fill the
              Organisation field below and save — once saved, your dashboard, sandbox, apps,
              analytics, billing and admin tools are unlocked.
            </p>
          </Card>
        ) : null}

        <Card>
          <div className="flex items-center gap-4 pb-4 border-b border-econet-border dark:border-econet-dark-border">
            <Avatar name={form.name || "Developer"} size="lg" />
            <div>
              <p className="text-lg font-bold text-econet-ink dark:text-white">
                {form.name || "Developer"}
              </p>
              <p className="text-sm text-econet-grey dark:text-white/70">{form.email}</p>
              <div className="mt-2">
                <Badge variant="soft">
                  {user?.role === "admin" ? "Admin role" : "Developer role"}
                </Badge>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Input
              label="Full name"
              value={form.name}
              onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
              error={errors.name}
              required
            />
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
              error={errors.email}
              required
            />
            <Input
              label="Contact"
              value={form.contact}
              onChange={(e) => setForm((s) => ({ ...s, contact: e.target.value }))}
              helper="Used for high-severity alerts."
            />
            <Input
              label="Organisation"
              value={form.organisation}
              onChange={(e) =>
                setForm((s) => ({ ...s, organisation: e.target.value }))
              }
              error={errors.organisation}
              helper={
                !onboardingState.organization
                  ? "Required to unlock the rest of the portal."
                  : undefined
              }
              required
            />
          </div>

          <div className="mt-6">
            <Button variant="primary" onClick={onSave}>
              {!onboardingState.organization ? "Save and unlock portal" : "Save changes"}
            </Button>
          </div>
        </Card>
      </div>
    </AppShellSearchBridge>
  );
}
