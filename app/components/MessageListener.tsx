'use client'
// MessageListener.tsx

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

type Message = {
  slotId: number;
  claimedName: string;
  phoneNumber: string;
};

const MessageListener: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  
  useEffect(() => {
    console.log('MessageListener mounted');
    // const socketURL = process.env.NODE_ENV === 'production' ? process.env.REMOTE_SERVER : process.env.LOCAL_SERVER;
    // console.log('env', process.env.NODE_ENV);
    const socketURL = process.env.REMOTE_SERVER;    
    const socket = io(socketURL 
       || 'http://localhost:4000'  
       , {
      transports: ['websocket', 'polling'],
    });

    socket.emit('client-ready');
    socket.on('new-message', function(message: Message) {
      console.log('new-message', message);
      setMessages(prevMessages => [...prevMessages, message]);
    });
    socket.on('connect_error', (error: any) => {
      console.error('Connection Error');
    });
    
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Messages from Twilio</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            Slot ID: {message.slotId} <br />
            Claimed Name: {message.claimedName} <br />
            Phone Number: {message.phoneNumber}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MessageListener;