"use client";

import { useEffect, useState, useCallback } from "react";
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import {
  ArrowDown,
  ArrowUp,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  RefreshCw,
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
  const [data, setData] = useState({ trades: [], totalPages: 1 });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [inputSymbol, setInputSymbol] = useState("");
  const [inputDateRange, setInputDateRange] = useState(undefined);

  const [appliedFilters, setAppliedFilters] = useState({
    symbol: "",
    dateRange: undefined,
  });

  const PAGE_LIMIT = 20;

  const fetchTradeEvents = useCallback(async (page, filters) => {
    setLoading(true);
    const params = {
      page,
      limit: PAGE_LIMIT,
    };

    if (filters.dateRange?.from && filters.dateRange?.to) {
      params.startDate = format(filters.dateRange.from, "yyyy-MM-dd");
      params.endDate = format(filters.dateRange.to, "yyyy-MM-dd");
    }
    if (filters.symbol) {
      params.symbol = filters.symbol.trim().toUpperCase();
    }

    try {
      const res = await axios.get(`${BASE_URL}/trades`, {
        withCredentials: true,
        params,
      });
      setData(res.data);
    } catch (err) {
      console.error("Failed to fetch trade events:", err);
      setData({ trades: [], totalPages: 1 });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTradeEvents(currentPage, appliedFilters);
  }, [currentPage, appliedFilters, fetchTradeEvents]);

  const handleFilterApply = () => {
    setAppliedFilters({
      symbol: inputSymbol,
      dateRange: inputDateRange,
    });
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= data.totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 15 }).map((_, i) => (
            <Card key={i} className="p-3">
              <CardContent className="space-y-2">
                <Skeleton className="h-6 w-1/3" />
                <div className="flex gap-2">
                  <Skeleton className="h-4 w-16 rounded-full" />
                  <Skeleton className="h-4 w-20 rounded-full" />
                </div>
                <Skeleton className="h-4 w-full rounded-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (!data.trades.length) {
      return (
        <p className="text-gray-500 text-center py-10">
          No trade events found for the selected criteria.
        </p>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.trades.map((trade) => (
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
          <Button
            variant="outline"
            onClick={() => fetchTradeEvents(currentPage, appliedFilters)}
            disabled={loading}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <div className="w-px h-7 bg-border sm:mx-3" />
          <Input
            placeholder="Filter Symbol"
            value={inputSymbol}
            onChange={(e) => setInputSymbol(e.target.value)}
            className="max-w-[180px] uppercase"
          />
          <DatePicker
            mode="range"
            value={inputDateRange}
            onChange={setInputDateRange}
          />
          <Button onClick={handleFilterApply} disabled={loading}>
            Apply Filter
          </Button>
        </div>
      </div>

      {renderContent()}

      {data.totalPages > 1 && (
        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }}
                  disabled={currentPage === 1 || loading}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  {currentPage}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <span className="px-2 text-sm">of</span>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">{data.totalPages}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }}
                  disabled={currentPage === data.totalPages || loading}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
