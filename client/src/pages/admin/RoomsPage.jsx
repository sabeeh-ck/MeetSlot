import { useEffect, useState } from "react";
import api from "../../api/axios";
import {
    EllipsisVerticalIcon,
    EmployeesSolid,
    LocationIcon,
} from "../../icons";

const RoomsPage = () => {
    const [loading, setLoading] = useState(true);
    const [rooms, setRooms] = useState([]);
    const [message, setMessage] = useState("");

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

    useEffect(() => {
        fetchRoomsData();
    }, []);

    return (
        <section className="flex flex-1 flex-col lg:flex-row">
            <div className="lg:border-border flex flex-col gap-4 lg:w-64 lg:border-r">
                <div className="mx-4 mt-4 flex items-center justify-between">
                    <h2 className="font-semibold">Rooms</h2>
                </div>
            </div>
        </section>
    );
};

export default RoomsPage;
