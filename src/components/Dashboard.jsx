import { useState } from "react";
import { CheckIcon, CopyIcon, InfoIcon } from "lucide-react";
import Events from "./Events";
import { macdCrossSignalLinePineScript } from "../constants/pince-scripts";

export default function Dashboard() {
  const [copySuccess, setCopySuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("steps");
  const webhookUrl = `${import.meta.env.VITE_BACKEND_URL}/webhook`;

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("❌ Failed to copy:", err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900 px-6 py-10 font-sans">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-blue-700 mb-1">
          MACD Crossover Dashboard
        </h1>
        <p className="text-gray-500">
          Track and manage real-time crossover alerts using TradingView
        </p>
      </header>

      <div className="flex gap-4 mb-8 overflow-x-auto border-b border-gray-200">
        {["steps", "script", "webhook", "events"].map((tab) => (
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
            <InfoIcon className="mr-2" /> How to Set Up Alert
          </h2>
          <ol className="list-decimal pl-6 space-y-4 text-sm text-gray-700">
            <li>
              <strong>Copy the Pine Script</strong> from the <em>Script</em>{" "}
              tab.
            </li>
            <li>
              Open <strong>TradingView</strong> and navigate to the{" "}
              <em>Pine Editor</em>.
            </li>
            <li>
              Paste the copied script and click <strong>“Add to Chart”</strong>.
            </li>
            <li>
              Click <strong>“Create Alert”</strong> and select the MACD
              crossover indicator.
            </li>
            <li>
              Paste the Webhook URL from the <em>Webhook</em> tab into the alert
              settings.
            </li>
            <li>
              Select <strong>“Once per bar”</strong> and create the alert.
            </li>
            <li>
              Watch the <em>Events</em> tab for live MACD crossover signals.
            </li>
          </ol>
        </section>
      )}

      {activeTab === "script" && (
        <section className="bg-white border border-gray-200 rounded-xl p-6 mb-12 shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Pine Script</h2>
            <button
              onClick={() => handleCopy(macdCrossSignalLinePineScript)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm px-4 py-2 rounded-md shadow hover:brightness-110 transition"
            >
              {copySuccess ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
              {copySuccess ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="bg-gray-100 text-gray-800 text-sm p-4 rounded-md border border-gray-300 overflow-auto h-96">
            {macdCrossSignalLinePineScript}
          </pre>
        </section>
      )}

      {activeTab === "webhook" && (
        <section className="bg-white border border-gray-200 rounded-xl p-6 mb-12 shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Webhook URL
          </h2>
          <div className="flex justify-between items-center bg-white border border-gray-200 px-4 py-3 rounded-md shadow-sm">
            <code className="text-blue-700 text-sm break-all">
              {webhookUrl}
            </code>
            <button
              onClick={() => handleCopy(webhookUrl)}
              className="text-blue-500 hover:text-blue-700 transition"
            >
              {copySuccess ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
            </button>
          </div>
        </section>
      )}

      {activeTab === "events" && <Events />}
    </div>
  );
}
