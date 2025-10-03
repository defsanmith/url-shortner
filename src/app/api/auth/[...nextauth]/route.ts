import { GITHUB_ID, GITHUB_SECRET } from "@/constants/environment";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";
import GitHubProvider from "next-auth/providers/github";

const prismaAdapter = PrismaAdapter(prisma) as Adapter;

const handler = NextAuth({
  adapter: prismaAdapter,
  providers: [
    GitHubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
