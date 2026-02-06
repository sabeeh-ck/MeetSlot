import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) return res.status(404).json({ msg: "User not found" });

        res.json(user);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

export const sendOtp = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ msg: "Not authorised. Contact admin" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = {
        code: otp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    };

    await user.save();

    // TODO: send otp via email
    console.log("OTP: ", otp);

    res.json({ msg: "OTP sent" });
};

export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ msg: "Missing email or otp" });

    const user = await User.findOne({ email }).select("+otp");

    console.log(user);

    if (!user || !user.otp) return res.status(400).json({ msg: "Invalid OTP" });

    if (user.otp.expiresAt < Date.now()) return res.status(400).json({ msg: "OTP expired" });

    if (user.otp.code !== otp) return res.status(400).json({ msg: "Wrong OTP" });

    console.log("OTP verified");
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    user.otp = undefined;
    await user.save();

    res.json({ token, msg: "Login successfull", user });
};
