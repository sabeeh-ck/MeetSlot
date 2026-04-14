import { ChevronDoubleLeftIcon, PlusIcon } from "../icons";
import Nav from "./Nav";

const SideBar = ({ activeTab, setSearchParams }) => {
    return (
        <div className="flex h-full w-full flex-col justify-between">
            <div className="flex h-full flex-col justify-between p-4">
                <Nav activeTab={activeTab} setSearchParams={setSearchParams} />

                <div className="mb-10 flex w-full flex-col items-center gap-4">
                    <button className="active:bg-textmute md:hover:bg-textmute bg-text text-bg flex w-40 items-center justify-center gap-2 rounded-lg p-2">
                        <PlusIcon className="h-5" />
                        <p className="select-none">New Meeting</p>
                    </button>
                </div>
            </div>

            <div className="border-border hover:bg-border flex w-full justify-end border-t p-4">
                <ChevronDoubleLeftIcon className="h-5" />
            </div>
        </div>
    );
};

export default SideBar;
