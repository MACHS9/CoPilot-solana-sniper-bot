// backend/services/rugcheck.js

const axios = require("axios");
const { RUGCHECK_BASE } = require("../config");
const cache = require("../utils/cache");

module.exports = {
  getReport: async (req, res) => {
    try {
      const mint = req.params.mint;
      const cacheKey = `rug_${mint}`;

      const cached = cache.get(cacheKey);
      if (cached) return res.json(cached);

      const url = `${RUGCHECK_BASE}/token/${mint}`;
      const { data } = await axios.get(url);

      cache.set(cacheKey, data);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "RugCheck fetch failed" });
    }
  }
};
