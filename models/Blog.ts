import mongoose, { Schema, models } from 'mongoose';

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    slugCustom: { type: Boolean },
    previousSlugs: { type: [String], default: [] },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, required: true },
    category: { type: String, default: 'General' },
    tags: [String],
    publishedAt: { type: Date, default: Date.now },
    references: {
      type: [{ label: { type: String, required: true }, url: { type: String, required: true } }],
      default: [],
    },
    author: { type: String, default: 'Al Mumeetu Saikat' },
    published: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default models.Blog || mongoose.model('Blog', BlogSchema);
