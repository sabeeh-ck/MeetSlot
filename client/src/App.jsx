import { Navigate, Route, Routes } from "react-router-dom";

import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layouts/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";
import DashboardPage from "./pages/admin/DashboardPage";
import BookingsPage from "./pages/admin/BookingsPage";
import ManagePage from "./pages/admin/ManagePage.jsx";
import MyMeetingsPage from "./pages/MyMeetingsPage";
import UserPage from "./pages/UserPage";

const App = () => (
    <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="*" element={<NotFoundPage />} />

        <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to={"/login"} />} />

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
                        <MyMeetingsPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/user"
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
            <Route path="bookings" element={<BookingsPage />} />
            <Route path="manage" element={<ManagePage />} />
            <Route path="new-meeting" element={<IndexPage />} />
            <Route path="user" element={<UserPage />} />
            <Route path="rooms" element={<ManagePage items="rooms" />} />
            <Route path="users" element={<ManagePage items="users" />} />
        </Route>
    </Routes>
);

export default App;
