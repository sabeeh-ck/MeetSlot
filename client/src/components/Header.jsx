import { useEffect, useState } from "react";
import { MenuIcon } from "../icons";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import NavMenu from "./NavMenu";

const Header = () => {
    const [menu, setMenu] = useState(false);

    useEffect(() => {
        document.body.style.overflow = menu ? "hidden" : "auto";
        return () => (document.body.style.overflow = "auto");
    }, [menu]);

    const location = useLocation();

    const toggleMenu = () => setMenu((prev) => !prev);

    return (
        <>
            <header className="bg-bg border-border sticky top-0 z-60 flex h-16 w-full items-center justify-between border-b px-4">
                <div>
                    <Link to={"/"} className="text-lg font-black">
                        MeetSlot
                    </Link>
                </div>

                {location.pathname !== "/login" && (
                    <button
                        title="Menu"
                        className={`border-border active:bg-border rounded-lg border p-2 ${menu ? "bg-border" : "bg-surface"}`}
                        onClick={toggleMenu}
                    >
                        <MenuIcon className="h-5" />
                    </button>
                )}
            </header>

            <AnimatePresence>
                {menu && <NavMenu setMenu={setMenu} />}
            </AnimatePresence>
        </>
    );
};

export default Header;
