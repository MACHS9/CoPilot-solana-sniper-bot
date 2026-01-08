// src/components/sniper/TokenScanner.jsx

import Panel from "../ui/Panel";
import Button from "../ui/Button";
import TokenCard from "../ui/TokenCard";

export default function TokenScanner() {
  const exampleToken = {
    name: "EXAMPLE",
    symbol: "EXMPL",
    price: "0.012",
    change: 3.4,
    liquidity: "1.2M",
    risk: "Medium",
  };

  return (
    <div className="flex flex-col gap-6">
      <Panel title="Token Scanner">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Token Mint Address
              </label>
              <input
                type="text"
                placeholder="Enter token mint address"
                className="w-full bg-card border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent"
              />
            </div>
            <div className="flex gap-3">
              <Button variant="primary">Scan</Button>
              <Button variant="secondary">Add to Watchlist</Button>
            </div>
          </div>

          <div className="flex-1">
            <p className="text-sm text-gray-400 mb-2">
              Preview (static example for now):
            </p>
            <TokenCard token={exampleToken} />
          </div>
        </div>
      </Panel>

      <Panel title="Scanner Logs">
        <div className="bg-card rounded-lg p-3 h-48 overflow-y-auto text-sm text-gray-300">
          <p>[waiting] Scanner logs will appear here…</p>
        </div>
      </Panel>
    </div>
  );
}
