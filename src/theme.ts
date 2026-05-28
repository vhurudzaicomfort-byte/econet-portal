export const econetColors = {
  navy: "#001E96",
  navyDeep: "#001670",
  navySoft: "#1A2A80",
  red: "#E2231A",
  redDeep: "#B81A12",
  ink: "#000000",
  grey: "#677A81",
  surface: "#F4F6F8",
  border: "#E3E8EC",
  white: "#FFFFFF",
  success: "#4C8C40",
  warning: "#FDDD00",
  info: "#0083BF",
  orange: "#F2682A",
  purple: "#812755",
} as const;

export type EconetColor = keyof typeof econetColors;
