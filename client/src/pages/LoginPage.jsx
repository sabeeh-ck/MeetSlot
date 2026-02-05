import { useState } from "react";
import axios from "axios";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState("email");

    const navigate = useNavigate();

    const sendOtp = async (event) => {
        event.preventDefault();
        try {
            await axios.post("/auth/send-otp", { email });
            setStep("otp");
        } catch (error) {
            console.log(error);
        }
    };

    const verifyOtp = async (event) => {
        event.preventDefault();
        try {
            await axios.post("/auth/verify-otp", { email, otp });
            navigate("/");
        } catch (error) {
            if (err.response && err.response.data && err.response.data.msg) {
                console.log(err.response.data.msg);
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
                    />
                ) : (
                    <LoginForm
                        step="otp"
                        onSubmit={verifyOtp}
                        value={otp}
                        onChange={setOtp}
                        email={email}
                    />
                )}
            </section>
        </main>
    );
};

export default LoginPage;
