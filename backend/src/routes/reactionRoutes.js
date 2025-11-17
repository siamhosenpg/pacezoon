import express from "express";
import {
  createOrUpdateReaction,
  deleteReaction,
  getReactionsByPost,
} from "../controllers/reactionController.js";

// ✅ Named import (default না)
import { protect } from "../middleware/auth.js";

const router = express.Router();

// 🟢 Add or Update Reaction
router.post("/react", protect, createOrUpdateReaction);

// 🔴 Delete Reaction
router.delete("/react/:postId", protect, deleteReaction);

// 🟣 Get Reactions of a Post
router.get("/post/:postId", getReactionsByPost);

export default router;
