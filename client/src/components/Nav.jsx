import { NavLink } from "react-router";
import {
    CalendarIconOutline as BookingsIconOutline,
    CalendarIconSolid as BookingsIconSolid,
    CogIconOutline,
    CogIconSolid,
    DashboardIconOutline,
    DashboardIconSolid,
    EmployeesOutline,
    EmployeesSolid,
    HomeIconOutline,
    HomeIconSolid,
    RoomIconOutline,
    RoomIconSolid,
    UserIconOutline,
    UserIconSolid,
} from "../icons";
import { useAuth } from "../context/AuthContext";
import { useWindowWidth } from "../hooks/useWindowWidth";

const NAV_ITEMS = {
    employee: [
        {
            name: "Home",
            outline: HomeIconOutline,
            solid: HomeIconSolid,
            path: "/home",
        },
        {
            name: "Meetings",
            outline: EmployeesOutline,
            solid: EmployeesSolid,
            path: "/my-meetings",
        },
        {
            name: "User",
            outline: UserIconOutline,
            solid: UserIconSolid,
            path: "/user",
        },
    ],
    admin: [
        {
            name: "Dashboard",
            outline: DashboardIconOutline,
            solid: DashboardIconSolid,
            path: "/admin/dashboard",
        },
        {
            name: "Bookings",
            outline: BookingsIconOutline,
            solid: BookingsIconSolid,
            path: "/admin/bookings",
        },
        {
            name: "Manage",
            outline: RoomIconOutline,
            solid: RoomIconSolid,
            path: "/admin/manage",
        },
        {
            name: "User",
            outline: UserIconOutline,
            solid: UserIconSolid,
            path: "/admin/user",
        },
    ],
};

const Nav = () => {
    const { user } = useAuth();
    const { isLaptop } = useWindowWidth();

    const items = NAV_ITEMS[user?.role];

    return (
        <nav className="z-60 flex h-full items-start justify-between gap-2 font-semibold lg:flex-col">
            <div className="flex w-full gap-2 lg:flex-col">
                {items?.map(({ name, path, solid, outline }) => {
                    if (isLaptop && name === "User") return;

                    return (
                        <NavLink
                            key={name}
                            to={path}
                            className={({ isActive }) =>
                                `border-border active:bg-border md:hover:bg-border w-full gap-1 rounded-lg p-2 ${
                                    isActive ? "bg-border" : "bg-none"
                                } `
                            }
                        >
                            {({ isActive }) => {
                                const Icon = isActive ? solid : outline;

                                return (
                                    <div className="flex flex-col items-center lg:flex-row lg:gap-2">
                                        <Icon className="h-5 w-5" />
                                        <span className="text-xs select-none lg:text-sm">
                                            {name}
                                        </span>
                                        {isActive && (
                                            <div className="bg-text ml-auto hidden h-5 w-1.5 rounded-sm lg:block" />
                                        )}
                                    </div>
                                );
                            }}
                        </NavLink>
                    );
                })}
            </div>
        </nav>
    );
};

export default Nav;
