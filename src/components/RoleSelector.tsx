import { Select, MenuItem, Typography, Box, SelectChangeEvent } from "@mui/material";
import { useRole } from "../context/RoleContext.tsx";

export default function RoleSelector() {
    const { role, setRole } = useRole();

    const handleRoleChange = (e: SelectChangeEvent<string>) => {
        setRole(e.target.value as never); // ✅ Cast to `never` to satisfy setRole type

        // ✅ Auto-scroll to top on role change
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 2 }}>
            <Typography variant="subtitle1">Select Role:</Typography>
            <Select
                value={role}
                onChange={handleRoleChange}
                sx={{ minWidth: "250px", maxWidth: "300px", width: "100%" }}
            >
                <MenuItem value="Owner">Owner</MenuItem>
                <MenuItem value="General Contractor">General Contractor</MenuItem>
                <MenuItem value="Subcontractor">Subcontractor</MenuItem>
            </Select>
        </Box>
    );
}
