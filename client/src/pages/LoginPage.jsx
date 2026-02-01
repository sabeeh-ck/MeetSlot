const LoginPage = () => {
    return (
        <main>
            <section className="mt-25 mb-15 flex justify-center">
                <span className="text-4xl font-extrabold">MeetSlot</span>
            </section>
            <section className="flex flex-col gap-4">
                <h1>Login</h1>
                <p className="font-semibold">Login to your Account</p>
                <form className="flex flex-col items-center gap-4">
                    <input type="text" placeholder="Enter Email" />
                    <button className="text-bg bg-amber-300" type="submit">
                        Send OTP
                    </button>
                </form>
            </section>
        </main>
    );
};

export default LoginPage;
