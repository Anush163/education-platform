import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  type: { type: String, enum: ["event", "skill"] }
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);
