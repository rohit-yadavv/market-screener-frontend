"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { US_STOCKS } from "../constants";
import { BASE_URL } from "../utils/api";
import MacdThreshold from "./MacdThreshold";

// eslint-disable-next-line no-unused-vars
export default function StockSelector({ selected = [], setSelected }) {
  const [saving, setSaving] = useState(false);
  const [isInitialSymbolsLoading, setIsInitialSymbolsLoading] = useState(true);
  const [initialSymbols, setInitialSymbols] = useState([]);
  const [localSelected, setLocalSelected] = useState([]);
  const [search, setSearch] = useState("");

  const saveSymbols = async (symbolsToSave) => {
    if (!Array.isArray(symbolsToSave)) return;

    setSaving(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/user/symbols`,
        { symbols: symbolsToSave },
        { withCredentials: true }
      );
      if (res.data.success) {
        setSelected(symbolsToSave);
        setInitialSymbols(symbolsToSave);
        setLocalSelected(symbolsToSave);
        return true;
      }
    } catch (err) {
      console.error("Symbol save failed", err);
      alert("Failed to save symbols. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const fetchSubscribed = async () => {
      try {
        setIsInitialSymbolsLoading(true);
        const res = await axios.get(`${BASE_URL}/user/symbols`, {
          withCredentials: true,
        });
        const subs = res.data.symbols || [];
        setInitialSymbols(subs);
        setLocalSelected(subs);
      } catch (err) {
        console.error("Error fetching current subscriptions", err);
      } finally {
        setIsInitialSymbolsLoading(false);
      }
    };
    fetchSubscribed();
  }, []);

  const toggleSelect = (symbol) => {
    setLocalSelected((prev) =>
      prev.includes(symbol)
        ? prev.filter((s) => s !== symbol)
        : [...prev, symbol]
    );
  };

  const handleSubmit = async () => {
    if (!localSelected.length)
      return alert("Please select at least one stock.");

    const success = await saveSymbols(localSelected);
    if (success) alert("Subscription updated!");
  };

  const filteredStocks = US_STOCKS.filter((symbol) =>
    symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Track Your Stocks
        </h2>
        <MacdThreshold />
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-700 font-medium mb-1">
          Currently Subscribed:
        </p>
        <div className="flex flex-wrap gap-2">
          {isInitialSymbolsLoading ? (
            <span>Loading...</span>
          ) : initialSymbols.length > 0 ? (
            initialSymbols.map((sym) => (
              <span
                key={sym}
                className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold"
              >
                {sym}
              </span>
            ))
          ) : (
            <p className="text-gray-500 text-sm italic">None</p>
          )}
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="search"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          Search Stocks
        </label>
        <input
          type="text"
          id="search"
          placeholder="Search by symbol (e.g. AAPL)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-row flex-wrap gap-3">
        {filteredStocks.map((symbol) => {
          const isActive = localSelected.includes(symbol);
          return (
            <button
              key={symbol}
              onClick={() => toggleSelect(symbol)}
              className={`px-4 py-2 text-gray-800 w-24 border rounded-lg font-medium transition text-sm ${
                isActive
                  ? "bg-blue-600/10  border-blue-600 shadow"
                  : "bg-white border-gray-300 hover:bg-gray-100"
              }`}
            >
              {symbol}
            </button>
          );
        })}
        {filteredStocks.length === 0 && (
          <p className="text-gray-500 text-sm col-span-full">
            No stocks match your search.
          </p>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={saving}
        className="bg-green-600 text-white px-6 py-2 my-8  rounded-md hover:bg-green-700 transition disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save & Start Tracking"}
      </button>
      <button
        onClick={async () => {
          if (!confirm("Are you sure you want to unsubscribe from all stocks?"))
            return;
          const success = await saveSymbols([]);
          if (success) alert("All subscriptions removed.");
        }}
        disabled={saving}
        className="bg-red-600 text-white px-6 py-2 ml-4 my-8 rounded-md hover:bg-red-700 transition disabled:opacity-50"
      >
        {saving ? "Resetting..." : "Reset Subscriptions"}
      </button>
    </div>
  );
}
