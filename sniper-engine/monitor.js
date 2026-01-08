// sniper-engine/monitor.js

const axios = require("axios");
const { DEX_BASE } = require("../backend/config");
const logger = require("../backend/utils/logger");

class Monitor {
  constructor() {
    this.intervals = new Map();
  }

  async fetchTokenData(mint) {
    const url = `${DEX_BASE}/tokens/${mint}`;
    const { data } = await axios.get(url);
    return data;
  }

  startTokenMonitor(mint, intervalMs, onUpdate) {
    if (this.intervals.has(mint)) return;

    const fn = async () => {
      try {
        const data = await this.fetchTokenData(mint);
        onUpdate({ mint, data, time: Date.now() });
      } catch (err) {
        logger.error("Monitor fetch error", mint, err.message);
      }
    };

    fn(); // أول استدعاء فوري
    const id = setInterval(fn, intervalMs);
    this.intervals.set(mint, id);
    logger.log("Started monitor for token", mint);
  }

  stopTokenMonitor(mint) {
    const id = this.intervals.get(mint);
    if (id) {
      clearInterval(id);
      this.intervals.delete(mint);
      logger.log("Stopped monitor for token", mint);
    }
  }

  stopAll() {
    for (const [mint, id] of this.intervals.entries()) {
      clearInterval(id);
      logger.log("Stopped monitor for token", mint);
    }
    this.intervals.clear();
  }
}

module.exports = new Monitor();
