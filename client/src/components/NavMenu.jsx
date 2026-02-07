import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { motion } from "motion/react";
import { HomeIcon, LogoutIcon, UserIconOutline } from "../icons";

const NavMenu = ({ setMenu }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const home = location.pathname === "/";

    const closeMenu = () => setMenu(false);

    const menuButtons = [
        {
            label: home ? "My Meetings" : "Home",
            action: () => {
                home ? navigate("/user") : navigate("/");
                closeMenu();
            },
            icon: home ? (
                <UserIconOutline className="h-5" />
            ) : (
                <HomeIcon className="h-5" />
            ),
        },
        {
            label: "Log Out",
            action: () => {
                logout();
                closeMenu();
            },
            icon: <LogoutIcon className="h-5" />,
        },
    ];

    return (
        <nav>
            <motion.div
                key="backdrop"
                className="fixed inset-0 z-40 bg-black/40"
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
                <ul className="flex flex-col font-medium">
                    {menuButtons.map((button) => (
                        <div key={button.label}>
                            <li
                                onClick={button.action}
                                className="active:bg-border m-2 flex items-center gap-2 rounded-lg p-2"
                            >
                                {button.icon}
                                <p className="select-none">{button.label}</p>
                            </li>

                            {button === menuButtons[0] && (
                                <hr className="text-border" />
                            )}
                        </div>
                    ))}
                </ul>
            </motion.div>
        </nav>
    );
};

export default NavMenu;
