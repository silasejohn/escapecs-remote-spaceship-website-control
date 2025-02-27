// SEND COMMANDS: http://{ip_addr}:8081/send/{message}

const WebSocket = require('ws');
const express = require('express');
const path = require('path');
const app = express();

// Define ports
const wsPort = 8080;  // WebSocket port
const httpPort = 8081;  // HTTP port

// Define IP address
// const ip_addr = "127.0.0.1" // localhost (same device)
const ip_addr = "192.168.1.28" // Silas Macbook via wifi

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

const wss = new WebSocket.Server({ port: wsPort });

let currentState = 'CHANGE_TO_BLACK_SCREEN'; // Initialize the current state

wss.on('connection', ws => {
    console.log('Client connected');
    ws.on('message', message => {
        console.log(`Received message: ${message}`);
    });
});

function broadcast(message) {
    console.log(`Broadcasting message: ${message}`);  // Debugging line
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

app.get('/send/:message', (req, res) => {
    const message = req.params.message;
    currentState = message; // Update the current state 
    if (message === 'CHANGE_TO_BLACK_SCREEN' || message === 'CHANGE_TO_PASSWORD_SITE' || message === 'CHANGE_TO_FINAL_SCREEN') {
        broadcast(message);
        res.send(`Message ${message} sent to all clients`);
    } else {
        res.status(400).send('[Valid Commands]\nhttp://{device_ip}:8081/send/CHANGE_TO_BLACK_SCREEN\nhttp://{device_ip}:8081/send/CHANGE_TO_PASSWORD_SITE\nhttp://{device_ip}:8081/send/CHANGE_TO_FINAL_SCREEN');
    }
});

// Route to get the current state
app.get('/current-state', (req, res) => {
    res.json({ state: currentState });
});

app.get('/control', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'control.html'));
});

app.listen(httpPort, () => {
    console.log(`\n✅ Server is running! Use the following links:\n`);
    console.log(`📺 Monitor Display: http://${ip_addr}:8081/`);
    console.log(`🎛️ Control Panel: http://${ip_addr}:8081/control`);
});

console.log(`\n🌐 WebSocket server is running on ws://${ip_addr}:${wsPort}`);
