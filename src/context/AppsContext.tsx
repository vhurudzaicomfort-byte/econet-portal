import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { initialApps, type AppRecord, type AppStatus } from "../data/apps";
import { initialTeams, type Team, type TeamMember, type TeamRole } from "../data/teams";
import {
  initialNotifications,
  type NotificationItem,
} from "../data/notifications";
import { initialSubmissions, type Submission } from "../data/submissions";

export type DemoState = "Populated" | "Empty";

type AppsContextValue = {
  apps: AppRecord[];
  teams: Team[];
  notifications: NotificationItem[];
  submissions: Submission[];
  demoState: DemoState;
  setDemoState: (s: DemoState) => void;
  visibleApps: AppRecord[];
  createApp: (input: NewAppInput) => AppRecord;
  updateApp: (id: string, patch: Partial<AppRecord>) => void;
  deleteApp: (id: string) => void;
  rotateSecret: (id: string) => void;
  subscribeProduct: (appId: string, productSlug: string) => void;
  setEnvironment: (appId: string, env: "Sandbox" | "Production") => void;
  promoteApp: (appId: string) => void;
  approveSubmission: (id: string) => void;
  rejectSubmission: (id: string) => void;
  createTeam: (input: { name: string; description: string }) => Team;
  inviteMember: (teamId: string, name: string, email: string, role: TeamRole) => void;
  updateMemberRole: (teamId: string, memberId: string, role: TeamRole) => void;
  markAllNotificationsRead: () => void;
  markNotificationRead: (id: string) => void;
};

export type NewAppInput = {
  name: string;
  partner: string;
  contact: string;
  description: string;
  channels: string[];
  callbackUrl: string;
  teamId: string;
};

const AppsContext = createContext<AppsContextValue | null>(null);

function genId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}`;
}

function genSecret(prefix: string) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = `${prefix}_`;
  for (let i = 0; i < 30; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

export function AppsProvider({ children }: { children: ReactNode }) {
  const [apps, setApps] = useState<AppRecord[]>(initialApps);
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    initialNotifications
  );
  const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);
  const [demoState, setDemoState] = useState<DemoState>("Populated");

  const visibleApps = useMemo(
    () => (demoState === "Empty" ? [] : apps),
    [demoState, apps]
  );

  const createApp = useCallback((input: NewAppInput): AppRecord => {
    const id = genId("app");
    const now = new Date().toISOString();
    const record: AppRecord = {
      id,
      name: input.name,
      partner: input.partner,
      contact: input.contact,
      description: input.description,
      channels: input.channels,
      callbackUrl: input.callbackUrl,
      teamId: input.teamId,
      status: "In Review" as AppStatus,
      environment: "Sandbox",
      subscribedProductSlugs: [],
      clientId: genSecret("ec_sand"),
      clientSecret: genSecret("ecsec_sand_demo"),
      webhookSecret: genSecret("ecwh_sand_demo"),
      createdAt: now,
      updatedAt: now,
      promotion: [
        { status: "Draft", date: now },
        { status: "Submitted", date: now },
        { status: "In Review", date: now, note: "Awaiting reviewer assignment." },
      ],
    };
    setApps((prev) => [record, ...prev]);
    setSubmissions((prev) => [
      {
        id: genId("sub"),
        appName: input.name,
        partner: input.partner,
        submittedOn: now,
        channels: input.channels,
        contact: input.contact,
        description: input.description,
        status: "Pending",
      },
      ...prev,
    ]);
    return record;
  }, []);

  const updateApp = useCallback((id: string, patch: Partial<AppRecord>) => {
    setApps((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, ...patch, updatedAt: new Date().toISOString() }
          : a
      )
    );
  }, []);

  const deleteApp = useCallback((id: string) => {
    setApps((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const rotateSecret = useCallback((id: string) => {
    setApps((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              clientSecret: genSecret(
                a.environment === "Production" ? "ecsec_live" : "ecsec_sand"
              ),
              updatedAt: new Date().toISOString(),
            }
          : a
      )
    );
  }, []);

  const subscribeProduct = useCallback(
    (appId: string, productSlug: string) => {
      setApps((prev) =>
        prev.map((a) =>
          a.id === appId
            ? {
                ...a,
                subscribedProductSlugs: a.subscribedProductSlugs.includes(
                  productSlug
                )
                  ? a.subscribedProductSlugs
                  : [...a.subscribedProductSlugs, productSlug],
                updatedAt: new Date().toISOString(),
              }
            : a
        )
      );
    },
    []
  );

  const setEnvironment = useCallback(
    (appId: string, env: "Sandbox" | "Production") => {
      setApps((prev) =>
        prev.map((a) =>
          a.id === appId
            ? { ...a, environment: env, updatedAt: new Date().toISOString() }
            : a
        )
      );
    },
    []
  );

  const promoteApp = useCallback((appId: string) => {
    setApps((prev) =>
      prev.map((a) => {
        if (a.id !== appId) return a;
        const now = new Date().toISOString();
        return {
          ...a,
          status: "In Review",
          promotion: [
            ...a.promotion,
            { status: "Submitted", date: now },
            {
              status: "In Review",
              date: now,
              note: "Promotion request submitted.",
            },
          ],
          updatedAt: now,
        };
      })
    );
  }, []);

  const approveSubmission = useCallback((id: string) => {
    const sub = submissions.find((s) => s.id === id);
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "Approved" } : s))
    );
    if (sub) {
      setApps((prev) =>
        prev.map((a) => {
          if (a.name !== sub.appName) return a;
          const now = new Date().toISOString();
          return {
            ...a,
            status: "Approved" as AppStatus,
            promotion: [...a.promotion, { status: "Approved", date: now }],
            updatedAt: now,
          };
        })
      );
    }
  }, [submissions]);

  const rejectSubmission = useCallback((id: string) => {
    const sub = submissions.find((s) => s.id === id);
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "Rejected" } : s))
    );
    if (sub) {
      setApps((prev) =>
        prev.map((a) => {
          if (a.name !== sub.appName) return a;
          const now = new Date().toISOString();
          return {
            ...a,
            status: "Rejected" as AppStatus,
            promotion: [
              ...a.promotion,
              {
                status: "Rejected",
                date: now,
                note: "Application did not pass review.",
              },
            ],
            updatedAt: now,
          };
        })
      );
    }
  }, [submissions]);

  const createTeam = useCallback(
    (input: { name: string; description: string }): Team => {
      const team: Team = {
        id: genId("team"),
        name: input.name,
        description: input.description,
        createdAt: new Date().toISOString(),
        members: [],
      };
      setTeams((prev) => [...prev, team]);
      return team;
    },
    []
  );

  const inviteMember = useCallback(
    (teamId: string, name: string, email: string, role: TeamRole) => {
      const member: TeamMember = {
        id: genId("mem"),
        name,
        email,
        role,
      };
      setTeams((prev) =>
        prev.map((t) =>
          t.id === teamId ? { ...t, members: [...t.members, member] } : t
        )
      );
    },
    []
  );

  const updateMemberRole = useCallback(
    (teamId: string, memberId: string, role: TeamRole) => {
      setTeams((prev) =>
        prev.map((t) =>
          t.id === teamId
            ? {
                ...t,
                members: t.members.map((m) =>
                  m.id === memberId ? { ...m, role } : m
                ),
              }
            : t
        )
      );
    },
    []
  );

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const value: AppsContextValue = {
    apps,
    teams,
    notifications,
    submissions,
    demoState,
    setDemoState,
    visibleApps,
    createApp,
    updateApp,
    deleteApp,
    rotateSecret,
    subscribeProduct,
    setEnvironment,
    promoteApp,
    approveSubmission,
    rejectSubmission,
    createTeam,
    inviteMember,
    updateMemberRole,
    markAllNotificationsRead,
    markNotificationRead,
  };

  return <AppsContext.Provider value={value}>{children}</AppsContext.Provider>;
}

export function useApps(): AppsContextValue {
  const ctx = useContext(AppsContext);
  if (!ctx) throw new Error("useApps must be used inside AppsProvider");
  return ctx;
}
