import { NavLink } from "react-router-dom";
import {
    CalendarIconOutline as BookingsIconOutline,
    CalendarIconSolid as BookingsIconSolid,
    ChevronUpDownIcon,
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
import { AnimatePresence, motion } from "motion/react";

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
    ],
};

const itemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.9 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 400, damping: 25 },
    },
    exit: { opacity: 0, transition: { duration: 0.0001 } },
};

const Nav = ({ isExpanded, expandNav, minimiseNav }) => {
    const { user } = useAuth();
    const { isLaptop } = useWindowWidth();

    const navItems = NAV_ITEMS[user?.role] ?? [];
    const collapsedItems = !isExpanded ? navItems.slice(0, 4) : navItems;

    return (
        <motion.nav
            initial={false}
            transition={{
                duration: 0.28,
                ease: [0.22, 0.8, 0.38, 1],
            }}
            className="w-full flex-col px-1 font-semibold lg:h-full lg:items-start lg:justify-start lg:gap-2 lg:p-0"
        >
            <AnimatePresence mode="popLayout" initial={false}>
                {isExpanded ? (
                    <motion.div
                        key="expanded"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.01, ease: "easeInOut" }}
                        className="flex w-full flex-col items-start p-3 lg:hidden"
                    >
                        {navItems.map(({ name, path, solid, outline }) => {
                            if (isLaptop && name === "User") return null;

                            return (
                                <motion.div
                                    key={name}
                                    variants={itemVariants}
                                    className="w-full"
                                >
                                    <NavLink
                                        to={path}
                                        onClick={minimiseNav}
                                        className={({ isActive }) =>
                                            `lg:hover:bg-border relative flex h-11.5 w-full shrink-0 items-center gap-3 rounded-full px-3 py-2 transition-all duration-200 ${
                                                isActive ? " bg-text/10" : ""
                                            }`
                                        }
                                    >
                                        {({ isActive }) => {
                                            const Icon = isActive
                                                ? solid
                                                : outline;
                                            return (
                                                <>
                                                    <div className="flex size-6 shrink-0 items-center justify-center">
                                                        <Icon className="size-6 shrink-0" />
                                                    </div>
                                                    <span className="text-xs font-bold whitespace-nowrap select-none lg:text-sm">
                                                        {name}
                                                    </span>
                                                    {isActive && (
                                                        <div className="bg-text ml-auto hidden h-5 w-1.5 rounded-sm lg:block" />
                                                    )}
                                                </>
                                            );
                                        }}
                                    </NavLink>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                ) : (
                    <motion.div
                        key="collapsed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 0.15,
                            exit: { duration: 0.001 },
                        }}
                        className="flex w-full items-center justify-between lg:flex-col lg:items-start"
                    >
                        {collapsedItems.map(
                            ({ name, path, solid, outline }) => (
                                <NavLink
                                    key={name}
                                    to={path}
                                    onClick={minimiseNav}
                                    aria-label={name}
                                    className={({ isActive }) =>
                                        `flex h-12 w-full flex-1 shrink-0 items-center justify-center rounded-full transition-all duration-200 lg:h-fit lg:justify-start lg:gap-2 lg:rounded-lg lg:p-2 ${
                                            isActive
                                                ? "lg:bg-border bg-text/10"
                                                : ""
                                        }`
                                    }
                                >
                                    {({ isActive }) => {
                                        const Icon = isActive ? solid : outline;
                                        return (
                                            <>
                                                <div className="flex size-6 shrink-0 items-center justify-center">
                                                    <Icon className="size-6 shrink-0" />
                                                </div>
                                                <span className="hidden text-xs font-bold whitespace-nowrap select-none lg:block lg:text-sm">
                                                    {name}
                                                </span>
                                                {isActive && isLaptop && (
                                                    <div className="bg-text ml-auto hidden h-5 w-1.5 rounded-sm lg:block" />
                                                )}
                                            </>
                                        );
                                    }}
                                </NavLink>
                            ),
                        )}

                        {user?.role === "admin" && (
                            <button
                                onClick={expandNav}
                                className="flex h-12 w-15 shrink-0 items-center justify-center rounded-full transition-all duration-200 active:scale-85 lg:hidden"
                                aria-label="Expand Navigation"
                            >
                                <ChevronUpDownIcon className="size-6" />
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Nav;
