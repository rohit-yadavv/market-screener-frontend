import React, { createContext, useState, useEffect, useMemo, useRef, useCallback } from "react";
import { BASE_URL } from "@/utils/api";

export const SSEContext = createContext();

export const SSEProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  
  const eventSourceRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const maxRetries = 5;

  // Clean up connection
  const cleanup = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  };

  // Connect to SSE
  const connect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    try {
      const eventSource = new EventSource(`${BASE_URL}/sse`, {
        withCredentials: true,
      });

      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        console.log("SSE connected");
        setIsConnected(true);
        setRetryCount(0);
      };

      eventSource.onmessage = (e) => {
        try {
          const data = JSON.parse(e.data);
          setEvents((prevEvents) => [data, ...prevEvents].slice(0, 50));
          
          // Play notification sound
          const audio = new Audio("/beep.mp3");
          audio.play().catch((error) => {
            console.error("Error playing sound:", error);
          });
        } catch (err) {
          console.error("Invalid JSON received:", err);
        }
      };

      eventSource.onerror = () => {
        console.log("SSE connection error, reconnecting...");
        setIsConnected(false);
        cleanup();
        
        // Retry with exponential backoff
        if (retryCount < maxRetries) {
          const delay = Math.min(1000 * Math.pow(2, retryCount), 10000);
          reconnectTimeoutRef.current = setTimeout(() => {
            setRetryCount(prev => prev + 1);
            connect();
          }, delay);
        }
      };

    } catch (error) {
      console.error("Failed to create SSE connection:", error);
      setIsConnected(false);
    }
  }, [retryCount, maxRetries]);

  // Manual reconnect
  const reconnect = useCallback(() => {
    console.log("Manual reconnect");
    cleanup();
    setRetryCount(0);
    connect();
  }, [connect]);

  // Clear all events
  const clearEvents = useCallback(() => {
    console.log("Clearing all events");
    setEvents([]);
  }, []);

  // Initialize connection
  useEffect(() => {
    connect();
    return cleanup;
  }, []);

  // Handle page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && !isConnected) {
        console.log("Page visible, reconnecting...");
        reconnect();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isConnected, reconnect]);

  const value = useMemo(() => ({ 
    events, 
    isConnected, 
    retryCount,
    reconnect,
    clearEvents
  }), [events, isConnected, retryCount, reconnect, clearEvents]);

  return <SSEContext.Provider value={value}>{children}</SSEContext.Provider>;
};
