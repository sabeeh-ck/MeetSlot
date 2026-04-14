import { Outlet } from "react-router";
import Header from "../components/Header";

const Layout = () => (
    <>
        <Header />
        <Outlet />
    </>
);

export default Layout;
