import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";

const BottomSheet = ({ closeSheet, open, children }) => {
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto";
        return () => (document.body.style.overflow = "auto");
    }, [open]);

    return createPortal(
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-9998 flex items-end justify-center">
                    <motion.div
                        key="backdrop"
                        className="fixed inset-0 z-9998 bg-black/40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeSheet}
                    />

                    <motion.div
                        key="sheet"
                        className="border-border bg-bg fixed inset-x-0 -bottom-10 z-9999 min-h-1/2 touch-none rounded-4xl border-t p-4 pb-16"
                        initial={{ y: "100%" }}
                        animate={{ y: 1 }}
                        exit={{ y: "100%" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        drag={"y"}
                        dragConstraints={{ top: 0, bottom: 0 }}
                        dragElastic={{ top: 0.05, bottom: 0.5 }}
                        onDragEnd={(event, info) => {
                            if (info.offset.y > 100 || info.velocity.y > 500) {
                                closeSheet();
                            }
                        }}
                    >
                        <div className="bg-textmute mx-auto mb-4 h-1.5 w-10 rounded-full" />
                        {children}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body,
    );
};

export default BottomSheet;
