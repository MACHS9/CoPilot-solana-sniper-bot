// backend/utils/logger.js

const fs = require("fs");
const path = require("path");
const moment = require("moment");

const LOG_FILE = path.join(__dirname, "..", "logs.txt");

function writeLog(message) {
  const timestamp = moment().format("YYYY-MM-DD HH:mm:ss");
  const line = `[${timestamp}] ${message}\n`;

  fs.appendFile(LOG_FILE, line, (err) => {
    if (err) console.error("Failed to write log:", err);
  });
}

module.exports = {
  log: (...args) => {
    const msg = args.join(" ");
    console.log(msg);
    writeLog(msg);
  },

  error: (...args) => {
    const msg = args.join(" ");
    console.error(msg);
    writeLog("ERROR: " + msg);
  }
};
