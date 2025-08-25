import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,         // where video is stored
  duration: Number,         // length of video in minutes
  resources: [String],      // extra materials (PDF, links, etc.)
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  category: String,
  lessons: [lessonSchema],  // now lessons are objects, not just strings
}, { timestamps: true });


const videoSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  title: String,
  url: String,   // video file URL (local or Cloudinary/AWS S3)
  duration: Number // in seconds
}, { timestamps: true });

export default mongoose.model("Course","Video", courseSchema, videoSchema);
 