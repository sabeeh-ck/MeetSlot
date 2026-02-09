import { useEffect, useState } from "react";
import { HomeIcon, LogoutIcon, MenuIcon, UserIconOutline } from "../icons";

import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import NavMenu from "./NavMenu";

const Header = () => {
    const [menu, setMenu] = useState(false);

    useEffect(() => {
        document.body.style.overflow = menu ? "hidden" : "auto";
        return () => (document.body.style.overflow = "auto");
    }, [menu]);

    const { pathname } = useLocation();
    const home = pathname === "/";

    return (
        <>
            <header className="bg-bg border-border sticky top-0 z-70 flex h-16 w-full items-center justify-between border-b">
                <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4">
                    <div>
                        <Link to={"/"} className="text-lg font-black">
                            MeetSlot
                        </Link>
                    </div>

                    {pathname !== "/login" && (
                        <>
                            <nav className="z-60 hidden items-center gap-4 font-semibold lg:flex">
                                {home ? (
                                    <NavLink
                                        to="/user"
                                        className="active:bg-border border-border md:hover:bg-border flex items-center gap-2 rounded-lg border p-2"
                                    >
                                        <UserIconOutline className="h-5" />
                                        <p className="select-none">
                                            My Meetings
                                        </p>
                                    </NavLink>
                                ) : (
                                    <NavLink
                                        to="/"
                                        className="active:bg-border border-border md:hover:bg-border flex items-center gap-2 rounded-lg border p-2"
                                    >
                                        <HomeIcon className="h-5" />
                                        <p className="select-none">Home</p>
                                    </NavLink>
                                )}

                                <button className="active:bg-border md:hover:bg-border border-border flex items-center gap-2 rounded-lg border p-2">
                                    <LogoutIcon className="h-5" />
                                    <p className="text-base select-none">
                                        Log Out
                                    </p>
                                </button>
                            </nav>

                            <button
                                onClick={() => setMenu((p) => !p)}
                                className={`border-border active:bg-border rounded-lg border p-2 lg:hidden ${menu ? "bg-border" : "bg-surface"}`}
                            >
                                <MenuIcon className="h-5" />
                            </button>
                        </>
                    )}
                </div>
            </header>

            <AnimatePresence>
                {menu && <NavMenu setMenu={setMenu} />}
            </AnimatePresence>
        </>
    );
};

export default Header;
