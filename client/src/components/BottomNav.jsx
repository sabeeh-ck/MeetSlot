import Nav from "./Nav";

const BottomNav = () => {
    return (
        <div className="bg-surface border-border fixed inset-x-6 bottom-6 z-50 flex items-center rounded-full border shadow-xl lg:hidden">
            <Nav />
        </div>
    );
};

export default BottomNav;
