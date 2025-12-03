import express from "express";
import {
  createOrUpdateReaction,
  deleteReaction,
  getReactionsByPost,
  getReactionCount,
} from "../controllers/reactionController.js";

// ✅ Named import (default না)
import { protect } from "../middleware/auth.js";

const router = express.Router();

// 🟢 Add or Update Reaction
router.post("/", protect, createOrUpdateReaction);

// 🔴 Delete Reaction
router.delete("/:postId", protect, deleteReaction);

// 🟣 Get Reactions of a Post
router.get("/post/:postId", getReactionsByPost);

// 🟡 Get Reaction Count of a Post
router.get("/count/:postId", getReactionCount);

export default router;
