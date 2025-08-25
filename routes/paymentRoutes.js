import express from "express";
import Payment from "../models/Payment.js";

const router = express.Router();

// Create payment
router.post("/", async (req, res) => {
  const payment = new Payment(req.body);
  await payment.save();
  res.json(payment);
});

// Get user payments
router.get("/:userId", async (req, res) => {
  const payments = await Payment.find({ user: req.params.userId });
  res.json(payments);
});

export default router;
