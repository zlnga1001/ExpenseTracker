const Expense = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const userId = req.userId; // Get the user ID from the authenticated request

  const expense = new Expense({
    title,
    amount,
    category,
    description,
    date,
    userId,
  });

  try {
    // Validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || typeof amount !== "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    await expense.save();
    res.status(200).json({ message: "Expense Added", expense });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.getExpenses = async (req, res) => {
  const userId = req.userId; // Get the user ID from the authenticated request

  try {
    const expenses = await Expense.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId; // Get the user ID from the authenticated request

  try {
    const expense = await Expense.findOneAndDelete({ _id: id, userId });
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.status(200).json({ message: "Expense Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
