import { useState } from "react";
import {
    Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, Chip
} from "@mui/material";
import { useFetchTMTags } from "../services/useFetchTMTags";
import { trackEvent, getUserVariant } from "../services/abTestingUtils"; // ✅ Import variant utilities

// ✅ Define type for T&M Tags
interface TMTags {
    tagNumber: string;
    title: string;
    datePerformed: string;
    dateSigned: string;
    customerRef: string;
    status?: "Pending" | "Approved" | "In Review" | "Rejected";
}

export default function TMLLog() {
    const [searchQuery, setSearchQuery] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [assignedTags, setAssignedTags] = useState<TMTags[]>([]);

    const tmTags: TMTags[] = useFetchTMTags();
    const currentVariant = getUserVariant(); // ✅ Dynamically retrieve variant

    // ✅ Predefined status colors
    const statusColors: Record<NonNullable<TMTags["status"]>, "warning" | "success" | "error" | "info"> = {
        "Pending": "warning",
        "Approved": "success",
        "Rejected": "error",
        "In Review": "info"
    };

    // ✅ Filter tags based on search input
    const filteredTags = tmTags.filter(tag =>
        tag.tagNumber.includes(searchQuery) || tag.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // ✅ Toggle tag selection
    const handleSelectTag = (tagNumber: string) => {
        setSelectedTags((prev) =>
            prev.includes(tagNumber) ? prev.filter((t) => t !== tagNumber) : [...prev, tagNumber]
        );
    };

    // ✅ Add selected tags to the main log with event tracking
    const handleAddTags = () => {
        const buttonLabel = `Assign T&M Tag clicked (Variant ${currentVariant})`; // ✅ Label includes variant
        trackEvent("Button Click", buttonLabel);

        const newTags = tmTags.filter((tag) => selectedTags.includes(tag.tagNumber));
        setAssignedTags((prev) => [...prev, ...newTags]);
        setOpenModal(false);
    };

    // ✅ Inline editing logic
    const handleEditTag = (tagNumber: string, field: keyof TMTags, value: string) => {
        setAssignedTags((prev) =>
            prev.map((tag) => (tag.tagNumber === tagNumber ? { ...tag, [field]: value } : tag))
        );
    };

    return (
        <Paper sx={{ padding: 3, marginTop: 3 }}>
            <Typography variant="h6" gutterBottom>
                Time & Material Log
            </Typography>

            {/* ✅ Search & Assign Buttons */}
            <Box sx={{ display: "flex", gap: 2, alignItems: "center", marginBottom: 2 }}>
                <TextField
                    variant="outlined"
                    placeholder="Search T&M Tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{
                        maxWidth: "350px",
                        width: "100%",
                        borderColor: currentVariant === 'A' ? 'green' : 'blue', // ✅ Variant-based border
                        borderWidth: "2px",
                        borderStyle: "solid",
                        borderRadius: "5px",
                    }}
                />
                {/* ✅ Variant-specific button text */}
                <Button
                    variant="contained"
                    color={currentVariant === 'A' ? 'success' : 'primary'}
                    onClick={() => setOpenModal(true)}
                >
                    {currentVariant === 'A' ? "🚀 Assign T&M Tag (A)" : "🛠️ Assign T&M Tag (B)"}
                </Button>
            </Box>

            {/* ✅ Assigned T&M Tags Table */}
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Tag #</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Date Performed</TableCell>
                        <TableCell>Date Signed</TableCell>
                        <TableCell>Customer Ref #</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {assignedTags.map((tag) => (
                        <TableRow key={tag.tagNumber}>
                            <TableCell>{tag.tagNumber}</TableCell>
                            <TableCell>
                                <TextField
                                    variant="standard"
                                    value={tag.title}
                                    onChange={(e) => handleEditTag(tag.tagNumber, "title", e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    variant="standard"
                                    type="date"
                                    value={tag.datePerformed}
                                    onChange={(e) => handleEditTag(tag.tagNumber, "datePerformed", e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    variant="standard"
                                    type="date"
                                    value={tag.dateSigned}
                                    onChange={(e) => handleEditTag(tag.tagNumber, "dateSigned", e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    variant="standard"
                                    value={tag.customerRef}
                                    onChange={(e) => handleEditTag(tag.tagNumber, "customerRef", e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <Chip
                                    label={tag.status || "Pending"}
                                    color={statusColors[tag.status ?? "Pending"]}
                                    variant="outlined"
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* ✅ Assign T&M Tag Modal */}
            <Dialog open={openModal} onClose={() => setOpenModal(false)}>
                <DialogTitle>Select T&M Tags</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Search T&M Tags..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{
                            maxWidth: "350px",
                            width: "100%",
                            marginBottom: 2,
                            borderColor: currentVariant === 'A' ? 'green' : 'blue', // ✅ Variant-based border
                            borderWidth: "2px",
                            borderStyle: "solid",
                            borderRadius: "5px",
                        }}
                    />
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Select</TableCell>
                                <TableCell>Tag #</TableCell>
                                <TableCell>Title</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredTags.map((tag) => (
                                <TableRow key={tag.tagNumber} onClick={() => handleSelectTag(tag.tagNumber)}>
                                    <TableCell>
                                        <input
                                            type="checkbox"
                                            checked={selectedTags.includes(tag.tagNumber)}
                                            onChange={() => handleSelectTag(tag.tagNumber)}
                                        />
                                    </TableCell>
                                    <TableCell>{tag.tagNumber}</TableCell>
                                    <TableCell>{tag.title}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenModal(false)}>Cancel</Button>
                    <Button
                        variant="contained"
                        color={currentVariant === 'A' ? 'success' : 'primary'}
                        onClick={handleAddTags}
                        disabled={selectedTags.length === 0}
                    >
                        {currentVariant === 'A' ? "✅ Add Tags (A)" : "🔹 Add Tags (B)"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}
