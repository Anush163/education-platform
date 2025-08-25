import Video from "../models/Video.js";
import Enrollment from "../models/Enrollment.js";
import path from "path";
import fs from "fs";

export const downloadVideo = async (req, res) => {
  try {
    const { courseId, videoId } = req.params;
    const userId = req.user.id; // from auth middleware

    // check if user enrolled
    const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
    if (!enrollment) {
      return res.status(403).json({ message: "You must be enrolled to download videos" });
    }

    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });

    // If video stored locally
    const filePath = path.resolve(`./uploads/videos/${video.url}`);
    if (!fs.existsSync(filePath)) return res.status(404).json({ message: "File missing" });

    res.download(filePath, video.title + ".mp4");

    // res.redirect(video.url); // Or generate a signed URL for limited-time access
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
