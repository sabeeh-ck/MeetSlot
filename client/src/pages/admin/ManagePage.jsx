import { useEffect, useState } from "react";
import api from "../../api/axios";

const emptyUserForm = {
    name: "",
    email: "",
    role: "employee",
};

const emptyRoomForm = {
    name: "",
    capacity: "",
};

const ManagePage = () => {
    const [users, setUsers] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userForm, setUserForm] = useState(emptyUserForm);
    const [editingUserId, setEditingUserId] = useState(null);
    const [roomForm, setRoomForm] = useState(emptyRoomForm);
    const [editingRoomId, setEditingRoomId] = useState(null);
    const [message, setMessage] = useState("");
    const [view, setView] = useState("users");

    const fetchManageData = async () => {
        try {
            const res = await api.get("/admin/manage");
            setUsers(res.data.users ?? []);
            setRooms(res.data.rooms ?? []);
        } catch (error) {
            console.log(error);
            setMessage("Unable to load management data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchManageData();
    }, []);

    const resetUserForm = () => {
        setUserForm(emptyUserForm);
        setEditingUserId(null);
    };

    const resetRoomForm = () => {
        setRoomForm(emptyRoomForm);
        setEditingRoomId(null);
    };

    const handleUserSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingUserId) {
                await api.put(`/admin/manage/users/${editingUserId}`, userForm);
                setMessage("User updated successfully.");
            } else {
                await api.post("/admin/manage/users", userForm);
                setMessage("User created successfully.");
            }

            resetUserForm();
            fetchManageData();
        } catch (error) {
            setMessage(error.response?.data?.message || "Unable to save user.");
        }
    };

    const handleRoomSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingRoomId) {
                await api.put(`/admin/manage/rooms/${editingRoomId}`, roomForm);
                setMessage("Room updated successfully.");
            } else {
                await api.post("/admin/manage/rooms", roomForm);
                setMessage("Room created successfully.");
            }

            resetRoomForm();
            fetchManageData();
        } catch (error) {
            setMessage(error.response?.data?.message || "Unable to save room.");
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await api.delete(`/admin/manage/users/${id}`);
            setMessage("User deleted successfully.");
            fetchManageData();
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Unable to delete user.",
            );
        }
    };

    const handleDeleteRoom = async (id) => {
        try {
            await api.delete(`/admin/manage/rooms/${id}`);
            setMessage("Room deleted successfully.");
            fetchManageData();
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Unable to delete room.",
            );
        }
    };

    // if (loading) {
    //     return (
    //         <div className="text-textmute my-4">Loading management data...</div>
    //     );
    // }

    return (
        <section className="flex flex-1 flex-col lg:flex-row">
            {/* {message && (
                <div className="border-border bg-surface rounded-lg border p-3 text-sm">
                    {message}
                </div>
            )} */}

            <div className="lg:border-border flex flex-col gap-4 lg:w-64 lg:border-r">
                <div className="mx-4 mt-4 flex items-center justify-between">
                    <h2 className="font-semibold">Manage</h2>
                </div>

                <div className="border-border bg-surface lg:bg-bg mx-4 flex gap-1 rounded-xl border p-1 lg:flex-col lg:gap-2 lg:border-0 lg:p-0">
                    <button
                        onClick={() => setView("users")}
                        className={`flex flex-1 items-center justify-center gap-1 rounded-lg py-2 text-sm font-medium transition-all lg:justify-between lg:px-2 ${view === "users" ? "bg-text text-bg lg:text-text lg:bg-border pointer-events-none shadow lg:shadow-none" : "lg:text-text text-textmute active:bg-border lg:hover:bg-border pointer-events-auto"}`}
                    >
                        <span>Users</span>
                    </button>

                    <button
                        onClick={() => setView("rooms")}
                        className={`flex flex-1 items-center justify-center gap-1 rounded-lg py-2 text-sm font-medium transition-all lg:justify-between lg:px-2 ${view === "rooms" ? "bg-text text-bg lg:text-text lg:bg-border pointer-events-none shadow lg:shadow-none" : "lg:text-text active:bg-border text-textmute lg:hover:bg-border pointer-events-auto"}`}
                    >
                        <span>Rooms</span>
                    </button>
                </div>
            </div>

            <div className="m-4 h-full flex-1">
                {view === "users" ? (
                    <div className="flex h-full flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold">Users</h3>
                        </div>

                        <form
                            onSubmit={handleUserSubmit}
                            className="flex flex-col gap-3"
                        >
                            <input
                                value={userForm.name}
                                onChange={(e) =>
                                    setUserForm({
                                        ...userForm,
                                        name: e.target.value,
                                    })
                                }
                                placeholder="Full name"
                                className="border-border bg-bg rounded-lg border px-3 py-2"
                            />
                            <input
                                value={userForm.email}
                                onChange={(e) =>
                                    setUserForm({
                                        ...userForm,
                                        email: e.target.value,
                                    })
                                }
                                placeholder="Email"
                                className="border-border bg-bg rounded-lg border px-3 py-2"
                            />
                            <select
                                value={userForm.role}
                                onChange={(e) =>
                                    setUserForm({
                                        ...userForm,
                                        role: e.target.value,
                                    })
                                }
                                className="border-border bg-bg rounded-lg border px-3 py-2"
                            >
                                <option value="employee">Employee</option>
                                <option value="admin">Admin</option>
                            </select>

                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    className="bg-text text-bg rounded-lg px-4 py-2"
                                >
                                    {editingUserId
                                        ? "Save changes"
                                        : "Add user"}
                                </button>
                                {editingUserId && (
                                    <button
                                        type="button"
                                        onClick={resetUserForm}
                                        className="border-border rounded-lg border px-4 py-2"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>

                        <div className="flex flex-col gap-2">
                            {users.map((user) => (
                                <div
                                    key={user._id}
                                    className="border-border bg-surface flex w-full items-center justify-between rounded-lg border p-4"
                                >
                                    <div>
                                        <p className="font-medium">
                                            {user.name}
                                        </p>
                                        <p className="text-textmute text-sm">
                                            {user.email}
                                        </p>
                                        <p className="text-textmute text-xs uppercase">
                                            {user.role}
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2 lg:flex-row">
                                        <button
                                            onClick={() => {
                                                setEditingUserId(user._id);
                                                setUserForm({
                                                    name: user.name,
                                                    email: user.email,
                                                    role: user.role,
                                                });
                                            }}
                                            className="border-border rounded-lg border text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteUser(user._id)
                                            }
                                            className="border-bookedBorder text-bookedText rounded-lg border px-3 py-1 text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="border-border bg-surface flex h-full flex-col gap-4 rounded-xl border p-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold">Rooms</h3>
                        </div>

                        <form
                            onSubmit={handleRoomSubmit}
                            className="flex flex-col gap-3"
                        >
                            <input
                                value={roomForm.name}
                                onChange={(e) =>
                                    setRoomForm({
                                        ...roomForm,
                                        name: e.target.value,
                                    })
                                }
                                placeholder="Room name"
                                className="border-border bg-bg rounded-lg border px-3 py-2"
                            />
                            <input
                                type="number"
                                min="1"
                                value={roomForm.capacity}
                                onChange={(e) =>
                                    setRoomForm({
                                        ...roomForm,
                                        capacity: e.target.value,
                                    })
                                }
                                placeholder="Capacity"
                                className="border-border bg-bg rounded-lg border px-3 py-2"
                            />
                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    className="bg-text text-bg rounded-lg px-4 py-2"
                                >
                                    {editingRoomId
                                        ? "Save changes"
                                        : "Add room"}
                                </button>
                                {editingRoomId && (
                                    <button
                                        type="button"
                                        onClick={resetRoomForm}
                                        className="border-border rounded-lg border px-4 py-2"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>

                        <div className="flex flex-col gap-2">
                            {rooms.map((room) => (
                                <div
                                    key={room._id}
                                    className="border-border flex items-center justify-between rounded-lg border p-3"
                                >
                                    <div>
                                        <p className="font-medium">
                                            {room.name}
                                        </p>
                                        <p className="text-textmute text-sm">
                                            Capacity: {room.capacity}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setEditingRoomId(room._id);
                                                setRoomForm({
                                                    name: room.name,
                                                    capacity: room.capacity,
                                                });
                                            }}
                                            className="border-border rounded-lg border px-3 py-1 text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteRoom(room._id)
                                            }
                                            className="border-bookedBorder text-bookedText rounded-lg border px-3 py-1 text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ManagePage;
