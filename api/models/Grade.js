// models/Grade.js
import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  examScore: { type: Number, required: true },
  examTotal: { type: Number, required: true },
  components: [
    {
      name: { type: String, required: true },
      weight: { type: Number, required: true },
      score: { type: Number, required: true },
      total: { type: Number, required: true },
    },
  ],
  finalGrade: { type: Number, required: true },
});

const Grade = mongoose.model('Grade', gradeSchema);
export default Grade;
