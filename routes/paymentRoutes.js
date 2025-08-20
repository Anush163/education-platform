import express from "express";
import Payment from "../models/Payment.js";

const router = express.Router();

// Make payment
router.post("/", async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get user payments
router.get("/:userId", async (req, res) => {
  const payments = await Payment.find({ user: req.params.userId }).populate("course");
  res.json(payments);
});

export default router;
