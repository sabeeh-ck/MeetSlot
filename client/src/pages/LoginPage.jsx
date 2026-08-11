import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../api/axios";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../context/AuthContext";
import DemoHint from "../components/DemoHint";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState("email");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [serverStatus, setSeverStatus] = useState("Waking up...");

    const { user, setUser } = useAuth();

    const navigate = useNavigate();

    if (user)
        return (
            <Navigate
                to={user.role === "admin" ? "/admin/dashboard" : "/home"}
            />
        );

    useEffect(() => {
        const wakeServer = async () => {
            try {
                await api.get("/auth/health");
                setSeverStatus("Server is ready");
            } catch (error) {
                setSeverStatus("Server is ready");
            }
        };

        wakeServer();
    }, []);

    const sendOtp = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");

            const res = await api.post("/auth/send-otp", {
                email,
            });

            setStep("otp");

            if (res.data.otp) {
                setOtp(res.data.otp);
            }
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
                <section className="mx-4 flex h-20 items-start justify-center lg:justify-normal">
                    <h1 className="font-semibold">Welcome to MeetSlot</h1>
                </section>

                <section className="mx-4">
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

                <DemoHint setEmail={setEmail} />
            </main>
        </>
    );
};

export default LoginPage;
