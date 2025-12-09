import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getSuggestedUsers,
} from "../controllers/usercontrol.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/user", getUsers); // ✅ সব ইউজার দেখাবে
router.get("/user/:userid", getUserById); // ✅ নির্দিষ্ট ইউজার দেখাবে (id দিয়ে)
router.put("/user/:userid", protect, updateUser); // ✅ ইউজার তথ্য আপডেট করবে
router.delete("/user/:userid", protect, deleteUser); // ✅ ইউজার ডিলিট করবে
router.get("/suggested", protect, getSuggestedUsers); // ✅ ইউজার ডিলিট করবে

export default router;
