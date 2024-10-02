import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Resend from "next-auth/providers/resend";
import type { NextAuthConfig } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./lib/mono-client";

export const { handlers, auth, signIn } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GitHub,
    Resend({
      from: "onboarding@resend.dev",
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 43200, // 12 hours
  },
  debug: process.env.NODE_ENV === "development",
} satisfies NextAuthConfig);
