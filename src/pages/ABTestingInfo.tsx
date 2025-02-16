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
                    🔹 **How A/B Testing Works in This Application:**
                </Typography>
                <ul>
                    <li>🎲 <strong>Randomized Variant Assignment</strong>: Upon first visit, each user is assigned **Variant A** or **Variant B**. The assignment persists in **local storage** for consistency across sessions.</li>
                    <li>📈 <strong>Interaction Tracking</strong>: Each button click is recorded, capturing **which button** was clicked and the **user's assigned variant**.</li>
                    <li>🧠 <strong>Data Visualization</strong>: Interactions are **displayed visually** on the **A/B Testing Dashboard** to compare behaviors between **Variant A** and **Variant B**.</li>
                </ul>

                <Typography variant="h5" gutterBottom>
                    🚀 **Current Experiments (POC)**:
                </Typography>
                <ul>
                    <li>🔘 <strong>Button Style</strong>: **Variant A** uses a **solid green colored button** while **Variant B** uses a **solid blue colored button** for the **"Export to CSV"** action.</li>
                    <li>📑 <strong>T&M Log Interaction</strong>: The **"Assign T&M Tag"** button may have **different labels** or **styles** based on **A/B variant**.</li>
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
