import express from "express";
import { createFaq, getFaqs, updateFaq, deleteFaq } from "../controllers/faqController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Admin routes
router.post("/", auth, createFaq);     // Add FAQ
router.put("/:id", auth, updateFaq);   // Update FAQ
router.delete("/:id", auth, deleteFaq);// Delete FAQ

// Public route
router.get("/", getFaqs); // Anyone can see FAQs

export default router;
