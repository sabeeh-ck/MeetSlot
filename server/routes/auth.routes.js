import { Router } from "express";
import { getMe, sendOtp, verifyOtp } from "../controllers/auth.controller.js";
import { auth } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/me", auth, getMe);

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

export default router;
