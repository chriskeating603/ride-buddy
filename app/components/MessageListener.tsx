'use client'
// MessageListener.tsx
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const MessageListener: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  
  useEffect(() => {
    // const socket = io('http://localhost:4000', {
    //   transports: ['websocket', 'polling'],
    // });
    const socketURL = process.env.NODE_ENV === 'production' ? process.env.URL : 'http://localhost:4000';
    const socket = io(socketURL || 'http://localhost:4000', {
      transports: ['websocket', 'polling'],
    });

    socket.emit('client-ready');
    console.log('client-ready just fired ', new Date());
    // socket.on('connect', () => {
    //   console.log('Sending client-ready event at:', new Date());
    //   socket.emit('client-ready');
    // });
    socket.on('new-message', function(message: string) {
      console.log('Received message at:', new Date(), 'Message:', message);
      setMessages(prevMessages => {
        const newMessages = [...prevMessages, message];
        console.log('messages', newMessages);
        return newMessages;
      });
    });
    socket.on('connect_error', (error: any) => {
      console.error('Connection Error:', error);
    });
    
    return () => {
      console.log('disconnecting');
      socket.disconnect();
    };
  }, []); // Empty dependency array

  return (
    <div>
      <h2>Messages from Twilio</h2>
      <ul>
        {messages.map((message, index) => message !== 'Hello from Server!' ? <li key={index}>{JSON.stringify(message)}</li>: null)}
      </ul>
    </div>
  );
}

export default MessageListener;