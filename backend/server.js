const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const investmentRoutes = require("./routes/investment");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: [process.env.FRONTEND_URL,"http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/investment", investmentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
