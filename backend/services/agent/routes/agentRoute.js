import express from "express";
import { agent } from "../controllers/agentController";



const router = express.Router();

router.post("/chat", agent)

export default router;