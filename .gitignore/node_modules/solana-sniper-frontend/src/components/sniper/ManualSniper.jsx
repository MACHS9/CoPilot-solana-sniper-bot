// src/components/sniper/ManualSniper.jsx

import Panel from "../ui/Panel";
import Button from "../ui/Button";

export default function ManualSniper() {
  return (
    <div className="flex flex-col gap-6">
      <Panel title="Manual Sniper">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-4">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Buy Amount (SOL)
                </label>
                <input
                  type="number"
                  placeholder="0.1"
                  className="w-full bg-card border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Take Profit (%)
                </label>
                <input
                  type="number"
                  placeholder="50"
                  className="w-full bg-card border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Stop Loss (%)
                </label>
                <input
                  type="number"
                  placeholder="20"
                  className="w-full bg-card border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="primary">Analyze</Button>
              <Button variant="secondary">Snipe</Button>
            </div>
          </div>

          <div className="bg-card rounded-xl p-4 border border-white/10 flex flex-col gap-3">
            <h4 className="font-semibold">Token Analysis</h4>
            <p className="text-sm text-gray-400">
              Here you will see LP info, holder distribution, dev wallets, and risk score once integrated with backend.
            </p>
            <div className="text-sm text-gray-300">
              <p>Liquidity: —</p>
              <p>Holders: —</p>
              <p>Risk Score: —</p>
            </div>
          </div>
        </div>
      </Panel>

      <Panel title="Execution Logs">
        <div className="bg-card rounded-lg p-3 h-48 overflow-y-auto text-sm text-gray-300">
          <p>[waiting] Manual sniper logs will appear here…</p>
        </div>
      </Panel>
    </div>
  );
}
