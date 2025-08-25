import express from "express";
import { downloadVideo } from "../controllers/videoController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// GET /api/videos/:courseId/:videoId/download
router.get("/:courseId/:videoId/download", auth, downloadVideo);

export default router;
