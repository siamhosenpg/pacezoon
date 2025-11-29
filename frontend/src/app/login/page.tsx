// src/app/login/page.tsx
"use client";

import { useAuth } from "@/hook/useAuth";
import { useState } from "react";

export default function LoginPage() {
  // Disable auto fetch of currentUser on login page
  const { login } = useAuth({ fetchUser: false });

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    setError(null);

    // ✅ Frontend validation
    if (!form.email || !form.password) {
      setError("Please fill in both email and password");
      return;
    }

    login.mutate(form, {
      onError: (err: any) => {
        // Backend error handling
        const message = err.response?.data?.message || "Login failed";
        setError(message);
      },
    });
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>
      )}

      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-3 rounded"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-4 rounded"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button
        onClick={handleLogin}
        disabled={login.isLoading}
        className={`w-full p-2 rounded text-white ${
          login.isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {login.isLoading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}
