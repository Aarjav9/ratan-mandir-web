import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/context/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FBF6EA",
        ivoryDeep: "#F5EBD8",
        card: "#FFFDF7",
        maroon: "#7A1620",
        maroonDeep: "#5C0F17",
        saffron: "#E08A2C",
        saffronDeep: "#C56A16",
        gold: "#C9A24B",
        ink: "#3B2A20",
        inkSoft: "#6B5744",
        line: "#E8DCC4",
      },
      fontFamily: {
        marcellus: ["var(--font-marcellus)", "Georgia", "serif"],
        yatra: ["var(--font-yatra)", "cursive"],
        mulish: ["var(--font-mulish)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "8px",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(92, 15, 23, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
