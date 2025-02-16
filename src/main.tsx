import { CssBaseline } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { RoleProvider } from "./context/RoleContext.tsx"; // ✅ Added RoleProvider
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RoleProvider> {/* ✅ Wrap App with RoleProvider */}
            <CssBaseline /> {/* ✅ Keeps default MUI spacing and typography */}
            <App />
        </RoleProvider>
    </React.StrictMode>
);
