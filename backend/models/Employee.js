// Initialise Employee Schema
const mongoose = require("mongoose");
const { today } = require("../utils/dateUtils");

const employeeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email_address: { type: String, required: true, unique: true },
  phone_number: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  start_date: { type: String, default: today },
  cafe: { type: mongoose.Schema.Types.ObjectId, ref: "Cafe" },
});

module.exports = mongoose.model("Employee", employeeSchema);
