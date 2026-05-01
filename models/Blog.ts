import mongoose, { Schema, models } from 'mongoose';

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, required: true },
    category: { type: String, default: 'General' },
    tags: [String],
    author: { type: String, default: 'Al Mumeetu Saikat' },
    published: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default models.Blog || mongoose.model('Blog', BlogSchema);