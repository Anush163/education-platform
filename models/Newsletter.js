import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema({
  title: { type: String, required: true },        // e.g., "New Feature Update"
  content: { type: String, required: true },      // e.g., "We just launched video tracking!"
  category: { type: String, default: "Update" },  // e.g., "Innovation", "Platform Update"
  publishedAt: { type: Date, default: Date.now }, // Auto store publish date
}, { timestamps: true });

export default mongoose.model("Newsletter", newsletterSchema);
