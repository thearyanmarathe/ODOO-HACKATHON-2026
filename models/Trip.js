const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  startDate: Date,
  endDate: Date,
  budget: Number,
}, { timestamps: true });

module.exports = mongoose.model("Trip", tripSchema);