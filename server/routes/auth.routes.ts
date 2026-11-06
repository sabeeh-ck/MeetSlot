import { Router } from "express";
import { auth } from "../middleware/authMiddleware.js";
import { checkHealth, getMe, logout, sendOtp, verifyOtp } from "../controllers/auth.controller.js";

const router = Router();

router.get("/health", checkHealth);
router.get("/me", auth, getMe);

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/logout", logout);

export default router;
