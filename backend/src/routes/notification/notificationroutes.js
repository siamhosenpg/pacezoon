import express from "express";
import {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
} from "../../controllers/notification/notificationcontroller.js";
import { protect } from "../../middleware/auth.js";

const router = express.Router();

// 🔔 Get my notifications
router.get("/", protect, getMyNotifications);

// 🔔 Mark single notification read
router.patch("/:id/read", protect, markAsRead);

// 🔔 Mark all as read
router.patch("/read-all", protect, markAllAsRead);

export default router;
