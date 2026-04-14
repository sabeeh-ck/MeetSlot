import { Outlet } from "react-router";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";

const Layout = () => (
    <>
        <Header />
        <Outlet />
        <BottomNav />
    </>
);

export default Layout;
