import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Clock, Flame } from "lucide-react";
import { useSSE } from "@/hooks/useSSE";

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
        {events.map((event, index) => (
          <Card
            key={`${event.datetime}-${event.symbol}-${index}`}
            className="p-2 gap-0"
          >
            <CardHeader className="py-2 flex flex-row justify-between items-center">
              <CardTitle className={"flex items-center gap-1"}>
                <span>{event.symbol}</span>
                <span className="text-muted-foreground ">
                  {event.type === "price_action" && "(Price Instance)"}
                </span>
                <span className="text-muted-foreground ">
                  {event.type === "macd" && "(MACD Crossover)"}
                </span>
              </CardTitle>
              <span className="text-sm text-muted-foreground">
                {new Date(event.event.datetime).toLocaleString()}
              </span>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-2 py-2">
              {event.type === "macd" && (
                <>
                  <Badge
                    className={`flex items-center gap-1 capitalize text-[11px] font-medium px-2.5 py-0.5 rounded-sm min-w-fit ${
                      event.event.cycle === "positive"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    <Flame className="w-3 h-3" />
                    {event.event.cycle}
                  </Badge>
                  <Badge className="flex items-center gap-1 bg-yellow-100 text-yellow-800 text-[11px] font-medium px-2.5 py-0.5 border border-yellow-300 rounded-sm min-w-fit">
                    <Clock className="w-3 h-3 mr-1" />
                    {event.event.streak}
                  </Badge>
                </>
              )}
              {event.type === "price_action" && (
                <Badge>Price Instance Count: {event.event.count}</Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RealtimeEvents;
