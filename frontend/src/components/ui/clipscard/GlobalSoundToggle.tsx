import { useState } from "react";
import { IoVolumeMute } from "react-icons/io5";
import { FiVolume2 } from "react-icons/fi";

const GlobalSoundToggle = () => {
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const next = !muted;
    setMuted(next);

    window.dispatchEvent(
      new CustomEvent("reels-sound-toggle", {
        detail: next, // true = muted, false = unmuted
      })
    );
  };

  return (
    <button
      onClick={toggleSound}
      className="absolute top-3 right-3 z-50 w-7 h-7 flex items-center justify-center text-white shadow-2xl text-shadow-2xs rounded-full border border-white"
    >
      {muted ? (
        <IoVolumeMute className="text-lg" />
      ) : (
        <FiVolume2 className="text-lg" />
      )}
    </button>
  );
};

export default GlobalSoundToggle;
