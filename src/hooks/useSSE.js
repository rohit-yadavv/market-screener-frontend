import { SSEContext } from "@/context/SSEContext";
import { useContext } from "react";

export const useSSE = () => {
  const context = useContext(SSEContext);
  if (!context) {
    throw new Error("useSSE must be used within an SSEProvider");
  }
  return context;
};
