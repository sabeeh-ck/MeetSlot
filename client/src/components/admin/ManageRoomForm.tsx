import { ChangeEvent, SyntheticEvent, useState } from "react";
import api from "../../api/axios";
import {
    SaveIcon,
    CheckIcon,
    TrashIcon,
    XMarkIcon,
    ProjectorIcon,
    WhiteBoardIcon,
} from "../../icons";
import { useAuth } from "../../context/AuthContext";
import { Room } from "../../../../shared/types";
import { ManageRoom } from "../../types";
import { useToast } from "../../context/ToastContext";
import { isAxiosError } from "axios";

const emptyForm: ManageRoom = {
    name: "",
    capacity: 0,
    location: "",
    has_projector: false,
    has_whiteboard: false,
};

const demoMessage =
    "Demo Mode: Editing and Deleting is simulated and was not completed.";

type ManageRoomFormProps = {
    editingItem: Room | null;
    onDone: () => void;
    onRefresh: () => void;
};

const ManageRoomForm = ({
    editingItem,
    onDone,
    onRefresh,
}: ManageRoomFormProps) => {
    const { isDemo } = useAuth();
    const { showToast } = useToast();

    const [formData, setFormData] = useState(
        editingItem ? editingItem : emptyForm,
    );

    const formFields: {
        name: keyof ManageRoom;
        type: "text" | "number";
        placeholder: string;
    }[] = [
        { name: "name", type: "text", placeholder: "Enter a name" },
        {
            name: "location",
            type: "text",
            placeholder: "Enter location description",
        },
        {
            name: "capacity",
            type: "number",
            placeholder: "Enter the capacity",
        },
    ];

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "has_projector" || name === "has_whiteboard"
                    ? checked
                    : value,
        }));
    };

    const handleSubmit = async (e: SyntheticEvent<HTMLElement>) => {
        e.preventDefault();

        try {
            if (editingItem) {
                if (isDemo) {
                    showToast("warning", demoMessage);
                    onDone();
                    return;
                }

                await api.put(
                    `/admin/manage/rooms/${editingItem._id}`,
                    formData,
                );
                showToast("success", "Room updated successfully.");
                onDone();
            } else {
                await api.post("/admin/manage/rooms", formData);
                showToast("success", "Room created successfully.");
            }

            onRefresh();
            onDone();
        } catch (error: unknown) {
            const message = isAxiosError(error)
                ? error.response?.data?.message
                : undefined;
            showToast("error", message || "Unable to save room.");
        }
    };

    const handleDelete = async (id: Room["_id"]) => {
        if (isDemo) {
            showToast("warning", demoMessage);
            onDone();
            return;
        }

        try {
            await api.delete(`/admin/manage/rooms/${id}`);
            showToast("success", "Deleted successfully.");
            onDone();
            onRefresh();
        } catch (error: unknown) {
            const message = isAxiosError(error)
                ? error.response?.data?.message
                : undefined;

            showToast("error", message || "Unable to delete room.");
        }
    };

    if (!formData) return;

    return (
        <section className="mb-4 flex flex-col gap-4">
            <h1 className="text-base!">
                {editingItem ? "Manage Room" : "Add Room"}
            </h1>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 text-sm"
            >
                {formFields.slice(0, 3).map(({ name, type, placeholder }) => (
                    <div key={name} className="flex flex-col gap-1">
                        <label htmlFor={name} className="capitalize">
                            {name}
                            <span className="ml-1 text-red-700">*</span>
                        </label>

                        <input
                            type={type}
                            name={name}
                            onChange={handleChange}
                            value={String(formData[name])}
                            id={name}
                            placeholder={placeholder}
                            required
                        />
                    </div>
                ))}

                <label>
                    Amneties
                    <span className="ml-1 text-red-700">*</span>
                </label>

                <div className="flex w-full flex-col gap-3">
                    {[
                        { name: "projector", icon: ProjectorIcon },
                        { name: "whiteboard", icon: WhiteBoardIcon },
                    ].map(({ name, icon }) => {
                        const Icon = icon;
                        return (
                            <label
                                key={name}
                                htmlFor={name}
                                className="flex items-center justify-between"
                            >
                                <span className="flex items-center gap-2 capitalize">
                                    <Icon className="size-4" />
                                    {name}
                                </span>
                                <input
                                    type="checkbox"
                                    name={`has_${name}`}
                                    onChange={handleChange}
                                    checked={
                                        name === "projector"
                                            ? formData.has_projector
                                            : formData.has_whiteboard
                                    }
                                    id={name}
                                    className="peer sr-only hidden"
                                />
                                <div className="bg-surface border-border peer after:bg-text peer-checked:after:border-text peer-checked:bg-border flex h-8 w-16 cursor-pointer items-center justify-between rounded-full border px-2 py-1 peer-focus:outline-none after:absolute after:-mx-1 after:h-6 after:w-8 after:rounded-full after:transition-all after:duration-200 after:ease-in after:content-[''] peer-checked:after:translate-x-5.5">
                                    <CheckIcon className="size-4 text-green-700" />
                                    <XMarkIcon className="size-4 text-red-700" />
                                </div>
                            </label>
                        );
                    })}
                </div>

                {editingItem && (
                    <div className="inset-x-0 flex justify-center">
                        <button
                            type="button"
                            onClick={() => handleDelete(editingItem._id)}
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
                        className="bg-text text-bg flex items-center gap-1 rounded-full px-4 py-2"
                    >
                        <SaveIcon className="size-4" />
                        Save
                    </button>
                </div>
            </form>
        </section>
    );
};

export default ManageRoomForm;
