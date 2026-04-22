import { Navigate, Route, Routes } from "react-router-dom";

import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layouts/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";
import AdminLayout from "./Layouts/AdminLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import MyMeetingsPage from "./pages/MyMeetingsPage";

const App = () => (
    <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="*" element={<NotFoundPage />} />

        <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to={"/home"} />} />

            <Route
                path="/home"
                element={
                    <ProtectedRoute requiredRole="employee">
                        <IndexPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/my-meetings"
                element={
                    <ProtectedRoute requiredRole="employee">
                        <UserPage />
                    </ProtectedRoute>
                }
            />
        </Route>

        <Route
            path="/admin"
            element={
                <ProtectedRoute requiredRole="admin">
                    <Layout />
                </ProtectedRoute>
            }
        >
            <Route index element={<Navigate to="/admin/dashboard" />} />
            <Route path="dashboard" element={<DashboardPage />} />
        </Route>
    </Routes>
);

export default App;
