import { subscribeStocks } from "../utils/api";

const STOCK_LIST = [
  "AAPL",
  "MSFT",
  "GOOGL",
  "TSLA",
  "META",
  "NVDA",
  "AMD",
  "NFLX",
  "BABA",
  "INTC",
  "UBER",
  "LYFT",
  "PYPL",
  "SQ",
  "PLTR",
  "ORCL",
  "ADBE",
  "SHOP",
  "CRM",
  "TWLO",
];

export default function StockSelector({ selected, setSelected }) {
  const toggleStock = (s) =>
    setSelected((prev) =>
      prev.includes(s)
        ? prev.filter((x) => x !== s)
        : prev.length < 20
        ? [...prev, s]
        : prev
    );

  const handleSubscribe = () => {
    subscribeStocks(selected);
  };

  return (
    <>
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        ✅ Select up to 20 Stocks
      </h3>

      <div className="flex flex-wrap gap-2 mb-6">
        {STOCK_LIST.map((stock) => (
          <button
            key={stock}
            onClick={() => toggleStock(stock)}
            className={`px-3 py-1 rounded-full border text-sm font-medium transition ${
              selected.includes(stock)
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {stock}
          </button>
        ))}
      </div>

      <button
        onClick={handleSubscribe}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold shadow"
      >
        🚀 Subscribe
      </button>
    </>
  );
}
