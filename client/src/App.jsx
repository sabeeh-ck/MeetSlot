import { Route, Routes } from "react-router-dom";

import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import axios from "axios";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";
import UserPage from "./pages/UserPage";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const App = () => (
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route path="/login" element={<LoginPage />} />

            <Route
                path="/user"
                element={
                    <ProtectedRoute>
                        <UserPage />
                    </ProtectedRoute>
                }
            />

            <Route
                index
                element={
                    <ProtectedRoute>
                        <IndexPage />
                    </ProtectedRoute>
                }
            />

            <Route path="*" element={<NotFoundPage />} />
        </Route>
    </Routes>
);

export default App;
