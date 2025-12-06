import express from "express";
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getPostsByUserId,
} from "../controllers/postcontrol.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// ✅ Specific routes first
router.get("/user/:userid", getPostsByUserId); // নির্দিষ্ট ইউজারের সব পোস্ট
router.get("/:postid", getPostById); // নির্দিষ্ট পোস্ট
router.get("/", getPosts); // সব পোস্ট দেখাবে

router.post("/", protect, createPost); // নতুন পোস্ট তৈরি
router.put("/:id", protect, updatePost); // পোস্ট এডিট
router.delete("/:id", protect, deletePost); // পোস্ট ডিলিট

export default router;
