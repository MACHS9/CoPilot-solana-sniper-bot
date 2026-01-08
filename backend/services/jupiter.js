// backend/services/jupiter.js

const axios = require("axios");
const { JUPITER_BASE } = require("../config");
const cache = require("../utils/cache");

module.exports = {
  getQuote: async (req, res) => {
    try {
      const { inputMint, outputMint, amount, slippageBps } = req.query;

      if (!inputMint || !outputMint || !amount)
        return res.status(400).json({ error: "Missing parameters" });

      const cacheKey = `jup_${inputMint}_${outputMint}_${amount}`;
      const cached = cache.get(cacheKey);
      if (cached) return res.json(cached);

      const url = `${JUPITER_BASE}/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippageBps || 500}`;
      const { data } = await axios.get(url);

      cache.set(cacheKey, data);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Jupiter quote failed" });
    }
  }
};
