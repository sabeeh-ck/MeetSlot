import { useEffect } from "react";
import { motion } from "framer-motion";
import { ErrorIcon, InfoIcon, SuccessIcon } from "../icons";

export type ToastType = "success" | "error" | "warning" | "info";

export type ToastState = {
    type: ToastType;
    message: string;
    duration?: number;
};

const types: Record<ToastType, { style: string; icon: typeof InfoIcon }> = {
    success: {
        style: "bg-emerald-950 border-emerald-900 text-emerald-200",
        icon: SuccessIcon,
    },
    error: {
        style: "bg-rose-950 border-rose-900 text-rose-200",
        icon: ErrorIcon,
    },
    warning: {
        style: "bg-amber-950 border-amber-900 text-amber-200",
        icon: InfoIcon,
    },
    info: { style: "bg-sky-950 border-sky-900 text-sky-200", icon: InfoIcon },
};

type ToastProps = { toast: ToastState; onClose: () => void };

export const Toast = ({ toast, onClose }: ToastProps) => {
    const duration = toast.duration ?? 4000;

    useEffect(() => {
        const timer = setTimeout(onClose, duration);

        return () => {
            clearTimeout(timer);
        };
    }, [onClose, duration]);

    const Icon = types[toast.type]?.icon;

    return (
        <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className={`pointer-events-auto flex w-full items-center justify-start gap-2 rounded-xl border p-2 shadow-xl md:px-4 ${types[toast.type].style}`}
            role="alert"
        >
            <Icon className="h-full md:size-5" />
            <span className="inline-block w-fit text-xs md:text-sm">
                {toast.message}
            </span>
        </motion.div>
    );
};
