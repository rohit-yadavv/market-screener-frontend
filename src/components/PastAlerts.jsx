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
import { DatePicker } from "@/components/ui/date-picker";
import {
  Calendar,
  Clock,
  TrendingUp,
  TrendingDown,
  Repeat,
  BarChart3,
  LineChart,
  AlertTriangle,
  Filter,
  RefreshCw,
  Download,
} from "lucide-react";
import { toast } from "sonner";

export default function PastAlerts() {
  const [activeTab, setActiveTab] = useState("macd");
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  });

  const [filters, setFilters] = useState({
    symbol: "",
    dateRange: null,
  });

  const [appliedFilters, setAppliedFilters] = useState({
    symbol: "",
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    fetchAlerts();
  }, [activeTab, appliedFilters, pagination.page]);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        alertType: activeTab,
      });

      if (appliedFilters.symbol) params.append("symbol", appliedFilters.symbol);
      if (appliedFilters.startDate)
        params.append(
          "startDate",
          format(appliedFilters.startDate, "yyyy-MM-dd")
        );
      if (appliedFilters.endDate)
        params.append("endDate", format(appliedFilters.endDate, "yyyy-MM-dd"));

      const response = await axios.get(`${BASE_URL}/history/alerts?${params}`, {
        withCredentials: true,
      });

      if (response.data.success) {
        setAlerts(response.data.data.events);
        setPagination((prev) => ({
          ...prev,
          total: response.data.data.pagination.total,
          pages: response.data.data.pagination.pages,
        }));
      }
    } catch (error) {
      toast.error("Failed to fetch alert history");
      console.error("Error fetching alerts:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case "macd":
        return <BarChart3 className="w-4 h-4" />;
      case "price_action":
        return <LineChart className="w-4 h-4" />;
      case "trend_continuation":
        return <Repeat className="w-4 h-4" />;
      case "high_low":
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getAlertTypeLabel = (type) => {
    switch (type) {
      case "macd":
        return "MACD Alert";
      case "price_action":
        return "Price Candle Alert";
      case "trend_continuation":
        return "Trend Continuous Alert";
      case "high_low":
        return "High Low Alert";
      default:
        return type;
    }
  };

  const getAlertDetails = (alert) => {
    const details = alert.details;

    switch (alert.type) {
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
          description: `${details.cycle} price action with ${details.count} instances (after MACD threshold met)`,
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
      default:
        return {
          description: "Alert details",
        };
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    setAppliedFilters({
      symbol: filters.symbol,
      startDate: filters.dateRange?.from || null,
      endDate: filters.dateRange?.to || null,
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const clearFilters = () => {
    setFilters({
      symbol: "",
      dateRange: null,
    });
    setAppliedFilters({
      symbol: "",
      startDate: null,
      endDate: null,
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const exportData = () => {
    const headers = ["Date", "Type", "Symbol", "Details"];
    const csvContent = [
      headers.join(","),
      ...alerts.map((alert) => {
        const details = getAlertDetails(alert);
        return [
          format(new Date(alert.datetime), "yyyy-MM-dd HH:mm:ss"),
          getAlertTypeLabel(alert.type),
          alert.symbol,
          details.description,
        ].join(",");
      }),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `past-alerts-${activeTab}-${format(
      new Date(),
      "yyyy-MM-dd"
    )}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Past Alerts</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchAlerts}>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label>Date Range</Label>
              <DatePicker
                mode="range"
                value={filters.dateRange}
                onChange={(range) => handleFilterChange("dateRange", range)}
                className="w-full"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
            <Button onClick={applyFilters}>Apply Filters</Button>
          </div>
        </CardContent>
      </Card>

      {/* Alert Type Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="macd">MACD Alert</TabsTrigger>
          <TabsTrigger value="price_action">Price Candle</TabsTrigger>
          <TabsTrigger value="trend_continuation">Trend Continuous</TabsTrigger>
          <TabsTrigger value="high_low">High Low</TabsTrigger>
        </TabsList>

        <TabsContent value="macd" className="space-y-4">
          <AlertTable
            alerts={alerts}
            loading={loading}
            getAlertIcon={getAlertIcon}
            getAlertTypeLabel={getAlertTypeLabel}
            getAlertDetails={getAlertDetails}
          />
        </TabsContent>

        <TabsContent value="price_action" className="space-y-4">
          <AlertTable
            alerts={alerts}
            loading={loading}
            getAlertIcon={getAlertIcon}
            getAlertTypeLabel={getAlertTypeLabel}
            getAlertDetails={getAlertDetails}
          />
        </TabsContent>

        <TabsContent value="trend_continuation" className="space-y-4">
          <AlertTable
            alerts={alerts}
            loading={loading}
            getAlertIcon={getAlertIcon}
            getAlertTypeLabel={getAlertTypeLabel}
            getAlertDetails={getAlertDetails}
          />
        </TabsContent>

        <TabsContent value="high_low" className="space-y-4">
          <AlertTable
            alerts={alerts}
            loading={loading}
            getAlertIcon={getAlertIcon}
            getAlertTypeLabel={getAlertTypeLabel}
            getAlertDetails={getAlertDetails}
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

function AlertTable({
  alerts,
  loading,
  getAlertIcon,
  getAlertTypeLabel,
  getAlertDetails,
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

  if (alerts.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No alerts found</p>
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
          {alerts.map((alert) => {
            const details = getAlertDetails(alert);
            return (
              <TableRow key={alert.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getAlertIcon(alert.type)}
                    <Badge variant="outline">
                      {getAlertTypeLabel(alert.type)}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{alert.symbol}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {format(new Date(alert.datetime), "MMM dd, yyyy")}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {format(new Date(alert.datetime), "HH:mm:ss")}
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
