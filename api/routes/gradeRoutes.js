// routes/gradeRoutes.js
import express from 'express';
import { calculateGrade } from '../controllers/gradeController.js';

const router = express.Router();

router.post('/calculate', calculateGrade);

export default router;
