
import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  id: { type: Number, required: true }, 
  unitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true },
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module',required: true},
  type: { type: String, required: true }, 
});

export default mongoose.model('Exercise', exerciseSchema);
