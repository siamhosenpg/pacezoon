"use client";

import React, { useRef, useState, useEffect } from "react";
import { FaBackspace } from "react-icons/fa";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

interface ImageSectionProps {
  media: string[];
}

const PrevewVideoSection: React.FC<ImageSectionProps> = ({ media }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const handelBack = () => window.history.back();

  // ▶️ Play / Pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // ⏱ Update progress
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setProgress(videoRef.current.currentTime);
  };

  // ⏱ Seek video
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Number(e.target.value);
    setProgress(Number(e.target.value));
  };

  // 🔊 Volume
  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const vol = Number(e.target.value);
    videoRef.current.volume = vol;
    setVolume(vol);
  };

  // ⏳ Duration load
  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  // 🕒 Time formatter
  const formatTime = (time: number) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div className="leftArea w-full md:w-8/12 h-[calc(100vh-110px)] relative flex items-center bg-background-tertiary border-border border-none lg:border rounded-none sm:rounded-lg overflow-hidden justify-center">
      {/* Back Button */}
      <div className="absolute z-30 left-0 top-0 p-3">
        <button
          onClick={handelBack}
          className="w-10 h-10 flex items-center justify-center bg-[#0000002d] rounded-full"
        >
          <FaBackspace className="text-xl text-white" />
        </button>
      </div>

      {/* Main Video */}
      <video
        ref={videoRef}
        className="max-w-full max-h-full z-20 object-contain"
        src={media[0]}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={togglePlay}
      />

      {/* Blurred Background */}
      <video
        className="absolute z-10 max-w-full max-h-full object-contain blur-xl scale-200"
        src={media[0]}
      />

      {/* 🎛 Custom Controller */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-linear-to-t from-black/70 to-transparent p-4">
        {/* Progress Bar */}
        <input
          type="range"
          min={0}
          max={duration}
          value={progress}
          onChange={handleSeek}
          className="w-full h-1 accent-white cursor-pointer"
        />

        <div className="flex items-center justify-between mt-3 text-white">
          {/* Play Pause */}
          <button onClick={togglePlay} className="text-xl">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          {/* Time */}
          <span className="text-sm opacity-80">
            {formatTime(progress)} / {formatTime(duration)}
          </span>

          {/* Volume */}
          <div className="flex items-center gap-2">
            {volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleVolume}
              className="w-20 h-1 accent-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrevewVideoSection;
