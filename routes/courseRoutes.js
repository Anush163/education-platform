import express from "express";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";

const router = express.Router();

// Get all courses
router.get("/", async (req, res) => {
  const courses = await Course.find().populate("instructor", "name");
  res.json(courses);
});

// Enroll in a course
router.post("/enroll", async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    const enrollment = new Enrollment({ user: userId, course: courseId });
    await enrollment.save();
    res.json({ message: "Enrolled successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
