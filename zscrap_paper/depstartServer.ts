

import { Server } from 'http';
import { Server as SocketIOServer } from 'socket.io';

const httpServer = new Server();
const port = 4000; // Use a different port from your Next.js app

const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

console.log('WebSocket server started on port', port);

export { io, httpServer }; // Export the WebSocket server and HTTP server
