import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import gradeRoutes from './routes/gradeRoutes.js'; // Adjust path as needed


const app = express();
dotenv.config();

// Middleware (if any)
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send('Grading System!');
});

app.use('/api', gradeRoutes); // Ensure this matches your route configuration

// Start the server and connect to the database
const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});
