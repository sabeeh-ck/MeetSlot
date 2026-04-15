import { Outlet, useSearchParams } from "react-router";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import BottomNav from "../components/BottomNav";

const Layout = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get("tab") || "Dashboard";

    return (
        <>
            <Header />

            <div className="bg-bg border-border fixed top-16 left-0 z-40 hidden h-[calc(100vh-64px)] w-64 border-r lg:block">
                <SideBar
                    activeTab={activeTab}
                    setSearchParams={setSearchParams}
                />
            </div>

            <div className="lg:ml-64">
                <main className="min-h-screen p-4">
                    <Outlet />
                </main>

                <div className="md:hidden">
                    <BottomNav />
                </div>
            </div>
        </>
    );
};

export default Layout;
