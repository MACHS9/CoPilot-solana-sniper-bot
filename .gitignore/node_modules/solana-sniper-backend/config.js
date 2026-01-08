// backend/config.js

module.exports = {
  PORT: 4000,

  // Free RPC endpoint
  RPC_ENDPOINT: "https://api.mainnet-beta.solana.com",

  // Free Helius API (replace with your free key)
  HELIUS_API_KEY: "YOUR_HELIUS_FREE_KEY",

  // Jupiter API
  JUPITER_BASE: "https://quote-api.jup.ag/v6",

  // DexScreener
  DEX_BASE: "https://api.dexscreener.com/latest/dex",

  // CoinGecko
  COINGECKO_BASE: "https://api.coingecko.com/api/v3",

  // RugCheck
  RUGCHECK_BASE: "https://api.rugcheck.xyz/v1",

  // Cache TTL (ms)
  CACHE_TTL: 10_000
};
