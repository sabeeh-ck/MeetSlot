import { AnimatePresence } from "motion/react";
import { CheckIcon, ClockIcon, RoomIconSolid, XMarkIcon } from "../icons";
import { minutesTo12Hour } from "../utils/time";
import MenuModal from "./MenuModal";
import { useState } from "react";
import api from "../api/axios";

const BookingCard = ({
    booking: {
        _id,
        start,
        title,
        end,
        roomId: { name: roomName },
    },
    isPast,
    refetch,
}) => {
    const [menu, setMenu] = useState(false);
    const [rect, setRect] = useState(null);

    const handlOpenMenu = (e) => {
        setRect(e.currentTarget.getBoundingClientRect());
        setMenu(true);
    };

    const startTime = minutesTo12Hour(
        new Date(start).getHours() * 60 + new Date(start).getMinutes(),
    );

    const endTime = minutesTo12Hour(
        new Date(end).getHours() * 60 + new Date(end).getMinutes(),
    );

    const handleCancel = async (_id) => {
        try {
            setDeleting(true);

            await api.delete(`/user/delete/${_id}`);

            setMenu(false);
            setDeleting(false);
            refetch();
        } catch (error) {
            console.log(error);
        }
    };

    const Menu = () => (
        <MenuModal triggerRect={rect} closeMenu={() => setMenu(false)}>
            <div className="bg-surface border-border flex items-center gap-4 rounded-xl border py-2 pr-2 pl-4">
                <p className="font-medium">Are you sure?</p>
                <div className="flex gap-2">
                    <button
                        onClick={() => setMenu(false)}
                        className="border-border md:hover:bg-border active:bg-border rounded-lg border px-2 py-1"
                    >
                        <XMarkIcon className="h-5" />
                    </button>
                    <button
                        onClick={() => handleCancel(_id)}
                        className="border-bookedBorder text-bookedText md:hover:bg-bookedBg active:bg-bookedBg rounded-lg border px-2 py-1"
                    >
                        <CheckIcon className="h-5" />
                    </button>
                </div>
            </div>
        </MenuModal>
    );

    return (
        <div
            key={_id}
            className="bg-surface border-border flex justify-between rounded-xl border p-4"
        >
            <div className="flex flex-col gap-1">
                <h2 className="font-medium">{title}</h2>
                <div className="flex items-center gap-2">
                    <ClockIcon className="h-4" />
                    <p>{`${startTime} - ${endTime}`}</p>
                </div>
                <div className="flex items-center gap-2">
                    <RoomIconSolid className="h-4" />
                    <p>{roomName}</p>
                </div>
            </div>
            {!isPast && (
                <div className="flex flex-col items-center justify-between">
                    <button
                        onClick={handlOpenMenu}
                        className={`border-border md:hover:bg-border active:bg-border my-auto rounded-lg border px-4 py-1 ${menu ? "bg-border" : "bg-surface"}`}
                    >
                        Cancel
                    </button>

                    <AnimatePresence>{menu && <Menu />}</AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default BookingCard;
