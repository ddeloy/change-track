import {Box, Button, Paper, Typography} from "@mui/material";
import {getUserVariant, trackEvent} from "../services/abTestingUtils";

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
        <Box sx={{maxWidth: "800px", margin: "auto", padding: "20px"}}>
            <Paper sx={{padding: "16px"}}>
                <Typography variant="h4" gutterBottom>
                    A/B Testing Overview

                </Typography>
                <hr/>
                <Typography variant="body1" sx={{marginTop: "0px", fontStyle: "normal"}}>
                    Click "Track Test Event" to begin simulating user interactions or "Clear Data" to reset metrics and begin again.
                </Typography>
                <Box sx={{display: "flex", gap: 2, marginTop: 2}}>
                    <Button variant="contained" onClick={handleTestEvent}>
                        Track Test Event
                    </Button>
                    <Button variant="outlined" color="error" onClick={handleClearData}>
                        Clear A/B Testing Data
                    </Button>
                </Box>

                <Typography variant="body1" gutterBottom>
                    Your Assigned Variant: <strong>{variant}</strong>
                </Typography>
                <hr/>

                <Typography variant="h6" gutterBottom>
                    A/B testing Example (greatly oversimplified)
                </Typography>
                <ul>
                    <li><strong>Random Variant Assignment</strong>: Upon first visit, a user is assigned Variant A or
                        Variant B.
                        The assignment is saved to local storage for simulated consistency across sessions.
                    </li>
                    <li><strong>Interaction Tracking</strong>: A few simple interactions are logged and visualized in
                        the <em>A/B Testing Dashboard</em>. Some limited functionality avail in this view:
                        <ul>
                            <li>Toggle Variant</li>
                            <li>Clear local storage and start fresh</li>
                        </ul>
                    </li>

                </ul>

                <Typography variant="h6" gutterBottom>
                    Current Experiments (POC)
                </Typography>
                <ul>
                    <li><strong>Export to CSV</strong> and <strong>T&M Log Interaction: </strong>
                        Each button may have different labels or styles based on A/B variant</li>
                    <li><strong>Change Orders - Message Board:</strong> The Messaging feature is either displayed or omitted (when displayed "Send" message interaction is logged)</li>
                </ul>
                <Typography variant="h6" gutterBottom>
                    Tools, Libraries and Services
                </Typography>
                <Typography variant="body1" sx={{marginTop: "0px", fontStyle: "normal"}}>
                    Curated list to handle A/B testing, feature flagging,
                    and user interaction analytics in a more scalable, production-grade environment.
                </Typography>
                <ul>
                    <li>
                        A/B Testing
                        <ul>
                            <li><a href="https://www.growthbook.io/" target="_blank">GrowthBook</a> - Open-source A/B
                                testing and feature flagging platform (geared toward developers)
                            </li>
                            <li><a href="https://www.optimizely.com/" target="_blank">Optimizely</a> - Experimentation
                                platforms, with capabilities for A/B testing, personalization, and feature flagging
                            </li>
                        </ul>
                    </li>
                    <li>Feature Flagging
                        <ul>
                            <li><a href="https://launchdarkly.com/" target="_blank">LaunchDarkly</a> - Feature toggling
                                and experimentation ( seems especially useful for engineering teams)
                            </li>
                            <li><a href="https://www.flagsmith.com/" target="_blank">Flagsmith</a> - Open-source and
                                cloud-hosted feature flagging platform
                            </li>
                        </ul>
                    </li>
                    <li>Analytics with AI Extensibility
                        <ul>
                            <li><a href="https://support.google.com/analytics/answer/10089681?hl=en" target="_blank">Google
                                Analytics 4</a> - Well-known and widely adopted analytics tool.
                                Offers event-based tracking, including A/B testing capabilities
                            </li>
                            <li><a href="https://www.hotjar.com/" target="_blank">Hotjar</a> - Heatmaps, session
                                recordings, and user feedback
                            </li>
                        </ul>
                    </li>
                    <li>In-House Solution (lightweight tracking mechanisms)
                        <ul>
                            <li>Browser APIs -  SessionStorage, or custom event listeners</li>
                            <li>Telemetry - OpenTelemetry or custom middleware in Node.js</li>
                            <li>Visualization - Libraries like Recharts, D3.js, or Chart.js</li>
                        </ul>
                    </li>
                </ul>
            </Paper>
        </Box>
    );
}
