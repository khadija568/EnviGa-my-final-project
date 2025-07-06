import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import hotelRoutes from "./routes/hotelRoutes.js";
import wasteRoutes from "./routes/wasteRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { Server } from 'socket.io';
import http from "http";

dotenv.config(); // load env variables

// app config
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // أو حسب رابط الواجهة
    methods: ["GET", "POST"]
  }
});
const port = process.env.PORT || 5000;

connectDB(); // connect to DB

// middlewares
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', // غيّرها حسب بيئة العمل
  credentials: true}));
//Routes
app.use('/api/auth', authRoutes);
app.use('/api/hotels',hotelRoutes);
app.use('/api/waste', wasteRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/requests', wasteRoutes);


// api endpoints
app.get('/', (req, res) => {
    res.send('API WORKING');
});

//app.listen(port, () => console.log("Serverur demarre sur le port", port));

// الاستماع للاتصال
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg); // إرسال لجميع المستخدمين
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});