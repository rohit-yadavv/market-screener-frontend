"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { BASE_URL } from "../utils/api";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { DatePicker } from "./ui/date-picker";
import { Input } from "@/components/ui/input";
import {
  ArrowDown,
  ArrowUp,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

function TradeCard({ trade }) {
  if (!trade) return null;

  const isBuy = trade.side === "buy";
  const statusIcon =
    trade.status === "error" ? (
      <AlertCircle className="w-3 h-3" />
    ) : trade.status === "filled" || trade.status === "accepted" ? (
      <CheckCircle2 className="w-3 h-3" />
    ) : (
      <HelpCircle className="w-3 h-3" />
    );

  const statusColor =
    trade.status === "error"
      ? "text-red-700 border-red-300 bg-red-50"
      : trade.status === "filled" || trade.status === "accepted"
      ? "text-green-700 border-green-300 bg-green-50"
      : "text-yellow-700 border-yellow-300 bg-yellow-50";

  return (
    <Card className="p-2 gap-0">
      <CardHeader className="py-2 flex justify-between items-center">
        <CardTitle>{trade.symbol}</CardTitle>
        <CardDescription>
          {format(new Date(trade.timestamp), "yyyy-MM-dd HH:mm")}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-start gap-2 pb-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            className={`flex items-center gap-1 capitalize text-[11px] font-medium px-2.5 py-0.5 rounded-sm min-w-fit ${
              isBuy
                ? "text-green-700 border-green-300 bg-green-50"
                : "text-red-700 border-red-300 bg-red-50"
            }`}
          >
            {isBuy ? (
              <ArrowUp className="w-3 h-3" />
            ) : (
              <ArrowDown className="w-3 h-3" />
            )}
            {trade.side}
          </Badge>
          <Badge
            className={`flex items-center gap-1 capitalize text-[11px] font-medium px-2.5 py-0.5 rounded-sm min-w-fit ${statusColor}`}
          >
            {statusIcon}
            {trade.status}
          </Badge>
          <Badge className="bg-blue-100 text-blue-800 text-[11px] font-medium px-2.5 py-0.5 border border-blue-300 rounded-sm min-w-fit">
            Qty: {trade.quantity}
          </Badge>
          <Badge className="bg-gray-100 text-gray-800 text-[11px] font-medium px-2.5 py-0.5 border border-gray-300 rounded-sm min-w-fit">
            @ ${trade.triggerPrice.toFixed(2)}
          </Badge>
        </div>
        <div className="text-xs text-muted-foreground w-full">
          Trigger:{" "}
          <span className="font-semibold">
            {trade.triggerEvent.replace("_", " ")}
          </span>
          {trade.orderId && ` | Order ID: ${trade.orderId}`}
        </div>
        {trade.errorMessage && (
          <div className="text-xs text-red-600 w-full">
            Error: {trade.errorMessage}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
export default function TradeHistory() {
  const [tradeEvents, setTradeEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState(undefined);
  const [symbol, setSymbol] = useState("");

  const fetchTradeEvents = async () => {
    setLoading(true);

    const params = {};
    if (dateRange?.from && dateRange?.to) {
      params.startDate = format(dateRange.from, "yyyy-MM-dd");
      params.endDate = format(dateRange.to, "yyyy-MM-dd");
    }
    if (symbol) {
      params.symbol = symbol.trim().toUpperCase();
    }

    try {
      const res = await axios.get(`${BASE_URL}/trades`, {
        withCredentials: true,
        params,
      });
      setTradeEvents(res.data);
    } catch (err) {
      console.error("Failed to fetch trade events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTradeEvents();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-3">
              <CardContent className="space-y-2">
                <Skeleton className="h-5 w-1/3" />
                <div className="flex gap-2">
                  <Skeleton className="h-4 w-16 rounded-full" />
                  <Skeleton className="h-4 w-20 rounded-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (!tradeEvents.length) {
      return (
        <p className="text-gray-500">
          No trade events found for the selected criteria.
        </p>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tradeEvents.map((trade) => (
          <TradeCard trade={trade} key={trade._id} />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold">Trade History</h2>
        <div className="flex flex-wrap gap-3 items-center">
          <Input
            placeholder="Filter Symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="max-w-[180px] uppercase"
          />
          <DatePicker mode="range" value={dateRange} onChange={setDateRange} />
          <Button onClick={fetchTradeEvents} disabled={loading}>
            Apply Filter
          </Button>
        </div>
      </div>
      {renderContent()}
    </div>
  );
}
