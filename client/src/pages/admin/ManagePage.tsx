import { useEffect, useState } from "react";
import api from "../../api/axios";
import {
    AddUserIcon,
    CheckIcon,
    EditIcon,
    EmailIcon,
    ExpandIcon,
    LocationIcon,
    ProjectorIcon,
    AdminIcon,
    RoomIcon,
    WhiteBoardIcon,
    XMarkIcon,
    UserIcon,
    CapacityIcon,
} from "../../icons";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import BottomSheet from "../../components/BottomSheet";
import ManageUserForm from "../../components/admin/ManageUserForm";
import Skeleton from "react-loading-skeleton";
import ManageRoomForm from "../../components/admin/ManageRoomForm";
import { Room, User } from "../../../../shared/types";
import { useToast } from "../../context/ToastContext";
import { isAxiosError } from "axios";

type ManagePageProps = {
    items: "rooms" | "users";
};

const ManagePage = ({ items }: ManagePageProps) => {
    const [loading, setLoading] = useState(true);
    const [rooms, setRooms] = useState<Room[] | null>(null);
    const [users, setUsers] = useState<User[] | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Room | User | null>(null);

    const { isLaptop, isTablet } = useWindowWidth();
    const { showToast } = useToast();
    const isRooms = items === "rooms";

    const fetchManageData = async (data: "rooms" | "users") => {
        setLoading(true);
        try {
            const res = await api.get(`/admin/${data}`);
            isRooms ? setRooms(res.data.rooms) : setUsers(res.data.users);
        } catch (error: unknown) {
            if (isAxiosError<{ msg?: string }>(error)) {
                const message = error.response?.data.msg ?? error.message;
                showToast("error", message);
            } else {
                console.error(error || "Unable to delete room.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setIsSheetOpen(false);
        setEditingItem(null);
        fetchManageData(items);
    }, [items]);

    return (
        <section className="flex flex-1 flex-col">
            <div className="flex flex-1 lg:min-h-0">
                <div className="m-4 flex min-w-0 flex-1 flex-col gap-3 md:gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold">
                            {isRooms ? "Rooms" : "Users"}
                        </h2>

                        <button
                            onClick={() => {
                                setIsSheetOpen(true);
                                setEditingItem(null);
                            }}
                            className="border-border bg-text text-bg flex items-center gap-2 rounded-xl border p-2 md:static md:rounded-lg md:px-3 md:py-1"
                        >
                            {isRooms ? (
                                <RoomIcon className="size-5" />
                            ) : (
                                <AddUserIcon className="size-4" />
                            )}
                            <span className="text-sm md:text-base">Add</span>
                        </button>
                    </div>

                    <div
                        className={`text-textmute hidden font-bold md:grid ${isRooms ? "md:grid-cols-[0.25fr_1.5fr_1.5fr_0.75fr_1fr_1fr_0.5fr]" : "md:grid-cols-[0.25fr_1.5fr_1.5fr_1fr_0.5fr]"}`}
                    >
                        <span>No</span>
                        <span>Name</span>
                        {isRooms ? (
                            <>
                                <span>Location</span>
                                <span className="text-center">Capacity</span>
                                <span className="text-center">Projector</span>
                                <span className="text-center">Whiteboard</span>
                            </>
                        ) : (
                            <>
                                <span>Email</span>
                                <span>Role</span>
                            </>
                        )}
                        <span className="text-center">Action</span>
                    </div>

                    <hr className="border-border hidden md:block" />

                    {loading ? (
                        <div className="flex flex-col gap-3 md:gap-4">
                            {[...Array(5)].map((_, index) => (
                                <Skeleton
                                    key={index}
                                    borderRadius={12}
                                    containerClassName="leading-px"
                                    className={
                                        isRooms
                                            ? "h-37.5 md:h-10"
                                            : "h-29.5 md:h-10"
                                    }
                                />
                            ))}
                        </div>
                    ) : !(isRooms ? rooms : users)?.length ? (
                        <div className="flex h-full w-full items-center justify-center">
                            <p className="text-textmute text-sm lg:text-base">
                                No {items} found. Add new {items}
                            </p>
                        </div>
                    ) : (
                        (isRooms ? rooms : users)?.map((data, index) => (
                            <div
                                key={data._id}
                                className={`border-border md:bg-bg bg-surface flex w-full items-start justify-between rounded-lg border p-4 md:grid md:border-0 md:px-0 md:py-2 ${isRooms ? "h-37.5 md:h-10 md:grid-cols-[0.25fr_1.5fr_1.5fr_0.75fr_1fr_1fr_0.5fr]" : "h-29.5 md:h-10 md:grid-cols-[0.25fr_1.5fr_1.5fr_1fr_0.5fr]"}`}
                            >
                                <div
                                    className={`flex w-full flex-col gap-2 md:grid md:gap-0 ${isRooms ? "md:col-span-6 md:grid-cols-[0.25fr_1.5fr_1.5fr_0.75fr_1fr_1fr]" : "md:col-span-4 md:grid-cols-[0.25fr_1.5fr_1.5fr_1fr]"}`}
                                >
                                    <span className="hidden md:block">
                                        {index + 1}
                                    </span>
                                    <p className="text-xl! font-medium md:text-base!">
                                        {data.name}
                                    </p>

                                    {isRooms ? (
                                        <>
                                            <div className="flex items-center gap-2">
                                                <LocationIcon className="h-4 md:hidden" />
                                                <p>{(data as Room).location}</p>
                                            </div>
                                            <div className="flex items-center gap-2 md:justify-center">
                                                <CapacityIcon className="h-4 md:hidden" />
                                                <p>{(data as Room).capacity}</p>
                                            </div>

                                            <div className="text-textmute flex items-center gap-1 md:col-span-2 md:grid md:grid-cols-2">
                                                {[
                                                    {
                                                        has: (data as Room)
                                                            .has_projector,
                                                        col: "col-start-1",
                                                        content: "Projector",
                                                        icon: ProjectorIcon,
                                                    },
                                                    {
                                                        has: (data as Room)
                                                            .has_whiteboard,
                                                        col: "col-start-2",
                                                        content: "Whiteboard",
                                                        icon: WhiteBoardIcon,
                                                    },
                                                ].map(
                                                    ({
                                                        has,
                                                        col,
                                                        content,
                                                        icon,
                                                    }) => {
                                                        const Icon = icon;
                                                        return has ? (
                                                            isTablet ? (
                                                                <div
                                                                    key={
                                                                        content
                                                                    }
                                                                    className={`flex items-center justify-center ${col}`}
                                                                >
                                                                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400 ring-1 ring-emerald-400/20 ring-inset lg:text-sm">
                                                                        <CheckIcon className="size-4 stroke-3" />
                                                                        Available
                                                                    </span>
                                                                </div>
                                                            ) : (
                                                                <div
                                                                    key={
                                                                        content
                                                                    }
                                                                    className="bg-border flex w-fit items-center gap-1 rounded-full px-2 py-1 text-xs"
                                                                >
                                                                    <Icon className="size-3" />
                                                                    {content}
                                                                </div>
                                                            )
                                                        ) : isTablet ? (
                                                            <div
                                                                key={content}
                                                                className="flex items-center justify-center rounded-md text-sm"
                                                            >
                                                                <span className="inline-flex items-center gap-1 rounded-full bg-red-400/10 px-2.5 py-0.5 text-xs font-medium text-red-400 ring-1 ring-red-400/20 ring-inset lg:text-sm">
                                                                    <XMarkIcon className="size-4" />
                                                                    Not
                                                                    Available
                                                                </span>
                                                            </div>
                                                        ) : null;
                                                    },
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex items-center gap-2">
                                                <EmailIcon className="h-4 md:hidden" />
                                                <p>{(data as User).email}</p>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {(data as User).role ===
                                                "admin" ? (
                                                    <AdminIcon className="h-4" />
                                                ) : (
                                                    <UserIcon className="h-4" />
                                                )}
                                                <p className="capitalize">
                                                    {(data as User).role}
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <button
                                    className="lg:hover:bg-border flex items-center justify-center rounded-md md:h-full md:w-full"
                                    onClick={() => {
                                        setEditingItem(data);
                                        setIsSheetOpen(true);
                                    }}
                                >
                                    {isLaptop ? (
                                        <EditIcon className="size-4" />
                                    ) : (
                                        <ExpandIcon className="size-4" />
                                    )}
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <aside className="border-border hidden w-90 shrink-0 border-l p-6 lg:block">
                    {isRooms ? (
                        <ManageRoomForm
                            key={editingItem?._id || "new"}
                            editingItem={editingItem as Room}
                            onDone={() => {
                                setIsSheetOpen(false);
                                setEditingItem(null);
                            }}
                            onRefresh={() => fetchManageData(items)}
                        />
                    ) : (
                        <ManageUserForm
                            key={editingItem?._id || "new"}
                            editingItem={editingItem as User}
                            onDone={() => {
                                setIsSheetOpen(false);
                                setEditingItem(null);
                            }}
                            onRefresh={() => fetchManageData(items)}
                        />
                    )}
                </aside>
            </div>

            {!isLaptop && (
                <BottomSheet
                    isOpen={isSheetOpen}
                    closeSheet={() => setIsSheetOpen(false)}
                >
                    {isRooms ? (
                        <ManageRoomForm
                            editingItem={editingItem as Room}
                            onDone={() => {
                                setIsSheetOpen(false);
                                setEditingItem(null);
                            }}
                            onRefresh={() => fetchManageData(items)}
                        />
                    ) : (
                        <ManageUserForm
                            editingItem={editingItem as User}
                            onDone={() => {
                                setIsSheetOpen(false);
                                setEditingItem(null);
                            }}
                            onRefresh={() => fetchManageData(items)}
                        />
                    )}
                </BottomSheet>
            )}
        </section>
    );
};

export default ManagePage;
