// src/components/dashboard/TrendingTokens.jsx

import Panel from "../ui/Panel";
import TokenCard from "../ui/TokenCard";

export default function TrendingTokens() {
  const tokens = [
    { name: "BONK", symbol: "BONK", price: "0.000012", change: 12.4, liquidity: "4.2M", risk: "Low" },
    { name: "WIF", symbol: "WIF", price: "2.14", change: -3.1, liquidity: "18.5M", risk: "Medium" },
    { name: "MYRO", symbol: "MYRO", price: "0.18", change: 5.9, liquidity: "2.1M", risk: "Low" },
  ];

  return (
    <Panel title="Trending Tokens">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tokens.map((t, i) => (
          <TokenCard key={i} token={t} />
        ))}
      </div>
    </Panel>
  );
}
