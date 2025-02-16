import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";

// Pages
import Dashboard from "./pages/Dashboard";
import TMLLog from "./pages/TMLLog";
import ChangeOrderLog from "./pages/ChangeOrderLog";
import About from "./pages/About";
import ABTestingInfo from "./pages/ABTestingInfo";
import ABTestingDashboard from "./pages/ABTestingDashboard";

// Components
import Sidebar from "./components/Sidebar";

export default function App() {
    return (
        <Router>
            <Box sx={{ display: "flex" }}>
                <CssBaseline /> {/* ✅ Ensures consistent Material UI styling */}
                <Sidebar /> {/* ✅ Sidebar remains */}
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Routes>
                        <Route path="/" element={<About />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/cor-log" element={<ChangeOrderLog />} />
                        <Route path="/tm-log" element={<TMLLog />} />
                        <Route path="/ab-testing" element={<ABTestingInfo />} />
                        <Route path="/ab-testing-dashboard" element={<ABTestingDashboard />} />
                    </Routes>
                </Box>
            </Box>
        </Router>
    );
}
