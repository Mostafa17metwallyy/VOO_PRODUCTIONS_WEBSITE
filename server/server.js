import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";
import filmRoutes from "./routes/filmRoutes.js";
import episodicRoutes from "./routes/episodicRoutes.js";
import authRoutes from "./routes/adminAuthRoutes.js";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("VOO Backend is running ✅");
});

// Contact routes
app.use("/api/contact", contactRoutes);
// Film routes
app.use("/api/films", filmRoutes);
// Episodic routes
app.use("/api/episodic", episodicRoutes);
app.use("/api/admin/auth", authRoutes);

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    