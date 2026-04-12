import { NavLink, useLocation, useNavigate } from "react-router";
import { HomeIcon, LogoutIcon, MenuIcon, UserIconOutline } from "../icons";
import { useAuth } from "../context/AuthContext";

const Nav = ({ menu }) => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const { pathname } = useLocation();

    const home = pathname === "/";

    const navItems = [
        {
            name: "Dashboard",
            icon: "",
        },
        {
            name: "Bookings",
            icon: "",
        },
        {
            name: "Rooms",
            icon: "",
        },
        {
            name: "My Meetings",
            icon: <UserIconOutline className="h-5" />,
        },
    ];

    return (
        <>
            {user?.role === "admin" ? (
                <nav className="z-60 hidden h-full items-start justify-between gap-2 font-semibold lg:flex lg:flex-col">
                    <div className="flex w-full flex-col gap-2">
                        {navItems.map(({ name, icon }) => (
                            <button
                                key={name}
                                className="active:bg-border border-border md:hover:bg-border flex w-full items-center gap-2 rounded-lg p-2"
                            >
                                {icon}
                                <p className="select-none">{name}</p>
                            </button>
                        ))}
                    </div>

                    <div className="flex w-full flex-col items-center gap-4">
                        <button className="active:bg-textmute md:hover:bg-textmute bg-text text-bg flex w-40 justify-center gap-2 rounded-lg p-2">
                            New Meeting
                        </button>

                        <button
                            className="active:bg-border md:hover:bg-border border-border flex w-40 items-center justify-center gap-2 rounded-lg border p-2"
                            onClick={() => {
                                logout();
                                navigate("/login");
                            }}
                        >
                            <LogoutIcon className="h-5" />
                            <p className="text-base select-none">Log Out</p>
                        </button>
                    </div>
                </nav>
            ) : (
                <nav className="z-60 hidden gap-4 font-semibold lg:flex">
                    {home ? (
                        <NavLink
                            to="/user"
                            className={
                                "active:bg-border border-border md:hover:bg-border flex items-center gap-2 rounded-lg border p-2"
                            }
                        >
                            <UserIconOutline className="h-5" />
                            <p className="select-none">My Meetings</p>
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

                    <button
                        className="active:bg-border md:hover:bg-border border-border flex items-center gap-2 rounded-lg border p-2"
                        onClick={() => {
                            logout();
                            navigate("/login");
                        }}
                    >
                        <LogoutIcon className="h-5" />
                        <p className="text-base select-none">Log Out</p>
                    </button>
                </nav>
            )}

            <button
                className={`border-border active:bg-border rounded-lg border p-2 lg:hidden ${menu ? "bg-border" : "bg-surface"}`}
            >
                <MenuIcon className="h-5" />
            </button>
        </>
    );
};

export default Nav;
