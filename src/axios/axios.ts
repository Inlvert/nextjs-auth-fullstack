import axios from "axios";

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
});


export interface LoginDto {
  email: string;
  password: string;
}

export const login = (userData: LoginDto) =>
  httpClient.post("/auth/login", userData);