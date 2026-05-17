import mongoose, { Schema, models } from 'mongoose';

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: [String], required: true },
    tech: [String],
    liveUrl: String,
    githubUrl: String,
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default models.Project || mongoose.model('Project', ProjectSchema);