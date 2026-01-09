// src/components/layout/Header.jsx

import usePhantom from "../../hooks/usePhantom";
import Button from "../ui/Button";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const { connect, disconnect, publicKey, connected, solBalance } = usePhantom();

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

            {/* عنوان المحفظة */}
            <span className="text-sm text-gray-300">
              {publicKey?.slice(0, 4)}...{publicKey?.slice(-4)}
            </span>

            {/* رصيد SOL */}
            <span className="text-sm text-yellow-400 font-semibold">
              {solBalance.toFixed(3)} SOL
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
