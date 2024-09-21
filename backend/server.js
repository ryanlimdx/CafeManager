const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Error handling for invalid routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Database
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
