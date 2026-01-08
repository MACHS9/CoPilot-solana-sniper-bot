// src/components/layout/Header.jsx

import { useEffect, useState } from "react";
import usePhantom from "../../hooks/usePhantom";
import Button from "../ui/Button";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const { connect, disconnect, publicKey } = usePhantom();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (window.solana && window.solana.isConnected) {
      setConnected(true);
    } else {
      setConnected(false);
    }

    window.solana?.on("connect", () => setConnected(true));
    window.solana?.on("disconnect", () => setConnected(false));

    return () => {
      window.solana?.removeAllListeners("connect");
      window.solana?.removeAllListeners("disconnect");
    };
  }, []);

  const titles = {
    "/": "Dashboard",
    "/manual": "Manual Sniper",
    "/auto": "Auto Sniper",
    "/scanner": "Token Scanner",
    "/watchlist": "Watchlist",
    "/settings": "Settings",
    "/logs": "Logs",
  };

  const title = titles[location.pathname] || "Sniper Bot";

  return (
    <header className="h-16 bg-panel border-b border-white/10 flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold">{title}</h2>

      <div className="flex items-center gap-4">
        {connected ? (
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span className="text-sm text-gray-300">
              {publicKey?.slice(0, 4)}...{publicKey?.slice(-4)}
            </span>
            <Button variant="secondary" onClick={disconnect}>
              Disconnect
            </Button>
          </div>
        ) : (
          <Button variant="primary" onClick={connect}>
            Connect Phantom
          </Button>
        )}
      </div>
    </header>
  );
}
