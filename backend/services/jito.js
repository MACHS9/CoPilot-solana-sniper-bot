// backend/services/jito.js

const axios = require("axios");

const JITO_URL = "https://mainnet.block-engine.jito.wtf/api/v1/bundles";

module.exports = {
  sendBundle: async (req, res) => {
    try {
      const { signedTxs } = req.body;

      if (!signedTxs || !Array.isArray(signedTxs) || signedTxs.length === 0) {
        return res.status(400).json({ error: "signedTxs array required" });
      }

      const payload = {
        jsonrpc: "2.0",
        id: 1,
        method: "sendBundle",
        params: [signedTxs]
      };

      const { data } = await axios.post(JITO_URL, payload, {
        headers: { "Content-Type": "application/json" }
      });

      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Jito bundle failed" });
    }
  },

  simulateBundle: async (req, res) => {
    try {
      const { signedTxs } = req.body;

      if (!signedTxs || !Array.isArray(signedTxs) || signedTxs.length === 0) {
        return res.status(400).json({ error: "signedTxs array required" });
      }

      const payload = {
        jsonrpc: "2.0",
        id: 1,
        method: "simulateBundle",
        params: [signedTxs]
      };

      const { data } = await axios.post(JITO_URL, payload, {
        headers: { "Content-Type": "application/json" }
      });

      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Jito simulation failed" });
    }
  }
};
