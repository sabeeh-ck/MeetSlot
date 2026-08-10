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
        <nav className="flex w-full items-center justify-between px-2.5 py-1 font-semibold lg:h-full lg:flex-col lg:items-start lg:justify-start lg:gap-2 lg:p-0">
            {items?.map(({ name, path, solid, outline }) => {
                if (isLaptop && name === "User") return;

                return (
                    <NavLink
                        key={name}
                        to={path}
                        className={({ isActive }) =>
                            `lg:hover:bg-border relative flex h-12 w-12 items-center justify-center rounded-full lg:h-fit lg:w-full lg:justify-between lg:gap-1 lg:rounded-lg lg:p-2 ${isActive && "lg:bg-border"}`
                        }
                    >
                        {({ isActive }) => {
                            const Icon = isActive ? solid : outline;

                            return (
                                <>
                                    <div className="flex flex-col items-center gap-2 lg:w-full lg:flex-row lg:gap-2">
                                        <Icon className="size-6" />
                                        <span className="hidden text-xs font-bold select-none lg:block lg:text-sm">
                                            {name}
                                        </span>
                                        {isActive && (
                                            <div className="bg-text ml-auto hidden h-5 w-1.5 rounded-sm lg:block" />
                                        )}
                                    </div>
                                    {!isLaptop && (
                                        <span
                                            aria-hidden={true}
                                            className={`bg-text/10 absolute h-full w-15 rounded-full ${isActive ? "opacity-100" : "opacity-0"}`}
                                        ></span>
                                    )}
                                </>
                            );
                        }}
                    </NavLink>
                );
            })}

            {!isLaptop && (
                <button className="relative flex h-12 w-12 items-center justify-center rounded-full">
                    <UserIconSolid className="size-6" />{" "}
                </button>
            )}
        </nav>
    );
};

export default Nav;
