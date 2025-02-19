import { Box, Typography, Paper } from "@mui/material";

export default function About() {
    return (
        <Box sx={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
            <Paper sx={{ padding: "16px" }}>
                <Typography variant="h4" gutterBottom>
                    ChangeTrack [WIP]
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>ChangeTrack</strong> is a fictitious streamlined <strong>Change Order Management System (MVP)</strong> designed for <strong>Owners, General Contractors, and Subcontractors</strong> to efficiently track and manage Change Order Requests (CORs).
                </Typography>

                <Typography variant="h5" gutterBottom>
                    Features:
                </Typography>
                <ul>
                    <Typography component="li" variant="body1">
                        <strong>Role-Based Views</strong> – Owners, Contractors, and Subcontractors see relevant COR data.
                    </Typography>
                    <Typography component="li" variant="body1">
                        <strong>Change Order Log</strong> – Filter, search, and export COR data for streamlined tracking.
                    </Typography>
                    <Typography component="li" variant="body1">
                        <strong>Sidebar Navigation</strong> – Optimized layout for quick access.
                    </Typography>
                    <Typography component="li" variant="body1">
                        <strong>T&M Log Integration</strong> – Search, assign, and track Time & Material tags
                    </Typography>
                    <Typography component="li" variant="body1">
                        <strong>A/B Testing</strong> – Simple POC
                    </Typography>
                </ul>

                <Typography variant="h5" gutterBottom>
                    Technology Stack:
                </Typography>
                <ul>
                    <Typography component="li" variant="body1">
                        <strong>Frontend:</strong> React + TypeScript with Material UI
                    </Typography>
                    <Typography component="li" variant="body1">
                        <strong>State Management:</strong> Context API for role-based filtering
                    </Typography>
                    <Typography component="li" variant="body1">
                        <strong>Data Mocking:</strong> Static JSON simulating API responses (implemented backend locally
                        - Node.js/Express)
                    </Typography>
                </ul>
                <Typography variant="body2" sx={{ marginTop: "20px", fontStyle: "italic" }}>
                    *This MVP demonstrates a functional proof-of-concept for Change Order Management, with an emphasis on clean UI/UX and scalability.
                </Typography>
            </Paper>
        </Box>
    );
}
