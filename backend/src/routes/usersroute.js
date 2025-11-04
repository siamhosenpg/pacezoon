import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
} from "../controllers/usercontrol.js";

const router = express.Router();

router.get("/", getUsers); // ✅ সব ইউজার দেখাবে
router.get("/:userid", getUserById); // ✅ নির্দিষ্ট ইউজার দেখাবে (id দিয়ে)
router.post("/", createUser); // ✅ নতুন ইউজার তৈরি করবে
router.put("/:userid", updateUser); // ✅ ইউজার তথ্য আপডেট করবে
router.delete("/:userid", deleteUser); // ✅ ইউজার ডিলিট করবে
router.post("/:userid/follow", followUser); // ✅ ইউজার ফলো করা
router.post("/:userid/unfollow", unfollowUser); // ✅ ইউজার আনফলো করা

export default router;
