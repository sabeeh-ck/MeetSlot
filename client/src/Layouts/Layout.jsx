import { Outlet } from "react-router";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";

const Layout = () => (
    <>
        <Header />
        <Outlet />
        <div className="lg:hidden">
            <BottomNav />
        </div>
    </>
);

export default Layout;
