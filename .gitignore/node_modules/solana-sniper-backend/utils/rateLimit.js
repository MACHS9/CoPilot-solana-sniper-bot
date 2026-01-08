// backend/utils/rateLimit.js

const limits = new Map();

module.exports = function rateLimit(limit, windowMs) {
  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();

    if (!limits.has(ip)) {
      limits.set(ip, []);
    }

    const timestamps = limits.get(ip).filter(ts => now - ts < windowMs);
    timestamps.push(now);
    limits.set(ip, timestamps);

    if (timestamps.length > limit) {
      return res.status(429).json({ error: "Too many requests" });
    }

    next();
  };
};
