const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const dotenv = require("dotenv");
const notFound = require("./middlewares/errorMiddleware");
const employeeRoutes = require("./routes/employeeRoutes");
const cafeRoutes = require("./routes/cafeRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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
