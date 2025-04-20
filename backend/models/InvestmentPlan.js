const mongoose = require("mongoose");

const investmentPlanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  monthlyIncome: {
    type: Number,
    required: true,
  },
  riskLevel: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  allocation: {
    sips: {
      percentage: Number,
      amount: Number,
    },
    cryptocurrency: {
      percentage: Number,
      amount: Number,
    },
    gold: {
      percentage: Number,
      amount: Number,
    },
  },
  summary: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isShared: {
    type: Boolean,
    default: false,
  },
  shareLink: {
    type: String,
  },
});

module.exports = mongoose.model("InvestmentPlan", investmentPlanSchema);
