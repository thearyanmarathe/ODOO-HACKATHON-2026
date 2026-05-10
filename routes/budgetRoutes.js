const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const { createBudget, addExpense } = require("../controllers/budgetController");

router.post("/create", auth, createBudget);
router.post("/add-expense", auth, addExpense);

module.exports = router;