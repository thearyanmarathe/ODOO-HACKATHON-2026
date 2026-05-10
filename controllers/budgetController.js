const Budget = require("../models/Budget");

// Create Budget (one per trip)
exports.createBudget = async (req, res) => {
  try {
    const { tripId } = req.body;

    let budget = await Budget.findOne({ trip: tripId });

    if (budget) {
      return res.status(400).json({ message: "Budget already exists" });
    }

    budget = await Budget.create({
      trip: tripId,
      expenses: [],
      total: 0
    });

    res.json(budget);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add Expense + auto calculate total
exports.addExpense = async (req, res) => {
  try {
    const { tripId, title, amount } = req.body;

    let budget = await Budget.findOne({ trip: tripId });

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    budget.expenses.push({ title, amount });

    // 🔥 auto calculate total
    budget.total = budget.expenses.reduce((sum, item) => sum + item.amount, 0);

    await budget.save();

    res.json(budget);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};