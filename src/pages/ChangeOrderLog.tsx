import { Container, Paper } from "@mui/material";
import ChangeOrderTable from "../components/ChangeOrderTable.tsx";
import MessageBoard from "../components/MessageBoard.tsx";
import { getUserVariant } from "../services/abTestingUtils";

export default function ChangeOrderLog() {
    const variant = getUserVariant();

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper sx={{ padding: 3, mb: 3 }}>
                <ChangeOrderTable />
            </Paper>

            {/* ✅ Only show MessageBoard for Variant B */}
            {variant === "B" && <MessageBoard />}
        </Container>
    );
}
