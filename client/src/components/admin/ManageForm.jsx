import { useEffect, useState } from "react";
import {
    SaveIcon,
    CheckIcon,
    TrashIcon,
    XMarkIcon,
    ProjectorIcon,
    WhiteBoardIcon,
    InfoIcon,
} from "../../icons";
import { useAuth } from "../../context/AuthContext";

const emptyUserForm = {
    name: "",
    email: "",
    role: "employee",
};

const emptyRoomForm = {
    name: "",
    capacity: "",
    location: "",
    has_projector: false,
    has_whiteboard: false,
};

const ManageForm = ({ variant, editingItem, onShowToast }) => {
    const { isDemo } = useAuth();

    const [formData, setFormData] = useState(
        editingItem
            ? editingItem
            : variant === "user"
              ? emptyUserForm
              : emptyRoomForm,
    );

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "has_projector" || name === "has_whiteboard"
                    ? checked
                    : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingItem) {
                if (isDemo) {
                    return;
                }

                await api.put(
                    `/admin/manage/${variant === "room" ? "rooms" : "users"}/${editingItem.id}`,
                    formData,
                );
            } else {
                await api.post(
                    `/admin/manage/${variant === "room" ? "rooms" : "users"}`,
                    formData,
                );
            }

            fetchManageData();
        } catch (error) {}
    };

    const handleDelete = async (id) => {
        if (isDemo) {
            return;
        }

        const table = variant === "user" ? "users" : "rooms";
        try {
            await api.delete(`/admin/manage/${table}/${id}`);
            fetchManageData();
        } catch (error) {}
    };

    if (!formData) return;

    return (
        <section className="mb-4 flex flex-col gap-4">
            <h1 className="text-base!">
                {variant === "room"
                    ? editingItem
                        ? "Manage Room"
                        : "Add Room"
                    : editingItem
                      ? "Manage User"
                      : "Add User"}
            </h1>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 text-sm"
            >
                {variant === "room" ? (
                    <>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="room-name">
                                Room Name
                                <span className="ml-1 text-red-700">*</span>
                            </label>

                            <input
                                type="text"
                                name="name"
                                onChange={handleChange}
                                value={formData.name}
                                id="room-name"
                                placeholder="Enter a name"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="location">
                                Location
                                <span className="ml-1 text-red-700">*</span>
                            </label>

                            <input
                                type="text"
                                name="location"
                                onChange={handleChange}
                                value={formData.location}
                                id="location"
                                placeholder="Enter location description"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="capacity">
                                Capacity
                                <span className="ml-1 text-red-700">*</span>
                            </label>

                            <input
                                type="number"
                                name="capacity"
                                onChange={handleChange}
                                value={formData.capacity}
                                id="capacity"
                                placeholder="Enter the capacity"
                                required
                            />
                        </div>

                        <label>
                            Amneties
                            <span className="ml-1 text-red-700">*</span>
                        </label>

                        <div className="flex w-full flex-col gap-3">
                            <label
                                htmlFor="projector"
                                className="flex items-center justify-between"
                            >
                                <span className="flex items-center gap-2">
                                    <ProjectorIcon className="size-4" />
                                    Projector
                                </span>
                                <input
                                    type="checkbox"
                                    name="has_projector"
                                    onChange={handleChange}
                                    checked={formData.has_projector}
                                    id="projector"
                                    className="peer sr-only"
                                />
                                <div className="bg-surface border-border peer after:bg-text peer-checked:after:border-text peer-checked:bg-border flex h-8 w-16 items-center justify-between rounded-full border px-2 py-1 peer-focus:outline-none after:absolute after:-mx-1 after:h-6 after:w-8 after:rounded-full after:transition-all after:duration-200 after:ease-in after:content-[''] peer-checked:after:translate-x-5.5">
                                    <CheckIcon className="size-4 text-green-700" />
                                    <XMarkIcon className="size-4 text-red-700" />
                                </div>
                            </label>

                            <label
                                htmlFor="whiteboard"
                                className="flex items-center justify-between"
                            >
                                <span className="flex items-center gap-2">
                                    <WhiteBoardIcon className="size-4" />
                                    Whiteboard
                                </span>
                                <input
                                    type="checkbox"
                                    name="has_whiteboard"
                                    onChange={handleChange}
                                    checked={formData.has_whiteboard}
                                    id="whiteboard"
                                    className="peer sr-only"
                                />
                                <div className="bg-surface border-border peer after:bg-text peer-checked:after:border-text peer-checked:bg-border flex h-8 w-16 items-center justify-between rounded-full border px-2 py-1 peer-focus:outline-none after:absolute after:-mx-1 after:h-6 after:w-8 after:rounded-full after:transition-all after:duration-200 after:ease-in after:content-[''] peer-checked:after:translate-x-5.5">
                                    <CheckIcon className="size-4 text-green-700" />
                                    <XMarkIcon className="size-4 text-red-700" />
                                </div>
                            </label>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="user-name">
                                Name
                                <span className="ml-1 text-red-700">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                onChange={handleChange}
                                value={formData.name}
                                id="user-name"
                                placeholder="Enter full name"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="email">
                                Email
                                <span className="ml-1 text-red-700">*</span>
                            </label>

                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                value={formData.email}
                                id="email"
                                placeholder="Enter email"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="role">
                                Role
                                <span className="ml-1 text-red-700">*</span>
                            </label>

                            <select
                                value={formData.role}
                                onChange={handleChange}
                                defaultValue={"employee"}
                                id="role"
                                required
                            >
                                <option value="employee">Employee</option>
                                <option value="admin" disabled={isDemo}>
                                    Admin
                                </option>
                            </select>

                            {isDemo && (
                                <div className="mt-2 w-full rounded-2xl bg-amber-950/30 px-4 py-2 text-amber-700">
                                    <p className="text-xs">
                                        Admin roles cannot be created or
                                        assigned while in demo mode.
                                    </p>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {editingItem && (
                    <div className="inset-x-0 flex justify-center">
                        <button
                            type="button"
                            onClick=""
                            className="border-bookedBorder text-bookedText flex items-center gap-2 rounded-2xl border px-8 py-4"
                        >
                            <TrashIcon className="size-4" />
                            Delete
                        </button>
                    </div>
                )}

                <div className="absolute top-8 right-4 flex gap-2 lg:static">
                    <button
                        type="submit"
                        className="bg-text text-bg flex items-center gap-1 rounded-full px-3 py-2"
                    >
                        <SaveIcon className="size-4" />
                        Save
                    </button>
                </div>
            </form>
        </section>
    );
};

export default ManageForm;
