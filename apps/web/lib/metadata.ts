import type { Metadata } from "next/types";
import { getBaseUrl, baseUrl } from "./url";

export function createMetadata(override: Metadata): Metadata {
  const siteUrl = getBaseUrl();

  return {
    ...override,
    authors: [
      {
        name: "Waqas Ishaque",
        url: siteUrl,
      },
    ],
    creator: "Waqas Ishaque",
    openGraph: {
      title: override.title ?? "Waqas Ishaque — Full Stack Developer & Security Enthusiast",
      description: override.description ?? "Full stack software developer passionate about web development, software engineering, and the latest technologies.",
      url: siteUrl,
      siteName: "Waqas Ishaque",
      type: "website",
      locale: "en_US",
      ...override.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      site: "@w4qa5",
      creator: "@w4qa5",
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      ...override.twitter,
    },
    alternates: {
      canonical: "/",
      types: {
        "application/rss+xml": "/api/rss.xml",
      },
      ...override.alternates,
    },
    icons: {
      icon: [
        {
          media: "(prefers-color-scheme: light)",
          url: "/assets/light-logo.svg",
          href: "/assets/light-logo.svg",
        },
        {
          media: "(prefers-color-scheme: dark)",
          url: "/assets/dark-logo.svg",
          href: "/assets/dark-logo.svg",
        },
      ],
    },
  };
}

export { baseUrl };

