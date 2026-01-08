//src/components/logs/Logs.jsx

import Panel from "../ui/Panel";

export default function Logs() {
  const logs = [
    "[info] Backend connected.",
    "[info] WebSocket listening for new pools.",
    "[warn] High slippage detected on token XYZ.",
    "[error] Example error log here.",
  ];

  return (
    <div className="flex flex-col gap-6">
      <Panel title="Execution Logs">
        <div className="bg-card rounded-lg p-3 h-[420px] overflow-y-auto text-sm font-mono">
          {logs.map((log, i) => (
            <div
              key={i}
              className={`mb-1 ${
                log.includes("[error]")
                  ? "text-red-400"
                  : log.includes("[warn]")
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            >
              {log}
            </div>
          ))}
          <div className="text-gray-500 mt-2 text-xs">
            Live logs from backend will appear here once integrated.
          </div>
        </div>
      </Panel>
    </div>
  );
}
