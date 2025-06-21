import { useEffect, useState } from "react";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(
      `${import.meta.env.VITE_BACKEND_URL}/sse`
    );

    eventSource.onopen = () => {
      console.log("✅ SSE connected");
    };

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setEvents((prev) => [data, ...prev]);
    };

    eventSource.onerror = (err) => {
      console.error("❌ SSE error:", err);
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);

  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Live Crossover Events
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 text-lg">
            ⏳ Waiting for alerts...
          </div>
        ) : (
          events.map((event, idx) => {
            const isStrong = event.eventType === "strong-crossover";

            return (
              <div
                key={idx}
                className={`relative border rounded-xl p-5 transition-all shadow-md ${
                  isStrong
                    ? "bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-500 "
                    : "bg-white border-gray-200"
                }`}
              >
                {isStrong && (
                  <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
                    🔥 Strong Signal
                  </div>
                )}

                <div className="flex justify-between items-center mb-2">
                  <div className="text-lg font-semibold text-gray-800">
                    {event.symbol}
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-semibold ${
                      event.type === "bullish"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {event.type.toUpperCase()}
                  </span>
                </div>

                <div className="text-sm text-gray-500 mb-2">
                  {new Date(event.timestamp).toLocaleString()}
                </div>

                <ul className="text-sm text-gray-700 space-y-1">
                  <li>
                    <strong>MACD:</strong> {event.macd}
                  </li>
                  <li>
                    <strong>Signal:</strong> {event.signal}
                  </li>
                  <li>
                    <strong>Direction:</strong>{" "}
                    {event.direction === "up" ? "↑ Up" : "↓ Down"}
                  </li>
                  <li>
                    <strong>Zone:</strong>{" "}
                    {event.zone === "above"
                      ? "Above Zero Line"
                      : "Below Zero Line"}
                  </li>
                </ul>

                {isStrong && (
                  <div className="mt-3 text-yellow-800 font-semibold text-sm">
                    ✅ 4x continuous crossover in same zone
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

export default Events;
