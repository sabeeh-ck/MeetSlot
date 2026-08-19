import { Link } from "react-router-dom";
import {
    ArrowUpRightIcon,
    LoaderIcon,
    PlusIcon,
    RoomIcon,
    TrashIcon,
    UserIcon,
} from "../../icons";
import { Fragment, useState } from "react";
import MenuModal from "../MenuModal";
import ConfirmMenu from "../ConfirmMenu";
import api from "../../api/axios";
import Skeleton from "react-loading-skeleton";

const TodaysBookings = ({ data, loading, refetch }) => {
    const [activeMenuId, setActiveMenuId] = useState(null);
    const [rect, setRect] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    const handleOpenMenu = (e, _id) => {
        setRect(e.currentTarget.getBoundingClientRect());
        setActiveMenuId(_id);
    };

    const handleDelete = async (_id) => {
        try {
            setActiveMenuId(null);
            setDeletingId(_id);

            await api.delete(`/user/delete/${_id}`);

            setDeletingId(null);
            refetch();
        } catch (error) {
            console.log(error);
            setDeletingId(null);
        }
    };

    return (
        <section className="flex h-full flex-col gap-2">
            <div className="flex items-center justify-between">
                <h3>Today's Bookings</h3>
                <Link
                    to={"/admin/bookings"}
                    className="lg:hover:border-text active:border-text flex cursor-pointer items-center gap-2 border-b border-transparent leading-0"
                >
                    <span className="">see all</span>
                    <ArrowUpRightIcon className="size-4" />
                </Link>
            </div>

            {loading ? (
                <Skeleton
                    height={500}
                    containerClassName="leading-px "
                    className="w-full"
                    borderRadius={12}
                />
            ) : (
                <div className="border-border bg-surface flex h-full flex-col gap-4 rounded-xl border p-4 md:gap-2">
                    {data?.length > 0 ? (
                        <>
                            <div className="text-textmute hidden font-bold md:grid md:grid-cols-[0.25fr_1fr_1fr_1fr_1fr_1fr_0.5fr] md:gap-1">
                                <span>No</span>
                                <span>Start</span>
                                <span>End</span>
                                <span>Room</span>
                                <span>Title</span>
                                <span>Booked by</span>
                                <span>Action</span>
                            </div>

                            <hr className="border-border hidden md:block" />

                            {[...data]
                                .sort(
                                    (a, b) =>
                                        new Date(a.start) - new Date(b.start),
                                )
                                .map((booking, index) => {
                                    const {
                                        _id,
                                        roomId,
                                        start,
                                        end,
                                        title,
                                        user,
                                    } = booking;

                                    const roomName =
                                        roomId?.name ?? "Deleted room";
                                    const userName =
                                        user?.name ?? "Deleted user";

                                    const isMenuOpen = activeMenuId === _id;
                                    const isDeleting = deletingId === _id;

                                    const startTime = new Date(
                                        start,
                                    ).toLocaleTimeString("en-IN", {
                                        hour: "numeric",
                                        minute: "2-digit",
                                        hour12: true,
                                        timeZone: "UTC",
                                    });

                                    const endTime = new Date(
                                        end,
                                    ).toLocaleTimeString("en-IN", {
                                        hour: "numeric",
                                        minute: "2-digit",
                                        hour12: true,
                                        timeZone: "UTC",
                                    });

                                    return (
                                        <Fragment key={index}>
                                            <div className="flex items-center justify-between md:grid md:grid-cols-[0.25fr_1fr_1fr_1fr_1fr_1fr_0.5fr] md:gap-1">
                                                <div className="flex flex-col gap-1 md:contents">
                                                    <span className="hidden md:block md:max-w-fit">
                                                        {index + 1}
                                                    </span>
                                                    <span className="hidden md:block">
                                                        {startTime}
                                                    </span>
                                                    <span className="hidden md:block">
                                                        {endTime}
                                                    </span>
                                                    <span className="text-textmute text-xs md:hidden">
                                                        {startTime} - {endTime}
                                                    </span>
                                                    <span className="hidden md:block">
                                                        {roomName}
                                                    </span>
                                                    <span className="font-bold md:font-normal">
                                                        {title}
                                                    </span>
                                                    <span className="hidden md:block">
                                                        {userName}
                                                    </span>
                                                    <span className="text-textmute flex gap-2 text-xs md:hidden">
                                                        <RoomIcon className="size-3 stroke-3" />
                                                        {roomName}
                                                    </span>
                                                    <span className="text-textmute flex gap-2 text-xs md:hidden">
                                                        <UserIcon className="size-3 stroke-3" />
                                                        {userName}
                                                    </span>
                                                </div>

                                                <div className="md:flex md:w-full md:justify-center">
                                                    <button
                                                        onClick={(e) =>
                                                            handleOpenMenu(
                                                                e,
                                                                _id,
                                                            )
                                                        }
                                                        disabled={isDeleting}
                                                        className={`border-border md:hover:bg-border active:bg-border relative my-auto flex items-center justify-center gap-2 rounded-lg border px-4 py-2 ${isMenuOpen ? "bg-border" : "bg-surface"}`}
                                                    >
                                                        {isDeleting ? (
                                                            <LoaderIcon className="s size-4 animate-spin" />
                                                        ) : (
                                                            <TrashIcon className="size-4 text-red-700/40" />
                                                        )}
                                                    </button>

                                                    <MenuModal
                                                        open={isMenuOpen}
                                                        triggerRect={rect}
                                                        onClose={() =>
                                                            setActiveMenuId(
                                                                null,
                                                            )
                                                        }
                                                    >
                                                        <ConfirmMenu
                                                            onConfirm={() =>
                                                                handleDelete(
                                                                    _id,
                                                                )
                                                            }
                                                            onCancel={() =>
                                                                setActiveMenuId(
                                                                    null,
                                                                )
                                                            }
                                                        />
                                                    </MenuModal>
                                                </div>
                                            </div>

                                            {index < data.length - 1 && (
                                                <hr className="border-border" />
                                            )}
                                        </Fragment>
                                    );
                                })}
                        </>
                    ) : (
                        <div className="text-textmute flex h-full flex-col items-center justify-center gap-4 py-4">
                            <span>No bookings for today.</span>
                            <div>
                                <Link
                                    to={"/admin/new-meeting"}
                                    className="active:bg-text active:text-bg lg:hover:text-bg lg:hover:bg-text border-textmute text-text flex items-center justify-center gap-2 rounded-lg border px-4 py-2 font-bold"
                                >
                                    <PlusIcon className="h-5" />
                                    <p className="select-none">
                                        Book a meeting
                                    </p>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

export default TodaysBookings;
