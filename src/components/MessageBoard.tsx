import { useState } from "react";
import { Box, TextField, Button, Paper, Typography, List, ListItem, ListItemText } from "@mui/material";
import { trackEvent } from "../services/abTestingUtils"; // ✅ Track events

interface Message {
    id: number;
    sender: string;
    text: string;
    timestamp: string;
}

export default function MessageBoard() {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, sender: "MS", text: "This is the new extra time rate?", timestamp: "2024-02-07 10:15 AM" },
        { id: 2, sender: "JH", text: "Yes. It’s pulling from the rate sheet they uploaded last week.", timestamp: "2024-02-07 10:17 AM" }
    ]);
    const [newMessage, setNewMessage] = useState("");

    const sendMessage = () => {
        if (!newMessage.trim()) return;

        // ✅ Track the "Send Message" event
        trackEvent("Button Click", "Send Message clicked (Variant B)");

        const message: Message = {
            id: messages.length + 1,
            sender: "You",
            text: newMessage,
            timestamp: new Date().toLocaleString()
        };

        setMessages([...messages, message]);
        setNewMessage("");
    };

    return (
        <Paper sx={{ padding: 2, mt: 3 }}>
            <Typography variant="h6">Messages</Typography>
            <List>
                {messages.map((msg) => (
                    <ListItem key={msg.id}>
                        <ListItemText
                            primary={`${msg.sender}: ${msg.text}`}
                            secondary={msg.timestamp}
                        />
                    </ListItem>
                ))}
            </List>
            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button variant="contained" onClick={sendMessage}>
                    Send
                </Button>
            </Box>
        </Paper>
    );
}
