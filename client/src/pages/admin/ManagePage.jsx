import { useEffect, useState } from "react";
import api from "../../api/axios";
import {
    AddUserIcon,
    CheckIcon,
    EmailIcon,
    ExpandIcon,
    LocationIcon,
    PencilIcon,
    PlusIcon,
    ProjectorIcon,
    RoleIcon,
    RoomIcon,
    TrashIcon,
    UsersIcon,
    WhiteBoardIcon,
    XMarkIcon,
} from "../../icons";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import MenuModal from "../../components/MenuModal";
import ConfirmMenu from "../../components/ConfirmMenu";
import BottomSheet from "../../components/BottomSheet";
import ManageForm from "../../components/admin/ManageForm";
import Toast from "../../components/Toast";

const ManagePage = ({ items }) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [sheet, setSheet] = useState(false);
    const [modal, setModal] = useState(false);
    const [rect, setRect] = useState(null);
    const [editingItem, setEditingItem] = useState(null);
    const [toast, setToast] = useState({
        isOpen: false,
        type: "",
        message: "",
    });

    const { isLaptop } = useWindowWidth();
    const isRooms = items === "rooms";

    const fetchManageData = async (data) => {
        try {
            const res = await api.get(`/admin/${data}`);
            setData(isRooms ? res.data.rooms : res.data.users) ?? [];
        } catch (error) {
            console.log(error);
            setMessage("Unable to load data.");
        } finally {
            setLoading(false);
        }
    };

    const openSheet = (roomId) => {
        setEditingItem(data.find((room) => room._id === roomId));
        setSheet(isRooms ? "room" : "user");
    };
    const closeSheet = () => setSheet(null);
    const openModal = (e) => {
        setRect(e.currentTarget.getBoundingClientRect());
        setModal(true);
    };
    const showToast = (type, message) => {
        setToast({ isOpen: true, type, message });
    };
    const closeToast = () => setToast((prev) => ({ ...prev, isOpen: false }));

    useEffect(() => {
        fetchManageData(items);
    }, [items]);

    if (data === null) return;

    return (
        <section className="flex flex-1 flex-col">
            <div className="mx-4 mt-4 flex items-center justify-between">
                <h2 className="font-semibold">{isRooms ? "Rooms" : "Users"}</h2>

                <button
                    onClick={() => openSheet()}
                    className="border-border bg-text text-bg flex items-center gap-2 rounded-xl border p-2 lg:static lg:rounded-lg lg:px-3 lg:py-1"
                >
                    {isRooms ? (
                        <RoomIcon className="size-5" />
                    ) : (
                        <AddUserIcon className="size-4" />
                    )}
                    <span className="text-sm md:text-base">Add</span>
                </button>
            </div>

            <div className="m-4 flex flex-1 flex-col gap-3 md:gap-4">
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

                {data.map((data, index) => (
                    <div
                        key={data._id}
                        className={`border-border lg:bg-bg bg-surface flex w-full items-start justify-between rounded-lg border p-4 md:grid md:border-0 md:px-0 md:py-2 ${isRooms ? "md:grid-cols-[0.25fr_1.5fr_1.5fr_0.75fr_1fr_1fr_0.5fr]" : "md:grid-cols-[0.25fr_1.5fr_1.5fr_1fr_0.5fr]"}`}
                    >
                        <div
                            className={`flex w-full flex-col gap-2 md:grid md:gap-0 ${isRooms ? "md:col-span-6 md:grid-cols-[0.25fr_1.5fr_1.5fr_0.75fr_1fr_1fr]" : "md:col-span-4 md:grid-cols-[0.25fr_1.5fr_1.5fr_1fr]"}`}
                        >
                            <span className="hidden lg:block">{index + 1}</span>
                            <p className="text-xl! font-medium lg:text-base!">
                                {data.name}
                            </p>

                            {isRooms ? (
                                <>
                                    <div className="flex items-center gap-2">
                                        <LocationIcon className="h-4 lg:hidden" />
                                        <p>{data.location}</p>
                                    </div>
                                    <div className="flex items-center gap-2 md:justify-center">
                                        <UsersIcon className="h-4 md:hidden" />
                                        <p>{data.capacity}</p>
                                    </div>

                                    <div className="text-textmute flex items-center gap-1 lg:col-span-2 lg:grid lg:grid-cols-2">
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
                                        ].map(({ has, col, content, icon }) => {
                                            const Icon = icon;
                                            return has ? (
                                                isLaptop ? (
                                                    <div
                                                        key={content}
                                                        className={`flex items-center justify-center ${col}`}
                                                    >
                                                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400 ring-1 ring-emerald-400/20 ring-inset lg:text-sm">
                                                            <CheckIcon className="size-4 stroke-3" />
                                                            Available
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <div
                                                        key={content}
                                                        className="bg-border flex w-fit items-center gap-1 rounded-full px-2 py-1 text-xs"
                                                    >
                                                        <Icon className="size-3" />
                                                        {content}
                                                    </div>
                                                )
                                            ) : isLaptop ? (
                                                <div
                                                    key={content}
                                                    className="flex items-center justify-center rounded-md text-sm"
                                                >
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-red-400/10 px-2.5 py-0.5 text-xs font-medium text-red-400 ring-1 ring-red-400/20 ring-inset lg:text-sm">
                                                        <XMarkIcon className="size-4" />
                                                        Not Available
                                                    </span>
                                                </div>
                                            ) : null;
                                        })}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center gap-2">
                                        <EmailIcon className="h-4 lg:hidden" />
                                        <p>{data.email}</p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <RoleIcon className="h-4 lg:hidden" />
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
                            <ExpandIcon className="size-4" />
                        </button>
                    </div>
                ))}
            </div>

            {/* <MenuModal
                open={modal}
                triggerRect={rect}
                onClose={() => setModal(false)}
            >
                <ConfirmMenu
                            onConfirm={() => handleDelete(_id)}
                            onCancel={() => setMenu(false)}
                        />
            </MenuModal> */}

            {!isLaptop && (
                <BottomSheet isOpen={sheet} closeSheet={closeSheet}>
                    <ManageForm
                        variant={sheet}
                        editingItem={editingItem}
                        onShowToast={showToast}
                        onDone={closeSheet}
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
