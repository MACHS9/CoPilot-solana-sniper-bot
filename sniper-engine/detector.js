// sniper-engine/detector.js

const axios = require("axios");
const { RUGCHECK_BASE, HELIUS_API_KEY } = require("../backend/config");
const logger = require("../backend/utils/logger");

module.exports = {
  async getRugReport(mint) {
    try {
      const url = `${RUGCHECK_BASE}/token/${mint}`;
      const { data } = await axios.get(url);
      return data;
    } catch (err) {
      logger.error("RugCheck error", mint, err.message);
      return null;
    }
  },

  async getHoldersInfo(mint) {
    try {
      const url = `https://api.helius.xyz/v0/token-holders?api-key=${HELIUS_API_KEY}&mint=${mint}`;
      const { data } = await axios.get(url);
      return data;
    } catch (err) {
      logger.error("Helius holders error", mint, err.message);
      return null;
    }
  },

  evaluateRugRisk({ dexData, rugReport, holdersData }) {
    if (!dexData || !dexData.pairs || dexData.pairs.length === 0) {
      return { score: 0, reason: "No pairs", status: "ignore" };
    }

    const pair = dexData.pairs[0];
    const liquidityUsd = pair.liquidity?.usd || 0;
    const priceChange5m = pair.priceChange?.m5 || 0;
    const priceChange1h = pair.priceChange?.h1 || 0;

    let riskScore = 0;
    const reasons = [];

    if (liquidityUsd < 10) {
      reasons.push("Low liquidity");
      riskScore += 2;
    }

    if (priceChange5m <= -70 || priceChange1h <= -80) {
      reasons.push("Sharp price drop");
      riskScore += 4;
    }

    if (rugReport && rugReport.rugScore) {
      riskScore += rugReport.rugScore / 20;
      reasons.push(`RugCheck score ${rugReport.rugScore}`);
    }

    if (holdersData && holdersData.items && holdersData.items.length > 0) {
      const topHolder = holdersData.items[0];
      if (topHolder.percentage && topHolder.percentage > 0.5) {
        reasons.push("Top holder > 50%");
        riskScore += 3;
      }
    }

    let status = "safe";
    if (riskScore >= 7) status = "high";
    else if (riskScore >= 4) status = "medium";

    return {
      score: riskScore,
      status,
      reasons,
      liquidityUsd,
      priceChange5m,
      priceChange1h
    };
  }
};
