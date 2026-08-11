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
        <AnimatePresence>
            <div
                className={`bg-surface border-border fixed inset-x-6 bottom-6 z-50 flex items-center border shadow-xl lg:hidden ${isExpanded ? "rounded-4xl" : "rounded-full"}`}
            >
                <Nav
                    isExpanded={isExpanded}
                    expandNav={expandNav}
                    minimiseNav={minimiseNav}
                />
            </div>

            {isExpanded && (
                <motion.div
                    key="backdrop"
                    className="fixed inset-0 z-49 bg-black/40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={minimiseNav}
                />
            )}
        </AnimatePresence>
    );
};

export default BottomNav;
