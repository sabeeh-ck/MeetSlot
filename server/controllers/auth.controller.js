import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendOtpEmail } from "../utils/sendEmail.js";

export const getMe = async (req, res) => {
    try {
        res.set("Cache-Control", "no-store");

        const user = await User.findById(req.userId);

        if (!user) return res.status(404).json({ msg: "User not found" });

        res.json({ user });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

export const sendOtp = async (req, res) => {
    const isDemo = process.env.DEMO_MODE === "true";

    const { email } = req.body;

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

            console.log("Sending OTP to:", user.email);
            console.log("OTP:", otp);

            return res.json({ msg: "OTP sent" });
        }
    } catch (error) {
        console.error("Email error:", error);
        return res.status(500).json({ msg: "Something went wrong" });
    }
};

export const verifyOtp = async (req, res) => {
    const isProd = process.env.ENV === "prod";

    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ msg: "Missing email or otp" });

    const user = await User.findOne({ email }).select("+otp");

    if (!user || !user.otp) return res.status(400).json({ msg: "Invalid OTP" });

    if (user.otp.expiresAt < Date.now()) return res.status(400).json({ msg: "OTP expired" });

    if (user.otp.code !== otp) return res.status(400).json({ msg: "Wrong OTP" });

    console.log("OTP verified");
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    user.otp = undefined;
    await user.save();

    res.cookie("token", token, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
    }).json({ msg: "Login successfull", user });
};

export const logout = async (req, res) => {
    const isProd = process.env.ENV === "prod";

    res.clearCookie("token", {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
    });

    res.status(200).json({ message: "Logged out successfully" });
};
