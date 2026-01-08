// src/components/dashboard/Dashboard.jsx

import StatsPanel from "./StatsPanel";
import TrendingTokens from "./TrendingTokens";
import RugAlerts from "./RugAlerts";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <StatsPanel />
      <TrendingTokens />
      <RugAlerts />
    </div>
  );
}
