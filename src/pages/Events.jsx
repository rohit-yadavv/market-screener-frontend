import { useEffect, useState } from "react";
import { BASE_URL, fetchPastEvents } from "../utils/api";

export default function Events() {
  const [activeTab, setActiveTab] = useState("live");
  const [liveEvents, setLiveEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [filters, setFilters] = useState({ symbol: "", type: "" });
  const [loadingPast, setLoadingPast] = useState(false);
  const [pastFetched, setPastFetched] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const evtSrc = new EventSource(`${BASE_URL}/events/sse`, {
      withCredentials: true,
    });

    evtSrc.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setLiveEvents((prev) => [data, ...prev]);
    };

    evtSrc.addEventListener("ping", () => {
      console.log("🔥 Got a ping from server");
    });

    evtSrc.onerror = (err) => {
      console.error("SSE error:", err);
    };

    return () => evtSrc.close();
  }, []);

  // Reset filters when switching to live
  useEffect(() => {
    if (activeTab === "live") {
      setFilters({ symbol: "", type: "" });
      setPastFetched(false);
      setPastEvents([]);
    }
  }, [activeTab]);

  const handleShowPastEvents = async () => {
    setLoadingPast(true);
    setError("");
    try {
      const res = await fetchPastEvents(filters);
      setPastEvents(res.events || []);
      setPastFetched(true);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to fetch past events.");
    } finally {
      setLoadingPast(false);
    }
  };

  const displayedEvents = activeTab === "live" ? liveEvents : pastEvents;

  return (
    <div>
      {/* Live / Past Tabs */}
      <div className="flex gap-4 mb-6">
        {["live", "past"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === tab
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "live" ? "📡 Live Events" : "📁 Past Events"}
          </button>
        ))}
      </div>

      {/* Filters */}
      {activeTab === "past" && (
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <input
            className="border border-gray-300 rounded px-3 py-2 w-40"
            placeholder="Symbol (e.g. AAPL)"
            value={filters.symbol}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                symbol: e.target.value.toUpperCase(),
              }))
            }
          />
          <select
            className="border border-gray-300 rounded px-3 py-2"
            value={filters.type}
            onChange={(e) =>
              setFilters((f) => ({ ...f, type: e.target.value }))
            }
          >
            <option value="">All Types</option>
            <option value="bullish">Bullish</option>
            <option value="bearish">Bearish</option>
          </select>
          <button
            onClick={handleShowPastEvents}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            🔍 Show Events
          </button>
        </div>
      )}

      {/* Error */}
      {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

      {/* Event Cards */}
      <div className="grid gap-3">
        {displayedEvents.length > 0 ? (
          displayedEvents.map((e, i) => (
            <div
              key={i}
              className={`p-4 rounded-lg shadow-sm border-l-4 ${
                e.type === "bullish"
                  ? "border-green-500 bg-green-50"
                  : "border-red-500 bg-red-50"
              }`}
            >
              <p className="font-semibold text-gray-800">{e.symbol}</p>
              <p className="text-sm text-gray-600 capitalize">{e.type}</p>
              <p className="text-xs text-gray-500">
                {e.timestamp
                  ? new Date(e.timestamp).toLocaleString()
                  : "No timestamp"}
              </p>
            </div>
          ))
        ) : pastFetched && activeTab === "past" && !loadingPast ? (
          <p className="text-gray-500 text-sm">
            No matching past events found.
          </p>
        ) : (
          activeTab === "past" &&
          !loadingPast &&
          !pastFetched && (
            <p className="text-gray-500 text-sm">
              Click above to load past events
            </p>
          )
        )}

        {loadingPast && <p className="text-blue-500 text-sm">Loading...</p>}
      </div>
    </div>
  );
}
