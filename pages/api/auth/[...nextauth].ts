import GoogleProvider from "next-auth/providers/google";
import {
  ThirdwebAuthProvider,
  authSession,
} from "@thirdweb-dev/auth/next-auth";
import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";
import NextAuth from "next-auth";

export default NextAuth({
  providers: [
    ThirdwebAuthProvider({
      domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "",
      wallet: new PrivateKeyWallet(process.env.THIRDWEB_AUTH_PRIVATE_KEY || ""),
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
