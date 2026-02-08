"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineLike } from "react-icons/ai";

type ReactionType = "like" | "love" | "care" | "angry" | "wow" | "sad";

interface LikeIconProps {
  liked: ReactionType | boolean;
  variants?: string;
}

const reactionIcons: Record<ReactionType, string> = {
  like: "/images/icon/reaction/like.png",
  love: "/images/icon/reaction/love.png",
  care: "/images/icon/reaction/care.png",
  angry: "/images/icon/reaction/angry.png",
  wow: "/images/icon/reaction/wow.png",
  sad: "/images/icon/reaction/sad.png",
};

const LikeBoxIcon = ({ liked, variants }: LikeIconProps) => {
  const activeReaction =
    typeof liked === "string" ? reactionIcons[liked] : null;

  return (
    <AnimatePresence mode="wait">
      {activeReaction ? (
        <motion.div
          key={String(liked)} // ✅ TS-safe key
          initial={{ scale: 0.6, rotate: -15, opacity: 0 }}
          animate={{
            scale: [0.6, 1.4, 1],
            rotate: [0, 10, 0],
            opacity: 1,
          }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
          className={`drop-shadow-md w-5 ${
            variants === "lg"
              ? "text-2xl text-white lg:text-accent"
              : "text-xl text-accent -mt-0.5"
          }`}
        >
          <img className="w-full" src={activeReaction} />
        </motion.div>
      ) : (
        <motion.div
          key="unliked"
          initial={{ scale: 1 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <AiOutlineLike
            className={`${
              variants === "lg"
                ? "text-2xl text-white lg:text-text"
                : "text-xl text-text -mt-0.5"
            }`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LikeBoxIcon;
