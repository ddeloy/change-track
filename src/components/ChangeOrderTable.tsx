import { useState } from "react";
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, TextField, MenuItem, Select, Button, Box } from "@mui/material";
import { utils, writeFile } from "xlsx";
import { useFetchCORs } from "../services/useFetchCORS";
import { useRole } from "../context/RoleContext.tsx";
import { trackEvent } from "../services/abTestingUtils"; // ✅ A/B event tracking

export default function ChangeOrderTable() {
    const { role } = useRole();
    const corData = useFetchCORs();
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("");

    const filteredData = corData.filter((cor) => {
        const matchesSearch = cor.id.includes(searchQuery) || cor.customer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus ? cor.status === filterStatus : true;
        return matchesSearch && matchesStatus;
    });

    // ✅ Export with updated variant logic
    const exportToCSV = () => {
        trackEvent("Button Click", "Export to CSV clicked");
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

            <Box sx={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap", marginBottom: 2 }}>
                <TextField
                    autoFocus
                    variant="outlined"
                    label="Search Change Orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ maxWidth: "300px", width: "100%" }}
                />
                <Select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    displayEmpty
                    sx={{ maxWidth: "200px", width: "100%" }}
                >
                    <MenuItem value="">All Statuses</MenuItem>
                    <MenuItem value="Approved">Approved</MenuItem>
                    <MenuItem value="In Review">In Review</MenuItem>
                    <MenuItem value="Void">Void</MenuItem>
                </Select>
            </Box>

            {/* ✅ Button with correct variant tracking */}
            <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
                <Button variant="contained" onClick={exportToCSV} sx={{ width: "180px" }}>
                    Export to CSV
                </Button>
            </Box>

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
