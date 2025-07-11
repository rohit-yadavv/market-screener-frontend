/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/api";

function MacdThreshold() {
  const [threshold, setThreshold] = useState(-1);
  const [inputThreshold, setInputThreshold] = useState(-1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchThreshold() {
      try {
        const res = await axios.get(`${BASE_URL}/user/macd-threshold`, {
          withCredentials: true,
        });
        const value = res.data.macdThreshold;
        setThreshold(value);
        setInputThreshold(value);
      } catch (err) {
        console.error("Failed to fetch MACD threshold", err);
      }
    }

    fetchThreshold();
  }, []);

  const saveThreshold = async () => {
    const value = Number(inputThreshold);
    if (isNaN(value) || value < 1 || value > 10) {
      alert("Threshold must be a number between 1 and 10");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${BASE_URL}/user/macd-threshold`,
        { threshold: value },
        {
          withCredentials: true,
        }
      );
      setThreshold(value);
      alert("MACD threshold saved successfully!");
    } catch (err) {
      alert("Failed to update MACD threshold");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3 bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm">
      <label className="text-sm font-medium text-gray-700">
        ⚙️ MACD Threshold:
      </label>
      <button
        onClick={() => setInputThreshold(Math.max(1, inputThreshold - 1))}
        className="text-lg px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
      >
        -
      </button>
      <input
        type="number"
        min={1}
        max={10}
        value={inputThreshold}
        onChange={(e) => setInputThreshold(Number(e.target.value))}
        className="w-14 text-center border border-gray-300 rounded px-2 py-1 text-sm"
      />
      <button
        onClick={() => setInputThreshold(Math.min(10, inputThreshold + 1))}
        className="text-lg px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
      >
        +
      </button>
      <button
        onClick={saveThreshold}
        disabled={loading || inputThreshold === threshold}
        className="ml-2 px-3 py-1.5 text-sm font-medium rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  );
}

export default MacdThreshold;
