// src/components/settings/Settings.jsx

import Panel from "../ui/Panel";
import Button from "../ui/Button";

export default function Settings() {
  return (
    <div className="flex flex-col gap-6">
      <Panel title="Jito Settings">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Jito Endpoint
            </label>
            <input
              type="text"
              placeholder="https://..."
              className="w-full bg-card border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Max Tip (SOL)
            </label>
            <input
              type="number"
              placeholder="0.01"
              className="w-full bg-card border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent"
            />
          </div>
        </div>
      </Panel>

      <Panel title="Trading Settings">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Default Slippage (%)
            </label>
            <input
              type="number"
              placeholder="5"
              className="w-full bg-card border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Max Open Positions
            </label>
            <input
              type="number"
              placeholder="5"
              className="w-full bg-card border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Notifications
            </label>
            <select className="w-full bg-card border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent">
              <option>Enabled</option>
              <option>Disabled</option>
            </select>
          </div>
        </div>
      </Panel>

      <Panel title="UI Settings">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">Theme</p>
            <p className="text-sm text-gray-400">Dark Pro (fixed)</p>
          </div>
          <Button variant="secondary">Reset to defaults</Button>
        </div>
      </Panel>
    </div>
  );
}
