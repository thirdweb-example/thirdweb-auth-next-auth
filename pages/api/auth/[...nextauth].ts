import GoogleProvider from "next-auth/providers/google";
import {
  ThirdwebAuthProvider,
  authSession,
} from "@thirdweb-dev/auth/next-auth";
import NextAuth from "next-auth";

export default NextAuth({
  providers: [
    ThirdwebAuthProvider({
      domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    session: authSession,
  },
});
