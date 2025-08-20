import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Get user profile
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).populate("community");
  res.json(user);
});

// Update user profile
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
