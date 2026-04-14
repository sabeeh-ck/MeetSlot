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

const NAV_ITEMS = [
    {
        name: "Dashboard",
        outline: DashboardIconOutline,
        solid: DashboardIconSolid,
        path: "./dashboard",
        roles: ["admin"],
    },
    {
        name: "Bookings",
        outline: BookingsIconOutline,
        solid: BookingsIconSolid,
        path: "./bookings",
        roles: ["admin"],
    },
    {
        name: "Rooms",
        outline: RoomIconOutline,
        solid: RoomIconSolid,
        path: "./rooms",
        roles: ["admin"],
    },
    {
        name: "Home",
        outline: HomeIconOutline,
        solid: HomeIconSolid,
        path: "./home",
        roles: ["employee"],
    },
    {
        name: "Meetings",
        outline: UserIconOutline,
        solid: UserIconSolid,
        path: "./meetings",
        roles: ["employee"],
    },
    {
        name: "Employees",
        outline: EmployeesOutline,
        solid: EmployeesSolid,
        path: "./employees",
        roles: ["admin"],
    },
    {
        name: "Settings",
        outline: CogIconOutline,
        solid: CogIconSolid,
        path: "./settings",
        roles: ["employee"],
    },
];

const Nav = () => {
    const { user } = useAuth();

    return (
        <nav className="z-60 flex h-full items-start justify-between gap-2 font-semibold lg:flex-col">
            <div className="flex w-full gap-2 lg:flex-col">
                {NAV_ITEMS.filter(({ roles }) =>
                    roles.includes(user?.role),
                ).map(({ name, path, solid, outline }) => {
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
