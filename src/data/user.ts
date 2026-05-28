export type UserRole = "developer" | "admin";

export type CurrentUser = {
  name: string;
  email: string;
  contact: string;
  organisation: string;
  role: UserRole;
};

export const defaultUser: CurrentUser = {
  name: "Tariro Chikomba",
  email: "tariro@pindulapay.co.zw",
  contact: "+263 77 412 9034",
  organisation: "Pindula Pay (Pvt) Ltd",
  role: "developer",
};
