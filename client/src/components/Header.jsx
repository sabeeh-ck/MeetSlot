import { useAuth } from "../context/AuthContext";
import { UserIcon, ArrowLeftEndOnRectangleIcon } from "../icons";

import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { logout } = useAuth();

    const toUser = () => navigate("/user");

    const headerButtons = [
        {
            label: "My Meetings",
            action: toUser,
            icon: <UserIcon className="h-5" />,
        },
        {
            label: "Log Out",
            action: logout,
            icon: <ArrowLeftEndOnRectangleIcon className="h-5" />,
        },
    ];

    return (
        <header className="bg-bg border-border sticky top-0 z-60 flex h-14 w-full items-center justify-between border-b px-4">
            <div>
                <Link to={"/"} className="text-lg font-black">
                    MeetSlot
                </Link>
            </div>

            {["/", "/user"].includes(location.pathname) && (
                <div className="flex gap-2 p-2">
                    {headerButtons.map((button) => (
                        <button
                            key={button.label}
                            title={button.label}
                            className="border-border active:bg-border rounded-lg border p-2"
                            onClick={button.action}
                        >
                            {button.icon}
                        </button>
                    ))}
                </div>
            )}
        </header>
    );
};

export default Header;
