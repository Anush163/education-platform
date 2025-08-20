import express from "express";
import Note from "../models/Note.js";

const router = express.Router();

// Get notes
router.get("/:userId", async (req, res) => {
  const notes = await Note.find({ user: req.params.userId });
  res.json(notes);
});

// Create note
router.post("/", async (req, res) => {
  try {
    const note = new Note(req.body);
    await note.save();
    res.json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
