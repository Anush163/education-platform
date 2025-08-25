// routes/submissionRoutes.js
import express from "express";
import upload from "../middleware/upload.js";
import { createSubmission } from "../controllers/submissionController.js";

const router = express.Router();

// student uploads file
router.post("/", upload.single("file"), createSubmission);

export default router;
