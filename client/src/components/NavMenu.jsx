import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
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
            label: (
                <span className="text-bookedText font-bold select-none">
                    Log Out
                </span>
            ),
            action: () => {
                logout();
                closeMenu();
                navigate("/login");
            },
            icon: <LogoutIcon className="text-bookedText h-5" />,
        },
    ];

    return (
        <nav className="bg-surface border-border min-w-35 rounded-lg border">
            <ul className="flex flex-col font-medium">
                {menuButtons.map((button) => (
                    <div key={button.label}>
                        <li
                            onClick={button.action}
                            className="active:bg-border m-2 flex items-center gap-2 rounded-lg p-2"
                        >
                            {button.icon}
                            {button.label}
                        </li>

                        {button === menuButtons[0] && (
                            <hr className="text-border" />
                        )}
                    </div>
                ))}
            </ul>
        </nav>
    );
};

export default NavMenu;
