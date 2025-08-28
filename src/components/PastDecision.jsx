import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { format } from "date-fns";
import { BASE_URL } from "../utils/api";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  ArrowLeftRight,
  AlertTriangle,
  Filter,
  RefreshCw,
  Download,
  Target,
} from "lucide-react";
import { toast } from "sonner";

export default function PastDecision() {
  const [activeTab, setActiveTab] = useState("events");
  const [loading, setLoading] = useState(true);
  const [decisions, setDecisions] = useState([]);
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

  const fetchDecisions = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      });

      if (appliedFilters.symbol) params.append("symbol", appliedFilters.symbol);
      if (appliedFilters.startDate)
        params.append(
          "startDate",
          format(appliedFilters.startDate, "yyyy-MM-dd")
        );
      if (appliedFilters.endDate)
        params.append("endDate", format(appliedFilters.endDate, "yyyy-MM-dd"));

      let endpoint = "";
      switch (activeTab) {
        case "events":
          endpoint = "decision-events";
          break;
        case "trading":
          endpoint = "decision-trades";
          break;
        default:
          endpoint = "decision-events";
      }

      const response = await axios.get(
        `${BASE_URL}/history/${endpoint}?${params}`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        const decisionData =
          response.data.data.events || response.data.data.trades || [];
        setDecisions(decisionData);

        // Debug: Log decision data for troubleshooting
        if (decisionData.length > 0) {
          console.log(`Loaded ${decisionData.length} ${activeTab} decisions`);
          const firstDecision = decisionData[0];
          console.log(`First ${activeTab} decision:`, {
            type: firstDecision.type,
            datetime: firstDecision.datetime,
            createdAt: firstDecision.createdAt,
            id: firstDecision.id,
          });
        }

        setPagination((prev) => ({
          ...prev,
          total: response.data.data.pagination.total,
          pages: response.data.data.pagination.pages,
        }));
      }
    } catch (error) {
      toast.error("Failed to fetch decision history");
      console.error("Error fetching decisions:", error);
    } finally {
      setLoading(false);
    }
  }, [activeTab, appliedFilters, pagination.page, pagination.limit]);

  useEffect(() => {
    fetchDecisions();
  }, [fetchDecisions]);

  const getDecisionIcon = (type) => {
    switch (type) {
      case "decision_event":
        return <AlertTriangle className="w-4 h-4" />;
      case "decision_trade":
        return <ArrowLeftRight className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  const getDecisionTypeLabel = (type) => {
    switch (type) {
      case "decision_event":
        return "Decision Event";
      case "decision_trade":
        return "Decision Trade";
      default:
        return type;
    }
  };

  const getDecisionDetails = (decision) => {
    const details = decision.details;

    switch (decision.type) {
      case "decision_event":
        return {
          firstCondition: details.firstCondition,
          firstConditionCount: details.firstConditionCount,
          priceConditionCount: details.priceConditionCount,
          description: `${details.firstCondition} condition met with counts ${details.firstConditionCount}/${details.priceConditionCount}`,
        };
      case "decision_trade":
        return {
          side: details.side,
          quantity: details.quantity,
          triggerPrice: details.triggerPrice,
          status: details.status,
          orderId: details.orderId,
          description: `${details.side?.toUpperCase()} ${
            details.quantity
          } shares at $${details.triggerPrice?.toFixed(2) || "N/A"}`,
        };
      default:
        return {
          description: "Decision details",
        };
    }
  };

  const getDecisionDate = (decision) => {
    try {
      // For decision trades, only use createdAt (no datetime field)
      if (decision.type === "decision_trade") {
        if (decision.createdAt) {
          const date = new Date(decision.createdAt);
          if (!isNaN(date.getTime())) {
            return date;
          }
          console.warn(
            "Invalid createdAt date for decision trade:",
            decision.createdAt
          );
        }
        console.warn(
          "No valid createdAt found for decision trade. Using current time as fallback."
        );
        return new Date();
      }

      // For other types, prefer datetime, fallback to createdAt
      if (decision.datetime) {
        const date = new Date(decision.datetime);
        if (!isNaN(date.getTime())) {
          return date;
        }
        console.warn("Invalid datetime for decision:", decision.datetime);
      }

      if (decision.createdAt) {
        const date = new Date(decision.createdAt);
        if (!isNaN(date.getTime())) {
          return date;
        }
        console.warn("Invalid createdAt for decision:", decision.createdAt);
      }

      console.warn(
        "No valid date field found for decision. Using current time as fallback."
      );
      return new Date();
    } catch (error) {
      console.error("Error parsing decision date:", error, decision);
      return new Date();
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
    let headers = ["Date", "Time", "Type", "Symbol"];

    if (activeTab === "events") {
      headers = [
        ...headers,
        "First Condition",
        "First Threshold",
        "Second Threshold",
        "Details",
      ];
    } else if (activeTab === "trading") {
      headers = [...headers, "Side", "Quantity", "Price", "Status", "Details"];
    } else {
      headers = [...headers, "Details"];
    }

    const csvContent = [
      headers.join(","),
      ...decisions.map((decision) => {
        const details = getDecisionDetails(decision);
        const decisionDate = getDecisionDate(decision);

        const dateStr = format(decisionDate, "yyyy-MM-dd");
        const timeStr = format(decisionDate, "HH:mm:ss");

        if (activeTab === "events") {
          return [
            `"${dateStr}"`,
            `"${timeStr}"`,
            `"${getDecisionTypeLabel(decision.type)}"`,
            `"${decision.symbol}"`,
            `"${details.firstCondition?.replace("_", " ") || "N/A"}"`,
            `"${details.firstConditionCount || "N/A"}"`,
            `"${details.priceConditionCount || "N/A"}"`,
            `"${details.description}"`,
          ].join(",");
        } else if (activeTab === "trading") {
          return [
            `"${dateStr}"`,
            `"${timeStr}"`,
            `"${getDecisionTypeLabel(decision.type)}"`,
            `"${decision.symbol}"`,
            `"${details.side?.toUpperCase() || "N/A"}"`,
            `"${details.quantity || "N/A"}"`,
            `"${details.triggerPrice?.toFixed(2) || "N/A"}"`,
            `"${details.status?.toUpperCase() || "N/A"}"`,
            `"${details.description}"`,
          ].join(",");
        } else {
          return [
            `"${dateStr}"`,
            `"${timeStr}"`,
            `"${getDecisionTypeLabel(decision.type)}"`,
            `"${decision.symbol}"`,
            `"${details.description}"`,
          ].join(",");
        }
      }),
    ].join("\n");

    const BOM = "\uFEFF";
    const csvWithBOM = BOM + csvContent;
    const blob = new Blob([csvWithBOM], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `past-decisions-${activeTab}-${format(
      new Date(),
      "yyyy-MM-dd"
    )}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Past Decision</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchDecisions}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={exportData}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

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

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="trading">Decision Past Trades</TabsTrigger>
          <TabsTrigger value="events">Decision Past Events</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-4">
          <DecisionTable
            decisions={decisions}
            loading={loading}
            activeTab={activeTab}
            getDecisionIcon={getDecisionIcon}
            getDecisionTypeLabel={getDecisionTypeLabel}
            getDecisionDetails={getDecisionDetails}
            getDecisionDate={getDecisionDate}
          />
        </TabsContent>

        <TabsContent value="trading" className="space-y-4">
          <DecisionTable
            decisions={decisions}
            loading={loading}
            activeTab={activeTab}
            getDecisionIcon={getDecisionIcon}
            getDecisionTypeLabel={getDecisionTypeLabel}
            getDecisionDetails={getDecisionDetails}
            getDecisionDate={getDecisionDate}
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

/*
 * @param {Object} props - Component props
 * @param {Array} props.decisions - Array of decision objects
 * @param {boolean} props.loading - Loading state
 * @param {string} props.activeTab - Active tab identifier
 * @param {Function} props.getDecisionIcon - Function to get decision icon
 * @param {Function} props.getDecisionTypeLabel - Function to get decision type label
 * @param {Function} props.getDecisionDetails - Function to get decision details
 * @param {Function} props.getDecisionDate - Function to get decision date
 */
function DecisionTable({
  decisions,
  loading,
  activeTab,
  getDecisionIcon,
  getDecisionTypeLabel,
  getDecisionDetails,
  getDecisionDate,
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

  if (decisions.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No decisions found</p>
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
            {activeTab === "events" && (
              <>
                <TableHead>First Condition</TableHead>
                <TableHead>First Threshold</TableHead>
                <TableHead>Second Threshold</TableHead>
              </>
            )}
            {activeTab === "trading" && (
              <>
                <TableHead>Side</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
              </>
            )}
            <TableHead>Date</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {decisions.map((decision) => {
            const details = getDecisionDetails(decision);
            return (
              <TableRow key={decision.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getDecisionIcon(decision.type)}
                    <Badge variant="outline">
                      {getDecisionTypeLabel(decision.type)}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{decision.symbol}</Badge>
                </TableCell>
                {activeTab === "events" && (
                  <>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {details.firstCondition?.replace("_", " ") || "N/A"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-blue-600">
                        {details.firstConditionCount || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-green-600">
                        {details.priceConditionCount || "N/A"}
                      </span>
                    </TableCell>
                  </>
                )}
                {activeTab === "trading" && (
                  <>
                    <TableCell>
                      <Badge
                        variant={
                          details.side === "buy" ? "default" : "destructive"
                        }
                        className={
                          details.side === "buy"
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-red-500 hover:bg-red-600"
                        }
                      >
                        {details.side?.toUpperCase() || "N/A"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        {details.quantity?.toLocaleString() || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-green-600">
                        ${details.triggerPrice?.toFixed(2) || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          details.status === "filled"
                            ? "default"
                            : details.status === "pending"
                            ? "secondary"
                            : details.status === "cancelled"
                            ? "destructive"
                            : "outline"
                        }
                        className={
                          details.status === "filled"
                            ? "bg-green-500 hover:bg-green-600"
                            : details.status === "pending"
                            ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                            : details.status === "cancelled"
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-gray-500 hover:bg-gray-600 text-white"
                        }
                      >
                        {details.status?.toUpperCase() || "N/A"}
                      </Badge>
                    </TableCell>
                  </>
                )}
                <TableCell>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {format(getDecisionDate(decision), "MMM dd, yyyy")}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {format(getDecisionDate(decision), "HH:mm:ss")}
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-sm">{details.description}</p>
                  {activeTab === "trading" && details.orderId && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Order ID: {details.orderId}
                    </p>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}
