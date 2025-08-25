import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },       // Event title
  description: { type: String },                 // Details
  date: { type: Date, required: true },          // When the event happens
  location: { type: String },                    // Online/Offline location
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Instructor/admin
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Registered users
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);
