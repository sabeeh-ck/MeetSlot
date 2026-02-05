import User from "../models/User.js";

export const sendOtp = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ msg: "Not authorised" });

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

    const user = await User.findOne({ email });

    if (!user || !user.otp) return res.status(400).json({ msg: "Invalid OTP" });

    if (user.otp.expiresAt < Date.now()) return res.status(400).json({ msg: "OTP expired" });

    if (user.otp.code !== otp) return res.status(400).json({ msg: "Wrong OTP" });

    console.log("OTP verified");

    user.otp = undefined;
    await user.save();

    res.json({ msg: "Login successfull", user });
};
