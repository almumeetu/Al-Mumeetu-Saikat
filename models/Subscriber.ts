import mongoose, { Schema, models } from 'mongoose';

const SubscriberSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default models.Subscriber || mongoose.model('Subscriber', SubscriberSchema);