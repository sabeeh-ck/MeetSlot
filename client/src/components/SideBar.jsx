import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { ChevronDoubleLeftIcon, LogoutIcon, PlusIcon } from "../icons";
import Nav from "./Nav";

const SideBar = ({ activeTab, setSearchParams }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const isAdmin = user?.role === "admin";

    return (
        <div className="flex h-full flex-col justify-between">
            <div className="flex h-full flex-col p-4">
                <Nav activeTab={activeTab} setSearchParams={setSearchParams} />

                <div
                    className={`border-border flex w-full flex-col items-center gap-4 border-t py-10`}
                >
                    {isAdmin && (
                        <button
                            onClick={() => navigate("/admin/new-meeting")}
                            className="active:bg-textmute md:hover:bg-textmute bg-text text-bg flex w-40 items-center justify-center gap-2 rounded-lg p-2"
                        >
                            <PlusIcon className="h-5" />
                            <p className="select-none">New Meeting</p>
                        </button>
                    )}

                    <button
                        onClick={() => {
                            logout();
                            navigate("/login");
                        }}
                        className="active:bg-bookedBg md:hover:bg-bookedBg text-bookedText border-bookedBorder flex w-40 items-center justify-center gap-2 rounded-lg border p-2"
                    >
                        <LogoutIcon className="h-5" />
                        <p className="select-none">Log Out</p>
                    </button>
                </div>
            </div>

            <div className="border-border hover:bg-border flex w-full justify-end border-t p-4">
                <ChevronDoubleLeftIcon className="h-5" />
            </div>
        </div>
    );
};

export default SideBar;
