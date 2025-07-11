"use client";

import { useEffect, useState } from "react";
import StockSelector from "../components/StockSelector";
import Events from "../components/Events";
import { subscribeToPushNotifications } from "../utils/push.util";

export default function Dashboard() {
  const [tab, setTab] = useState("stocks");
  const [symbols, setSymbols] = useState([]);

  // Push notification registration
  useEffect(() => {
    async function registerPush() {
      if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;

      const registration = await navigator.serviceWorker.ready;
      const existingSub = await registration.pushManager.getSubscription();

      if (existingSub) return;

      const vapidKey = import.meta.env.VITE_APP_VAPID_PUBLIC_KEY;
      await subscribeToPushNotifications(vapidKey);
    }

    registerPush();
  }, []);

  const tabs = [
    { id: "stocks", label: "📈 Stock Selector" },
    { id: "events", label: "⚡ MACD Events" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        MACD Screener Dashboard
      </h1>

      <div className="flex items-center justify-between mb-6 flex-wrap gap-y-6">
        {/* Tabs */}
        <div className="flex gap-4">
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
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-md p-6">
        {tab === "stocks" ? (
          <StockSelector
            selected={symbols}
            setSelected={(newSymbols) => setSymbols(newSymbols)}
          />
        ) : (
          <Events selectedSymbols={symbols} />
        )}
      </div>
    </div>
  );
}
