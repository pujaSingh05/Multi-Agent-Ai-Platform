import express from "express";
import { login, logout, deductCredits, updateUserPayment } from "../controllers/auth.controller.js";


const router = express.Router();

router.post("/login", login)
router.get("/logout", logout)
router.post("/deduct-credits", deductCredits)
router.post("/update-payment-plan", updateUserPayment)

export default router;