"use client";
import { useEffect, useState } from "react";
import StockSelector from "../components/StockSelector";
import Events from "../components/Events";
import axios from "axios";

export default function Dashboard() {
  const [tab, setTab] = useState("stocks");
  const [symbols, setSymbols] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscribed = async () => {
      try {
        const res = await axios.get("/subscribe", { withCredentials: true });
        setSymbols(res.data.symbols || []);
      } catch (err) {
        console.error("Failed to fetch symbols", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscribed();
  }, []);

  const handleUpdate = (newSymbols) => {
    setSymbols(newSymbols);
    // setTab("events");
  };

  const tabs = [
    { id: "stocks", label: "📈 Stock Selector" },
    { id: "events", label: "⚡ MACD Events" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        MACD Screener Dashboard
      </h1>

      <div className="flex gap-4 mb-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              tab === t.id
                ? "bg-blue-600 text-white shadow"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        {loading ? (
          <p className="text-gray-500 animate-pulse">Loading...</p>
        ) : tab === "stocks" ? (
          <StockSelector selected={symbols} setSelected={handleUpdate} />
        ) : (
          <Events selectedSymbols={symbols} />
        )}
      </div>
    </div>
  );
}
