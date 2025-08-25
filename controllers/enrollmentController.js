import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import Video from "../models/Video.js";
export const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const enrollment = new Enrollment({
      user: req.user._id,
      course: courseId
    });
    await enrollment.save();
    res.status(201).json({ message: "Enrolled successfully", enrollment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

    // check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // check if already enrolled
    const existing = await Enrollment.findOne({ user: userId, course: courseId });
    if (existing) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

  
export const myEnrollments = async (req, res) => {
  try {
    const userId = req.user.id;

    const enrollments = await Enrollment.find({ user: userId })
      .populate("course", "title description instructor");

    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";


// Track lesson completion
export const completeLesson = async (req, res) => {
  try {
    const { enrollmentId, lessonId, minutesSpent } = req.body;

    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) return res.status(404).json({ error: "Enrollment not found" });

    // Add lesson if not already completed
    if (!enrollment.completedLessons.includes(lessonId)) {
      enrollment.completedLessons.push(lessonId);
    }

    // Update time spent
    enrollment.timeSpent += minutesSpent || 0;

    // Calculate progress %
    const course = await Course.findById(enrollment.course);
    const totalLessons = course.lessons.length;
    enrollment.progress = Math.round((enrollment.completedLessons.length / totalLessons) * 100);

    // Update status
    if (enrollment.progress === 100) {
      enrollment.status = "completed";
    } else {
      enrollment.status = "in-progress";
    }

    await enrollment.save();
    res.json({ message: "Lesson updated", enrollment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Mark video as watched
export const markVideoWatched = async (req, res) => {
  try {
    const { enrollmentId, videoId, minutesSpent } = req.body;

    const enrollment = await Enrollment.findById(enrollmentId).populate("course");
    if (!enrollment) return res.status(404).json({ error: "Enrollment not found" });

    // Add video if not already completed
    if (!enrollment.completedLessons.includes(videoId)) {
      enrollment.completedLessons.push(videoId);
    }

    // Add time spent
    enrollment.timeSpent += minutesSpent || 0;

    // Calculate progress
    const totalVideos = await Video.countDocuments({ course: enrollment.course._id });
    enrollment.progress = Math.round((enrollment.completedLessons.length / totalVideos) * 100);

    // Update status
    enrollment.status = enrollment.progress === 100 ? "completed" : "in-progress";

    await enrollment.save();
    res.json({ message: "Video tracked successfully", enrollment });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user journey for a course
export const getJourney = async (req, res) => {
  try {
    const { courseId } = req.params;
    const enrollment = await Enrollment.findOne({ user: req.user._id, course: courseId })
      .populate("course");
    
    if (!enrollment) return res.status(404).json({ error: "Not enrolled in this course" });

    res.json({
      course: enrollment.course.title,
      progress: enrollment.progress,
      completedLessons: enrollment.completedLessons,
      timeSpent: enrollment.timeSpent,
      status: enrollment.status
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

