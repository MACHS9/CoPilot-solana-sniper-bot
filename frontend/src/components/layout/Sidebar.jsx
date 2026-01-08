// src/components/layout/Sidebar.jsx

import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menu = [
    { id: "dashboard", label: "Dashboard", path: "/" },
    { id: "manual", label: "Manual Sniper", path: "/manual" },
    { id: "auto", label: "Auto Sniper", path: "/auto" },
    { id: "scanner", label: "Token Scanner", path: "/scanner" },
    { id: "watchlist", label: "Watchlist", path: "/watchlist" },
    { id: "settings", label: "Settings", path: "/settings" },
    { id: "logs", label: "Logs", path: "/logs" },
  ];

  return (
    <div className="w-64 bg-panel border-r border-white/10 p-4 flex flex-col">
      <h1 className="text-xl font-bold mb-6">Sniper Bot</h1>

      <nav className="flex flex-col gap-2">
        {menu.map(item => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `px-3 py-2 rounded-md transition ${
                isActive
                  ? "bg-accent text-white"
                  : "text-gray-300 hover:bg-white/10"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
