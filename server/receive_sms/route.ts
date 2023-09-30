// // receive_sms/route.ts

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


// import { Server } from 'http';
// import { Server as SocketIOServer } from 'socket.io';

// const httpServer = new Server();
// const port = 4000;
// const socketIoUrl = process.env.SOCKET_IO_URL || 'http://localhost:4000';
// // const io = require('socket.io')(httpServer, {
// //   cors: {
    
// //   },
// // });
// const io = new SocketIOServer(httpServer, {
//   cors: {
//     // origin: "http://localhost:3000",
//     origin: socketIoUrl,
//     // origin: "*",
//     // origin: ["http://localhost:3000", "https://ride-buddy.vercel.app/"],
//     methods: ["GET", "POST"],
//     allowedHeaders: ["my-custom-header"],
//     credentials: true
//   }
// });
// // function addNewMessage(newMessage) {
// //   messages.push(newMessage);
// // }

// // const messages = [];
// io.on('connection', (socket) => {
//     // console.log('receive_sms/route connection: ',  Math.floor(Date.now() / 1000));
//     // socket.emit('new-message', 'Hello from Server!');
//     socket.on('client-ready', () => {
//       // console.log('Received client-ready event at:', new Date());
//       // Now start emitting messages to this client
//       socket.emit('new-message', 'Hello from Server!');
//     });
//     // messages.forEach(message => {
//     //   socket.emit('new-message', message);
//     // });
//     socket.on('message', (message: string) => {
//         io.emit('new-message', message);
//     }); 
// });

// httpServer.listen(port, () => {
//     // console.log('receive_sms/route server listen ',  Date.now());
//     console.log(`WebSocket server ready on http://localhost:${port}`);
// });
 
// export { io, httpServer };