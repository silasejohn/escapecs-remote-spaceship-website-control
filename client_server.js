// const WebSocket = require('ws');
// const wss = new WebSocket.Server({ port: 8080 }); // Using port 8080 for WebSocket

// wss.on('connection', (ws) => {
//     console.log('A client has connected');

//     // Listen for messages from clients
//     ws.on('message', (message) => {
//         console.log('Received:', message);
//         // Broadcast the message to all connected clients
//         wss.clients.forEach(client => {
//             if (client.readyState === WebSocket.OPEN) {
//                 client.send(message);
//             }
//         });
//     });
// });

// console.log('WebSocket server is running on ws://<server_ip>:8080');
