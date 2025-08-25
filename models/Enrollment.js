import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  progress: { type: Number, default: 0 }, // overall %
  completedLessons: [{ type: String }], 
  attendance: { type: Number, default: 0 },
  videosWatched: [{
    video: { type: mongoose.Schema.Types.ObjectId, ref: "Video" },
    watchedTime: { type: Number, default: 0 }, // seconds watched
    completed: { type: Boolean, default: false }
  }]
}, { timestamps: true });

export default mongoose.model("Enrollment", enrollmentSchema);
