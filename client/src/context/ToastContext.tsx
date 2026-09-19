import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useState,
} from "react";
import { Toast, ToastState, ToastType } from "../components/Toast";
import { AnimatePresence } from "motion/react";

type ToastContextType = {
    toast: ToastState | null;
    showToast: (type: ToastType, message: string) => void;
    hideToast: () => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toast, setToast] = useState<ToastState | null>(null);

    const showToast = useCallback(
        (type: ToastType = "info", message: string) => {
            setToast({ type, message });
            setTimeout(() => setToast(null), 4000);
        },
        [],
    );

    const hideToast = useCallback(() => setToast(null), []);

    return (
        <ToastContext.Provider value={{ toast, showToast, hideToast }}>
            {children}

            <div className="pointer-events-none fixed inset-x-0 top-4 z-300 flex px-4 md:top-auto md:right-4 md:bottom-4 md:left-auto md:w-fit">
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
