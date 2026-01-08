// src/components/dashboard/StatsPanel.jsx

import { useEffect, useState } from "react";
import Panel from "../ui/Panel";
import usePhantom from "../../hooks/usePhantom";

export default function StatsPanel() {
  const { publicKey, connected, getBalance } = usePhantom();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const loadBalance = async () => {
      if (connected) {
        await new Promise(r => setTimeout(r, 300));
        const sol = await getBalance();
        setBalance(sol.toFixed(3));
      } else {
        setBalance(0);
      }
    };

    loadBalance();
  }, [connected]);

  const stats = [
    { label: "SOL Balance", value: `${balance} SOL` },
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
