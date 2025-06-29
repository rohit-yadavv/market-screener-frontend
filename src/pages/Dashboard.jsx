"use client";
import { useState } from "react";
import Events from "./Events";
import StockSelector from "../components/StockSelector";

export default function Dashboard() {
  const [tab, setTab] = useState("stocks");
  const [selected, setSelected] = useState([]);

  const tabs = [
    { id: "stocks", label: "📈 Stock Selector" },
    { id: "events", label: "⚡ MACD Events" },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        MACD Screener Dashboard
      </h1>

      <div className="flex gap-4 mb-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg transition font-medium ${
              tab === t.id
                ? "bg-blue-600 text-white shadow"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        {tab === "stocks" ? (
          <StockSelector selected={selected} setSelected={setSelected} />
        ) : (
          <Events selectedSymbols={selected} />
        )}
      </div>
    </div>
  );
}
