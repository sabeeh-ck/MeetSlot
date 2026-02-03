import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const BottomSheet = ({ closeSheet, open, children }) => {
    const [keyboardOffset, setKeyboardOffset] = useState(0);

    const initialVh = useRef(
        window.visualViewport?.height || window.innerHeight,
    );

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto";
        return () => (document.body.style.overflow = "auto");
    }, [open]);

    useEffect(() => {
        const onResize = () => {
            const currentVh =
                window.visualViewport?.height || window.innerHeight;

            const diff = initialVh.current - currentVh;

            setKeyboardOffset(Math.min(diff, 100));
        };

        window.visualViewport?.addEventListener("resize", onResize);
        return () =>
            window.visualViewport?.removeEventListener("resize", onResize);
    }, []);

    return (
        <>
            <motion.div
                key="backdrop"
                className="fixed inset-0 z-40 bg-black/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeSheet}
            />

            <motion.div
                key="sheet"
                className="border-border bg-bg fixed inset-x-0 -bottom-1/4 z-50 min-h-3/4 touch-none rounded-2xl border-x border-t p-4 pb-8"
                initial={{ y: "100%" }}
                animate={{ y: -keyboardOffset }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.2, ease: "easeIn" }}
                drag={keyboardOffset === 0 ? "y" : false}
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={{ top: 0.05, bottom: 0.5 }}
                onDragEnd={(event, info) => {
                    if (info.offset.y > 100 || info.velocity.y > 500) {
                        closeSheet();
                    }
                }}
            >
                <div className="bg-textmute mx-auto mb-3 h-1.5 w-15 rounded-full" />
                {children}
            </motion.div>
        </>
    );
};

export default BottomSheet;
