// src/components/watchlist/Watchlist.jsx

import Panel from "../ui/Panel";
import Button from "../ui/Button";

export default function Watchlist() {
  const items = [
    { name: "BONK", symbol: "BONK", price: "0.000012", change: 12.4, risk: "Low" },
    { name: "WIF", symbol: "WIF", price: "2.14", change: -3.1, risk: "Medium" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Panel title="Watchlist">
        <div className="flex flex-col gap-3">
          {items.map((t, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-card rounded-lg px-4 py-3 border border-white/10"
            >
              <div>
                <p className="font-semibold">{t.name} ({t.symbol})</p>
                <p className="text-sm text-gray-400">
                  Price: ${t.price} — Change:{" "}
                  <span className={t.change >= 0 ? "text-green-400" : "text-red-400"}>
                    {t.change}%
                  </span>{" "}
                  — Risk: {t.risk}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary">Analyze</Button>
                <Button variant="primary">Snipe</Button>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
