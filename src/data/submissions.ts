export type Submission = {
  id: string;
  appName: string;
  partner: string;
  submittedOn: string;
  channels: string[];
  contact: string;
  description: string;
  status: "Pending" | "Approved" | "Rejected";
};

export const initialSubmissions: Submission[] = [
  {
    id: "sub_001",
    appName: "Zimnat Lion Claims",
    partner: "Zimnat Lion Insurance",
    submittedOn: "2026-05-23T10:11:00Z",
    channels: ["MyEcoApp", "EcoCash"],
    contact: "+263 78 414 7811",
    description: "Self-service claims disbursement to policy holders.",
    status: "Pending",
  },
  {
    id: "sub_002",
    appName: "FBC Quickbills",
    partner: "FBC Holdings",
    submittedOn: "2026-05-21T15:30:00Z",
    channels: ["USSD", "SMS"],
    contact: "+263 77 902 1190",
    description: "Bill payment menu on *143# for municipal accounts.",
    status: "Pending",
  },
  {
    id: "sub_003",
    appName: "Steward OTP Service",
    partner: "Steward Bank",
    submittedOn: "2026-05-18T13:42:00Z",
    channels: ["SMS", "Email"],
    contact: "+263 78 221 9988",
    description: "OTP delivery for digital banking customers.",
    status: "Pending",
  },
];
