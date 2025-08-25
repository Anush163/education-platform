import express from "express";
import { enrollCourse,completeLesson, getJourney,myEnrollments } from "../controllers/enrollmentController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/:courseId", auth, enrollCourse);
router.get("/my", auth, myEnrollments);
router.get("/journey/:courseId", auth, getJourney);
router.post("/complete-lesson", auth, completeLesson); // track lesson completion

export default router;
