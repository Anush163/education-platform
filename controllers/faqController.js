import Faq from "../models/Faq.js";

// Add FAQ
export const createFaq = async (req, res) => {
  try {
    const { question, answer, category } = req.body;
    const faq = await Faq.create({ question, answer, category });
    res.status(201).json({ message: "FAQ created", faq });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Get all FAQs
export const getFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find().sort({ createdAt: -1 });
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Update FAQ
export const updateFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const faq = await Faq.findByIdAndUpdate(id, req.body, { new: true });
    if (!faq) return res.status(404).json({ error: "FAQ not found" });
    res.json({ message: "FAQ updated", faq });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete FAQ
export const deleteFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const faq = await Faq.findByIdAndDelete(id);
    if (!faq) return res.status(404).json({ error: "FAQ not found" });
    res.json({ message: "FAQ deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
