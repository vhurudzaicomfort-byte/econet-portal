import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        econet: {
          navy: "#001B8D",
          "navy-700": "#0026B8",
          "navy-deep": "#001670",
          "navy-soft": "#1A2A80",
          red: "#E2231A",
          "red-600": "#C41A12",
          "red-deep": "#C41A12",
          ink: "#0A0E1F",
          grey: "#4A5266",
          surface: "#F6F8FC",
          border: "#D7DCE5",
          white: "#FFFFFF",
          success: "#1FA463",
          warning: "#F0A020",
          info: "#2E5BFF",
          error: "#E2231A",
          orange: "#F2682A",
          purple: "#812755",
          "dark-bg": "#0B1233",
          "dark-surface": "#11183D",
          "dark-border": "#1F285A",
          "dark-text": "#F6F8FC",
        },
        digital: {
          blue: "#2E5BFF",
        },
        slate: {
          100: "#EDF0F5",
          200: "#D7DCE5",
          400: "#8A93A6",
          600: "#4A5266",
          800: "#1E2433",
        },
        accent: {
          cyan: "#13C2D6",
          violet: "#6C4BF5",
          teal: "#00A88F",
          amber: "#FFB020",
          magenta: "#FF4D8D",
        },
      },
      fontFamily: {
        sans: [
          "Manrope",
          "Helvetica Neue",
          "Arial",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: [
          "Sora",
          "Helvetica Neue",
          "Arial",
          "system-ui",
          "sans-serif",
        ],
        body: [
          "Manrope",
          "Helvetica Neue",
          "Arial",
          "system-ui",
          "sans-serif",
        ],
      },
      fontSize: {
        eyebrow: ["13px", { lineHeight: "1.4", letterSpacing: "1px" }],
        caption: ["13px", { lineHeight: "1.5" }],
        body: ["15px", { lineHeight: "1.6" }],
        "body-lg": ["17px", { lineHeight: "1.6" }],
        subheading: ["20px", { lineHeight: "1.3" }],
        heading: ["24px", { lineHeight: "1.2" }],
        "heading-lg": ["32px", { lineHeight: "1.2" }],
        "display-2": ["40px", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-1": ["56px", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-1-lg": ["72px", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
      },
      borderRadius: {
        sm: "8px",
        md: "14px",
        lg: "22px",
        xl: "22px",
        "2xl": "28px",
        pill: "999px",
      },
      boxShadow: {
        sm: "0 1px 3px rgba(10,14,31,0.06)",
        md: "0 6px 16px rgba(10,14,31,0.08)",
        lg: "0 18px 48px rgba(0,27,141,0.14)",
        soft: "0 1px 3px rgba(10,14,31,0.06)",
        elev: "0 6px 16px rgba(10,14,31,0.08)",
        lift: "0 18px 48px rgba(0,27,141,0.14)",
        focus: "0 0 0 4px rgba(46,91,255,0.14)",
      },
      transitionTimingFunction: {
        econet: "cubic-bezier(0.2, 0.7, 0.2, 1)",
      },
      transitionDuration: {
        micro: "150ms",
        card: "220ms",
        page: "320ms",
      },
      spacing: {
        "4.5": "18px",
      },
      maxWidth: {
        prose: "72ch",
        content: "1180px",
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
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        pulse: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 220ms cubic-bezier(0.2, 0.7, 0.2, 1)",
        "slide-up": "slide-up 220ms cubic-bezier(0.2, 0.7, 0.2, 1)",
        "slide-in-right": "slide-in-right 220ms cubic-bezier(0.2, 0.7, 0.2, 1)",
        spin: "spin 0.8s linear infinite",
        shimmer: "shimmer 1.4s ease infinite linear",
        "pulse-slow": "pulse 2.4s cubic-bezier(0.2, 0.7, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
