import { ClockIcon, RoomIcon } from "../icons";
import { minutesTo12Hour } from "../utils/time";
import MenuModal from "./MenuModal";
import { useState } from "react";
import api from "../api/axios";
import ConfirmMenu from "./ConfirmMenu";

const BookingCard = ({
    booking: { _id, start, title, end, roomId },
    isPast,
    refetch,
}) => {
    const roomName = roomId?.name ?? "Deleted room";
    const [menu, setMenu] = useState(false);
    const [rect, setRect] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const handleOpenMenu = (e) => {
        setRect(e.currentTarget.getBoundingClientRect());
        setMenu(true);
    };

    const startTime = minutesTo12Hour(
        new Date(start).getUTCHours() * 60 + new Date(start).getUTCMinutes(),
    );

    const endTime = minutesTo12Hour(
        new Date(end).getUTCHours() * 60 + new Date(end).getUTCMinutes(),
    );

    const handleDelete = async (_id) => {
        try {
            setMenu(false);
            setDeleting(true);

            await api.delete(`/user/delete/${_id}`);

            setDeleting(false);
            refetch();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            key={_id}
            className="bg-surface border-border flex h-29.5 items-center justify-between rounded-xl border p-4 lg:h-33"
        >
            <div className="flex flex-col gap-2">
                <h2 className="font-medium capitalize">{title}</h2>
                <div className="flex items-center gap-2">
                    <ClockIcon className="h-4" />
                    <p>{`${startTime} - ${endTime}`}</p>
                </div>
                <div className="flex items-center gap-2">
                    <RoomIcon className="h-4" />
                    <p>{roomName}</p>
                </div>
            </div>

            {!isPast && (
                <div className="flex flex-col items-center justify-between">
                    <button
                        onClick={handleOpenMenu}
                        disabled={deleting}
                        className={`border-border md:hover:bg-border active:bg-border relative my-auto flex items-center justify-center gap-2 rounded-lg border px-4 py-1 ${menu ? "bg-border" : "bg-surface"}`}
                    >
                        <span className={deleting ? "invisible" : "visible"}>
                            Cancel
                        </span>
                        {deleting && (
                            <span className="border-text absolute h-4 w-4 animate-spin rounded-full border-3 border-t-transparent" />
                        )}
                    </button>

                    <MenuModal
                        triggerRect={rect}
                        onClose={() => setMenu(false)}
                    >
                        <ConfirmMenu
                            onConfirm={() => handleDelete(_id)}
                            onCancel={() => setMenu(false)}
                        />
                    </MenuModal>
                </div>
            )}
        </div>
    );
};

export default BookingCard;
