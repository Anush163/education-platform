import express from "express";
import Note from "../models/Note.js";

const router = express.Router();

// Get notes by user
router.get("/:userId", async (req, res) => {
  const notes = await Note.find({ user: req.params.userId });
  res.json(notes);
});

// Add new note
router.post("/", async (req, res) => {
  const note = new Note(req.body);
  await note.save();
  res.json(note);
});

export default router;
