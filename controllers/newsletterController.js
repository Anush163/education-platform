import Newsletter from "../models/Newsletter.js";

// ✅ Add Newsletter (Admin Only)
export const createNewsletter = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const newsletter = await Newsletter.create({ title, content, category });
    res.status(201).json({ message: "Newsletter created", newsletter });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get All Newsletters (Public)
export const getNewsletters = async (req, res) => {
  try {
    const newsletters = await Newsletter.find().sort({ publishedAt: -1 });
    res.json(newsletters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get Single Newsletter by ID
export const getNewsletterById = async (req, res) => {
  try {
    const newsletter = await Newsletter.findById(req.params.id);
    if (!newsletter) return res.status(404).json({ error: "Newsletter not found" });
    res.json(newsletter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete Newsletter (Admin Only)
export const deleteNewsletter = async (req, res) => {
  try {
    const newsletter = await Newsletter.findByIdAndDelete(req.params.id);
    if (!newsletter) return res.status(404).json({ error: "Newsletter not found" });
    res.json({ message: "Newsletter deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
