// frontend/src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

import Dashboard from "./components/dashboard/Dashboard";
import ManualSniper from "./components/sniper/ManualSniper";
import AutoSniper from "./components/sniper/AutoSniper";
import TokenScanner from "./components/sniper/TokenScanner";
import Watchlist from "./components/watchlist/Watchlist";
import Settings from "./components/settings/Settings";
import Logs from "./components/logs/Logs";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/manual" element={<ManualSniper />} />
          <Route path="/auto" element={<AutoSniper />} />
          <Route path="/scanner" element={<TokenScanner />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/logs" element={<Logs />} />
        </Routes>
      </Layout>
    </Router>
  );
}
