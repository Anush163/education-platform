import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  category: String,
  lessons: [String]
}, { timestamps: true });

export default mongoose.model("Course", courseSchema);
