import express from "express";
import User from "../models/User.js";
import Enrollment from "../models/Enrollment.js";

const router = express.Router();

// Get user profile
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  res.json(user);
});

// Get user dashboard (courses + progress)
router.get("/:id/dashboard", async (req, res) => {
  const enrollments = await Enrollment.find({ user: req.params.id }).populate("course");
  res.json({ enrollments });
});

export default router;
