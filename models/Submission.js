
import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  lesson: { type: mongoose.Schema.Types.ObjectId }, // specific lesson/project
  code: String,              // student’s submitted code (or file path if uploaded)
  status: { type: String, enum: ["submitted", "reviewed"], default: "submitted" },
  feedback: String,          // instructor’s comments
  grade: Number              // optional grading
}, { timestamps: true });

export default mongoose.model("Submission", submissionSchema);
