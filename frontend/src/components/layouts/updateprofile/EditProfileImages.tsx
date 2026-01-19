"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/hook/useAuth";
import { useUpdateUser } from "@/hook/useUpdateUser";
import { ProtectedRoute } from "@/components/Protected/ProtectedRoute";
import type { UserType } from "@/types/userType";
import ModalPortal from "../ModalPortal";
import { motion, AnimatePresence } from "framer-motion";

import { ImCross } from "react-icons/im";
import { TbPhotoEdit } from "react-icons/tb";

interface EditProfileImagesProps {
  onClose: () => void;
}

const EditProfileImages = ({ onClose }: EditProfileImagesProps) => {
  const { user, isLoading } = useAuth();

  // ----------------------------
  // useUpdateUser hook
  // ----------------------------
  const updateUser = useUpdateUser();

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string>("");
  const [coverPreview, setCoverPreview] = useState<string>("");

  // ----------------------------
  // Set initial previews
  // ----------------------------
  useEffect(() => {
    if (user && user.user) {
      if (typeof user.user.profileImage === "string") {
        setProfilePreview(user.user.profileImage);
      }
      if (typeof user.user.coverImage === "string") {
        setCoverPreview(user.user.coverImage);
      }
    }
  }, [user]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
      setProfilePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
      setCoverPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.user?.userid) return;

    const data: Partial<UserType> = {
      userid: user.user.userid,
      profileImage: profileImage || undefined,
      coverImage: coverImage || undefined,
    };

    // ----------------------------
    // Update user & close modal on success
    // ----------------------------
    updateUser.mutate(data, {
      onSuccess: () => {
        onClose(); // ✅ automatically close modal on success
        window.location.reload();
      },
      onError: (err: any) => {
        alert(err?.message || "Failed to update profile");
      },
    });
  };

  // ----------------------------
  // Animations
  // ----------------------------
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { y: 80, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.35, ease: "easeOut" as any },
    },
    exit: {
      y: 80,
      opacity: 0,
      transition: { duration: 0.25, ease: "easeIn" as any },
    },
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <ProtectedRoute>
      <ModalPortal>
        <AnimatePresence>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-60 flex items-end lg:items-center justify-center bg-background-tertiary/80 backdrop-blur-xs"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="-mt-12 w-full lg:w-2/6 rounded-2xl rounded-b-none lg:rounded-b-2xl border border-white/30 bg-background pt-3 pb-6 shadow-2xl"
            >
              <div className="mb-4 flex items-center justify-between border-b border-border px-6 py-2">
                <h2 className="text-base font-bold gap-2 flex items-center">
                  Update Profile Images
                </h2>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-background-secondary cursor-pointer"
                >
                  <ImCross />
                </button>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 sm:gap-6 px-4 sm:px-6"
              >
                {/* Cover Image */}
                <div className="flex flex-col items-center">
                  <label
                    htmlFor="cover-image"
                    className="w-full block cursor-pointer relative"
                  >
                    {coverPreview ? (
                      <img
                        loading="lazy"
                        src={coverPreview}
                        alt=""
                        className="w-full aspect-7/2 object-cover  border border-border rounded-xl"
                      />
                    ) : (
                      <div className="w-full aspect-7/2 object-cover bg-background-tertiary  border border-border rounded-xl"></div>
                    )}
                    <label
                      className="w-10 h-10 bg-background rounded-full flex items-center justify-center absolute z-20 right-1 bottom-1 border border-border cursor-pointer"
                      htmlFor="cover-image"
                    >
                      <TbPhotoEdit className="text-lg" />
                    </label>
                  </label>

                  <input
                    id="cover-image"
                    className="hidden"
                    type="file"
                    accept="image/*"
                    onChange={handleCoverChange}
                  />
                </div>
                {/* Profile Image */}
                <div className="flex flex-col items-center">
                  <label
                    htmlFor="profile-image"
                    className=" cursor-pointer font-medium relative"
                  >
                    <img
                      src={
                        profilePreview
                          ? profilePreview
                          : user?.user?.gender === "female"
                            ? "/images/femaleprofile.jpg"
                            : "/images/profile.jpg" // male or default
                      }
                      alt="Profile Preview"
                      className="w-32 h-32 object-cover rounded-full border border-border"
                    />
                    <label
                      className="w-10 h-10 bg-background rounded-full flex items-center justify-center absolute z-20 right-1 bottom-1 border border-border cursor-pointer"
                      htmlFor="profile-image"
                    >
                      <TbPhotoEdit className="text-lg" />
                    </label>
                  </label>

                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    onChange={handleProfileChange}
                    className="hidden"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={updateUser.isPending}
                  className={`mt-4 w-full py-3 rounded-xl bg-accent text-white font-semibold transition
                ${
                  updateUser.isPending
                    ? "bg-primary/60 cursor-not-allowed"
                    : "hover:bg-primary-dark"
                }`}
                >
                  {updateUser.isPending ? "Updating..." : "Update Images"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </ModalPortal>
    </ProtectedRoute>
  );
};

export default EditProfileImages;
