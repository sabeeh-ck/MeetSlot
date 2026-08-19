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
    RoleIcon,
    RoomIcon,
    UsersIcon,
    WhiteBoardIcon,
    XMarkIcon,
} from "../../icons";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import BottomSheet from "../../components/BottomSheet";
import ManageForm from "../../components/admin/ManageForm";
import Toast from "../../components/Toast";
import Skeleton from "react-loading-skeleton";

const ManagePage = ({ items }) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [sheet, setSheet] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [toast, setToast] = useState({
        isOpen: false,
        type: "",
        message: "",
    });

    const { isLaptop, isTablet } = useWindowWidth();
    const isRooms = items === "rooms";

    const fetchManageData = async (data) => {
        setLoading(true);
        try {
            const res = await api.get(`/admin/${data}`);
            setData(isRooms ? res.data.rooms : res.data.users);
        } catch (error) {
            console.log(error);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    const openSheet = (roomId) => {
        setEditingItem(data.find((room) => room._id === roomId));
        setSheet(isRooms ? "room" : "user");
    };
    const closeSheet = () => setSheet(null);
    const showToast = (type, message) => {
        setToast({ isOpen: true, type, message });
    };
    const closeToast = () => setToast((prev) => ({ ...prev, isOpen: false }));

    useEffect(() => {
        setSheet(false);
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
                            onClick={() => openSheet()}
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
                    ) : (
                        data?.map((data, index) => (
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
                                                <p>{data.location}</p>
                                            </div>
                                            <div className="flex items-center gap-2 md:justify-center">
                                                <UsersIcon className="h-4 md:hidden" />
                                                <p>{data.capacity}</p>
                                            </div>

                                            <div className="text-textmute flex items-center gap-1 md:col-span-2 md:grid md:grid-cols-2">
                                                {[
                                                    {
                                                        has: data.has_projector,
                                                        col: "col-start-1",
                                                        content: "Projector",
                                                        icon: ProjectorIcon,
                                                    },
                                                    {
                                                        has: data.has_whiteboard,
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
                                                <p>{data.email}</p>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <RoleIcon className="h-4 md:hidden" />
                                                <p className="capitalize">
                                                    {data.role}
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <button
                                    className="lg:hover:bg-border flex items-center justify-center rounded-md md:h-full md:w-full"
                                    onClick={() => openSheet(data._id)}
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
                    {sheet ? (
                        <ManageForm
                            key={`${sheet}-${editingItem?._id || "new"}`}
                            variant={sheet}
                            editingItem={editingItem}
                            onShowToast={showToast}
                            onDone={closeSheet}
                            onRefresh={() => fetchManageData(items)}
                        />
                    ) : (
                        <div className="text-textmute flex h-full items-center justify-center text-center text-sm">
                            Select an item or add a new one to manage it.
                        </div>
                    )}
                </aside>
            </div>

            {!isLaptop && (
                <BottomSheet isOpen={sheet} closeSheet={closeSheet}>
                    <ManageForm
                        key={`${sheet}-${editingItem?._id || "new"}`}
                        variant={sheet}
                        editingItem={editingItem}
                        onShowToast={showToast}
                        onDone={closeSheet}
                        onRefresh={() => fetchManageData(items)}
                    />
                </BottomSheet>
            )}

            <Toast
                type={toast.type}
                isOpen={toast.isOpen}
                onClose={closeToast}
                children={toast.message}
            />
        </section>
    );
};

export default ManagePage;
