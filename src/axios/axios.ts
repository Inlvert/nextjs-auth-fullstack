import axios from "axios";

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://nextjs-auth-fullstack-dmlw.vercel.app/",
});


export interface LoginDto {
  email: string;
  password: string;
}

export const login = (userData: LoginDto) =>
  httpClient.post("/auth/login", userData);