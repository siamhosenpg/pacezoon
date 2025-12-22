// routes/message/conversation.routes.js
import express from "express";
import {
  getOrCreateConversation,
  getMyConversations,
} from "../../controllers/message/conversationController.js";
import { protect } from "../../middleware/auth.js";

const router = express.Router();

router.post("/", protect, getOrCreateConversation);

router.get("/", protect, getMyConversations);

export default router;
