import { useEffect, useState } from "react";
import Nav from "./Nav";
import { AnimatePresence, motion } from "motion/react";

const BottomNav = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isExpanded ? "hidden" : "auto";
        return () => (document.body.style.overflow = "auto");
    }, [isExpanded]);

    const minimiseNav = () => setIsExpanded(false);
    const expandNav = () => setIsExpanded(true);

    return (
        <>
            <motion.div
                key="bottom-nav"
                initial={false}
                animate={{
                    height: isExpanded ? "350px" : "60px",
                    scale: isExpanded ? 1 : 0.98,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                    mass: 0.8,
                }}
                className="bg-surface border-border fixed inset-x-6 bottom-6 z-50 flex origin-bottom items-center overflow-hidden rounded-4xl border shadow-xl lg:hidden"
            >
                <Nav
                    isExpanded={isExpanded}
                    expandNav={expandNav}
                    minimiseNav={minimiseNav}
                />
            </motion.div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        key="backdrop"
                        className="fixed inset-0 z-49 bg-black/40 backdrop-blur-xs"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        onClick={minimiseNav}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default BottomNav;
