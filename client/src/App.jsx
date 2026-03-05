import { Route, Routes } from "react-router-dom";

import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";
import UserPage from "./pages/UserPage";

const App = () => (
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route
                index
                element={
                    <ProtectedRoute>
                        <IndexPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/user"
                element={
                    <ProtectedRoute>
                        <UserPage />
                    </ProtectedRoute>
                }
            />
            <Route path="*" element={<NotFoundPage />} />
        </Route>
    </Routes>
);

export default App;
