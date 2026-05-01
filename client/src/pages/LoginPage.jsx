import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../api/axios";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState("email");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { user, setUser } = useAuth();

    const navigate = useNavigate();

    if (user)
        return (
            <Navigate
                to={user.role === "admin" ? "/admin/dashboard" : "/home"}
            />
        );

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
            if (err.response?.data?.msg) setError(err.response.data.msg);
            else console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const res = await api.post("/auth/verify-otp", { email, otp });
            const userData = res.data.user;

            setUser(userData);

            navigate(userData.role === "admin" ? "/admin/dashboard" : "/home");
        } catch (err) {
            if (err.response?.data?.msg) setError(err.response.data.msg);
            else console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <header className="bg-bg border-border fixed top-0 z-70 flex h-16 w-full items-center border-b">
                <div className="mx-auto w-full max-w-7xl px-4">
                    <span className="text-lg font-black">MeetSlot</span>
                </div>
            </header>

            <main className="flex h-dvh max-w-7xl flex-col justify-center">
                <section className="flex h-20 items-start justify-center lg:justify-normal">
                    <h1 className="font-semibold">Welcome to MeetSlot</h1>
                </section>

                <section className="md:mx-8 lg:mx-0">
                    <h1 className="font-medium">Login</h1>
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
        </>
    );
};

export default LoginPage;
