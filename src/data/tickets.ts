export type TicketStatus = "Open" | "Awaiting Response" | "Resolved" | "Closed";
export type TicketCategory = "Authentication" | "Billing" | "Webhook" | "Integration" | "Compliance" | "Other";
export type TicketPriority = "Low" | "Normal" | "High" | "Urgent";

export type TicketMessage = {
  id: string;
  author: string;
  authorRole: "you" | "support";
  timestamp: string;
  body: string;
};

export type Ticket = {
  id: string;
  ref: string;
  subject: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  messages: TicketMessage[];
};

export const initialTickets: Ticket[] = [
  {
    id: "t1",
    ref: "ECN-23488",
    subject: "Production EcoCash callbacks delayed",
    category: "Webhook",
    priority: "High",
    status: "Awaiting Response",
    createdAt: "2026-05-26T08:30:00Z",
    updatedAt: "2026-05-26T14:12:00Z",
    messages: [
      { id: "m1", author: "Tariro Chikomba", authorRole: "you", timestamp: "2026-05-26T08:30:00Z", body: "We are seeing 30 second delays on payment.success callbacks since 08:00 today." },
      { id: "m2", author: "Econet Support", authorRole: "support", timestamp: "2026-05-26T09:15:00Z", body: "Thanks for the report. We are looking into the webhook dispatcher queue." },
      { id: "m3", author: "Econet Support", authorRole: "support", timestamp: "2026-05-26T14:12:00Z", body: "Could you share two recent transaction IDs so we can trace them?" },
    ],
  },
  {
    id: "t2",
    ref: "ECN-23501",
    subject: "Cannot rotate sandbox client secret",
    category: "Authentication",
    priority: "Normal",
    status: "Resolved",
    createdAt: "2026-05-22T11:00:00Z",
    updatedAt: "2026-05-23T09:42:00Z",
    messages: [
      { id: "m1", author: "Tariro Chikomba", authorRole: "you", timestamp: "2026-05-22T11:00:00Z", body: "Rotate secret returns 502." },
      { id: "m2", author: "Econet Support", authorRole: "support", timestamp: "2026-05-23T09:42:00Z", body: "Fixed in a hotfix deployed at 09:30 this morning. Please retry." },
    ],
  },
  {
    id: "t3",
    ref: "ECN-23478",
    subject: "Question about Growth tier pricing",
    category: "Billing",
    priority: "Low",
    status: "Open",
    createdAt: "2026-05-27T07:14:00Z",
    updatedAt: "2026-05-27T07:14:00Z",
    messages: [
      { id: "m1", author: "Tariro Chikomba", authorRole: "you", timestamp: "2026-05-27T07:14:00Z", body: "Does Growth tier include the SIM Swap Check API at no extra cost?" },
    ],
  },
  {
    id: "t4",
    ref: "ECN-23410",
    subject: "Need DPA template for legal review",
    category: "Compliance",
    priority: "Normal",
    status: "Resolved",
    createdAt: "2026-05-12T13:42:00Z",
    updatedAt: "2026-05-13T10:01:00Z",
    messages: [
      { id: "m1", author: "Tariro Chikomba", authorRole: "you", timestamp: "2026-05-12T13:42:00Z", body: "Please share the DPA template." },
      { id: "m2", author: "Econet Support", authorRole: "support", timestamp: "2026-05-13T10:01:00Z", body: "DPA template is attached. Let us know if you need the schedule of sub-processors." },
    ],
  },
  {
    id: "t5",
    ref: "ECN-23389",
    subject: "USSD session truncating long menus",
    category: "Integration",
    priority: "Normal",
    status: "Closed",
    createdAt: "2026-04-30T09:01:00Z",
    updatedAt: "2026-05-02T11:30:00Z",
    messages: [
      { id: "m1", author: "Tariro Chikomba", authorRole: "you", timestamp: "2026-04-30T09:01:00Z", body: "USSD menu truncates at 162 chars on Telecel handsets." },
      { id: "m2", author: "Econet Support", authorRole: "support", timestamp: "2026-05-02T11:30:00Z", body: "Telecel handsets enforce 162 char menu length. Recommended workaround documented." },
    ],
  },
  {
    id: "t6",
    ref: "ECN-23377",
    subject: "Add IP allow-list for production keys",
    category: "Authentication",
    priority: "High",
    status: "Resolved",
    createdAt: "2026-04-22T15:00:00Z",
    updatedAt: "2026-04-24T11:00:00Z",
    messages: [
      { id: "m1", author: "Tariro Chikomba", authorRole: "you", timestamp: "2026-04-22T15:00:00Z", body: "Please add 196.220.144.0/24 to our prod allow list." },
      { id: "m2", author: "Econet Support", authorRole: "support", timestamp: "2026-04-24T11:00:00Z", body: "Added. Confirmed propagation to all PoPs." },
    ],
  },
  {
    id: "t7",
    ref: "ECN-23358",
    subject: "KYC consent SMS shows wrong sender",
    category: "Integration",
    priority: "Normal",
    status: "Closed",
    createdAt: "2026-04-12T07:30:00Z",
    updatedAt: "2026-04-14T15:00:00Z",
    messages: [
      { id: "m1", author: "Tariro Chikomba", authorRole: "you", timestamp: "2026-04-12T07:30:00Z", body: "Consent SMS comes from ECN-AUTH not PINDULA." },
      { id: "m2", author: "Econet Support", authorRole: "support", timestamp: "2026-04-14T15:00:00Z", body: "Updated to use your registered sender ID. Verified end-to-end." },
    ],
  },
  {
    id: "t8",
    ref: "ECN-23341",
    subject: "Sandbox top-up does not deduct test balance",
    category: "Other",
    priority: "Low",
    status: "Closed",
    createdAt: "2026-04-04T10:14:00Z",
    updatedAt: "2026-04-05T09:00:00Z",
    messages: [
      { id: "m1", author: "Tariro Chikomba", authorRole: "you", timestamp: "2026-04-04T10:14:00Z", body: "Test balance does not deduct after sandbox airtime topup." },
      { id: "m2", author: "Econet Support", authorRole: "support", timestamp: "2026-04-05T09:00:00Z", body: "Sandbox test balance is intentionally infinite. Use the new transaction logs panel to verify call success." },
    ],
  },
];
