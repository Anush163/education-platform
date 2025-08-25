import express from "express";
import { createEvent, getEvents, registerForEvent } from "../controllers/eventController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createEvent);        // Create event (admin/instructor)
router.get("/", auth, getEvents);           // List upcoming events
router.post("/register", auth, registerForEvent); // Register for event

export default router;
