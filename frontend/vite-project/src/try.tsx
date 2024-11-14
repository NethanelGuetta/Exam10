// // Server (server.ts)
// // import express from 'express';
// // import { createServer } from 'http';
// // import { Server } from 'socket.io';
// // import cors from 'cors';

// // const app = express();
// // app.use(cors());
// // const httpServer = createServer(app);
// // const io = new Server(httpServer, {
// //   cors: {
// //     origin: "*",
// //     methods: ["GET", "POST"]
// //   }
// // });

// // Define message type
// interface ChatMessage {
//   user: string;
//   message: string;
//   timestamp: Date;
// }

// // io.on('connection', (socket) => {
// //   console.log('User connected:', socket.id);

// //   socket.on('send_message', (data: ChatMessage) => {
// //     io.emit('receive_message', data);
// //   });

// //   socket.on('disconnect', () => {
// //     console.log('User disconnected:', socket.id);
// //   });
// // });

// // httpServer.listen(4000, () => {
// //   console.log('Server running on port 4000');
// // });

// // Client (src/components/Chat.tsx)
// import React, { useEffect, useState } from 'react';
// import { io, Socket } from 'socket.io-client';

// interface ChatMessage {
//   user: string;
//   message: string;
//   timestamp: Date;
// }

// const Chat: React.FC = () => {
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [message, setMessage] = useState<string>('');
//   const [messages, setMessages] = useState<ChatMessage[]>([]);
//   const [username, setUsername] = useState<string>('');

//   useEffect(() => {
//     const newSocket = io('http://localhost:5000');
//     setSocket(newSocket);

//     return () => {
//       newSocket.close();
//     };
//   }, []);

//   useEffect(() => {
//     if (!socket) return;

//     socket.on('receive_message', (message: ChatMessage) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     return () => {
//       socket.off('receive_message');
//     };
//   }, [socket]);

//   const sendMessage = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (message.trim() && username.trim() && socket) {
//       const messageData: ChatMessage = {
//         user: username,
//         message: message.trim(),
//         timestamp: new Date()
//       };

//       socket.emit('send_message', messageData);
//       setMessage('');
//     }
//   };

//   return (
//     <div className="p-4">
//       <div className="mb-4">
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Enter your username"
//           className="border p-2 rounded"
//         />
//       </div>
      
//       <div className="border rounded p-4 h-96 overflow-y-auto mb-4">
//         {messages.map((msg, idx) => (
//           <div key={idx} className="mb-2">
//             <span className="font-bold">{msg.user}: </span>
//             <span>{msg.message}</span>
//             <span className="text-sm text-gray-500 ml-2">
//               {new Date(msg.timestamp).toLocaleTimeString()}
//             </span>
//           </div>
//         ))}
//       </div>

//       <form onSubmit={sendMessage} className="flex gap-2">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message"
//           className="flex-1 border p-2 rounded"
//         />
//         <button 
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Chat;