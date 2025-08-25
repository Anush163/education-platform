import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },   // FAQ question
  answer: { type: String, required: true },     // FAQ answer
  category: { type: String, default: "General" } // Optional: group FAQs
}, { timestamps: true });

export default mongoose.model("Faq", faqSchema);
