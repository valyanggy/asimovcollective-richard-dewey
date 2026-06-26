import { Metadata } from "next";

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "Richard Dewey",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://richarddewey.com",
  description:
    "Richard Dewey is the founder of Revenant Partners, a venture fund focused on early-stage startups at the intersection of technology, engineering, and long-term economic transformation.",
  ogImage: "/og.png",
  keywords: [
    "Richard Dewey",
    "Revenant Partners",
    "venture capital",
    "early-stage startups",
    "technology",
    "engineering",
  ],
} as const;

interface GenerateMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
}

export function generatePageMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  path = "",
}: GenerateMetadataOptions = {}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const image = siteConfig.ogImage.startsWith("http")
    ? siteConfig.ogImage
    : `${siteConfig.url}${siteConfig.ogImage}`;

  return {
    title,
    description,
    keywords: [...siteConfig.keywords],
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
