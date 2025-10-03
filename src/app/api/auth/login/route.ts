import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/DB/mongoose";
import { User } from "@/schemas/user.schema";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) throw new Error("Add JWT_SECRET to .env.local");

export async function POST(req: NextRequest) {
  await connectDB();
  const { email, password } = await req.json();

  if (!email || !password)
    return NextResponse.json(
      { error: "Email and password required" },
      { status: 400 }
    );

  const user = await User.findOne({ email });
  if (!user)
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }

  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return NextResponse.json({
    user: { id: user._id.toString(), email: user.email },
    token,
  });
}
