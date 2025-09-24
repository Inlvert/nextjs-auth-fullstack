"use client";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { login } from "@/redux/slices/authSlice";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} className="border-2 border-gray-400 rounded-md px-3 py-2 focus:border-blue-500 focus:outline-none transition-colors"/>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border-2 border-gray-400 rounded-md px-3 py-2 focus:border-blue-500 focus:outline-none transition-colors"
      />
      <button type="submit">Login</button>
    </form>
  );
}
