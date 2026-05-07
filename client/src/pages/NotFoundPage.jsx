import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

const NotFoundPage = () => {
    const { user } = useAuth();

    const isAdmin = user?.role === "admin";

    return (
        <>
            <header className="bg-bg border-border fixed top-0 z-70 flex h-16 w-full items-center border-b">
                <div
                    className={`mx-auto flex w-full items-center justify-between px-4 ${isAdmin ? "" : "max-w-7xl"}`}
                >
                    <div>
                        <Link
                            to={isAdmin ? "/admin" : "/"}
                            className="text-lg font-black"
                        >
                            MeetSlot
                        </Link>
                    </div>
                </div>
            </header>
            <main className="flex h-dvh w-full flex-col items-center justify-center gap-2">
                <h1 className="font-medium">Error 404</h1>
                <p className="text-textmute text-xs">You're lost bro 💀</p>
            </main>
        </>
    );
};

export default NotFoundPage;
