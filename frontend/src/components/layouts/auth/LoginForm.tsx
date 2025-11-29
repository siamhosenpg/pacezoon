"use client";

import React, { useState } from "react";
import { loginUser } from "@/lib/api/authApi";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      await loginUser(data);
      router.push("/dashboard");
    } catch (err: any) {
      setErrorMsg(err.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-8 rounded-xl w-[350px] text-white shadow-lg"
    >
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      {errorMsg && <p className="text-red-400 text-sm mb-3">{errorMsg}</p>}

      <div>
        <label>Email</label>
        <input
          type="email"
          className="w-full mt-1 mb-3 p-2 rounded bg-gray-700"
          onChange={(e) => setData({ ...data, email: e.target.value })}
          required
        />
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          className="w-full mt-1 mb-3 p-2 rounded bg-gray-700"
          onChange={(e) => setData({ ...data, password: e.target.value })}
          required
        />
      </div>

      <button
        disabled={loading}
        className="w-full bg-blue-600 py-2 rounded mt-2"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
