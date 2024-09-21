const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email_address: { type: String, required: true },
  phone_number: { type: String, required: true },
  gender: { type: String, required: true },
  start_date: { type: Date, default: Date.now },
  cafe: { type: mongoose.Schema.Types.ObjectId, ref: "Cafe" },
});

module.exports = mongoose.model("Employee", employeeSchema);
