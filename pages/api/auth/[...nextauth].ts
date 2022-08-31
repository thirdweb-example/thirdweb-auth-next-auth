import GoogleProvider from "next-auth/providers/google";
import { ThirdwebNextAuth } from "@thirdweb-dev/auth/next-auth";

export const { NextAuthHandler, getUser } = ThirdwebNextAuth({
  privateKey: process.env.ADMIN_PRIVATE_KEY || "",
  domain: "localhost:3000",
  nextOptions: {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      }),
    ]
  }
})

export default NextAuthHandler();
