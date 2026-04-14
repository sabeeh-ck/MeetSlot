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
    const [loading, setLoading] = useState(false);

    const { setUser } = useAuth();

    const navigate = useNavigate();

    const sendOtp = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");

            await api.post("/auth/send-otp", {
                email,
            });

            setStep("otp");
        } catch (err) {
            if (err.response?.data.msg) {
                setError(err.response.data.msg);
            } else {
                console.log(err);
            }
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const res = await api.post("/auth/verify-otp", { email, otp });

            setUser(res.data.user);
            navigate("/");
        } catch (err) {
            if (err.response && err.response.data && err.response.data.msg) {
                setError(err.response.data.msg);
            } else {
                console.log(err);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="max-w-7xl">
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
                        loading={loading}
                    />
                ) : (
                    <LoginForm
                        step="otp"
                        onSubmit={verifyOtp}
                        value={otp}
                        onChange={setOtp}
                        email={email}
                        loading={loading}
                        error={error}
                    />
                )}
            </section>
        </main>
    );
};

export default LoginPage;
