import express from "express";
import { createConversation, updateConversation, getConversations, saveMessage, getMessages } from "../controllers/chatController.js";


const router = express.Router();

router.post("/create-conversation", createConversation);
router.post("/update-conversation", updateConversation);
router.get("/get-conversations", getConversations);
router.post("/save-message", saveMessage);
router.get("/get-messages/:conversationId", getMessages);

export default router;