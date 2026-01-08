// sniper-engine/executor.js

const logger = require("../backend/utils/logger");

const DEFAULT_BUY_AMOUNTS_SOL = [0.00001, 0.00004, 0.0001];

module.exports = {
  buildSnipePlan({
    mint,
    liquidityUsd,
    riskStatus,
    userSettings
  }) {
    const {
      minLiquidityUsd = 10,
      maxLiquidityUsd = 1000,
      buyAmountsSol = DEFAULT_BUY_AMOUNTS_SOL,
      maxAttempts = 10
    } = userSettings || {};

    const withinLiquidity =
      liquidityUsd >= minLiquidityUsd && liquidityUsd <= maxLiquidityUsd;

    if (!withinLiquidity) {
      return {
        mint,
        canSnipe: false,
        reason: "Liquidity out of range",
        steps: []
      };
    }

    if (riskStatus !== "high" && riskStatus !== "medium") {
      return {
        mint,
        canSnipe: false,
        reason: "Token not in collapse state",
        steps: []
      };
    }

    const steps = [];
    let attempts = 0;

    for (const amount of buyAmountsSol) {
      if (attempts >= maxAttempts) break;

      steps.push({
        type: "BUY",
        mint,
        amountSol: amount
      });

      steps.push({
        type: "SELL",
        mint,
        amount: "ALL"
      });

      attempts++;
    }

    return {
      mint,
      canSnipe: steps.length > 0,
      reason: "OK",
      steps
    };
  },

  logPlan(plan) {
    if (!plan.canSnipe) {
      logger.log("Plan not executable:", plan.mint, "-", plan.reason);
      return;
    }
    logger.log("Snipe plan for", plan.mint, "steps:", plan.steps.length);
  }
};
