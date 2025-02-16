import { Box, Typography, Paper, Button } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";

// Retrieve A/B testing events from localStorage
const getABTestData = () => {
    const events = JSON.parse(localStorage.getItem("abTestingEvents") || "[]");
    const counts: Record<string, { A: number; B: number }> = {};

    events.forEach((event: { action: string; label: string }) => {
        const variant = event.label.includes("Variant A") ? "A" : "B";
        if (!counts[event.action]) {
            counts[event.action] = { A: 0, B: 0 };
        }
        counts[event.action][variant]++;
    });

    return Object.entries(counts).map(([action, variants]) => ({
        action,
        VariantA: variants.A,
        VariantB: variants.B
    }));
};

export default function ABTestingDashboard() {
    const data = getABTestData();
    const variant = localStorage.getItem("userVariant") || "Not Assigned";

    const handleSwitchVariant = () => {
        const newVariant = variant === "A" ? "B" : "A";
        localStorage.setItem("userVariant", newVariant);
        window.location.reload();
    };

    return (
        <Box sx={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
            <Paper sx={{ padding: "16px" }}>
                <Typography variant="h4" gutterBottom>
                    📊 A/B Testing Dashboard
                </Typography>

                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                    Current Variant: <strong>{variant}</strong>
                </Typography>

                <Button variant="contained" color="primary" onClick={handleSwitchVariant} sx={{ marginBottom: 3 }}>
                    Switch Variant
                </Button>

                {data.length === 0 ? (
                    <Typography variant="body1" color="textSecondary">
                        No A/B testing data available. Perform actions to generate events.
                    </Typography>
                ) : (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="action" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="VariantA" fill="#4caf50" />
                            <Bar dataKey="VariantB" fill="#2196f3" />
                        </BarChart>
                    </ResponsiveContainer>
                )}

                <Typography variant="body2" sx={{ marginTop: 2, fontStyle: "italic" }}>
                    *This chart displays user interactions by action, comparing Variant A vs Variant B.*
                </Typography>
            </Paper>
        </Box>
    );
}
