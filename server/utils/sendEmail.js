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
        console.log("Trying to send email...");

        const info = await transporter.sendMail({
            from: `"MeetSlot" <${process.env.EMAIL_USER}>`,
            to,
            subject: "Your OTP Code",
            text: `Your OTP is ${otp}. It expires in 5 minutes.`,
        });

        console.log("Email sent:", info.response);
        return true;
    } catch (error) {
        console.error("FULL EMAIL ERROR:", error);
        return false;
    }
};
