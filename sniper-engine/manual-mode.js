// sniper-engine/manual-mode.js

const axios = require("axios");
const { DEX_BASE } = require("../backend/config");
const detector = require("./detector");
const executor = require("./executor");
const logger = require("../backend/utils/logger");

module.exports = {
  async analyzeToken(mint, userSettings) {
    try {
      const url = `${DEX_BASE}/tokens/${mint}`;
      const { data: dexData } = await axios.get(url);
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
        userSettings
      });

      executor.logPlan(plan);

      return { mint, risk, plan };
    } catch (err) {
      logger.error("Manual analyze error", mint, err.message);
      throw new Error("Manual analyze failed");
    }
  }
};
