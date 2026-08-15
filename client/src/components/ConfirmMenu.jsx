import { CheckIcon, XMarkIcon } from "../icons";

const ConfirmMenu = ({ onConfirm, onCancel }) => (
    <div className="flex items-center gap-4 pl-2">
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
