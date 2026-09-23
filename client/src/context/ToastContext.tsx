import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useState,
} from "react";
import { Toast, ToastState, ToastType } from "../components/Toast";
import { AnimatePresence } from "motion/react";

const DEFAULT_TOAST_DURATION = 4000;

type ToastContextType = {
    showToast: (type: ToastType, message: string, duration?: number) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toast, setToast] = useState<ToastState | null>(null);

    const showToast = useCallback(
        (type: ToastType = "info", message: string, duration?: number) =>
            setToast({
                type,
                message,
                duration: duration ?? DEFAULT_TOAST_DURATION,
            }),
        [],
    );

    const hideToast = useCallback(() => setToast(null), []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            <div className="pointer-events-none fixed inset-x-0 top-4 z-300 flex px-4 md:top-auto md:right-4 md:bottom-4 md:left-auto md:w-1/4">
                <AnimatePresence>
                    {toast && <Toast toast={toast} onClose={hideToast} />}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);

    if (!context) throw new Error("useToast must be used inside ToastProvider");

    return context;
};
