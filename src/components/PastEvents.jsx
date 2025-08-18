import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { BASE_URL } from "../utils/api";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  Clock,
  TrendingUp,
  TrendingDown,
  Repeat,
  BarChart3,
  LineChart,
  AlertTriangle,
  ArrowLeftRight,
  Filter,
  RefreshCw,
  Download,
} from "lucide-react";
import { toast } from "sonner";

export default function PastEvents() {
  const [activeTab, setActiveTab] = useState("alerts");
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  });

  // Filters - Fixed: use "all" instead of empty string
  const [filters, setFilters] = useState({
    symbol: "",
    alertType: "all", // Changed from "" to "all"
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchEvents();
  }, [activeTab, filters, pagination.page]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      });

      if (filters.symbol) params.append("symbol", filters.symbol);
      if (filters.alertType && filters.alertType !== "all")
        params.append("alertType", filters.alertType);
      if (filters.startDate) params.append("startDate", filters.startDate);
      if (filters.endDate) params.append("endDate", filters.endDate);

      let endpoint = "";
      switch (activeTab) {
        case "alerts":
          endpoint = "alerts";
          break;
        case "trades":
          endpoint = "trades";
          break;
        case "decision-trades":
          endpoint = "decision-trades";
          break;
        case "decision-events":
          endpoint = "decision-events";
          break;
        default:
          endpoint = "alerts";
      }

      const response = await axios.get(
        `${BASE_URL}/history/${endpoint}?${params}`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setEvents(response.data.data.events);
        setPagination((prev) => ({
          ...prev,
          total: response.data.data.pagination.total,
          pages: response.data.data.pagination.pages,
        }));
      }
    } catch (error) {
      toast.error("Failed to fetch history data");
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const getEventIcon = (type) => {
    switch (type) {
      case "macd":
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
      case "macd":
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
        return type;
    }
  };

  const getEventDetails = (event) => {
    const details = event.details;

    switch (event.type) {
      case "macd":
        return {
          cycle: details.cycle,
          count: details.count,
          description: `${details.cycle} cycle with count ${details.count}`,
        };
      case "price_action":
        return {
          cycle: details.cycle,
          count: details.count,
          description: `${details.cycle} price action with ${details.count} instances`,
        };
      case "trend_continuation":
        return {
          count: details.count,
          description: `Trend continuation with ${details.count} sequences`,
        };
      case "high_low":
        return {
          valueType: details.valueType,
          value: details.value,
          description: `New ${details.valueType} at ${details.value}`,
        };
      case "trade":
        return {
          side: details.side,
          quantity: details.quantity,
          price: details.price,
          description: `${details.side} ${details.quantity} shares at $${details.price}`,
        };
      case "decision_trade":
        return {
          side: details.side,
          quantity: details.quantity,
          triggerPrice: details.triggerPrice,
          description: `${details.side} ${details.quantity} shares at $${details.triggerPrice}`,
        };
      case "decision_event":
        return {
          firstCondition: details.firstCondition,
          firstConditionCount: details.firstConditionCount,
          priceConditionCount: details.priceConditionCount,
          description: `${details.firstCondition} condition met with counts ${details.firstConditionCount}/${details.priceConditionCount}`,
        };
      default:
        return {
          description: "Event details",
        };
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const clearFilters = () => {
    setFilters({
      symbol: "",
      alertType: "all", // Changed from "" to "all"
      startDate: "",
      endDate: "",
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const exportData = () => {
    // Simple CSV export
    const headers = ["Date", "Type", "Symbol", "Details"];
    const csvContent = [
      headers.join(","),
      ...events.map((event) => {
        const details = getEventDetails(event);
        return [
          format(new Date(event.datetime), "yyyy-MM-dd HH:mm:ss"),
          getEventTypeLabel(event.type),
          event.symbol,
          details.description,
        ].join(",");
      }),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `history-${activeTab}-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">History & Analytics</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchEvents}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={exportData}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="symbol">Symbol</Label>
              <Input
                id="symbol"
                placeholder="e.g., AAPL"
                value={filters.symbol}
                onChange={(e) =>
                  handleFilterChange("symbol", e.target.value.toUpperCase())
                }
              />
            </div>
            <div>
              <Label htmlFor="alertType">Event Type</Label>
              <Select
                value={filters.alertType}
                onValueChange={(value) =>
                  handleFilterChange("alertType", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  <SelectItem value="macd">MACD</SelectItem>
                  <SelectItem value="price_action">Price Action</SelectItem>
                  <SelectItem value="trend_continuation">
                    Trend Continuation
                  </SelectItem>
                  <SelectItem value="high_low">High/Low</SelectItem>
                  <SelectItem value="trade">Trade</SelectItem>
                  <SelectItem value="decision_trade">Decision Trade</SelectItem>
                  <SelectItem value="decision_event">Decision Event</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={filters.startDate}
                onChange={(e) =>
                  handleFilterChange("startDate", e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={filters.endDate}
                onChange={(e) => handleFilterChange("endDate", e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="trades">Trades</TabsTrigger>
          <TabsTrigger value="decision-trades">Decision Trades</TabsTrigger>
          <TabsTrigger value="decision-events">Decision Events</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-4">
          <HistoryTable
            events={events}
            loading={loading}
            getEventIcon={getEventIcon}
            getEventTypeLabel={getEventTypeLabel}
            getEventDetails={getEventDetails}
          />
        </TabsContent>

        <TabsContent value="trades" className="space-y-4">
          <HistoryTable
            events={events}
            loading={loading}
            getEventIcon={getEventIcon}
            getEventTypeLabel={getEventTypeLabel}
            getEventDetails={getEventDetails}
          />
        </TabsContent>

        <TabsContent value="decision-trades" className="space-y-4">
          <HistoryTable
            events={events}
            loading={loading}
            getEventIcon={getEventIcon}
            getEventTypeLabel={getEventTypeLabel}
            getEventDetails={getEventDetails}
          />
        </TabsContent>

        <TabsContent value="decision-events" className="space-y-4">
          <HistoryTable
            events={events}
            loading={loading}
            getEventIcon={getEventIcon}
            getEventTypeLabel={getEventTypeLabel}
            getEventDetails={getEventDetails}
          />
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
            {pagination.total} results
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.pages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function HistoryTable({
  events,
  loading,
  getEventIcon,
  getEventTypeLabel,
  getEventDetails,
}) {
  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (events.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No events found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => {
            const details = getEventDetails(event);
            return (
              <TableRow key={event.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getEventIcon(event.type)}
                    <Badge variant="outline">
                      {getEventTypeLabel(event.type)}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{event.symbol}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {format(new Date(event.datetime), "MMM dd, yyyy")}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {format(new Date(event.datetime), "HH:mm:ss")}
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-sm">{details.description}</p>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}
