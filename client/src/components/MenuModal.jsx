import { motion } from "motion/react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

const MenuModal = ({ children, onClose, triggerRect }) => {
    if (!triggerRect) return null;

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => (document.body.style.overflow = "");
    }, []);

    return createPortal(
        <>
            <motion.div
                key="backdrop"
                className="fixed inset-0 z-60 bg-black/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="fixed z-70"
                style={{
                    top: triggerRect.bottom + 8,
                    right: window.innerWidth - triggerRect.right,
                }}
            >
                {children}
            </motion.div>
        </>,
        document.body,
    );
};

export default MenuModal;
