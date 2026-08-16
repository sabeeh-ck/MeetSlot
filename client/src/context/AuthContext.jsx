import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const res = await api.get("/auth/me");
                setUser(res.data.user);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    const logout = async () => {
        try {
            await api.post("/auth/logout");
            setUser(null);
        } catch (err) {
            console.log(err);
        }
    };

    const isDemo = import.meta.env.VITE_APP_DEMO_MODE;

    return (
        <AuthContext.Provider
            value={{ setUser, user, loading, logout, isDemo }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
