import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret });

  if (!token || !token.sub)
    return res.send({
      error: "Please authenticate your wallet to continue.",
    });

  if (token) {
    return res.send({
      content:
        "Congrats, you can view this page!",
    });
  }

  res.send({
    error: "You must be signed in with your Solana Wallet to view the protected content on this page.",
  });
}