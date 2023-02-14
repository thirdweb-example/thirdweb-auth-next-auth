import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: "Not authorized." });
    return;
  }

  return res.status(200).json({
    message: `This is a secret for ${
      session.user?.address || session.user?.email
    }`,
  });
};

export default handler;
