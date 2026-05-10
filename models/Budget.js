const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  title: String,
  amount: Number
});

const budgetSchema = new mongoose.Schema({
  trip: { type: mongoose.Schema.Types.ObjectId, ref: "Trip" },
  expenses: [expenseSchema],
  total: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Budget", budgetSchema);