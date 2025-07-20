import jwt from "jsonwebtoken";
import Admin from "../schemas/Admin.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Admin login
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (!admin) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await admin.matchPassword(password);

  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  res.json({
    _id: admin._id,
    email: admin.email,
    token: generateToken(admin._id),
  });
};

// Seed a default admin (only for first-time setup)
export const seedAdmin = async (req, res) => {
  const exists = await Admin.findOne({ email: "admin@voo.com" });
  if (exists) return res.json({ message: "Admin already exists" });

  const admin = new Admin({
    email: "admin@voo.com",
    password: "123456", // will be hashed
  });

  await admin.save();
  res.json({ message: "Default admin created", email: admin.email });
};
