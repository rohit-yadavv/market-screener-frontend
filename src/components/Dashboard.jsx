import { useState } from "react";
import { CheckIcon, CopyIcon, InfoIcon, XIcon } from "lucide-react";
import Events from "./Events";

const stockList = [
  "AAPL",
  "MSFT",
  "GOOGL",
  "AMZN",
  "TSLA",
  "META",
  "NFLX",
  "NVDA",
  "INTC",
  "AMD",
  "BABA",
  "UBER",
  "LYFT",
  "ADBE",
  "ORCL",
  "CRM",
  "SHOP",
  "PYPL",
  "SQ",
  "PLTR",
];

export default function Dashboard({ userId }) {
  const [activeTab, setActiveTab] = useState("steps");
  const [selectedStocks, setSelectedStocks] = useState([]);

  const toggleStockSelection = (symbol) => {
    setSelectedStocks((prev) =>
      prev.includes(symbol)
        ? prev.filter((s) => s !== symbol)
        : prev.length < 20
        ? [...prev, symbol]
        : prev
    );
  };

  const sendSelectedStocks = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, symbols: selectedStocks }),
      });
      const data = await res.json();
      console.log("✅ Subscribed:", data);
    } catch (err) {
      console.error("❌ Subscription failed:", err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900 px-6 py-10 font-sans">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-blue-700 mb-1">
          MACD Crossover Dashboard
        </h1>
        <p className="text-gray-500">
          Track and manage real-time MACD alerts using Alpaca WebSockets
        </p>
      </header>

      <div className="flex gap-4 mb-8 overflow-x-auto border-b border-gray-200">
        {["steps", "stocks", "events"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative py-2 px-4 text-sm font-medium rounded-t-md ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600 bg-white shadow"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === "steps" && (
        <section className="bg-white border border-blue-100 rounded-xl p-6 mb-12 shadow-md">
          <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
            <InfoIcon className="mr-2" /> How to Use This Dashboard
          </h2>
          <ol className="list-decimal pl-6 space-y-4 text-sm text-gray-700">
            <li>Select up to 20 stocks from the Stocks tab.</li>
            <li>Click "Subscribe" to start receiving real-time MACD alerts.</li>
            <li>Check the Events tab for live updates.</li>
          </ol>
        </section>
      )}

      {activeTab === "stocks" && (
        <section className="bg-white border border-gray-200 rounded-xl p-6 mb-12 shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Select Stocks (Max: 20)
          </h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {stockList.map((stock) => (
              <button
                key={stock}
                onClick={() => toggleStockSelection(stock)}
                className={`px-3 py-1 text-sm rounded-md border ${
                  selectedStocks.includes(stock)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 hover:bg-blue-50 border-gray-300"
                }`}
              >
                {stock}
              </button>
            ))}
          </div>

          {selectedStocks.length > 0 && (
            <div className="mb-4">
              <h3 className="text-md font-medium text-gray-700 mb-2">
                Selected Stocks:
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedStocks.map((stock) => (
                  <span
                    key={stock}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {stock}
                    <button onClick={() => toggleStockSelection(stock)}>
                      <XIcon className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={sendSelectedStocks}
            disabled={selectedStocks.length === 0}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm shadow hover:bg-blue-700 disabled:opacity-50"
          >
            Subscribe
          </button>
        </section>
      )}

      {activeTab === "events" && <Events />}
    </div>
  );
}
