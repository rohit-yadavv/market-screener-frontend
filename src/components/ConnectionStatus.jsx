import React, { useContext } from "react";
import { SSEContext } from "../context/SSEContext.jsx";
import { Button } from "@/components/ui/button";
import { RefreshCw, CheckCircle, AlertCircle } from "lucide-react";

const ConnectionStatus = () => {
  const { isConnected, retryCount, reconnect } = useContext(SSEContext);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {isConnected ? (
          <CheckCircle className="h-4 w-4 text-green-500" />
        ) : (
          <AlertCircle className="h-4 w-4 text-red-500" />
        )}
        <span className="text-sm">
          {isConnected ? "Connected" : "Disconnected"}
        </span>
      </div>
      
      {!isConnected && (
        <Button
          variant="outline"
          size="sm"
          onClick={reconnect}
          className="h-6 px-2"
        >
          <RefreshCw className="h-3 w-3 mr-1" />
          Reconnect
        </Button>
      )}
      
      {retryCount > 0 && (
        <span className="text-xs text-gray-500">
          Retry: {retryCount}
        </span>
      )}
    </div>
  );
};

export default ConnectionStatus;
