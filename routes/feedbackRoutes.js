import express from "express";
import Feedback from "../models/Feedback.js";

const router = express.Router();

// Get all feedback
router.get("/", async (req, res) => {
  const feedback = await Feedback.find().populate("user", "name email");
  res.json(feedback);
});

// Add feedback
router.post("/", async (req, res) => {
  const feedback = new Feedback(req.body);
  await feedback.save();
  res.json(feedback);
});

export default router;
