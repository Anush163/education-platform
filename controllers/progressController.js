
import Enrollment from "../models/Enrollment.js";
import Video from "../models/Video.js";

export const updateVideoProgress = async (req, res) => {
  try {
    const { enrollmentId, videoId } = req.params;
    const { watchedTime } = req.body; // frontend sends watched time in seconds

    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });

    // Find or create entry for this video
    let videoProgress = enrollment.videosWatched.find(v => v.video.toString() === videoId);
    const video = await Video.findById(videoId);

    if (!video) return res.status(404).json({ message: "Video not found" });

    if (videoProgress) {
      videoProgress.watchedTime = Math.min(watchedTime, video.duration);
      videoProgress.completed = videoProgress.watchedTime >= video.duration * 0.9; // mark complete if 90% watched
    } else {
      enrollment.videosWatched.push({
        video: videoId,
        watchedTime: Math.min(watchedTime, video.duration),
        completed: watchedTime >= video.duration * 0.9
      });
    }

    // Recalculate overall course progress (% completed videos)
    const totalVideos = await Video.countDocuments({ course: enrollment.course });
    const completedVideos = enrollment.videosWatched.filter(v => v.completed).length;
    enrollment.progress = totalVideos ? (completedVideos / totalVideos) * 100 : 0;

    await enrollment.save();

    res.json({ message: "Progress updated", enrollment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
