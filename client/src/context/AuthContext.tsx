import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import api from "../api/axios";
import { User } from "../../../shared/types";

type AuthContextValue = {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    loading: boolean;
    logout: () => Promise<void>;
    isDemo: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
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

    const isDemo = import.meta.env.VITE_APP_DEMO_MODE === "true";

    return (
        <AuthContext.Provider
            value={{ setUser, user, loading, logout, isDemo }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) throw new Error("useAuth must be used inside AuthProvider");

    return context;
};
