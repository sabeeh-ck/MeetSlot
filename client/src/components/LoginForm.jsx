const LoginForm = ({ step, onSubmit, value, onChange, email }) => (
    <div className="mt-4 flex w-full flex-col gap-4">
        <p className="font-semibold">
            {step === "email" ? "Email" : `Enter OTP send to ${email}`}
        </p>
        <form className="flex flex-col items-center gap-4" onSubmit={onSubmit}>
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
                className="text-bg rounded-lg bg-amber-300 px-4 py-2"
                type="submit"
            >
                {step === "email" ? "Send OTP" : "Verify OTP"}
            </button>
        </form>
    </div>
);

export default LoginForm;
