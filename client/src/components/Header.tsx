import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserCircleIcon, UserIcon } from "../icons";
import { DemoBadge } from "./DemoComponents";

const Header = () => {
    const { user, isDemo } = useAuth();

    const isAdmin = user?.role === "admin";

    return (
        <header className="bg-bg border-border fixed top-0 z-70 flex h-16 w-full items-center justify-between border-b">
            <div
                className={`mx-auto flex w-full items-center justify-between px-4`}
            >
                <div className="flex items-center gap-3">
                    <Link
                        to={isAdmin ? "/admin" : "/home"}
                        className="text-lg font-black"
                    >
                        MeetSlot
                    </Link>

                    {isDemo && <DemoBadge />}
                </div>
                <div className="border-border bg-surface group relative hidden items-center gap-2 rounded-lg border px-4 py-2 lg:flex">
                    <span className="text-sm font-semibold">{user?.name}</span>
                    <UserCircleIcon className="size-6" />

                    <div className="invisible absolute top-full right-0 z-80 pt-2 opacity-0 transition-[opacity,visibility] duration-200 group-hover:visible group-hover:opacity-100">
                        <div className="border-border bg-surface flex min-w-max flex-col items-end gap-1 rounded-lg border px-4 py-3 text-xs shadow-lg">
                            <span className="font-medium">{user?.email}</span>
                            <span className="text-textmute capitalize">
                                {user?.role}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
