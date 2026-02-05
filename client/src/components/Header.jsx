import { Bars3Icon } from "../icons";

const Header = () => (
    <header className="bg-bg sticky top-0 flex h-14 w-full items-center">
        <button className="p-4">
            <Bars3Icon className="h-6" />
        </button>
        <span className="text-lg font-black">MeetSlot</span>
    </header>
);

export default Header;
