import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        econet: {
          navy: "#001E96",
          "navy-deep": "#001670",
          "navy-soft": "#1A2A80",
          red: "#E2231A",
          "red-deep": "#B81A12",
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
        },
      },
      fontFamily: {
        sans: [
          "Helvetica Neue",
          "Arial",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0, 30, 150, 0.04), 0 1px 3px rgba(0, 30, 150, 0.06)",
        elev: "0 4px 12px rgba(0, 30, 150, 0.08), 0 2px 4px rgba(0, 30, 150, 0.06)",
        lift: "0 12px 32px rgba(0, 30, 150, 0.12), 0 4px 8px rgba(0, 30, 150, 0.08)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-in": "fade-in 200ms ease-out",
        "slide-up": "slide-up 200ms ease-out",
        "slide-in-right": "slide-in-right 220ms ease-out",
        spin: "spin 0.8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
