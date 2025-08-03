import { Badge } from "./ui/badge";
import { useSSE } from "@/hooks/useSSE";
import { AlertCard } from "./PastEvents";

const RealtimeEvents = () => {
  const { events, isConnected } = useSSE();

  if (events.length === 0) {
    return (
      <p className="text-gray-400">
        {isConnected ? "Waiting for events..." : "Connecting to server..."}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2>Real-time Events ({events.length})</h2>
        <Badge variant={isConnected ? "default" : "destructive"}>
          {isConnected ? "Connected" : "Disconnected"}
        </Badge>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {events.map((sseEvent, index) => (
          <AlertCard
            key={index}
            event={{ symbol: sseEvent.symbol, ...sseEvent.event }}
            type={sseEvent.type}
          />
        ))}
      </div>
    </div>
  );
};

export default RealtimeEvents;
