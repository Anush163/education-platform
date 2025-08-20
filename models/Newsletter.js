import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: Date
}, { timestamps: true });

export default mongoose.model("Newsletter", newsletterSchema);
