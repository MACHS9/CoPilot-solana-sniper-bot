// backend/index.js

const express = require("express");
const cors = require("cors");
const { PORT } = require("./config");

// Services
const helius = require("./services/helius");
const jupiter = require("./services/jupiter");
const dex = require("./services/dex");
const coingecko = require("./services/coingecko");
const rugcheck = require("./services/rugcheck");
const solana = require("./services/solana");
const jito = require("./services/jito");
const txService = require("./services/tx");

// Sniper Engine
const manual = require("../sniper-engine/manual-mode");
const auto = require("../sniper-engine/auto-mode");
const logger = require("./utils/logger");

// Express app
const app = express();
app.use(cors());
app.use(express.json());

// HTTP + WebSocket server
const http = require("http");
const WebSocket = require("ws");

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

global.wsClients = [];

wss.on("connection", (ws) => {
  global.wsClients.push(ws);

  ws.on("close", () => {
    global.wsClients = global.wsClients.filter((c) => c !== ws);
  });
});

// -------------------------------
// Health Check
// -------------------------------
app.get("/", (req, res) => {
  res.json({ status: "Backend running", time: Date.now() });
});

// -------------------------------
// API Services
// -------------------------------
app.get("/helius/account/:address", helius.getAccount);
app.get("/helius/transactions/:address", helius.getTransactions);

app.get("/jupiter/quote", jupiter.getQuote);

app.get("/dex/token/:address", dex.getToken);

app.get("/coingecko/price/:id", coingecko.getPrice);

app.get("/rugcheck/:mint", rugcheck.getReport);

app.post("/jito/send", jito.sendBundle);
app.post("/jito/simulate", jito.simulateBundle);

app.get("/solana/balance/:address", solana.getBalance);

// إرسال ترانزكشن موقعة (من Phantom) إلى سولانا
app.post("/tx/send", txService.sendRaw);

// -------------------------------
// Manual Mode
// -------------------------------
app.post("/manual/analyze", async (req, res) => {
  try {
    const { mint } = req.body;
    const result = await manual.analyzeToken(mint, {});
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Manual analyze failed" });
  }
});

// -------------------------------
// Auto Mode
// -------------------------------
app.post("/auto/start", async (req, res) => {
  try {
    const { mint } = req.body;

    auto.setOpportunityHandler((op) => {
      if (global.wsClients) {
        global.wsClients.forEach((ws) => {
          ws.send(JSON.stringify({ type: "opportunity", data: op }));
        });
      }
    });

    auto.startForToken(mint);
    res.json({ status: "Auto mode started", mint });
  } catch (err) {
    res.status(500).json({ error: "Auto mode start failed" });
  }
});

app.post("/auto/stop", async (req, res) => {
  try {
    const { mint } = req.body;
    auto.stopForToken(mint);
    res.json({ status: "Auto mode stopped", mint });
  } catch (err) {
    res.status(500).json({ error: "Auto mode stop failed" });
  }
});

// -------------------------------
// Settings
// -------------------------------
app.post("/settings/save", async (req, res) => {
  try {
    const fs = require("fs");
    fs.writeFileSync("./config/settings.json", JSON.stringify(req.body, null, 2));
    res.json({ status: "Settings saved" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save settings" });
  }
});

// -------------------------------
// Logs
// -------------------------------
app.get("/logs", (req, res) => {
  try {
    const fs = require("fs");
    if (!fs.existsSync("./logs.txt")) return res.json([]);

    const logs = fs.readFileSync("./logs.txt", "utf8").split("\n");
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: "Failed to load logs" });
  }
});

// -------------------------------
// Start Server
// -------------------------------
server.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
