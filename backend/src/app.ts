import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB";
import cors from "cors";
import userRoutes from './routes/uesrRoutes';
import attackRoutes from './routes/attackRoutes';

import { createServer } from 'http';//io
import { Server } from 'socket.io';//io
import { attack } from "./controllers/attackController";
import { createAttack } from "./services/missileService";
import attackModel from "./models/attackModel";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
//socket
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});//socket

// Define message type
interface ChatMessage {
  user: string;
  message: {
    selectedTarget: string;
    missileChosen: string;
  };
  timestamp: Date;
}
//socket
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('send_message', async(data: ChatMessage) => {
    const newAttack = await createAttack({ missileName: data.message.missileChosen, location: data.message.selectedTarget });
    console.log(data);

    const location = data.message.selectedTarget;
    const attackForLocation = await attackModel.find({ location });;

    io.emit('receive_message', attackForLocation);
  });

  socket.on('join', (room) => {
    socket.join(room);
    console.log('User joined room:', room);
    
  });

  socket.on('leave', (room) => {
    socket.leave(room);
    console.log(`Socket ${socket.id} left room ${room}`);
  });

  socket.on('message-to-room', (room, message) => {
    io.to(room).emit('room-message', message);
  });


  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});
//socket

connectDB();
app.use(express.json());

app.use('/api/users', userRoutes)
app.use('/api/attacks', attackRoutes)

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;