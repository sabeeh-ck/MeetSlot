import { NavLink } from "react-router";
import {
    CalendarIconOutline as BookingsIconOutline,
    CalendarIconSolid as BookingsIconSolid,
    ChevronUpDownIcon,
    CogIconOutline,
    CogIconSolid,
    DashboardIconOutline,
    DashboardIconSolid,
    EmployeesOutline,
    EmployeesSolid,
    HomeIconOutline,
    HomeIconSolid,
    PlusIcon,
    RoomIconOutline,
    RoomIconSolid,
    UserCircleOutline,
    UserCircleSolid,
    UserIconOutline,
    UserIconSolid,
    UsersIconOutline,
    UsersIconSolid,
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
            name: "Rooms",
            outline: RoomIconOutline,
            solid: RoomIconSolid,
            path: "/admin/rooms",
        },
        {
            name: "Users",
            outline: UsersIconOutline,
            solid: UsersIconSolid,
            path: "/admin/users",
        },
        {
            name: "New Meeting",
            outline: PlusIcon,
            solid: PlusIcon,
            path: "/admin/new-meeting",
        },
        {
            name: "Login",
            outline: UserCircleOutline,
            solid: UserCircleSolid,
            path: "/admin/user",
        },
        {
            name: "Manage",
            outline: UserCircleOutline,
            solid: UserCircleSolid,
            path: "/admin/manage",
        },
    ],
};

const Nav = ({ isExpanded, expandNav, minimiseNav }) => {
    const { user } = useAuth();
    const { isLaptop } = useWindowWidth();

    const items = isExpanded
        ? NAV_ITEMS[user?.role]
        : NAV_ITEMS[user?.role].slice(0, 4);

    return (
        <nav
            className={`flex w-full justify-between px-2.5 font-semibold lg:h-full lg:flex-col lg:items-start lg:justify-start lg:gap-2 lg:p-0 ${isExpanded ? "flex-col items-start gap-1 py-2.5" : "flex-row items-center gap-0 py-1"}`}
        >
            {items?.map(({ name, path, solid, outline }) => {
                if (isLaptop && name === "User") return;

                return (
                    <NavLink
                        key={name}
                        to={path}
                        onClick={minimiseNav}
                        className={({ isActive }) =>
                            `lg:hover:bg-border relative flex items-center rounded-full lg:h-fit lg:w-full lg:justify-between lg:gap-1 lg:rounded-lg lg:p-2 ${isActive && "lg:bg-border"} ${isExpanded ? "w-full justify-start px-3 py-2" : "h-12 w-12 justify-center px-0"}`
                        }
                    >
                        {({ isActive }) => {
                            const Icon = isActive ? solid : outline;

                            return (
                                <>
                                    <div
                                        className={`flex items-center gap-3 lg:w-full lg:flex-row lg:gap-2`}
                                    >
                                        <Icon className="size-6" />

                                        <span
                                            className={`text-xs font-bold select-none lg:block lg:text-sm ${isExpanded ? "block" : "hidden"}`}
                                        >
                                            {name}
                                        </span>

                                        {isActive && (
                                            <div className="bg-text ml-auto hidden h-5 w-1.5 rounded-sm lg:block" />
                                        )}
                                    </div>

                                    {!isLaptop && (
                                        <span
                                            aria-hidden={true}
                                            className={`bg-text/10 absolute h-full rounded-full ${isActive ? "opacity-100" : "opacity-0"} ${isExpanded ? "-ml-3 w-full" : "w-15"}`}
                                        ></span>
                                    )}
                                </>
                            );
                        }}
                    </NavLink>
                );
            })}

            {user?.role === "admin" && !isLaptop && !isExpanded && (
                <button
                    onClick={expandNav}
                    className={`relative flex h-12 w-12 items-center justify-center rounded-full`}
                >
                    <ChevronUpDownIcon className="size-6" />
                </button>
            )}
        </nav>
    );
};

export default Nav;
