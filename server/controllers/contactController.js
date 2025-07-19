import Contact from "../schemas/Contact.js";

// ✅ POST - Save a contact message
export const saveContactMessage = async (req, res) => {
  try {
    const { name, email, projectType, message } = req.body;

    const newMessage = new Contact({ name, email, projectType, message });
    await newMessage.save();

    res.status(201).json({ success: true, message: "Message saved successfully!" });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ GET - Fetch all messages (for admin)
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
