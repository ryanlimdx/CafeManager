const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./cmd/.env" });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Error handling for invalid routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
