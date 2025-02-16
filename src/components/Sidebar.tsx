import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { Home, Receipt, Assignment, Dashboard, BarChart } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
    { text: "Home", icon: <Home />, path: "/" },
    { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
    { text: "Change Orders", icon: <Receipt />, path: "/cor-log" },
    { text: "T&M Log", icon: <Assignment />, path: "/tm-log" },
    { text: "A/B Testing Info", icon: <BarChart />, path: "/ab-testing" },
    { text: "A/B Testing Dashboard", icon: <Dashboard />, path: "/ab-testing-dashboard" },
];

export default function Sidebar() {
    const location = useLocation(); // ✅ Track active route

    return (
        <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
            <Toolbar /> {/* ✅ Adds spacing at top */}
            <List>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path; // ✅ Check active link

                    return (
                        <ListItem
                            component={Link}
                            to={item.path}
                            key={item.text}
                            sx={{
                                textDecoration: "none",
                                color: "inherit",
                                "&:hover": {
                                    backgroundColor: "#f0f0f0", // ✅ Light hover effect
                                },
                                backgroundColor: isActive ? "#d0e0ff" : "transparent", // ✅ Highlight active link
                                borderRadius: "4px",
                                marginBottom: "4px",
                            }}
                        >
                            <ListItemIcon sx={{ color: isActive ? "#1976d2" : "inherit" }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    );
                })}
            </List>
        </Drawer>
    );
}
