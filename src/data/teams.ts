export type TeamRole = "Owner" | "Admin" | "Developer" | "Viewer";

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
};

export type Team = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  members: TeamMember[];
};

export const initialTeams: Team[] = [
  {
    id: "team_payments",
    name: "Payments Platform",
    description: "Core wallet, EcoCash and disbursement integrations.",
    createdAt: "2025-11-04T09:00:00Z",
    members: [
      {
        id: "mem_001",
        name: "Tariro Chikomba",
        email: "tariro@pindulapay.co.zw",
        role: "Owner",
      },
      {
        id: "mem_002",
        name: "Kudzai Moyo",
        email: "kudzai@pindulapay.co.zw",
        role: "Developer",
      },
      {
        id: "mem_003",
        name: "Rumbi Sibanda",
        email: "rumbi@pindulapay.co.zw",
        role: "Admin",
      },
    ],
  },
  {
    id: "team_security",
    name: "Security & Auth",
    description: "Econet ID, OTP delivery and fraud monitoring.",
    createdAt: "2025-09-18T11:30:00Z",
    members: [
      {
        id: "mem_004",
        name: "Tendai Madziva",
        email: "tendai@stewardbank.co.zw",
        role: "Owner",
      },
      {
        id: "mem_005",
        name: "Farai Nleya",
        email: "farai@stewardbank.co.zw",
        role: "Developer",
      },
    ],
  },
  {
    id: "team_care",
    name: "Customer Care",
    description: "Subscriber-facing automations and ticket workflows.",
    createdAt: "2026-02-08T13:15:00Z",
    members: [
      {
        id: "mem_006",
        name: "Nyasha Banda",
        email: "nyasha@cassava.co.zw",
        role: "Owner",
      },
      {
        id: "mem_007",
        name: "Brighton Mhako",
        email: "brighton@cassava.co.zw",
        role: "Viewer",
      },
    ],
  },
];
