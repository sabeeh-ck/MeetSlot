import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserCircleOutline, UserIconOutline, UserIconSolid } from "../icons";

const Header = () => {
    const { user } = useAuth();

    const isAdmin = user?.role === "admin";

    return (
        <header className="bg-bg border-border fixed top-0 z-70 flex h-16 w-full items-center justify-between border-b">
            <div
                className={`mx-auto flex w-full items-center justify-between px-4`}
            >
                <div>
                    <Link
                        to={isAdmin ? "/admin" : "/home"}
                        className="text-lg font-black"
                    >
                        MeetSlot
                    </Link>
                </div>
                <div className="border-border bg-surface group relative hidden items-center gap-2 rounded-lg border px-4 py-2 lg:flex">
                    <span className="text-sm font-semibold">{user?.name}</span>
                    <UserCircleOutline className="size-6" />

                    <div className="bg-border absolute top-full right-0 flex -translate-y-2 flex-col items-end gap-1 rounded-lg px-4 py-2 text-xs opacity-0 transition-all duration-300 group-hover:translate-y-2 group-hover:opacity-100">
                        <span>{user?.email}</span>
                        <span>{user?.role}</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
