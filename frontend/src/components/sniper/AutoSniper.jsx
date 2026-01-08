// src/components/sniper/AutoSniper.jsx

import Panel from "../ui/Panel";
import Button from "../ui/Button";

export default function AutoSniper() {
  return (
    <div className="flex flex-col gap-6">
      <Panel title="Auto Sniper">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Base Token Mint / Filter
              </label>
              <input
                type="text"
                placeholder="Enter filter or base mint"
                className="w-full bg-card border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Max Buy (SOL)
                </label>
                <input
                  type="number"
                  placeholder="0.5"
                  className="w-full bg-card border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Min Liquidity ($)
                </label>
                <input
                  type="number"
                  placeholder="10000"
                  className="w-full bg-card border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Max Risk
                </label>
                <select className="w-full bg-card border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="primary">Start Auto Mode</Button>
              <Button variant="secondary">Stop</Button>
            </div>
          </div>

          <div className="bg-card rounded-xl p-4 border border-white/10 flex flex-col gap-3">
            <h4 className="font-semibold">Auto Mode Status</h4>
            <p className="text-sm text-gray-400">
              Once integrated, this will show live status, scanned tokens, and active positions.
            </p>
            <div className="text-sm text-gray-300">
              <p>Mode: Stopped</p>
              <p>Scanned Tokens: —</p>
              <p>Open Positions: —</p>
            </div>
          </div>
        </div>
      </Panel>

      <Panel title="Auto Sniper Logs">
        <div className="bg-card rounded-lg p-3 h-48 overflow-y-auto text-sm text-gray-300">
          <p>[waiting] Auto sniper logs will appear here…</p>
        </div>
      </Panel>
    </div>
  );
}
