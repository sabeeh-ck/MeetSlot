import { InfoIcon } from "../icons";

export const DemoHint = ({ setEmail }) => (
    <div className="m-4 flex flex-col gap-1 rounded-xl bg-yellow-600/5 p-4 text-yellow-700/90 lg:w-[calc(50%-16px)]">
        <span className="flex items-center gap-1 text-sm font-bold tracking-wide uppercase">
            <InfoIcon className="size-4" />
            Portfolio Demo Mode
        </span>
        <div className="flex flex-col gap-1 text-xs leading-relaxed lg:text-sm">
            <span className="flex items-center gap-2">
                <span className="w-16">Employee:</span>
                <code
                    onClick={() => setEmail("guest-employee@meetslot.com")}
                    className="inline-block cursor-pointer rounded bg-yellow-600/20 px-1.5 py-0.5 font-mono text-yellow-600 transition-all select-none active:scale-95 lg:hover:bg-yellow-600/40"
                >
                    guest-employee@meetslot.com
                </code>
            </span>
            <span className="flex items-center gap-2">
                <span className="w-16">Admin:</span>
                <code
                    onClick={() => setEmail("guest-admin@meetslot.com")}
                    className="inline-block cursor-pointer rounded bg-yellow-600/20 px-1.5 py-0.5 font-mono text-yellow-600 transition-all select-none active:scale-95 lg:hover:bg-yellow-600/40"
                >
                    guest-admin@meetslot.com
                </code>
            </span>
            <span className="mt-1 border-t border-yellow-600/10 pt-1 italic opacity-70">
                Tip: Click an email to auto-fill. OTP will appear after clicking
                <span className="font-medium text-yellow-600/90">
                    "Send OTP"
                </span>
                .
            </span>
        </div>
    </div>
);

export const DemoBadge = () => (
    <div className="rounded-sm border border-yellow-600/40 bg-yellow-600/5 px-2 text-xs font-bold text-yellow-700/90">
        Demo
    </div>
);
