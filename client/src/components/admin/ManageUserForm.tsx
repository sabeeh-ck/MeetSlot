import { ChangeEvent, SyntheticEvent, useState } from "react";
import api from "../../api/axios";
import { SaveIcon, TrashIcon, InfoIcon } from "../../icons";
import { useAuth } from "../../context/AuthContext";
import { Room, User } from "../../../../shared/types";
import { ToastType } from "../Toast";
import { ManageRoom, ManageUser } from "../../types";
import { useToast } from "../../context/ToastContext";
import { isAxiosError } from "axios";

const emptyUserForm: ManageUser = {
    name: "",
    email: "",
    role: "employee",
};

const demoMessage =
    "Demo Mode: Editing and Deleting is simulated and was not completed.";

type ManageUserFormProps = {
    editingItem: User | null;
    onDone: () => void;
    onRefresh: () => void;
};

const ManageUserForm = ({
    editingItem,
    onDone,
    onRefresh,
}: ManageUserFormProps) => {
    const { isDemo } = useAuth();
    const { showToast } = useToast();

    const [formData, setFormData] = useState(
        editingItem ? editingItem : emptyUserForm,
    );

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
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
                    `/admin/manage/users/${editingItem._id}`,
                    formData,
                );
                showToast("success", "User updated successfully.");
                onDone();
            } else {
                await api.post(`/admin/manage/users`, formData);
                showToast("success", "User created successfully.");
            }

            onRefresh();
            onDone();
        } catch (error: unknown) {
            const message = isAxiosError<{ message?: string }>(error)
                ? error.response?.data?.message
                : undefined;
            showToast("error", message || "Unable to save user.");
        }
    };

    const handleDelete = async (id: User["_id"]) => {
        if (isDemo) {
            showToast("warning", demoMessage);
            onDone();
            return;
        }

        try {
            await api.delete(`/admin/manage/users/${id}`);
            showToast("success", "Deleted successfully.");
            onDone();
            onRefresh();
        } catch (error: unknown) {
            if (isAxiosError<{ msg?: string }>(error)) {
                const message = error.response?.data.msg ?? error.message;
                showToast("error", message);
            } else {
                console.error(error || "Unable to delete room.");
            }
        }
    };

    if (!formData) return;

    return (
        <section className="mb-4 flex flex-col gap-4">
            <h1 className="text-base!">
                {editingItem ? "Manage User" : "Add User"}
            </h1>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 text-sm"
            >
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
                        id="role"
                        required
                    >
                        <option value="employee">Employee</option>
                        <option value="admin" disabled={isDemo}>
                            Admin
                        </option>
                    </select>

                    {isDemo && (
                        <span className="text-xs text-amber-900">
                            <InfoIcon className="mr-1 inline-block size-3" />
                            Admin roles cannot be created or assigned while in
                            demo mode.
                        </span>
                    )}
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

export default ManageUserForm;
