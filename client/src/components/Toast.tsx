import { ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ErrorIcon, InfoIcon, SuccessIcon } from "../icons";

export type ToastType = "success" | "error" | "warning" | "info";

export type ToastState = {
    type: ToastType;
    message: string;
} | null;

export type ToastProps = {
    isOpen: boolean;
    onClose: () => void;
    type: ToastType;
    children: ReactNode;
    autoClose?: number;
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

export default function Toast({
    isOpen,
    onClose,
    type = "info",
    children,
    autoClose = 4000,
}: ToastProps) {
    useEffect(() => {
        if (isOpen && autoClose) {
            const timer = setTimeout(() => {
                onClose();
            }, autoClose);
            return () => clearTimeout(timer);
        }
    }, [isOpen, autoClose, onClose]);

    const Icon = types[type]?.icon;

    return (
        <div className="pointer-events-none fixed inset-x-0 top-4 z-300 flex px-4 md:top-auto md:right-4 md:bottom-4 md:left-auto md:w-fit">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="pointer-events-auto"
                    >
                        <div
                            className={`flex items-center justify-center gap-2 rounded-xl border p-2 shadow-xl md:p-4 ${types[type].style || types.info.style}`}
                            role="alert"
                        >
                            <Icon className="h-full md:size-5" />
                            <span className="inline-block w-fit text-xs md:text-sm">
                                {children}
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
