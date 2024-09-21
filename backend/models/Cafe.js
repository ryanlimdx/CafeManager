const mongoose = require("mongoose");

const cafeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  logo: { type: Buffer }, // store images as binary data
  location: { type: String, required: true },
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
});

module.exports = mongoose.model("Cafe", cafeSchema);
