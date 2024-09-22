const mongoose = require("mongoose");
const { today } = require("../utils/dateUtils");

const employeeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email_address: { type: String, required: true },
  phone_number: { type: String, required: true },
  gender: { type: String, required: true },
  start_date: { type: String, default: today },
  cafe: { type: mongoose.Schema.Types.ObjectId, ref: "Cafe" },
});
employeeSchema.index(
  { name: 1, email_address: 1, phone_number: 1, gender: 1 },
  { unique: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
