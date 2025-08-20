import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

// Get events/skills
router.get("/", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// Create event
router.post("/", async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
