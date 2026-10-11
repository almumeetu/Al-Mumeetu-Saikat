import mongoose, { Schema, models } from 'mongoose';

const BlogActivitySchema = new Schema(
  {
    blogId: { type: Schema.Types.ObjectId, ref: 'Blog', required: true, index: true },
    blogSlug: { type: String, required: true },
    blogTitle: { type: String, required: true },
    type: { type: String, enum: ['like', 'comment', 'share'], required: true },
    visitorId: { type: String, required: true },
    name: { type: String, trim: true, maxlength: 60 },
    message: { type: String, trim: true, maxlength: 2000 },
    channel: { type: String, enum: ['native', 'copy'] },
    approved: { type: Boolean, default: true },
    active: { type: Boolean, default: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// A browser can hold only one current like per post; comments and shares remain individual activity records.
BlogActivitySchema.index(
  { blogId: 1, visitorId: 1, type: 1 },
  { unique: true, partialFilterExpression: { type: 'like' } },
);
BlogActivitySchema.index({ read: 1, createdAt: -1 });
BlogActivitySchema.index({ blogId: 1, type: 1, active: 1 });
BlogActivitySchema.index({ blogId: 1, type: 1, approved: 1, active: 1, createdAt: -1 });

export default models.BlogActivity || mongoose.model('BlogActivity', BlogActivitySchema);
