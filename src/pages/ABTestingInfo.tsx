import { Box, Typography, Paper, Button } from "@mui/material";
import { getUserVariant, trackEvent } from "../services/abTestingUtils";

export default function ABTestingInfo() {
    const variant = getUserVariant();

    // ✅ Clear all A/B Testing data
    const handleClearData = () => {
        localStorage.removeItem("abTestingEvents");
        localStorage.removeItem("userVariant");
        alert("A/B Testing data cleared.");
    };

    // ✅ Track a test event
    const handleTestEvent = () => {
        trackEvent("Button Click", `Test button clicked for Variant ${variant}`);
        alert(`Event tracked for Variant ${variant}!`);
    };

    return (
        <Box sx={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
            <Paper sx={{ padding: "16px" }}>
                <Typography variant="h4" gutterBottom>
                    🎯 A/B Testing Overview
                </Typography>

                <Typography variant="body1" paragraph>
                    **A/B testing** is a methodology used to compare two versions of a feature to determine
                    which one performs better based on predefined metrics.
                </Typography>

                <Typography variant="h6" gutterBottom>
                    🧪 **Your Assigned Variant:** <strong>{variant}</strong>
                </Typography>

                <Typography variant="h5" gutterBottom>
                    🔹 **How We Use A/B Testing:**
                </Typography>
                <ul>
                    <li>🎲 **Randomized User Assignment** – Variant A or B assigned randomly.</li>
                    <li>📈 **Performance Tracking** – Clicks, interactions, and actions logged.</li>
                    <li>🧠 **Data-Driven Insights** – Analyze user behavior for UI/UX improvements.</li>
                </ul>

                <Typography variant="h5" gutterBottom>
                    🚀 **Current Experiments:**
                </Typography>
                <ul>
                    <li>🔘 **Button Style:** Outlined vs Solid export button.</li>
                    <li>📑 **T&M Log Input:** Testing simplified input flow.</li>
                </ul>

                <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
                    <Button variant="contained" onClick={handleTestEvent}>
                        Track Test Event
                    </Button>
                    <Button variant="outlined" color="error" onClick={handleClearData}>
                        Clear A/B Testing Data
                    </Button>
                </Box>

                <Typography variant="body2" sx={{ marginTop: "20px", fontStyle: "italic" }}>
                    *Click "Track Test Event" to simulate user interaction or "Clear Data" to reset metrics.*
                </Typography>
            </Paper>
        </Box>
    );
}
