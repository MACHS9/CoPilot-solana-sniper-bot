// backend/services/tx.js

const axios = require("axios");
const { RPC_ENDPOINT } = require("../config");

module.exports = {
  sendRaw: async (req, res) => {
    try {
      const { signedTx } = req.body;

      if (!signedTx) {
        return res.status(400).json({ error: "signedTx is required (base64)" });
      }

      const body = {
        jsonrpc: "2.0",
        id: 1,
        method: "sendRawTransaction",
        params: [signedTx, { encoding: "base64" }]
      };

      const { data } = await axios.post(RPC_ENDPOINT, body, {
        headers: { "Content-Type": "application/json" }
      });

      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "sendRawTransaction failed" });
    }
  }
};
