import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import Menu from "./Menu";
import MenuModal from "./MenuModal";
import { useAuth } from "../context/AuthContext";
import { UserIconOutline, UserIconSolid } from "../icons";

const Header = () => {
    const [menu, setMenu] = useState(false);
    const [rect, setRect] = useState(false);

    const { pathname } = useLocation();
    const { user } = useAuth();

    const handleOpenMenu = (e) => {
        setRect(e.currentTarget.getBoundingClientRect());
        setMenu(true);
    };

    return (
        <>
            <header className="bg-bg border-border sticky top-0 z-70 flex h-16 w-full items-center justify-between border-b">
                <div
                    className={`mx-auto flex w-full items-center justify-between ${user?.role === "admin" ? "px-6" : "max-w-7xl px-4"}`}
                >
                    <div>
                        <Link
                            to={user?.role === "admin" ? "/admin" : "/"}
                            className="text-lg font-black"
                        >
                            MeetSlot
                        </Link>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {menu && (
                    <MenuModal
                        triggerRect={rect}
                        onClose={() => setMenu(false)}
                    >
                        <Menu setMenu={setMenu} />
                    </MenuModal>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
