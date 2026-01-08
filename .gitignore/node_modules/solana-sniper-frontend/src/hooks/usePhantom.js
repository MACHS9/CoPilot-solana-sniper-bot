// frontend/src/hooks/usePhantom.js

import { useState, useEffect } from "react";
import { Connection, PublicKey } from "@solana/web3.js";

// استخدم RPC سريع وثابت
const RPC_URL = "https://rpc.ankr.com/solana";
const connection = new Connection(RPC_URL, "confirmed");

// نختار Phantom فقط
const getPhantomProvider = () => {
  if ("solana" in window) {
    const provider = window.solana;
    if (provider?.isPhantom) return provider;
  }
  return null;
};

export default function usePhantom() {
  const [publicKey, setPublicKey] = useState(null);
  const [connected, setConnected] = useState(false);

  const connect = async () => {
    const provider = getPhantomProvider();
    if (!provider) {
      alert("Phantom Wallet not found");
      return;
    }

    try {
      const resp = await provider.connect();
      setPublicKey(resp.publicKey.toString());
      setConnected(true);
    } catch (err) {
      console.error("Phantom connect error:", err);
    }
  };

  const disconnect = async () => {
    const provider = getPhantomProvider();
    if (!provider) return;

    try {
      await provider.disconnect();
      setPublicKey(null);
      setConnected(false);
    } catch (err) {
      console.error("Phantom disconnect error:", err);
    }
  };

  useEffect(() => {
    const provider = getPhantomProvider();
    if (!provider) return;

    if (provider.isConnected && provider.publicKey) {
      setPublicKey(provider.publicKey.toString());
      setConnected(true);
    }

    provider.on("connect", () => {
      setPublicKey(provider.publicKey.toString());
      setConnected(true);
    });

    provider.on("disconnect", () => {
      setPublicKey(null);
      setConnected(false);
    });

    return () => {
      provider.removeAllListeners("connect");
      provider.removeAllListeners("disconnect");
    };
  }, []);

  const getBalance = async () => {
    if (!publicKey) return 0;

    try {
      const balanceLamports = await connection.getBalance(new PublicKey(publicKey));
      return balanceLamports / 1e9;
    } catch (err) {
      console.error("Balance error:", err);
      return 0;
    }
  };

  return {
    publicKey,
    connected,
    connect,
    disconnect,
    getBalance,
  };
}
