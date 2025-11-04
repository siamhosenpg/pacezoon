import express from "express";
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postcontrol.js";

const router = express.Router();

router.get("/", getPosts); // সব পোস্ট দেখাবে
router.get("/:postid", getPostById); // নির্দিষ্ট পোস্ট
router.post("/", createPost); // নতুন পোস্ট তৈরি
router.put("/:postid", updatePost); // পোস্ট এডিট
router.delete("/:postid", deletePost); // পোস্ট ডিলিট

export default router;
