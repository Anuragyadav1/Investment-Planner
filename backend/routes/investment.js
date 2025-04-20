const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const auth = require("../middleware/auth");
const InvestmentPlan = require("../models/InvestmentPlan");
const { body, validationResult } = require("express-validator");
dotenv.config();

// Create investment plan
router.post(
  "/create",
  auth,
  [
    body("monthlyIncome").isNumeric(),
    body("riskLevel").isIn(["Low", "Medium", "High"]),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { monthlyIncome, riskLevel } = req.body;

      // Generate investment allocation based on risk level
      let allocation;
      let summary;

      if (riskLevel === "Low") {
        allocation = {
          sips: { percentage: 60, amount: monthlyIncome * 0.6 },
          cryptocurrency: { percentage: 10, amount: monthlyIncome * 0.1 },
          gold: { percentage: 30, amount: monthlyIncome * 0.3 },
        };
        summary =
          "This low-risk investment plan focuses on stability and preservation of capital. 60% is allocated to SIPs for steady growth, 30% to gold as a safe haven, and only 10% to cryptocurrency for potential high returns with limited risk.";
      } else if (riskLevel === "Medium") {
        allocation = {
          sips: { percentage: 50, amount: monthlyIncome * 0.5 },
          cryptocurrency: { percentage: 30, amount: monthlyIncome * 0.3 },
          gold: { percentage: 20, amount: monthlyIncome * 0.2 },
        };
        summary =
          "This medium-risk investment plan balances growth and stability. 50% is allocated to SIPs for steady growth, 30% to cryptocurrency for higher potential returns, and 20% to gold as a hedge against market volatility.";
      } else {
        // High risk
        allocation = {
          sips: { percentage: 40, amount: monthlyIncome * 0.4 },
          cryptocurrency: { percentage: 50, amount: monthlyIncome * 0.5 },
          gold: { percentage: 10, amount: monthlyIncome * 0.1 },
        };
        summary =
          "This high-risk investment plan prioritizes growth potential. 50% is allocated to cryptocurrency for maximum return potential, 40% to SIPs for some stability, and 10% to gold as a minimal hedge against extreme market conditions.";
      }

      // Create new investment plan
      const plan = new InvestmentPlan({
        userId: req.userId,
        planName: req.body.planName,
        monthlyIncome,
        riskLevel,
        allocation,
        summary,
      });

      await plan.save();

      res.status(201).json(plan);
    } catch (error) {
      console.error("Error creating investment plan:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Get user's investment plans
router.get("/plans", auth, async (req, res) => {
  try {
    const plans = await InvestmentPlan.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    res.json(plans);
  } catch (error) {
    console.error("Error fetching plans:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a specific plan
router.get("/plans/:planId", auth, async (req, res) => {
  try {
    const plan = await InvestmentPlan.findOne({
      _id: req.params.planId,
      userId: req.userId,
    });

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.json(plan);
  } catch (error) {
    console.error("Error fetching plan:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a plan
router.delete("/plans/:planId", auth, async (req, res) => {
  try {
    const plan = await InvestmentPlan.findOneAndDelete({
      _id: req.params.planId,
      userId: req.userId,
    });

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.json({ message: "Plan deleted successfully" });
  } catch (error) {
    console.error("Error deleting plan:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get shared plan by link
router.get("/shared/:planId", async (req, res) => {
  try {
    const plan = await InvestmentPlan.findOne({
      _id: req.params.planId,
      isShared: true,
    });

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Toggle plan sharing
router.patch("/toggle-share/:planId", auth, async (req, res) => {
  try {
    const plan = await InvestmentPlan.findOne({
      _id: req.params.planId,
      userId: req.userId,
    });

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    plan.isShared = !plan.isShared;
    if (plan.isShared) {
      plan.shareLink = `${process.env.FRONTEND_URL}/shared-plan/${plan._id}`;
    } else {
      plan.shareLink = null;
    }

    await plan.save();
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
