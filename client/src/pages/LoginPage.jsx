import { useState } from "react";
import axios from "axios";

const LoginPage = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("/login", { email });
    };

    return (
        <main>
            <section className="mt-25 mb-15 flex justify-center">
                <span className="text-4xl font-extrabold">MeetSlot</span>
            </section>
            <section className="flex w-full flex-col gap-6 px-4">
                <h1>Login</h1>
                <p className="font-semibold">Login to your Account</p>
                <form
                    className="flex flex-col items-center gap-6"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email"
                    />
                    <button
                        className="text-bg rounded-lg bg-amber-300 px-4 py-2"
                        type="submit"
                    >
                        Send OTP
                    </button>
                </form>
            </section>
        </main>
    );
};

export default LoginPage;
