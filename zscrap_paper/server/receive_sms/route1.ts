// receive_sms/route1.ts

import { Server } from 'http';
import { Server as SocketIOServer } from 'socket.io';

const port = Number(process.env.SOCKET_IO_PORT) || 4000;
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";
const httpServer = new Server();

const io = new SocketIOServer(httpServer, {
  cors: {
    origin: corsOrigin,
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

io.on('connection', (socket) => {
    socket.on('client-ready', () => {
      socket.emit('new-message', 'Hello from Server!');
    });
    socket.on('message', (message: string) => {
        io.emit('new-message', message);
    });
});

httpServer.listen(port, () => {
    console.log(`WebSocket server ready on http://localhost:${port}`);
});
 
export { io, httpServer };