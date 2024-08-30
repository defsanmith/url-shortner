import { GITHUB_ID, GITHUB_SECRET } from "@/constants/environment";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
  ],
});

export { handler as GET, handler as POST };
