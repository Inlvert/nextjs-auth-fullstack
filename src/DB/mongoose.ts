import mongoose from "mongoose";
import type { Mongoose } from "mongoose";

const DB_CONNECTION = process.env.DB_CONNECTION as string;

if (!DB_CONNECTION) throw new Error("Add DB_CONNECTION to env file");

const cached = global.mongoose ?? { conn: null, promise: null };
global.mongoose = cached;

export async function connectDB(): Promise<Mongoose> {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(DB_CONNECTION).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
