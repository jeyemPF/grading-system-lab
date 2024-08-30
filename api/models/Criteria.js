// models/Criteria.js
import mongoose from 'mongoose';

const criteriaSchema = new mongoose.Schema({
  instructorId: { type: String, required: true },
  criteria: [
    {
      name: { type: String, required: true },
      weight: { type: Number, required: true }, 
    },
  ],
});

const Criteria = mongoose.model('Criteria', criteriaSchema);
export default Criteria;
