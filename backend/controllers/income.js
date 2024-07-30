const Income = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const userId = req.userId; // Get the user ID from the authenticated request

  const income = new Income({
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
    await income.save();
    res.status(200).json({ message: "Income Added", income });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.getIncomes = async (req, res) => {
  const userId = req.userId; // Get the user ID from the authenticated request

  try {
    const incomes = await Income.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId; // Get the user ID from the authenticated request

  try {
    const income = await Income.findOneAndDelete({ _id: id, userId });
    if (!income) return res.status(404).json({ message: "Income not found" });
    res.status(200).json({ message: "Income Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
