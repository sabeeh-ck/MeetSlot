const LoginForm = ({ step, onSubmit, value, onChange, error }) => (
    <div className="mt-4 flex w-full flex-col gap-4 lg:w-1/2 lg:items-start">
        <h3>{step === "email" ? "Email" : "Enter OTP"}</h3>

        <form className="flex w-full flex-col gap-2" onSubmit={onSubmit}>
            {error !== "" && (
                <p className="text-xs font-semibold text-red-700/80">
                    {error === "Not authorised"
                        ? "You are not authorised. Contact the admin"
                        : error}
                </p>
            )}
            <input
                type={`${step === "email" ? "email" : "text"}`}
                required
                autoFocus
                className={step === "otp" ? "text-center text-3xl" : ""}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={`${step === "email" ? "johndoe@email.com" : "0 0 0 0 0 0"}`}
            />
            <button
                className="text-bg bg-text mt-2 self-center rounded-lg px-4 py-2"
                type="submit"
            >
                {step === "email" ? "Send OTP" : "Verify OTP"}
            </button>
        </form>
    </div>
);

export default LoginForm;
