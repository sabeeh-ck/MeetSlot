import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ReactNode } from "react";
import { User } from "../../../shared/types";

type ProtectedRouteProps = {
    children: ReactNode;
    requiredRole: User["role"];
};

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
    const { user, loading } = useAuth();

    if (loading)
        return (
            <div className="text-textmute m-4 text-sm font-semibold">
                Loading...
            </div>
        );

    if (!user) return <Navigate to={"/login"} replace />;

    if (requiredRole && user.role !== requiredRole)
        return <Navigate to="/" replace />;

    return children;
};

export default ProtectedRoute;
