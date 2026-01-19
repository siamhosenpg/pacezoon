"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ImCross } from "react-icons/im";
import { MdOutlineEditLocation } from "react-icons/md";
import { FaPlay, FaPause } from "react-icons/fa";
import WaveSurfer from "wavesurfer.js";
import { motion, AnimatePresence } from "framer-motion";

import { useAuth } from "@/hook/useAuth";
import { usePost } from "@/hook/usePost";
import { ProtectedRoute } from "@/components/Protected/ProtectedRoute";
import ModalPortal from "../ModalPortal";

/* 🧼 Sanitize */
const sanitizeCaption = (text: string) =>
  text.replace(/\n{3,}/g, "\n\n").replace(/ {6,}/g, "     ");

interface CreateVideoBoxProps {
  onClose: () => void;
}

const CreateVoiceCard = ({ onClose }: CreateVideoBoxProps) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const { createPost, createPostLoading } = usePost();

  /* 🧠 States */
  const [caption, setCaption] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [location, setLocation] = useState("");
  const [privacy, setPrivacy] = useState<"public" | "private" | "friends">(
    "public",
  );
  const [isPlaying, setIsPlaying] = useState(false);

  /* 🎧 WaveSurfer refs */
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);

  // ----------------------------
  // 🎵 Handle Audio Select
  // ----------------------------
  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    if (!file.type.startsWith("audio")) {
      alert("Only audio files are allowed");
      return;
    }

    setAudioFile(file);
  };

  // ----------------------------
  // 🎧 WaveSurfer Init / Destroy
  // ----------------------------
  useEffect(() => {
    if (!audioFile || !waveformRef.current) return;

    // 🔐 Clean previous instance (StrictMode safe)
    if (waveSurferRef.current) {
      waveSurferRef.current.destroy();
      waveSurferRef.current = null;
    }

    const ws = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#d1d5db",
      progressColor: "#16CC06",
      cursorColor: "transparent",
      barWidth: 2,
      barRadius: 3,
      height: 40,
      normalize: true,
    });

    waveSurferRef.current = ws;

    // ✅ Create local preview URL
    const audioUrl = URL.createObjectURL(audioFile);
    ws.load(audioUrl);

    ws.on("finish", () => {
      setIsPlaying(false);
    });

    return () => {
      ws.destroy();
      URL.revokeObjectURL(audioUrl);
      waveSurferRef.current = null;
    };
  }, [audioFile]);

  // ----------------------------
  // ▶️ Play / Pause
  // ----------------------------
  const togglePlay = () => {
    if (!waveSurferRef.current) return;
    waveSurferRef.current.playPause();
    setIsPlaying((prev) => !prev);
  };

  // ----------------------------
  // 🚀 Submit
  // ----------------------------
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!audioFile) {
      alert("Audio file is required!");
      return;
    }

    const formData = new FormData();
    formData.append("caption", sanitizeCaption(caption));
    formData.append("privacy", privacy);
    formData.append("location", location);
    formData.append("media", audioFile);

    createPost(formData, {
      onSuccess: () => {
        setCaption("");
        setAudioFile(null);
        setLocation("");
        onClose();
        router.push("/");
      },
      onError: (err: any) => {
        alert(err?.message || "Failed to upload voice");
      },
    });
  };

  // ----------------------------
  // Auth Handling
  // ----------------------------
  if (isLoading) return <div className="p-4 text-center">Loading...</div>;

  if (!user)
    return (
      <div className="p-4 text-center text-red-500 font-semibold">
        Please login to upload a voice.
      </div>
    );

  /* 🎞️ Animations */
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
      transition: { duration: 0.35, ease: "easeOut" },
    },
    exit: {
      y: 80,
      opacity: 0,
      transition: { duration: 0.25, ease: "easeIn" },
    },
  };

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
              {/* Header */}
              <div className="mb-4 flex items-center justify-between border-b border-border px-6 py-2">
                <h2 className="text-base font-bold">Upload Voice</h2>
                <button
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-background-secondary"
                >
                  <ImCross />
                </button>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 px-4 sm:px-6"
              >
                <div className="flex items-center gap-2">
                  <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-full shrink-0 overflow-hidden ">
                    <img
                      className="w-full h-full object-cover bg-background-secondary "
                      src={
                        user?.user.profileImage
                          ? user.user.profileImage
                          : user?.user.gender === "female"
                            ? "/images/femaleprofile.jpg"
                            : "/images/profile.jpg" // male or default
                      }
                      alt=""
                    />
                  </div>
                  <div className="w-full">
                    <div className=" flex items-center justify-start gap-3">
                      <h3 className="font-bold w-fit shrink-0 text-ellipsis whitespace-nowrap overflow-hidden ">
                        {user.user.name}
                      </h3>
                    </div>
                    <select
                      value={privacy}
                      onChange={(e) =>
                        setPrivacy(
                          e.target.value as "public" | "private" | "friends",
                        )
                      }
                      className="w-fit rounded-lg border  border-border  py-1 px-1.5 smalltext mt-1  cursor-pointer"
                    >
                      <option className="bg-background" value="public">
                        🌍 Public
                      </option>
                      <option className="bg-background" value="friends">
                        👥 Friends
                      </option>
                      <option className="bg-background" value="private">
                        🔒 Private
                      </option>
                    </select>
                  </div>
                </div>
                {/* Caption */}
                <textarea
                  rows={4}
                  placeholder={`Say something about your voice, ${user.user.name}?`}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="resize-none"
                />

                {/* Audio Preview */}
                {audioFile && (
                  <div className="w-full px-4 rounded-xl border border-border bg-background-secondary py-3">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={togglePlay}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white"
                      >
                        {isPlaying ? (
                          <FaPause size={14} />
                        ) : (
                          <FaPlay size={14} />
                        )}
                      </button>
                      <div className="flex-1">
                        <div ref={waveformRef} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom */}
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="audio-upload"
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <img className="w-12" src="/images/icon/audio.png" alt="" />
                    <div>
                      <p className="text-sm font-medium text-text-secondary">
                        Click to upload voice
                      </p>
                      <p className="text-xs text-text-tertiary">
                        (mp3, wav, ogg)
                      </p>
                    </div>
                  </label>

                  <input
                    id="audio-upload"
                    type="file"
                    accept="audio/*"
                    onChange={handleVideoSelect}
                    className="hidden"
                  />

                  <button
                    type="submit"
                    disabled={createPostLoading}
                    className="rounded-lg bg-accent px-6 py-2 text-white active:scale-95"
                  >
                    {createPostLoading ? "Posting..." : "Upload"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </ModalPortal>
    </ProtectedRoute>
  );
};

export default CreateVoiceCard;
