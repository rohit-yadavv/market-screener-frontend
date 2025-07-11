"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/api";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPastEvents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/macd/history`, {
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
    <div className="p-4 md:p-6 w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        MACD Past Events
      </h2>

      {loading ? (
        <p className="text-gray-500 animate-pulse">Fetching events...</p>
      ) : events.length === 0 ? (
        <p className="text-gray-500">No past events found yet.</p>
      ) : (
        <div className="flex flex-wrap -mx-2">
          {events.map((e, i) => (
            <div key={i} className="w-full md:w-1/2 lg:w-1/2 px-2 mb-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition h-full flex flex-col justify-between">
                <div>
                  <div className="text-xl font-semibold tracking-wide mb-1 text-gray-800">
                    {e.symbol}
                  </div>
                  <div className="flex items-center gap-3 text-sm flex-wrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full font-medium ${
                        e.type === "bullish"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {e.type === "bullish" ? (
                        <>
                          <ArrowUpRight className="w-4 h-4" /> Bullish
                        </>
                      ) : (
                        <>
                          <ArrowDownRight className="w-4 h-4" /> Bearish
                        </>
                      )}
                    </span>

                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs capitalize">
                      {e.side}
                    </span>

                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      Streak: {e.streakCount}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-500 mt-3">
                  {new Date(e.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
