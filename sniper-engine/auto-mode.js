// sniper-engine/auto-mode.js

const monitor = require("./monitor");
const detector = require("./detector");
const executor = require("./executor");
const logger = require("../backend/utils/logger");

class AutoMode {
  constructor() {
    this.active = false;
    this.currentTargets = new Set();
    this.settings = {
      intervalMs: 5000,
      minLiquidityUsd: 10,
      maxLiquidityUsd: 1000,
      buyAmountsSol: [0.00001, 0.00004, 0.0001],
      maxAttempts: 10
    };
    this.onOpportunity = null;
  }

  setSettings(settings) {
    this.settings = { ...this.settings, ...settings };
  }

  setOpportunityHandler(fn) {
    this.onOpportunity = fn;
  }

  startForToken(mint) {
    if (this.currentTargets.has(mint)) return;
    this.currentTargets.add(mint);

    monitor.startTokenMonitor(mint, this.settings.intervalMs, async ({ data }) => {
      try {
        const dexData = data;
        const rugReport = await detector.getRugReport(mint);
        const holders = await detector.getHoldersInfo(mint);

        const risk = detector.evaluateRugRisk({
          dexData,
          rugReport,
          holdersData: holders
        });

        const plan = executor.buildSnipePlan({
          mint,
          liquidityUsd: risk.liquidityUsd,
          riskStatus: risk.status,
          userSettings: this.settings
        });

        executor.logPlan(plan);

        if (plan.canSnipe && this.onOpportunity) {
          this.onOpportunity({ mint, risk, plan });
        }
      } catch (err) {
        logger.error("AutoMode error", mint, err.message);
      }
    });

    logger.log("Auto mode started for", mint);
  }

  stopForToken(mint) {
    this.currentTargets.delete(mint);
    monitor.stopTokenMonitor(mint);
  }

  stopAll() {
    this.currentTargets.clear();
    monitor.stopAll();
  }
}

module.exports = new AutoMode();
