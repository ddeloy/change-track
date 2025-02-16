import { Grid, Box, Paper, Typography } from "@mui/material";
import { useRole } from "../context/RoleContext.tsx";
import RoleSelector from "../components/RoleSelector.tsx";
import StatusSummary from "../components/StatusSummary";
import ShareableLog from "../components/ShareableLog";
import ChangeOrderTable from "../components/ChangeOrderTable";

// 🔥 Centralized MUI styling object
const styles = {
    container: { flexGrow: 1, mt: 4, padding: 2 },
    centeredText: { textAlign: "center", marginBottom: 2 },
    paper: {
        padding: 2,
        minHeight: 250,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center", // ✅ Ensures proper alignment
    },
    fullWidthPaper: { padding: 2, minHeight: 250, width: "100%" },
    inputControls: {
        display: "flex",
        justifyContent: "center",
        gap: "16px",
        flexWrap: "wrap",
        marginBottom: "16px",
    },
    inputBox: { maxWidth: "400px", width: "100%" }, // ✅ Ensures search & select box are confined
    statusSummaryWrapper: {
        display: "flex",
        justifyContent: "center",
        gap: 20,
        flexWrap: "wrap",
        alignItems: "center", // ✅ Align status summary & share log correctly
    },
};

export default function Dashboard() {
    const { role } = useRole();

    return (
        <Box sx={styles.container}>
            <Box sx={styles.inputControls}>
                <Box sx={styles.inputBox}>
                    <RoleSelector /> {/* Role selection dropdown */}
                </Box>
            </Box>

            <Typography variant="h5" gutterBottom sx={styles.centeredText}>
                Dashboard ({role} View)
            </Typography>

            <Grid container spacing={3} justifyContent="center">
                {/* Owner (Admin) View */}
                {role === "Owner" && (
                    <>
                        <Grid item xs={12}>
                            <Box sx={styles.statusSummaryWrapper}>
                                <Paper sx={styles.paper}>
                                    <StatusSummary />
                                </Paper>
                                <Paper sx={styles.paper}>
                                    <ShareableLog />
                                </Paper>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper sx={styles.fullWidthPaper}>
                                <ChangeOrderTable />
                            </Paper>
                        </Grid>
                    </>
                )}

                {/* General Contractor View */}
                {role === "General Contractor" && (
                    <>
                        <Grid item xs={12}>
                            <Box sx={styles.statusSummaryWrapper}>
                                <Paper sx={styles.paper}>
                                    <StatusSummary />
                                </Paper>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper sx={styles.fullWidthPaper}>
                                <ChangeOrderTable />
                            </Paper>
                        </Grid>
                    </>
                )}

                {/* Subcontractor View */}
                {role === "Subcontractor" && (
                    <Grid item xs={12} sm={8}>
                        <Paper sx={styles.fullWidthPaper}>
                            <Typography variant="h6">Your Submitted Change Orders</Typography>
                            <ChangeOrderTable />
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
}
