import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState("email");
    const [error, setError] = useState("");

    const { login } = useAuth();

    const navigate = useNavigate();

    const sendOtp = async (e) => {
        e.preventDefault();
        try {
            setError("");
            const res = await api.post("/auth/send-otp", {
                email,
            });
            console.log(res);

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
            const res = await api.post("/auth/verify-otp", { email, otp });

            login(res.data.token);
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
            <section className="flex h-40 items-center justify-center lg:justify-normal">
                <h1>Welcome to MeetSlot</h1>
            </section>

            <section className="md:mx-8 lg:mx-0">
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
