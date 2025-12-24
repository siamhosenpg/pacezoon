"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/hook/useAuth";
import { useUpdateUser } from "@/hook/useUpdateUser";
import { ProtectedRoute } from "@/components/Protected/ProtectedRoute";

const EditProfilePage = () => {
  const { user, isLoading } = useAuth();
  const updateUser = useUpdateUser();

  const [form, setForm] = useState({
    name: "",
    username: "",
    bio: "",
    aboutText: "",
    gender: "",
    work: "",
    location: "",
    educations: "",
  });

  // Load existing user data
  useEffect(() => {
    if (user?.user) {
      setForm({
        name: user.user.name || "",
        username: user.user.username || "",
        bio: user.user.bio || "",
        aboutText: user.user.aboutText || "",
        gender: user.user.gender || "",
        work: user.user.work || "",
        location: user.user.location || "",
        educations: user.user.educations || "",
      });
    }
  }, [user]);

  // Text input handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser.mutate({
      userid: user?.user?.userid,
      ...form,
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto p-6 mt-10">
        <div className="bg-background shadow-lg border border-border rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Edit Profile</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* TEXT INPUTS */}
            {[
              { label: "Full Name", name: "name" },
              { label: "Username", name: "username" },
              { label: "Gender", name: "gender" },
              { label: "Work", name: "work" },
              { label: "Location", name: "location" },
              { label: "Education", name: "educations" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block mb-1 font-medium text-sm text-foreground/80">
                  {field.label}
                </label>
                <input
                  type="text"
                  name={field.name}
                  value={form[field.name as keyof typeof form]}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background-secondary border border-border rounded-xl 
                           focus:outline-none focus:ring-2 focus:ring-primary transition"
                />
              </div>
            ))}

            {/* BIO */}
            <div>
              <label className="block mb-1 font-medium text-sm text-foreground/80">
                Bio
              </label>
              <textarea
                name="bio"
                rows={3}
                value={form.bio}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background-secondary border border-border rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-primary transition resize-none"
              />
            </div>

            {/* ABOUT */}
            <div>
              <label className="block mb-1 font-medium text-sm text-foreground/80">
                About
              </label>
              <textarea
                name="aboutText"
                rows={4}
                value={form.aboutText}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background-secondary border border-border rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-primary transition resize-none"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={updateUser.isPending}
              className={`mt-2 w-full py-3 rounded-xl bg-accent text-white font-semibold transition
              ${
                updateUser.isPending
                  ? "bg-primary/60 cursor-not-allowed"
                  : "bg-primary hover:bg-primary-dark"
              }`}
            >
              {updateUser.isPending ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default EditProfilePage;
