import { SyntheticEvent, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../api/axios";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../context/AuthContext";
import { DemoHint } from "../components/DemoComponents";
import { isAxiosError } from "axios";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState("email");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [serverStatus, setSeverStatus] = useState("Waking up...");

    const { user, setUser } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        const wakeServer = async () => {
            try {
                await api.get("/auth/health");
                setSeverStatus("Server is ready");
            } catch (error: unknown) {
                setSeverStatus("Server is ready");
            }
        };

        wakeServer();
    }, []);

    if (user)
        return (
            <Navigate
                to={user.role === "admin" ? "/admin/dashboard" : "/home"}
            />
        );

    const sendOtp = async (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
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
        } catch (error: unknown) {
            if (isAxiosError<{ msg?: string }>(error)) {
                const message = error.response?.data?.msg;

                if (message) setError(message);
                else console.error(error);
            } else console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setLoading(true);
            const res = await api.post("/auth/verify-otp", { email, otp });
            const userData = res.data.user;

            setUser(userData);

            navigate(userData.role === "admin" ? "/admin/dashboard" : "/home");
        } catch (error: unknown) {
            if (isAxiosError<{ msg?: string }>(error)) {
                const message = error.response?.data?.msg;

                if (message) setError(message);
                else console.error(error);
            } else console.error(error);
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
                            loading={loading}
                            error={error}
                        />
                    )}
                </section>

                <DemoHint selectEmail={(email) => setEmail(email)} />
            </main>
        </>
    );
};

export default LoginPage;
