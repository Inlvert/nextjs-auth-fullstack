import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/DB/mongoose";
import { verifyToken } from "./auth";
import { User } from "@/schemas/user.schema";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token" });

  const token = authHeader.split(" ")[1];
  try {
    await connectDB();
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId).select("-password");
    res.status(200).json({ user });
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}
