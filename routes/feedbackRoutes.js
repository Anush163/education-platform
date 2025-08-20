import express from "express";
import Feedback from "../models/Feedback.js";

const router = express.Router();

// Submit feedback
router.post("/", async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.json(feedback);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all feedback
router.get("/", async (req, res) => {
  const feedbacks = await Feedback.find().populate("user", "name");
  res.json(feedbacks);
});

export default router;
