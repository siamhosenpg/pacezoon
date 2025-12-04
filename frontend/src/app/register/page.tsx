// src/app/register/page.tsx
"use client";

import { GuestRoute } from "@/components/Protected/GuestRoute";
import { useAuth } from "@/hook/useAuth";
import { useState } from "react";

export default function RegisterPage() {
  const { register } = useAuth({ fetchUser: false });

  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleRegister = () => {
    setError(null);

    if (!form.username || !form.name || !form.email || !form.password) {
      setError("Please fill all fields");
      return;
    }

    register.mutate(form, {
      onError: (err: any) => {
        const message = err.response?.data?.message || "Registration failed";
        setError(message);
      },
      onSuccess: () => {
        setForm({ username: "", name: "", email: "", password: "" });
      },
    });
  };

  return (
    <GuestRoute>
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-emerald-100 p-4">
        <div className="w-full max-w-sm bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl p-8 rounded-2xl">
          <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
            Create Account
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Join us today — it’s quick and easy
          </p>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 mb-3 rounded-xl border border-gray-300 bg-white 
              focus:ring-2 focus:ring-emerald-400 focus:outline-none transition"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 mb-3 rounded-xl border border-gray-300 bg-white 
              focus:ring-2 focus:ring-emerald-400 focus:outline-none transition"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-3 rounded-xl border border-gray-300 bg-white 
              focus:ring-2 focus:ring-emerald-400 focus:outline-none transition"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-5 rounded-xl border border-gray-300 bg-white 
              focus:ring-2 focus:ring-emerald-400 focus:outline-none transition"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {/* Register Button */}
          <button
            onClick={handleRegister}
            disabled={register.isPending}
            className={`w-full py-3 rounded-xl text-white font-medium shadow-lg transition-all 
              ${
                register.isPending
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98]"
              }`}
          >
            {register.isPending ? "Registering..." : "Create Account"}
          </button>

          <p className="text-center text-gray-500 text-sm mt-6">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-emerald-600 font-medium hover:underline"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </GuestRoute>
  );
}
