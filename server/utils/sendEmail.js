import nodemailer from "nodemailer";

console.log(process.env.EMAIL_PASS);
console.log(process.env.EMAIL_USER);

export const sendOtpEmail = async (to, otp) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: `"MeetSlot" <${process.env.EMAIL_USER}>`,
        to,
        subject: "Your OTP Code",
        text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    });
};
