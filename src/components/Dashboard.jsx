import { useEffect, useState } from "react";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [copySuccess, setCopySuccess] = useState(false);

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

  const pineScript = `
//@version=5
indicator("MACD Full Crossover Webhook", overlay=false)

// === MACD Calculation ===
[macdLine, signalLine, _] = ta.macd(close, 12, 26, 9)

// === Detect crossovers ===
crossUp = ta.crossover(macdLine, signalLine)
crossDown = ta.crossunder(macdLine, signalLine)
isCross = crossUp or crossDown

// === Determine direction and zone ===
direction = crossUp ? "up" : "down"
zone = (macdLine > 0 and signalLine > 0) ? "above" :
       (macdLine < 0 and signalLine < 0) ? "below" : "mixed"

// Only trigger if in "above" or "below" zone
validCrossover = isCross and (zone == "above" or zone == "below")

// === Format timestamp: "YYYY-MM-DD HH:MM" ===
formattedTime = str.tostring(year) + "-" + str.tostring(month) + "-" + str.tostring(dayofmonth) + " " + str.tostring(hour) + ":" + str.tostring(minute, "#00")

// === Build JSON string (all on one line to avoid syntax error) ===
jsonMessage = '{"symbol":"' + syminfo.ticker + '","macd":' + str.tostring(macdLine, format.mintick) + ',"signal":' + str.tostring(signalLine, format.mintick) + ',"direction":"' + direction + '","zone":"' + zone + '","time":"' + formattedTime + '"}'

// === Trigger alert on valid crossover ===
if validCrossover
    alert(jsonMessage, alert.freq_once_per_bar)

// === Optional: Plot MACD and signal lines ===
plot(macdLine, title="MACD", color=color.blue)
plot(signalLine, title="Signal", color=color.orange)

`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pineScript);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("❌ Failed to copy:", err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-gray-900 font-sans px-6 py-10">
      <header className="w-full mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          MACD Crossover Alerts
        </h1>
      </header>

      {/* Pine Script Section */}
      <section className="w-full bg-gray-50 border border-gray-200 rounded-xl p-6 mb-10 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
          <h2 className="text-2xl font-semibold text-gray-700">Pine Script</h2>
          <button
            onClick={handleCopy}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded shadow-sm"
          >
            {copySuccess ? "✅ Copied!" : "Copy Pine Script"}
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-3">
          Paste this into your TradingView Pine Editor
        </p>

        <pre className="bg-gray-100 text-gray-800 h-80 overflow-y-auto text-sm p-4 rounded font-mono overflow-x-auto border border-gray-300 whitespace-pre">
          {pineScript}
        </pre>

        <p className="text-sm mt-4 text-gray-700">
          <strong>Webhook URL:</strong>{" "}
          <code className="bg-blue-50 px-2 py-1 rounded text-blue-600">
            {`${import.meta.env.VITE_BACKEND_URL}/webhook`}
          </code>
        </p>
      </section>

      {/* Alert Section */}
      <section className="w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          🔔 Live Crossover Events
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {events.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 text-lg">
              ⏳ Waiting for alerts...
            </div>
          ) : (
            events.map((event, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="text-lg font-medium text-gray-800">
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
                <div className="text-sm text-gray-500">
                  {new Date(event.timestamp).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
