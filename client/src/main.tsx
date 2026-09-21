import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.js";
import { AuthProvider } from "./context/AuthContext.js";
import { SkeletonTheme } from "react-loading-skeleton";
import ScrollToTop from "./components/ScrollToTop.js";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
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
