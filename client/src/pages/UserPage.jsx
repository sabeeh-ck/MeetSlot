import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogoutIcon, UserCircleSolid } from "../icons";

const UserPage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="m-4 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <UserCircleSolid className="size-20" />
                <div>
                    <h3 className="font-bold">{user.name}</h3>
                    <code className="text-textmute">{user.email}</code>
                </div>
            </div>

            <button
                onClick={() => {
                    logout();
                    navigate("/login");
                }}
                className="active:bg-bookedBorder text-bookedText bg-bookedBg border-bookedBorder mt-4 flex w-40 items-center justify-center gap-2 self-center rounded-lg border py-4 transition-all active:scale-95 md:self-start"
            >
                <LogoutIcon className="h-5" />
                <p className="select-none">Log Out</p>
            </button>
        </div>
    );
};

export default UserPage;
