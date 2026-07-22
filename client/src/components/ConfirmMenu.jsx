import { CheckIcon, XMarkIcon } from "../icons";

const ConfirmMenu = ({ onConfirm, onCancel }) => (
    <div className="bg-surface border-border flex items-center gap-4 rounded-xl border py-2 pr-2 pl-4">
        <p className="font-medium">Are you sure?</p>
        <div className="flex gap-2">
            <button
                onClick={onCancel}
                className="border-border md:hover:bg-border active:bg-border rounded-lg border px-2 py-1"
            >
                <XMarkIcon className="h-5" />
            </button>
            <button
                onClick={onConfirm}
                className="border-bookedBorder text-bookedText md:hover:bg-bookedBg active:bg-bookedBg rounded-lg border px-2 py-1"
            >
                <CheckIcon className="h-5" />
            </button>
        </div>
    </div>
);

export default ConfirmMenu;
