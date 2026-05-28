import { useEffect, useState } from "react";
import AppShellSearchBridge from "../components/AppShellSearchBridge";
import Card from "../components/Card";
import Input from "../components/Input";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import Badge from "../components/Badge";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    contact: user?.contact || "",
    organisation: user?.organisation || "",
  });

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
    updateProfile({
      name: form.name,
      email: form.email,
      contact: form.contact,
      organisation: form.organisation,
    });
    showToast({
      kind: "success",
      title: "Profile updated",
      body: "Your changes have been saved.",
    });
  };

  return (
    <AppShellSearchBridge>
      <div className="flex flex-col gap-6 max-w-3xl">
        <header>
          <p className="text-xs font-bold uppercase tracking-wider text-econet-grey">
            Manage
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-econet-ink">
            My profile
          </h1>
          <p className="text-sm text-econet-grey mt-1">
            Update how Econet contacts you about your applications.
          </p>
        </header>

        <Card>
          <div className="flex items-center gap-4 pb-4 border-b border-econet-border">
            <Avatar name={form.name || "Developer"} size="lg" />
            <div>
              <p className="text-lg font-bold text-econet-ink">
                {form.name || "Developer"}
              </p>
              <p className="text-sm text-econet-grey">{form.email}</p>
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
            />
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
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
            />
          </div>

          <div className="mt-6">
            <Button variant="primary" onClick={onSave}>
              Save changes
            </Button>
          </div>
        </Card>
      </div>
    </AppShellSearchBridge>
  );
}
