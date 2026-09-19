import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { SkeletonTheme } from "react-loading-skeleton";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ToastProvider>
            <AuthProvider>
                <SkeletonTheme baseColor="#1a1a1a" highlightColor="#404040">
                    <BrowserRouter>
                        <ScrollToTop />

                        <App />
                    </BrowserRouter>
                </SkeletonTheme>
            </AuthProvider>
        </ToastProvider>
    </StrictMode>,
);
