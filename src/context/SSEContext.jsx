import React, { createContext, useState, useEffect, useMemo } from "react";
import { BASE_URL } from "@/utils/api";

export const SSEContext = createContext();

export const SSEProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const audio = new Audio("/beep.mp3");

    const eventSource = new EventSource(`${BASE_URL}/sse`, {
      withCredentials: true,
    });

    eventSource.onopen = () => {
      setIsConnected(true);
    };

    eventSource.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        setEvents((prevEvents) => [data, ...prevEvents].slice(0, 50));
        audio.play().catch((error) => {
          console.error("Error playing sound:", error);
        });
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        console.error("Invalid JSON:");
      }
    };

    eventSource.onerror = () => {
      setIsConnected(false);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  // Memoize the value to avoid unnecessary re-renders for consumers
  const value = useMemo(() => ({ events, isConnected }), [events, isConnected]);

  return <SSEContext.Provider value={value}>{children}</SSEContext.Provider>;
};
