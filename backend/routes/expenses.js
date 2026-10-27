
const express = require("express");
const Expense = require("../models/Expense");
const auth = require("../middleware/auth");

const router = express.Router();

// Get expenses belonging to the logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id })
      .sort({ date: -1 });

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch expenses." });
  }
});

// Add a new expense
router.post("/", auth, async (req, res) => {
  try {
    const { title, amount, category, date, description } = req.body;

    if (
      !title?.trim() ||
      !category?.trim() ||
      amount === undefined ||
      !Number.isFinite(Number(amount)) ||
      Number(amount) <= 0
    ) {
      return res.status(400).json({
        message: "Enter a title, a valid positive amount, and a category.",
      });
    }

    const expense = await Expense.create({
      user: req.user.id,
      title: title.trim(),
      amount: Number(amount),
      category: category.trim(),
      ...(date && { date }),
      description: description || "",
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Failed to save expense." });
  }
});

module.exports = router;
