// src/app/login/page.tsx
"use client";

import { GuestRoute } from "@/components/Protected/GuestRoute";
import { useAuth } from "@/hook/useAuth";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const { login } = useAuth({ fetchUser: false });

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    setError(null);

    if (!form.email || !form.password) {
      setError("Please fill in both email and password");
      return;
    }

    login.mutate(form, {
      onError: (err: any) => {
        const message = err.response?.data?.message || "Login failed";
        setError(message);
      },
    });
  };

  const ArafatLogin = () => {
    login.mutate(
      { email: "rupantor@gmail.com", password: "123456" },
      {
        onError: (err: any) => {
          const message = err.response?.data?.message || "Login failed";
          setError(message);
        },
      },
    );
  };

  return (
    <GuestRoute>
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
        <div className="w-full max-w-sm bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl p-8 rounded-2xl">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Welcome Back
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Please login to continue
          </p>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={login.isPending}
            className={`w-full py-3 rounded-xl text-white font-medium shadow-lg transition-all 
              ${
                login.isPending
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-accent cursor-pointer active:scale-[0.98]"
              }`}
          >
            {login.isPending ? "Logging in..." : "Login"}
          </button>

          <button
            onClick={ArafatLogin}
            className="px-6 py-3 bg-background flex items-center gap-3 cursor-pointer rounded-xl mt-5 w-full active:scale-[0.98] transition"
          >
            <div className="w-12 h-12 rounded-full border-border border">
              <Image
                width={80}
                height={80}
                className="w-full h-full  rounded-full"
                src="/images/arafat.jpg"
                alt=""
              />
            </div>
            <div className="text-left">
              <h2 className="font-semibold">Arafat Rupantor</h2>
              <p className="text-sm text-secondary">
                Continue as Arafat Rupantor
              </p>
            </div>
          </button>

          <div className="text-center  text-text-tertiary flex items-center justify-center gap-1 text-sm mt-6">
            Don't have an account?{" "}
            <Link href="/register" className=" text-accent font-medium">
              <p className="text-accent"> Create one</p>
            </Link>
          </div>
        </div>
      </div>
    </GuestRoute>
  );
}
