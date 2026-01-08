import type { Metadata } from "next";
import localFont from "next/font/local";
import "./styles/globals.css";
import { cn } from "@repo/shadverse/lib/utils";
import { RootProvider } from "fumadocs-ui/provider";
import { description } from "./layout.config";
import { baseUrl, createMetadata } from "@/lib/metadata";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata = createMetadata({
  title: {
    template: "%s | Waqas Ishaque",
    default: "Waqas Ishaque — Full Stack Developer & Security Enthusiast",
  },
  description: "Full stack software developer passionate about web development, software engineering, and the latest technologies. I create projects and tutorials to help developers learn and grow.",
  metadataBase: baseUrl,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
        <script
          crossOrigin="anonymous"
          src="//cdn.jsdelivr.net/npm/meta-scan@0.15.0/dist/auto.global.js"
          data-auto-enable={"false"}
        />
      </head>
      <body
        className={cn("relative flex min-h-svh flex-col overflow-x-hidden")}
      >
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <RootProvider
          search={{
            options: {
              type: "static",
              api: "/api/search",
            },
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
