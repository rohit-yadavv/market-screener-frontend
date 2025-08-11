import { Badge } from "./ui/badge";
import { useSSE } from "@/hooks/useSSE";
import { AlertCard } from "./PastEvents";

const RealtimeEvents = () => {
  const { events, isConnected } = useSSE();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2>Real-time Events ({events.length})</h2>

        {isConnected ? (
          <Badge className="px-2 py-1 text-white bg-green-700">Connected</Badge>
        ) : (
          <Badge variant="destructive" className={"px-2 py-1"}>
            Disconnected
          </Badge>
        )}
      </div>

      {events.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {events.map((sseEvent, index) => {
            const cleanEvent = {
              symbol: sseEvent.symbol,
              ...sseEvent.event,
            };
            const type = sseEvent.type;

            return <AlertCard key={index} event={cleanEvent} type={type} />;
          })}
        </div>
      ) : (
        <p className="text-gray-400">
          {isConnected ? "Waiting for events..." : "Connecting to server..."}
        </p>
      )}
    </div>
  );
};

export default RealtimeEvents;
