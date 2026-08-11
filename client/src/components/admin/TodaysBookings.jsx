import { Link } from "react-router-dom";
import { ArrowUpRightIcon, PlusIcon } from "../../icons";
import { Fragment, useState } from "react";
import { AnimatePresence } from "motion/react";
import MenuModal from "../MenuModal";
import ConfirmMenu from "../ConfirmMenu";
import api from "../../api/axios";
import Skeleton from "react-loading-skeleton";

const TodaysBookings = ({ data, loading, refetch }) => {
    const [menu, setMenu] = useState(false);
    const [rect, setRect] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const handleOpenMenu = (e) => {
        setRect(e.currentTarget.getBoundingClientRect());
        setMenu(true);
    };

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
                <div className="border-border bg-surface flex h-full flex-col gap-4 rounded-xl border p-4">
                    {data?.length > 0 ? (
                        <>
                            <div className="text-textmute hidden font-bold md:grid md:grid-cols-[0.5fr_1fr_1fr_1fr_1fr_1fr_0.5fr]">
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
                                            <div className="flex items-center justify-between md:grid md:grid-cols-[0.5fr_1fr_1fr_1fr_1fr_1fr_0.5fr] md:gap-0">
                                                <div className="flex flex-col md:col-span-6 md:grid md:grid-cols-[0.5fr_1fr_1fr_1fr_1fr_1fr] md:gap-0">
                                                    <span className="hidden md:block md:max-w-fit">
                                                        {index + 1}
                                                    </span>
                                                    <span className="hidden md:block">
                                                        {startTime}
                                                    </span>
                                                    <span className="hidden md:block">
                                                        {endTime}
                                                    </span>
                                                    <span className="text-textmute mb-1 text-xs md:hidden">
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
                                                    <div className="text-textmute order-last flex gap-2 md:hidden">
                                                        <span>{roomName}</span>
                                                        <span>|</span>
                                                        <span>{userName}</span>
                                                    </div>
                                                </div>

                                                <div className="md:flex md:w-full md:justify-center">
                                                    <button
                                                        onClick={handleOpenMenu}
                                                        disabled={deleting}
                                                        className={`border-border md:hover:bg-border active:bg-border relative my-auto flex items-center justify-center gap-2 rounded-lg border px-4 py-1 ${menu ? "bg-border" : "bg-surface"}`}
                                                    >
                                                        <span
                                                            className={
                                                                deleting
                                                                    ? "invisible"
                                                                    : "visible text-sm"
                                                            }
                                                        >
                                                            Cancel
                                                        </span>
                                                        {deleting && (
                                                            <span className="border-text absolute h-4 w-4 animate-spin rounded-full border-3 border-t-transparent" />
                                                        )}
                                                    </button>

                                                    <AnimatePresence>
                                                        {menu && (
                                                            <MenuModal
                                                                triggerRect={
                                                                    rect
                                                                }
                                                                onClose={() =>
                                                                    setMenu(
                                                                        false,
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
                                                                        setMenu(
                                                                            false,
                                                                        )
                                                                    }
                                                                />
                                                            </MenuModal>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>

                                            {index < data.length - 1 && (
                                                <hr className="border-border md:hidden" />
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
