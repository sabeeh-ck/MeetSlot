import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import NavMenu from "./NavMenu";
import MenuModal from "./MenuModal";
import Nav from "./Nav";
import { useWindowWidth } from "../hooks/useWindowWidth";

const Header = () => {
    const [menu, setMenu] = useState(false);
    const [rect, setRect] = useState(false);

    const { pathname } = useLocation();
    const { isMobile, isLaptop } = useWindowWidth();

    return (
        <>
            <header className="bg-bg border-border sticky top-0 z-70 flex h-16 w-full items-center justify-between border-b">
                <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4">
                    <div>
                        <Link to={"/"} className="text-lg font-black">
                            MeetSlot
                        </Link>
                    </div>

                    {pathname !== "/login" && isMobile && <Nav menu={menu} />}
                </div>
            </header>

            <AnimatePresence>
                {menu && (
                    <MenuModal
                        triggerRect={rect}
                        closeMenu={() => setMenu(false)}
                    >
                        <NavMenu setMenu={setMenu} />
                    </MenuModal>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
