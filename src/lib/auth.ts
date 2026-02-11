import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "./db";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  rateLimit: {
    enabled: false,
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "placeholder",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "placeholder",
    },
    gitlab: {
      clientId: process.env.GITLAB_CLIENT_ID || "placeholder",
      clientSecret: process.env.GITLAB_CLIENT_SECRET || "placeholder",
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "placeholder",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "placeholder",
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["github", "gitlab"],
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "PARTICIPANT",
      },
      onboarded: {
        type: "boolean",
        required: false,
        defaultValue: false,
      },
      bio: { type: "string", required: false },
      github: { type: "string", required: false },
      skills: { type: "string", required: false },
      phone: { type: "string", required: false },
      city: { type: "string", required: false },
      country: { type: "string", required: false },
      status: { type: "string", required: false },
      schoolOrCompany: { type: "string", required: false },
      portfolio: { type: "string", required: false },
      trackInterest: { type: "string", required: false },
      tshirtSize: { type: "string", required: false },
      dietaryRestrictions: { type: "string", required: false },
      motivation: { type: "string", required: false },
      hasTeam: { type: "boolean", required: false },
      agreeToRules: { type: "boolean", required: false },
    },
  },
  advanced: {
    // Better Auth uses BETTER_AUTH_URL from .env to handle origins.
  }
});
