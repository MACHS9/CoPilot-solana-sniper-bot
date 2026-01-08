// backend/services/dex.js

const axios = require("axios");
const { DEX_BASE } = require("../config");
const cache = require("../utils/cache");

module.exports = {
  getToken: async (req, res) => {
    try {
      const address = req.params.address;
      const cacheKey = `dex_${address}`;

      const cached = cache.get(cacheKey);
      if (cached) return res.json(cached);

      const url = `${DEX_BASE}/tokens/${address}`;
      const { data } = await axios.get(url);

      cache.set(cacheKey, data);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "DexScreener fetch failed" });
    }
  }
};
