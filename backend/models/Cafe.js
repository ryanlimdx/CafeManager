// Initialise Cafe schema
const mongoose = require("mongoose");

const cafeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  logo: { type: Buffer }, // store images as binary data
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
});
cafeSchema.index(
  { name: 1, location: 1 },
  { unique: true }
);

module.exports = mongoose.model("Cafe", cafeSchema);
