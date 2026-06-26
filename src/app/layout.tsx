import "@/styles/globals.css";

import type { Viewport } from "next";
import localFont from "next/font/local";
import { ReactNode } from "react";

import { siteConfig } from "@/lib/metadata";

import { RealViewport } from "./real-viewport";

const suisseMono = localFont({
  src: [
    {
      path: "./fonts/suisse-intl-mono-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/suisse-intl-mono-bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-mono",
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: `%s | ${siteConfig.name}`,
    default: siteConfig.name,
  },
  description: siteConfig.description,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f4ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0e100f" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={suisseMono.variable}>
      <body className="font-mono">
        {children}
        <RealViewport />
      </body>
    </html>
  );
}
