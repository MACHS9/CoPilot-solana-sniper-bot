// backend/services/coingecko.js

const axios = require("axios");
const { COINGECKO_BASE } = require("../config");
const cache = require("../utils/cache");

module.exports = {
  getPrice: async (req, res) => {
    try {
      const id = req.params.id;
      const cacheKey = `cg_${id}`;

      const cached = cache.get(cacheKey);
      if (cached) return res.json(cached);

      const url = `${COINGECKO_BASE}/simple/price?ids=${id}&vs_currencies=usd`;
      const { data } = await axios.get(url);

      cache.set(cacheKey, data);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "CoinGecko price fetch failed" });
    }
  }
};
