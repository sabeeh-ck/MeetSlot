import Nav from "./Nav";

const SideBar = ({ activeTab, setSearchParams }) => {
    return (
        <div className="flex h-full w-full flex-col justify-between p-4 pb-8">
            <Nav activeTab={activeTab} setSearchParams={setSearchParams} />
        </div>
    );
};

export default SideBar;
