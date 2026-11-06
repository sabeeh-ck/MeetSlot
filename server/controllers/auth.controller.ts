import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendOtpEmail } from "../utils/sendEmail.js";
import { Request, Response } from "express";

export const checkHealth = (req: Request, res: Response) => res.status(200).json({ status: "awake" });

export const getMe = async (req: Request, res: Response) => {
    try {
        res.set("Cache-Control", "no-store");

        const user = await User.findById(req.userId);

        if (!user) return res.status(404).json({ msg: "User not found" });

        res.json({ user });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

export const sendOtp = async (req: Request, res: Response) => {
    const isDemo = process.env.DEMO_MODE === "true";

    const { email } = req.body as { email?: string };
    if (!email) return res.status(400).json({ msg: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ msg: "Not authorised. Contact admin!" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = {
        code: otp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    };

    await user.save();

    try {
        if (isDemo) {
            console.log("OTP (demo):", otp);

            return res.json({
                msg: "OTP generated (demo mode)",
                otp,
            });
        } else {
            const success = await sendOtpEmail(user.email, otp);

            if (!success) {
                return res.status(500).json({ msg: "Failed to send OTP" });
            }

            return res.json({ msg: "OTP sent" });
        }
    } catch (error) {
        console.error("Email error:", error);
        return res.status(500).json({ msg: "Something went wrong" });
    }
};

export const verifyOtp = async (req: Request, res: Response) => {
    const isProd = process.env.ENV === "prod";

    const { email, otp } = req.body as { email?: string; otp?: string };
    if (!email || !otp) return res.status(400).json({ msg: "Missing email or otp" });

    const user = await User.findOne({ email }).select("+otp");

    if (!user || !user.otp) return res.status(400).json({ msg: "Invalid OTP" });

    if (user.otp.expiresAt.getTime() < Date.now()) return res.status(400).json({ msg: "OTP expired" });

    if (user.otp.code !== otp) return res.status(400).json({ msg: "Wrong OTP" });

    console.log("OTP verified");

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) return res.status(500).json({ msg: "Server misconfiguration: JWT secret missing" });

    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: "7d" });

    user.otp = undefined;
    await user.save();

    res.cookie("token", token, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
    }).json({ msg: "Login successfull", user });
};

export const logout = async (req: Request, res: Response) => {
    const isProd = process.env.ENV === "prod";

    res.clearCookie("token", {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
    });

    res.status(200).json({ message: "Logged out successfully" });
};
