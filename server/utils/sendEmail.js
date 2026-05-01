import nodemailer from "nodemailer";

console.log(process.env.EMAIL_PASS);
console.log(process.env.EMAIL_USER);

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendOtpEmail = async (to, otp) => {
    try {
        await transporter.sendMail({
            from: `"MeetSlot" <${process.env.EMAIL_USER}>`,
            to,
            subject: "Your OTP Code",
            text: `Your OTP is ${otp}. It expires in 5 minutes.`,
        });

        return true;
    } catch (error) {
        console.error("Email error:", error);
        return false;
    }
};
