// receive_sms/route.ts
import { Server } from 'http';
import { Server as SocketIOServer } from 'socket.io';

const httpServer = new Server();
const port = process.env.PORT || 4000;
const io = new SocketIOServer(httpServer, {
  cors: {
    // origin: "http://localhost:3000",
    // origin: "*",
    origin: ["http://localhost:3000", "https://ride-buddy.vercel.app/"],
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});
io.on('connection', (socket) => {
    // console.log('receive_sms/route connection: ',  Math.floor(Date.now() / 1000));
    socket.on('client-ready', () => {
      console.log('Received client-ready event at:', new Date());
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