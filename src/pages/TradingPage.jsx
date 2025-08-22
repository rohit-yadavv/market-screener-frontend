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
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Clock,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

export default function TradingPage() {
  const [activeTab, setActiveTab] = useState("history");
  const [tradingHistory, setTradingHistory] = useState([]);
  const [openPositions, setOpenPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchTradingData();
  }, []);

  const fetchTradingData = async () => {
    try {
      setLoading(true);
      const [historyRes, positionsRes] = await Promise.all([
        axios.get(`${BASE_URL}/trading/history`, {
          withCredentials: true,
        }),
        axios.get(`${BASE_URL}/trading/positions`, {
          withCredentials: true,
        }),
      ]);

      if (historyRes.data.success) {
        setTradingHistory(historyRes.data.data || []);
      }

      if (positionsRes.data.success) {
        setOpenPositions(positionsRes.data.data || []);
      }
    } catch (error) {
      toast.error("Failed to fetch trading data");
      console.error("Error fetching trading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchTradingData();
    setRefreshing(false);
    toast.success("Trading data refreshed");
  };

  const getTradeIcon = (side) => {
    return side === "buy" ? (
      <TrendingUp className="w-4 h-4 text-green-600" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-600" />
    );
  };

  const getTradeSideLabel = (side) => {
    return side === "buy" ? "Buy" : "Sell";
  };

  const getTradeSideBadge = (side) => {
    return (
      <Badge variant={side === "buy" ? "default" : "destructive"}>
        {getTradeSideLabel(side)}
      </Badge>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatQuantity = (quantity) => {
    return new Intl.NumberFormat("en-US").format(quantity);
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Trading Dashboard</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={refreshing}
        >
          <RefreshCw
            className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="history">Trading History</TabsTrigger>
          <TabsTrigger value="positions">Open Positions</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Trading History
              </CardTitle>
              <CardDescription>
                Recent trading activity and executed orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
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
              ) : tradingHistory.length === 0 ? (
                <div className="text-center py-8">
                  <TrendingUp className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    No trading history found
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Your trading activity will appear here
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Symbol</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tradingHistory.map((trade, index) => (
                        <TableRow key={index} className="hover:bg-muted/50">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getTradeIcon(trade.side)}
                              {getTradeSideBadge(trade.side)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="font-mono">
                              {trade.symbol}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono">
                            {formatQuantity(trade.quantity)}
                          </TableCell>
                          <TableCell className="font-mono">
                            {formatCurrency(trade.triggerPrice)}
                          </TableCell>
                          <TableCell className="font-mono">
                            {formatCurrency(
                              trade.quantity * trade.triggerPrice
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              {format(
                                new Date(trade.createdAt),
                                "MMM dd, yyyy"
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {format(new Date(trade.createdAt), "HH:mm:ss")}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="positions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Open Positions
              </CardTitle>
              <CardDescription>
                Current open positions and their performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                  ))}
                </div>
              ) : openPositions.length === 0 ? (
                <div className="text-center py-8">
                  <DollarSign className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No open positions</p>
                  <p className="text-sm text-muted-foreground">
                    Your open positions will appear here
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Symbol</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Buy Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {openPositions.map((position, index) => {
                        const pnl =
                          (position.currentPrice - position.avgPrice) *
                          position.quantity;
                        const pnlPercent =
                          ((position.currentPrice - position.avgPrice) /
                            position.avgPrice) *
                          100;

                        return (
                          <TableRow key={index} className="hover:bg-muted/50">
                            <TableCell>
                              <Badge variant="secondary" className="font-mono">
                                {position.symbol}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-mono">
                              {formatQuantity(position.quantity)}
                            </TableCell>
                            <TableCell className="font-mono">
                              {formatCurrency(position.avgPrice)}
                            </TableCell>
                            <TableCell className="font-mono">
                              {formatCurrency(position.currentPrice)}
                            </TableCell>
                            <TableCell
                              className={`font-mono ${
                                pnl >= 0 ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {pnl >= 0 ? "+" : ""}
                              {formatCurrency(pnl)}
                            </TableCell>
                            <TableCell
                              className={`font-mono ${
                                pnlPercent >= 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {pnlPercent >= 0 ? "+" : ""}
                              {pnlPercent.toFixed(2)}%
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
