import express from "express";
import { createNewsletter, getNewsletters, getNewsletterById, deleteNewsletter } from "../controllers/newsletterController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Public
router.get("/", getNewsletters);
router.get("/:id", getNewsletterById);

// Admin Only
router.post("/", auth, createNewsletter);
router.delete("/:id", auth, deleteNewsletter);

export default router;
