import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: String,
  rating: { type: Number, min: 1, max: 5 }
}, { timestamps: true });

export default mongoose.model("Feedback", feedbackSchema);
