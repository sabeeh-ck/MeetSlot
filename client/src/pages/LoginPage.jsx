import { useState } from "react";
import axios from "axios";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState("email");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const sendOtp = async (event) => {
        event.preventDefault();
        try {
            setError("");
            await axios.post("/auth/send-otp", { email });
            setStep("otp");
        } catch (err) {
            if (err.response.data.msg) {
                setError(err.response.data.msg);
            } else {
                console.log(err);
            }
        }
    };

    const verifyOtp = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post("/auth/verify-otp", { email, otp });
            localStorage.setItem("token", res.data.token);
            navigate("/");
        } catch (err) {
            if (err.response && err.response.data && err.response.data.msg) {
                setError(err.response.data.msg);
            } else {
                console.log(err);
            }
        }
    };

    return (
        <main>
            <section className="mt-25 mb-15 flex justify-center">
                <span className="text-2xl font-extrabold">
                    Welcom to MeetSlot
                </span>
            </section>
            <section className="mx-2">
                <h1>Login</h1>
                {step === "email" ? (
                    <LoginForm
                        step="email"
                        onSubmit={sendOtp}
                        value={email}
                        onChange={setEmail}
                        error={error}
                    />
                ) : (
                    <LoginForm
                        step="otp"
                        onSubmit={verifyOtp}
                        value={otp}
                        onChange={setOtp}
                        email={email}
                        error={error}
                    />
                )}
            </section>
        </main>
    );
};

export default LoginPage;
