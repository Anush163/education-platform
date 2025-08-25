import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["student", "admin", "instructor"], default: "student" },
  community: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });

export default mongoose.model("User", userSchema);
