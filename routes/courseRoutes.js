import express from "express";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";

const router = express.Router();

// Get all courses
router.get("/", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// Add new course
router.post("/", async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json(course);
});

// Enroll in course
router.post("/:id/enroll", async (req, res) => {
  const enrollment = new Enrollment({
    user: req.body.userId,
    course: req.params.id,
  });
  await enrollment.save();
  res.json({ message: "Enrolled successfully", enrollment });
});

export default router;
