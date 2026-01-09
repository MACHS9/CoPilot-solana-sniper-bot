// frontend/src/hooks/usePhantom.js

import { useState, useEffect } from "react";
import { Connection, PublicKey } from "@solana/web3.js";

// 3 RPCs — Fallback system (CORS-friendly)
const RPCs = [
  "https://rpc.ankr.com/solana",
  "https://solana-mainnet.rpc.extrnode.com",
  "https://rpc.publicnode.com"
];

// Pick a random RPC each time
function getConnection() {
  const url = RPCs[Math.floor(Math.random() * RPCs.length)];
  return new Connection(url, "confirmed");
}

// Phantom-only provider
const getPhantomProvider = () => {
  if ("solana" in window) {
    const provider = window.solana;

    // Ignore TronLink, Binance, Solflare, Backpack, etc.
    if (provider?.isPhantom === true) {
      return provider;
    }
  }
  return null;
};

export default function usePhantom() {
  const [publicKey, setPublicKey] = useState(null);
  const [connected, setConnected] = useState(false);
  const [solBalance, setSolBalance] = useState(0);

  // Fetch SOL balance
  const fetchBalance = async (address) => {
    try {
      const connection = getConnection();
      const lamports = await connection.getBalance(new PublicKey(address));
      const sol = lamports / 1e9;
      setSolBalance(sol);
    } catch (err) {
      console.error("Balance error:", err);
      setSolBalance(0);
    }
  };

  // Connect Phantom
  const connect = async () => {
    const provider = getPhantomProvider();
    if (!provider) {
      alert("Phantom Wallet not found");
      return;
    }

    try {
      const resp = await provider.connect({ onlyIfTrusted: false });
      const address = resp.publicKey.toString();

      setPublicKey(address);
      setConnected(true);

      // Delay to allow Phantom to update session
      setTimeout(() => fetchBalance(address), 300);

    } catch (err) {
      console.error("Phantom connect error:", err);
    }
  };

  // Disconnect Phantom
  const disconnect = async () => {
    const provider = getPhantomProvider();
    if (!provider) return;

    try {
      await provider.disconnect();
      setPublicKey(null);
      setConnected(false);
      setSolBalance(0);
    } catch (err) {
      console.error("Phantom disconnect error:", err);
    }
  };

  // Auto-detect connection on load
  useEffect(() => {
    const provider = getPhantomProvider();
    if (!provider) return;

    if (provider.isConnected && provider.publicKey) {
      const address = provider.publicKey.toString();
      setPublicKey(address);
      setConnected(true);

      setTimeout(() => fetchBalance(address), 300);
    }

    provider.on("connect", () => {
      const address = provider.publicKey.toString();
      setPublicKey(address);
      setConnected(true);

      setTimeout(() => fetchBalance(address), 300);
    });

    provider.on("disconnect", () => {
      setPublicKey(null);
      setConnected(false);
      setSolBalance(0);
    });

    return () => {
      provider.removeAllListeners("connect");
      provider.removeAllListeners("disconnect");
    };
  }, []);

  return {
    publicKey,
    connected,
    solBalance,
    connect,
    disconnect,
  };
}
