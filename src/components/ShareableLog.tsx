import { Card, CardContent, Typography, Button } from "@mui/material";

export default function ShareableLog() {
    const link = "https://yourdomain.com/#/cor-log";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(link);
        alert("Link copied to clipboard!");
    };

    return (
        <Card sx={{ padding: 2, margin: 2 }}>
            <CardContent>
                <Typography variant="h6">Share COR Log</Typography>
                <Typography color="primary">{link}</Typography>
                <Button variant="contained" onClick={copyToClipboard} sx={{ marginTop: 1 }}>
                    Copy Link
                </Button>
            </CardContent>
        </Card>
    );
}
