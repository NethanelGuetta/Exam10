import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB";
import cors from "cors";
import userRoutes from './routes/uesrRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: '*',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true 
  }));

connectDB();
app.use(express.json());

app.use('/api/users', userRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

export default app;