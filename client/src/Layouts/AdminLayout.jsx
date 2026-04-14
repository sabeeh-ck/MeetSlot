import { Outlet, useSearchParams } from "react-router";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import BottomNav from "../components/BottomNav";

const AdminLayout = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get("tab") || "Dashboard";

    return (
        <>
            <Header />
            <div className="flex h-[calc(100vh-64px)] w-full">
                <div className="border-border hidden w-1/5 border-r lg:block">
                    <SideBar
                        activeTab={activeTab}
                        setSearchParams={setSearchParams}
                    />
                </div>
                <div>
                    <main className="p-4">
                        <Outlet />
                    </main>
                    <div className="md:hidden">
                        <BottomNav />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminLayout;
