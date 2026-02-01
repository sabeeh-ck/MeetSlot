import { Outlet } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Layout = () => (
    <>
        <Header />
        <Outlet />
        <Footer />
    </>
);

export default Layout;
