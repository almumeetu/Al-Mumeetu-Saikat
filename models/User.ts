import mongoose, { Schema, models } from 'mongoose';

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, default: 'Admin' },
    role: { type: String, enum: ['admin'], default: 'admin' },
  },
  { timestamps: true },
);

export default models.User || mongoose.model('User', UserSchema);