import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { headers } from "next/headers";
import { db } from "@/server/db";
import { getBaseUrl } from "@/lib/url";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  baseURL: getBaseUrl(),
  trustedOrigins: [
    getBaseUrl(),
  ],
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        input: false,
        defaultValue: "user",
      },
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 7 * 24 * 60 * 60, // 7 days
    },
  },
});

export const getSession = async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
};

export type Session = typeof auth.$Infer.Session;
