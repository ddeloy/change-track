import { useState } from "react";
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, TextField, MenuItem, Select, Button, Box } from "@mui/material";
import { utils, writeFile } from "xlsx";
import { useFetchCORs } from "../services/useFetchCORS";
import { useRole } from "../context/RoleContext.tsx";
import { trackEvent, getUserVariant } from "../services/abTestingUtils"; // ✅ Import A/B utilities

export default function ChangeOrderTable() {
    const { role } = useRole();
    const corData = useFetchCORs();
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("");

    const currentVariant = getUserVariant(); // ✅ Retrieve current A/B variant

    // ✅ Filter logic
    const filteredData = corData.filter((cor) => {
        const matchesSearch = cor.id.includes(searchQuery) || cor.customer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus ? cor.status === filterStatus : true;
        return matchesSearch && matchesStatus;
    });

    // ✅ Export with variant-specific tracking
    const exportToCSV = () => {
        const buttonLabel = `Export to CSV clicked (Variant ${currentVariant})`; // ✅ Include variant
        trackEvent("Button Click", buttonLabel);
        const worksheet = utils.json_to_sheet(filteredData);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, "COR Logs");
        writeFile(workbook, "COR_Log.xlsx");
    };

    return (
        <Paper sx={{ padding: 3, marginTop: 3 }}>
            <Typography variant="h6" gutterBottom>
                Change Order Request Log ({role} View)
            </Typography>

            {/* ✅ Search & Filter Inputs */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap", marginBottom: 2 }}>
                {/* ✅ Variant-specific border */}
                <TextField
                    autoFocus
                    variant="outlined"
                    label="🔍 Search Change Orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{
                        maxWidth: "300px",
                        width: "100%",
                        borderColor: currentVariant === 'A' ? 'green' : 'blue',
                        borderWidth: "2px",
                        borderStyle: "solid",
                        borderRadius: "5px",
                    }}
                />

                {/* ✅ Filter Dropdown */}
                <Select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    displayEmpty
                    sx={{
                        maxWidth: "200px",
                        width: "100%",
                        borderColor: currentVariant === 'A' ? 'green' : 'blue',
                        borderWidth: "2px",
                        borderStyle: "solid",
                        borderRadius: "5px",
                    }}
                >
                    <MenuItem value="">All Statuses</MenuItem>
                    <MenuItem value="Approved">Approved</MenuItem>
                    <MenuItem value="In Review">In Review</MenuItem>
                    <MenuItem value="Void">Void</MenuItem>
                </Select>
            </Box>

            {/* ✅ Variant-Based Export Button */}
            <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
                <Button
                    variant="contained"
                    color={currentVariant === 'A' ? "success" : "primary"}
                    onClick={exportToCSV}
                    sx={{ width: "200px" }}
                >
                    {currentVariant === 'A' ? "📗 Export to CSV (A)" : "📘 Export to CSV (B)"}
                </Button>
            </Box>

            {/* ✅ Display Table */}
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>COR #</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>T&M Tag #</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredData.map((cor) => (
                        <TableRow key={cor.id}>
                            <TableCell>{cor.id}</TableCell>
                            <TableCell>{cor.customer}</TableCell>
                            <TableCell>{cor.date}</TableCell>
                            <TableCell>{cor.tmTag}</TableCell>
                            <TableCell>{cor.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}
