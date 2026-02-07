import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    const login = (token) => {
        localStorage.setItem("token", token);
        setToken(token);
    };

    return (
        <AuthContext.Provider value={{ token, setToken, logout, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
