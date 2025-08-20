import express from "express";
import Newsletter from "../models/Newsletter.js";

const router = express.Router();

// Get all newsletters
router.get("/", async (req, res) => {
  const newsletters = await Newsletter.find();
  res.json(newsletters);
});

// Create newsletter
router.post("/", async (req, res) => {
  try {
    const newsletter = new Newsletter(req.body);
    await newsletter.save();
    res.json(newsletter);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
