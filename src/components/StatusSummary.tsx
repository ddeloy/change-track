import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";
import { Card, CardContent, Typography } from "@mui/material";
import { useFetchCORs } from "../services/useFetchCORS";

// Define the type for chart data
interface StatusCount {
    name: string;
    value: number;
    color: string;
}

// Define available colors for chart slices
const COLORS: string[] = ["#4caf50", "#ff9800", "#f44336"];

export default function StatusSummary() {
    const corData = useFetchCORs();

    // ✅ Fix TypeScript issue: Explicitly define `statusCounts`
    const statusCounts: Record<"Approved" | "In Review" | "Void", number> = {
        Approved: 0,
        "In Review": 0,
        Void: 0
    };

    // ✅ Use `forEach` instead of `.reduce()`
    corData.forEach((cor) => {
        statusCounts[cor.status] += 1;
    });

    // ✅ Convert object to array for Recharts
    const chartData: StatusCount[] = Object.entries(statusCounts).map(([key, value], index) => ({
        name: key,
        value,
        color: COLORS[index] || "#ccc" // Fallback color if out of range
    }));

    return (
        <Card sx={{ padding: 2, margin: 2, maxWidth: "350px" }}> {/* ✅ Ensured consistent sizing */}
            <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                    Status Summary
                </Typography>
                <PieChart width={300} height={250}>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend /> {/* ✅ Added Legend for better clarity */}
                </PieChart>
            </CardContent>
        </Card>
    );
}
