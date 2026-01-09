// src/components/dashboard/StatsPanel.jsx

import Panel from "../ui/Panel";
import usePhantom from "../../hooks/usePhantom";

export default function StatsPanel() {
  const { solBalance } = usePhantom();

  const stats = [
    { label: "SOL Balance", value: `${solBalance.toFixed(3)} SOL` },
    { label: "SOL Price", value: "$98.22" },
    { label: "Network TPS", value: "3,912" },
    { label: "Ping", value: "42ms" },
    { label: "Volume (24h)", value: "$1.2B" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {stats.map((s, i) => (
        <Panel key={i}>
          <p className="text-sm text-gray-400">{s.label}</p>
          <p className="text-2xl font-bold mt-1">{s.value}</p>
        </Panel>
      ))}
    </div>
  );
}
