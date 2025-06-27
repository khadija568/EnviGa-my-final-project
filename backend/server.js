import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config(); // load env variables

// app config
const app = express();
const port = process.env.PORT || 5000;

connectDB(); // connect to DB

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.get('/', (req, res) => {
    res.send('API WORKING');
});

app.listen(port, () => console.log("Serverur demarre sur le port", port));
