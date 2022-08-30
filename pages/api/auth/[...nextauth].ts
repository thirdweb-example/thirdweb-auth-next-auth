import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextApiRequest, NextApiResponse } from "next";
import { ThirdwebAuth } from "@thirdweb-dev/auth/next-auth";

const { ThirdwebProvider, authOptions } = ThirdwebAuth({
  privateKey: process.env.THIRDWEB_AUTH_PRIVATE_KEY || "",
  domain: "thirdweb.com",
})

export const getNextAuthConfig = (req: NextApiRequest, res: NextApiResponse) => {
  const config: NextAuthOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      }),
      ThirdwebProvider(req, res),
    ],
    ...authOptions(req, res)
  }

  return config;
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, getNextAuthConfig(req, res))
}

export default handler;