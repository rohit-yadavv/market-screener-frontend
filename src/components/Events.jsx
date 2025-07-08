"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPastEvents = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/macd/hisory", {
        withCredentials: true,
      });
      if (res.data.success) {
        setEvents(res.data.events || []);
      }
    } catch (err) {
      console.error("Failed to fetch past events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPastEvents();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        MACD Past Events
      </h2>

      {loading ? (
        <p className="text-gray-500 animate-pulse">Fetching events...</p>
      ) : events.length === 0 ? (
        <p className="text-gray-500">No past events found yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100 text-left text-sm">
              <tr>
                <th className="px-4 py-2">Symbol</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">MACD</th>
                <th className="px-4 py-2">Signal</th>
                <th className="px-4 py-2">Time</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {events?.map((e, i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-2 font-medium">{e.symbol}</td>
                  <td
                    className={`px-4 py-2 ${
                      e.type === "bullish" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {e.type}
                  </td>
                  <td className="px-4 py-2">{e.macd.toFixed(4)}</td>
                  <td className="px-4 py-2">{e.signal.toFixed(4)}</td>
                  <td className="px-4 py-2">
                    {new Date(e.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
