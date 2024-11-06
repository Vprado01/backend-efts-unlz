import  mongoose from 'mongoose';
import { hashPassword } from '../services/password.services.js';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePicture: { type: String, required: false },
  passwordResetToken: { type: String, required: false },
  passwordResetExpires: { type: Date, required: false },
  role: { type: String, required: false },
  licence: { type: String, required: false }
});

// Middleware para hashear la contrasenia antes de guardar el usuario
userSchema.pre('save', async function (next) {
  this.password = await hashPassword(this.password)
  next();
});

export default mongoose.model('User', userSchema)
