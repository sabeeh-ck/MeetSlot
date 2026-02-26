import { motion } from "motion/react";

const MenuModal = ({ children, closeMenu }) => {
    return (
        <>
            <motion.div
                key="backdrop"
                className="fixed inset-0 z-60 bg-black/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeMenu}
            />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-surface border-border fixed right-4 z-60 mt-4 rounded-xl border"
            >
                {children}
            </motion.div>
        </>
    );
};

export default MenuModal;
