// src/app/register/page.tsx
"use client";

import { GuestRoute } from "@/components/Protected/GuestRoute";
import { useAuth } from "@/hook/useAuth";
import { useState } from "react";

export default function RegisterPage() {
  // Disable auto fetch of currentUser on register page
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

    // ✅ Frontend validation
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
        // Automatically redirect handled in useAuth hook
        setForm({ username: "", name: "", email: "", password: "" });
      },
    });
  };

  return (
    <GuestRoute>
      <div className="max-w-sm mx-auto mt-20 p-4 border rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {error}
          </div>
        )}

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          className="border p-2 w-full mb-3 rounded"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          className="border p-2 w-full mb-3 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4 rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleRegister}
          disabled={register.isLoading}
          className={`w-full p-2 rounded text-white ${
            register.isLoading
              ? "bg-gray-400"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {register.isLoading ? "Registering..." : "Register"}
        </button>
      </div>
    </GuestRoute>
  );
}
