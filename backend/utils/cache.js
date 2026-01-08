// backend/utils/cache.js

const { CACHE_TTL } = require("../config");

const cache = new Map();

module.exports = {
  set: (key, value) => {
    cache.set(key, {
      value,
      expires: Date.now() + CACHE_TTL
    });
  },

  get: (key) => {
    const entry = cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expires) {
      cache.delete(key);
      return null;
    }

    return entry.value;
  }
};
