import { useState } from "react";
import AppShellSearchBridge from "../components/AppShellSearchBridge";
import Card from "../components/Card";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Select from "../components/Select";
import Avatar from "../components/Avatar";
import Badge from "../components/Badge";
import IconPlus from "../icons/IconPlus";
import IconChevronRight from "../icons/IconChevronRight";
import { useApps } from "../context/AppsContext";
import { useToast } from "../context/ToastContext";
import type { TeamRole } from "../data/teams";

const ROLE_OPTIONS: TeamRole[] = ["Owner", "Admin", "Developer", "Viewer"];

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export default function Teams() {
  const { teams, createTeam, inviteMember, updateMemberRole } = useApps();
  const { showToast } = useToast();
  const [expanded, setExpanded] = useState<string | null>(teams[0]?.id || null);
  const [createOpen, setCreateOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamDesc, setNewTeamDesc] = useState("");
  const [inviteOpen, setInviteOpen] = useState<{ teamId: string } | null>(null);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<TeamRole>("Developer");
  const [inviteErr, setInviteErr] = useState<{ name?: string; email?: string }>({});

  const onCreate = () => {
    if (!newTeamName.trim()) return;
    const t = createTeam({
      name: newTeamName.trim(),
      description: newTeamDesc.trim(),
    });
    setNewTeamName("");
    setNewTeamDesc("");
    setCreateOpen(false);
    setExpanded(t.id);
    showToast({
      kind: "success",
      title: "Team created",
      body: `${t.name} is ready for members.`,
    });
  };

  const onInvite = () => {
    const errs: typeof inviteErr = {};
    if (!inviteName.trim()) errs.name = "Name is required.";
    if (!inviteEmail) errs.email = "Email is required.";
    else if (!isEmail(inviteEmail)) errs.email = "Enter a valid email.";
    setInviteErr(errs);
    if (Object.keys(errs).length > 0 || !inviteOpen) return;
    inviteMember(inviteOpen.teamId, inviteName.trim(), inviteEmail, inviteRole);
    setInviteName("");
    setInviteEmail("");
    setInviteRole("Developer");
    setInviteErr({});
    setInviteOpen(null);
    showToast({
      kind: "success",
      title: "Invite sent",
      body: `${inviteName.trim()} will receive an email shortly.`,
    });
  };

  return (
    <AppShellSearchBridge>
      <div className="flex flex-col gap-6">
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-econet-grey">
              Manage
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-econet-ink">
              My teams
            </h1>
            <p className="text-sm text-econet-grey mt-1 max-w-2xl">
              Group your developers, control access to apps and manage roles in
              one place.
            </p>
          </div>
          <Button
            variant="primary"
            iconLeft={<IconPlus size={18} />}
            onClick={() => setCreateOpen(true)}
          >
            Create team
          </Button>
        </header>

        <div className="flex flex-col gap-4">
          {teams.map((team) => {
            const open = expanded === team.id;
            return (
              <Card key={team.id} padded={false} className="overflow-hidden">
                <button
                  type="button"
                  onClick={() => setExpanded(open ? null : team.id)}
                  aria-expanded={open}
                  className="w-full flex items-start justify-between gap-4 p-5 text-left hover:bg-econet-surface/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30 focus-visible:ring-inset"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-econet-ink">
                        {team.name}
                      </h2>
                      <Badge variant="soft">{team.members.length} members</Badge>
                    </div>
                    <p className="text-sm text-econet-grey mt-1">
                      {team.description}
                    </p>
                  </div>
                  <IconChevronRight
                    size={20}
                    className={
                      "text-econet-grey transition-transform duration-200 " +
                      (open ? "rotate-90" : "")
                    }
                    aria-hidden="true"
                  />
                </button>
                {open ? (
                  <div className="border-t border-econet-border p-5 bg-econet-surface/30">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                      <p className="text-sm font-bold text-econet-ink">
                        Members
                      </p>
                      <Button
                        variant="secondary"
                        size="sm"
                        iconLeft={<IconPlus size={16} />}
                        onClick={() => setInviteOpen({ teamId: team.id })}
                      >
                        Invite member
                      </Button>
                    </div>
                    <ul className="flex flex-col gap-2">
                      {team.members.length === 0 ? (
                        <li className="text-sm text-econet-grey p-4 bg-white border border-econet-border rounded-md">
                          No members yet. Invite someone to get started.
                        </li>
                      ) : (
                        team.members.map((m) => (
                          <li
                            key={m.id}
                            className="flex items-center justify-between gap-3 bg-white border border-econet-border rounded-md p-3"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <Avatar name={m.name} size="sm" />
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-econet-ink truncate">
                                  {m.name}
                                </p>
                                <p className="text-xs text-econet-grey truncate">
                                  {m.email}
                                </p>
                              </div>
                            </div>
                            <div className="w-40">
                              <Select
                                label="Role"
                                hideLabel
                                value={m.role}
                                onChange={(e) =>
                                  updateMemberRole(
                                    team.id,
                                    m.id,
                                    e.target.value as TeamRole
                                  )
                                }
                                options={ROLE_OPTIONS.map((r) => ({
                                  value: r,
                                  label: r,
                                }))}
                              />
                            </div>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                ) : null}
              </Card>
            );
          })}
        </div>
      </div>

      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create a new team"
        description="Group developers to share access to apps."
        footer={
          <>
            <Button variant="ghost" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={onCreate}
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
          />
        </div>
      </Modal>

      <Modal
        open={inviteOpen !== null}
        onClose={() => setInviteOpen(null)}
        title="Invite a team member"
        description="They will get an email with sign-in instructions."
        footer={
          <>
            <Button variant="ghost" onClick={() => setInviteOpen(null)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={onInvite}>
              Send invite
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Input
            label="Full name"
            required
            value={inviteName}
            onChange={(e) => setInviteName(e.target.value)}
            error={inviteErr.name}
          />
          <Input
            label="Email"
            type="email"
            required
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            error={inviteErr.email}
          />
          <Select
            label="Role"
            value={inviteRole}
            onChange={(e) => setInviteRole(e.target.value as TeamRole)}
            options={ROLE_OPTIONS.map((r) => ({ value: r, label: r }))}
          />
        </div>
      </Modal>
    </AppShellSearchBridge>
  );
}
