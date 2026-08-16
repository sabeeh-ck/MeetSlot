import { useEffect, useState } from "react";
import api from "../../api/axios";
import {
    EllipsisVerticalIcon,
    EmployeesSolid,
    LocationIcon,
    PencilIcon,
    PlusIcon,
    TrashIcon,
} from "../../icons";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import MenuModal from "../../components/MenuModal";
import ConfirmMenu from "../../components/ConfirmMenu";
import BottomSheet from "../../components/BottomSheet";

const RoomsPage = () => {
    const [loading, setLoading] = useState(true);
    const [rooms, setRooms] = useState([]);
    const [message, setMessage] = useState("");
    const [sheet, setSheet] = useState(false);
    const [modal, setModal] = useState(false);
    const [rect, setRect] = useState(null);

    const { isLaptop } = useWindowWidth();

    const fetchRoomsData = async () => {
        try {
            const res = await api.get("/admin/rooms");
            setRooms(res.data.rooms ?? []);
        } catch (error) {
            console.log(error);
            setMessage("Unable to load data.");
        } finally {
            setLoading(false);
        }
    };

    const openSheet = (variant, roomId) => {
        setSheet(variant);
    };
    const closeSheet = () => setSheet(null);

    const openModal = (e) => {
        setRect(e.currentTarget.getBoundingClientRect());
        setModal(true);
    };

    useEffect(() => {
        fetchRoomsData();
    }, []);

    return (
        <section className="flex flex-1 flex-col">
            <div className="flex flex-col gap-4">
                <div className="mx-4 mt-4 flex items-center justify-between">
                    <h2 className="font-semibold">Rooms</h2>
                    <button
                        onClick={() => openSheet("add-room")}
                        className="border-border bg-textmute text-text fixed right-6 bottom-24 flex items-center gap-2 rounded-full border p-4 shadow-2xl backdrop-blur-sm transition-transform duration-200 active:scale-90 lg:static lg:rounded-md lg:px-3 lg:py-1"
                    >
                        <PlusIcon
                            className="size-5 stroke-2!"
                            aria-label="Add Room"
                        />
                        <span className="hidden lg:block">Add</span>
                    </button>
                </div>
            </div>

            <div className="m-4 flex flex-1 flex-col gap-3 md:gap-4">
                <div className="text-textmute hidden font-bold md:grid md:grid-cols-[0.25fr_1.5fr_1.5fr_0.75fr_1fr_1fr_0.5fr]">
                    <span>No</span>
                    <span>Name</span>
                    <span>Location</span>
                    <span>Capacity</span>
                    <span>Projector</span>
                    <span>Whiteboard</span>
                    <span>Action</span>
                </div>

                <hr className="border-border hidden md:block" />

                {rooms.map((room, index) => (
                    <div
                        key={room._id}
                        className="border-border lg:bg-bg bg-surface flex w-full items-start justify-between rounded-lg border p-4 md:grid md:grid-cols-[0.25fr_1.5fr_1.5fr_0.75fr_1fr_1fr_0.5fr] md:border-0 md:px-0 md:py-2"
                    >
                        <div className="flex w-full flex-col gap-2 md:col-span-6 md:grid md:grid-cols-[0.25fr_1.5fr_1.5fr_0.75fr_1fr_1fr] md:gap-0">
                            <span className="hidden lg:block">{index + 1}</span>
                            <p className="text-xl! font-medium lg:text-base!">
                                {room.name}
                            </p>
                            <div className="flex items-center gap-2">
                                <LocationIcon className="h-4 lg:hidden" />
                                <p>{room.location}</p>
                            </div>
                            <div className="flex items-center gap-2 md:justify-end">
                                <EmployeesSolid className="h-4 md:hidden" />
                                <p>{room.capacity}</p>
                            </div>

                            <div className="text-textmute flex items-center gap-1 lg:col-span-2 lg:grid lg:grid-cols-2">
                                {[
                                    {
                                        has: room.has_projector,
                                        col: "col-start-1",
                                        content: "Projector",
                                    },
                                    {
                                        has: room.has_whiteboard,
                                        col: "col-start-2",
                                        content: "Whiteboard",
                                    },
                                ].map(({ has, col, content }) =>
                                    has ? (
                                        isLaptop ? (
                                            <div
                                                key={content}
                                                className={`flex items-center justify-center ${col}`}
                                            >
                                                {content}
                                            </div>
                                        ) : (
                                            <div
                                                key={content}
                                                className="bg-border flex w-fit items-center rounded-full px-2 py-1 text-xs"
                                            >
                                                {content}
                                            </div>
                                        )
                                    ) : isLaptop ? (
                                        <div
                                            key={content}
                                            className="bg-border flex w-fit items-center justify-center rounded-full px-2 py-1 text-xs"
                                        >
                                            {content}
                                        </div>
                                    ) : null,
                                )}
                            </div>
                        </div>
                        
                        <button
                        >
                            <EllipsisVerticalIcon className="size-5" />
                        </button>
                    </div>
                ))}
            </div>

            <BottomSheet isOpen={sheet} closeSheet={closeSheet}>
            </BottomSheet>
        </section>
    );
};

export default RoomsPage;
