// src/components/dashboard/RugAlerts.jsx

import Panel from "../ui/Panel";

export default function RugAlerts() {
  const alerts = [
    { name: "XYZ", time: "2 min ago", reason: "Liquidity pulled" },
    { name: "MOON", time: "10 min ago", reason: "Dev wallet dumped" },
  ];

  return (
    <Panel title="Recent Rug Alerts">
      <div className="flex flex-col gap-3">
        {alerts.map((a, i) => (
          <div key={i} className="bg-card p-3 rounded-lg border border-white/10">
            <p className="font-semibold">{a.name}</p>
            <p className="text-sm text-gray-400">{a.reason}</p>
            <p className="text-xs text-gray-500">{a.time}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}
