import Event from "../models/Event.js";

// ✅ Add new event
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    const event = await Event.create({
      title,
      description,
      date,
      location,
      createdBy: req.user._id
    });
    res.status(201).json({ message: "Event created", event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all upcoming events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ date: { $gte: new Date() } }).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Register for event
export const registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ error: "Event not found" });

    // Avoid duplicate registrations
    if (!event.attendees.includes(req.user._id)) {
      event.attendees.push(req.user._id);
      await event.save();
    }

    res.json({ message: "Registered successfully", event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
