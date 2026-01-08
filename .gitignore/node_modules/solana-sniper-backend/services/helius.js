// backend/services/helius.js

const axios = require("axios");
const { HELIUS_API_KEY } = require("../config");
const cache = require("../utils/cache");

module.exports = {
  // Get account info
  getAccount: async (req, res) => {
    try {
      const address = req.params.address;
      const cacheKey = `helius_account_${address}`;

      const cached = cache.get(cacheKey);
      if (cached) return res.json(cached);

      const url = `https://api.helius.xyz/v0/addresses/${address}?api-key=${HELIUS_API_KEY}`;
      const { data } = await axios.get(url);

      cache.set(cacheKey, data);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Helius account fetch failed" });
    }
  },

  // Get recent transactions
  getTransactions: async (req, res) => {
    try {
      const address = req.params.address;
      const cacheKey = `helius_tx_${address}`;

      const cached = cache.get(cacheKey);
      if (cached) return res.json(cached);

      const url = `https://api.helius.xyz/v0/addresses/${address}/transactions?api-key=${HELIUS_API_KEY}`;
      const { data } = await axios.get(url);

      cache.set(cacheKey, data);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Helius transactions fetch failed" });
    }
  }
};
