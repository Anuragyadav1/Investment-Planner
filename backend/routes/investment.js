const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const auth = require("../middleware/auth");
const InvestmentPlan = require("../models/InvestmentPlan");
const { body, validationResult } = require("express-validator");
const callGeminiAPI = require("../utils/gemini"); // Import the Gemini API call function
dotenv.config();


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

      const { monthlyIncome, riskLevel, planName } = req.body;

      // ✨ Use Gemini for recommendation
      const { allocation, recommendations } = await callGeminiAPI(monthlyIncome, riskLevel);

      // Create a combined summary from the recommendations
      const summary = `
      SIPs: ${recommendations.sips}
      Cryptocurrency: ${recommendations.cryptocurrency}
      Gold: ${recommendations.gold}
     `;
      
      // Create a new investment plan with recommendations
      const plan = new InvestmentPlan({
        userId: req.userId,
        planName,
        monthlyIncome,
        riskLevel,
        allocation,
        summary,
        recommendations,  // Save the recommendations field
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
