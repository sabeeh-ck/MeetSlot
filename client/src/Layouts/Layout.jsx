import { Outlet, useSearchParams } from "react-router";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import BottomNav from "../components/BottomNav";
import { useAuth } from "../context/AuthContext";

const Layout = () => {
    const { loading } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get("tab") || "Dashboard";

    return (
        <>
            <Header />

            {!loading && (
                <div className="bg-bg border-border fixed top-16 left-0 z-40 hidden h-[calc(100dvh-64px)] w-64 border-r lg:block">
                    <SideBar
                        activeTab={activeTab}
                        setSearchParams={setSearchParams}
                    />
                </div>
            )}

            <div className="mt-16 lg:ml-64">
                <main className="flex min-h-[calc(100dvh-64px)] flex-col pb-20 lg:py-0">
                    <Outlet />
                </main>

                <BottomNav />

                <div className="from-bg via-bg/75 fixed bottom-0 z-40 h-16 w-full bg-linear-to-t from-50% via-75% to-transparent to-100% lg:hidden" />
            </div>
        </>
    );
};

export default Layout;
