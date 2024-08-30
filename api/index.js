import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

const app = express();
dotenv.config();

// Middleware (if any)
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send('Grading System!');
});

// Start the server and connect to the database
const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});
