
import express from "express";
import { updateVideoProgress } from "../controllers/progressController.js";

const router = express.Router();

// PUT /api/progress/:enrollmentId/:videoId
router.put("/:enrollmentId/:videoId", updateVideoProgress);

export default router;
