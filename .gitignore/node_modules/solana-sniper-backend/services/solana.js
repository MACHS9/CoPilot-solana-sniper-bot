// backend/services/solana.js

const axios = require("axios");
const { RPC_ENDPOINT } = require("../config");

module.exports = {
  getBalance: async (req, res) => {
    try {
      const address = req.params.address;

      const body = {
        jsonrpc: "2.0",
        id: 1,
        method: "getBalance",
        params: [address]
      };

      const { data } = await axios.post(RPC_ENDPOINT, body);

      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Solana RPC balance failed" });
    }
  }
};
