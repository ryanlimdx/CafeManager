// The entry point of the backend server
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database"); 
const notFound = require("./middlewares/errorMiddleware");
const employeeRoutes = require("./routes/employeeRoutes");
const cafeRoutes = require("./routes/cafeRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes for employees and cafes
app.use("/api/employees", employeeRoutes);
app.use("/api/cafes", cafeRoutes);

// Error handling for invalid routes
app.use(notFound);

// Database
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
