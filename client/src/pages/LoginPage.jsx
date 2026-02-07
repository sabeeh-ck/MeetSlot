import { useState } from "react";
import axios from "axios";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState("email");
    const [error, setError] = useState("");

    const { login } = useAuth();

    const navigate = useNavigate();

    const sendOtp = async (event) => {
        event.preventDefault();
        try {
            setError("");
            await axios.post("http://192.168.1.6:4000/auth/send-otp", {
                email,
            });
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
            const res = await axios.post(
                "http://192.168.1.6:4000/auth/verify-otp",
                { email, otp },
            );

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
            <section className="flex h-40 items-center justify-center">
                <h1>Welcome to MeetSlot</h1>
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
