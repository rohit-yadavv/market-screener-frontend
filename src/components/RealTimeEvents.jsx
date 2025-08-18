import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useSSE } from "@/hooks/useSSE";
import { format } from "date-fns";
import {
  BarChart3,
  LineChart,
  Repeat,
  TrendingUp,
  TrendingDown,
  ArrowLeftRight,
  AlertTriangle,
  Clock,
  Radio,
  Wifi,
  WifiOff,
  RefreshCw,
  Trash2,
} from "lucide-react";

const RealtimeEvents = () => {
  const { events, isConnected } = useSSE();
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filter, setFilter] = useState("all");
  const [maxEvents, setMaxEvents] = useState(100);

  useEffect(() => {
    // Keep only the latest events up to maxEvents
    const limitedEvents = events.slice(-maxEvents);
    setFilteredEvents(limitedEvents);
  }, [events, maxEvents]);

  const getEventIcon = (type) => {
    switch (type) {
      case "macd_cycle":
        return <BarChart3 className="w-4 h-4" />;
      case "price_action":
        return <LineChart className="w-4 h-4" />;
      case "trend_continuation":
        return <Repeat className="w-4 h-4" />;
      case "high_low":
        return <TrendingUp className="w-4 h-4" />;
      case "trade":
        return <ArrowLeftRight className="w-4 h-4" />;
      case "decision_trade":
        return <ArrowLeftRight className="w-4 h-4" />;
      case "decision_event":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getEventTypeLabel = (type) => {
    switch (type) {
      case "macd_cycle":
        return "MACD Cycle";
      case "price_action":
        return "Price Action";
      case "trend_continuation":
        return "Trend Continuation";
      case "high_low":
        return "High/Low";
      case "trade":
        return "Trade";
      case "decision_trade":
        return "Decision Trade";
      case "decision_event":
        return "Decision Event";
      default:
        return type.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase());
    }
  };

  const getEventDetails = (sseEvent) => {
    const event = sseEvent.event;
    const type = sseEvent.type;

    switch (type) {
      case "macd_cycle":
        return {
          cycle: event.cycle,
          count: event.count,
          description: `${event.cycle} cycle with count ${event.count}`,
          color: event.cycle === "positive" ? "text-green-600" : "text-red-600",
          datetime: event.datetime,
        };
      case "price_action":
        return {
          cycle: event.cycle,
          count: event.count,
          description: `${event.cycle} price action with ${event.count} instances`,
          color: event.cycle === "positive" ? "text-green-600" : "text-red-600",
          datetime: event.datetime,
        };
      case "trend_continuation":
        return {
          count: event.count,
          description: `Trend continuation with ${event.count} sequences`,
          color: "text-blue-600",
          datetime: event.datetime,
        };
      case "high_low":
        return {
          valueType: event.valueType,
          value: event.value,
          description: `New ${event.valueType} at ${event.value}`,
          color: event.valueType === "high" ? "text-green-600" : "text-red-600",
          datetime: event.datetime,
        };
      case "trade":
        return {
          side: event.side,
          quantity: event.quantity,
          price: event.price,
          description: `${event.side} ${event.quantity} shares at $${event.price}`,
          color: event.side === "buy" ? "text-green-600" : "text-red-600",
          datetime: event.datetime,
        };
      case "decision_trade":
        return {
          side: event.side,
          quantity: event.quantity,
          triggerPrice: event.triggerPrice,
          description: `${event.side} ${event.quantity} shares at $${event.triggerPrice}`,
          color: event.side === "buy" ? "text-green-600" : "text-red-600",
          datetime: event.datetime,
        };
      case "decision_event":
        return {
          firstCondition: event.firstCondition,
          firstConditionCount: event.firstConditionCount,
          priceConditionCount: event.priceConditionCount,
          description: `${event.firstCondition} condition met with counts ${event.firstConditionCount}/${event.priceConditionCount}`,
          color: "text-purple-600",
          datetime: event.datetime,
        };
      default:
        return {
          description: "Event details",
          color: "text-gray-600",
          datetime: event.datetime,
        };
    }
  };

  const getFilteredEvents = () => {
    if (filter === "all") return filteredEvents;
    return filteredEvents.filter((event) => event.type === filter);
  };

  const clearEvents = () => {
    // This would need to be implemented in the SSE hook or context
    // For now, we'll just reset the local state
    setFilteredEvents([]);
  };

  const displayedEvents = getFilteredEvents();

  return (
    <div className="w-full space-y-6">
      {/* Header with Connection Status */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">Real-time Events</h2>
          <Badge variant="outline" className="flex items-center gap-1">
            {isConnected ? (
              <>
                <Wifi className="w-3 h-3 text-green-600" />
                Connected
              </>
            ) : (
              <>
                <WifiOff className="w-3 h-3 text-red-600" />
                Disconnected
              </>
            )}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {displayedEvents.length} events
          </span>
          <Button variant="outline" size="sm" onClick={clearEvents}>
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Radio className="w-5 h-5" />
            Event Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              All Events
            </Button>
            <Button
              variant={filter === "macd_cycle" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("macd_cycle")}
            >
              MACD Cycles
            </Button>
            <Button
              variant={filter === "price_action" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("price_action")}
            >
              Price Action
            </Button>
            <Button
              variant={filter === "trend_continuation" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("trend_continuation")}
            >
              Trend Continuation
            </Button>
            <Button
              variant={filter === "high_low" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("high_low")}
            >
              High/Low
            </Button>
            <Button
              variant={filter === "trade" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("trade")}
            >
              Trades
            </Button>
            <Button
              variant={filter === "decision_event" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("decision_event")}
            >
              Decision Events
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Events Table */}
      <Card>
        <CardHeader>
          <CardTitle>Live Events</CardTitle>
        </CardHeader>
        <CardContent>
          {displayedEvents.length === 0 ? (
            <div className="text-center py-8">
              <Radio className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                {isConnected
                  ? "Waiting for events..."
                  : "Connecting to server..."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedEvents.map((sseEvent, index) => {
                    const details = getEventDetails(sseEvent);

                    return (
                      <TableRow key={index} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {format(new Date(details.datetime), "HH:mm:ss")}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {format(new Date(details.datetime), "MMM dd")}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getEventIcon(sseEvent.type)}
                            <Badge variant="outline">
                              {getEventTypeLabel(sseEvent.type)}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="font-mono">
                            {sseEvent.symbol}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <p className={`text-sm ${details.color}`}>
                            {details.description}
                          </p>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Event Limit Control */}
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">
              Max Events to Display:
            </label>
            <select
              value={maxEvents}
              onChange={(e) => setMaxEvents(Number(e.target.value))}
              className="px-3 py-1 border rounded-md text-sm"
            >
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={200}>200</option>
              <option value={500}>500</option>
            </select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealtimeEvents;
