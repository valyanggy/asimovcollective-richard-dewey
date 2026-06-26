import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      mono: ["var(--font-mono)"],
    },
    extend: {
      colors: {
        canvas: "rgb(var(--canvas) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        panel: "rgb(var(--panel) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
      },
      height: {
        // Tailwind accepts CSS fallback arrays at runtime, but its Config type
        // still expects a single string here.
        // @ts-expect-error viewport fallback tuple
        screen: ["100vh", "calc(var(--vh) * 100)"],
        // @ts-expect-error viewport fallback tuple
        "screen-svh": ["100svh", "calc(var(--svh) * 100)"],
      },
      minHeight: {
        // @ts-expect-error viewport fallback tuple
        screen: ["100vh", "calc(var(--vh) * 100)"],
        // @ts-expect-error viewport fallback tuple
        "screen-svh": ["100svh", "calc(var(--svh) * 100)"],
      },
      letterSpacing: {
        none: "0",
      },
      lineHeight: {
        none: "1",
      },
      borderRadius: {
        ui: "6px",
      },
      padding: {
        section: "var(--px-section)",
      },
      margin: {
        section: "var(--px-section)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
