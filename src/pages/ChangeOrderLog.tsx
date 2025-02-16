import { Container, Paper } from "@mui/material";
import ChangeOrderTable from "../components/ChangeOrderTable.tsx";
import MessageBoard from "../components/MessageBoard.tsx";

export default function ChangeOrderLog() {
    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper sx={{ padding: 3, mb: 3 }}>
                <ChangeOrderTable />
            </Paper>
            <MessageBoard />
        </Container>
    );
}
