import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#22d3ee",
        secondary: "#c026d3",
        accent: "#f472b6",
        background: "#05010d",
      },
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
        mono: ["var(--font-jet)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
