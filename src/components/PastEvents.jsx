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
import { Flame, Clock, TrendingUp, TrendingDown, Repeat } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DatePicker } from "./ui/date-picker";
import { Input } from "@/components/ui/input";

function formatDate(date) {
  return format(date, "yyyy-MM-dd");
}

export function AlertCard({ event, type }) {
  if (!event) return null;

  return (
    <Card className="p-2 gap-0">
      <CardHeader className="py-2 flex justify-between items-center">
        <CardTitle>{event.symbol}</CardTitle>
        <CardDescription>
          {event.datetime
            ? format(new Date(event.datetime), "yyyy-MM-dd HH:mm")
            : "Invalid date"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap items-center gap-2 pb-2">
        {type === "macd_cycle" && (
          <>
            <Badge
              variant="outline"
              className={`flex items-center gap-1 capitalize text-[11px] font-medium px-2.5 py-0.5 rounded-sm min-w-fit ${
                event.cycle === "positive"
                  ? "text-green-700 border-green-300 bg-green-50"
                  : "text-red-700 border-red-300 bg-red-50"
              }`}
            >
              <Flame className="w-3 h-3" />
              {event.cycle} cycle
            </Badge>
            <Badge className="flex items-center gap-1 bg-yellow-100 text-yellow-800 text-[11px] font-medium px-2.5 py-0.5 border border-yellow-300 rounded-sm min-w-fit">
              <Clock className="w-3 h-3" />
              Count: {event.count}
            </Badge>
          </>
        )}
        {type === "price_action" && (
          <>
            <Badge
              variant="outline"
              className={`flex items-center gap-1 capitalize text-[11px] font-medium px-2.5 py-0.5 rounded-sm min-w-fit ${
                event.cycle === "positive"
                  ? "text-green-700 border-green-300 bg-green-50"
                  : "text-red-700 border-red-300 bg-red-50"
              }`}
            >
              Price Action: {event.cycle}
            </Badge>
            <Badge className="flex items-center gap-1 bg-blue-100 text-blue-800 text-[11px] font-medium px-2.5 py-0.5 border border-blue-300 rounded-sm min-w-fit">
              Instances: {event.count}
            </Badge>
          </>
        )}
        {type === "high_low" && (
          <>
            <Badge
              variant="outline"
              className={`flex items-center gap-1 capitalize text-[11px] font-medium px-2.5 py-0.5 rounded-sm min-w-fit ${
                event.valueType === "high"
                  ? "text-green-700 border-green-300 bg-green-50"
                  : "text-red-700 border-red-300 bg-red-50"
              }`}
            >
              {event.valueType === "high" ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              New {event.valueType === "high" ? "Highest High" : "Lowest Low"}
            </Badge>
            <Badge className="flex items-center gap-1 bg-gray-100 text-gray-800 text-[11px] font-medium px-2.5 py-0.5 border border-gray-300 rounded-sm min-w-fit">
              @ {event.value.toFixed(2)}
            </Badge>
          </>
        )}
        {type === "trend_continuation" && (
          <>
            <Badge
              variant="outline"
              className={`flex items-center gap-1 capitalize text-[11px] font-medium px-2.5 py-0.5 rounded-sm min-w-fit ${
                event.cycle === "positive"
                  ? "text-green-700 border-green-300 bg-green-50"
                  : "text-red-700 border-red-300 bg-red-50"
              }`}
            >
              <Repeat className="w-3 h-3" />
              {event.cycle} sequence
            </Badge>
            <Badge className="flex items-center gap-1 bg-purple-100 text-purple-800 text-[11px] font-medium px-2.5 py-0.5 border border-purple-300 rounded-sm min-w-fit">
              <Clock className="w-3 h-3" />
              Count: {event.count}
            </Badge>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default function PastEvents() {
  const [macdEvents, setMacdEvents] = useState([]);
  const [priceEvents, setPriceEvents] = useState([]);
  const [highLowEvents, setHighLowEvents] = useState([]);
  const [trendContinuationEvents, setTrendContinuationEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState(undefined);
  const [symbol, setSymbol] = useState("");

  const fetchEvents = async () => {
    setLoading(true);

    const params = {};
    if (dateRange?.from && dateRange?.to) {
      params.startDate = formatDate(dateRange.from);
      params.endDate = formatDate(dateRange.to);
    }
    if (symbol) {
      params.symbol = symbol.trim().toUpperCase();
    }

    try {
      const [macdRes, priceRes, highLowRes, trendRes] = await Promise.all([
        axios.get(`${BASE_URL}/macd/history`, {
          withCredentials: true,
          params,
        }),
        axios.get(`${BASE_URL}/price/history`, {
          withCredentials: true,
          params,
        }),
        axios.get(`${BASE_URL}/highlow/history`, {
          withCredentials: true,
          params,
        }),
        axios.get(`${BASE_URL}/trend-continuation/history`, {
          withCredentials: true,
          params,
        }),
      ]);

      if (macdRes.data.success) setMacdEvents(macdRes.data.events);
      if (priceRes.data.success) setPriceEvents(priceRes.data.events);
      if (highLowRes.data.success) setHighLowEvents(highLowRes.data.events);
      if (trendRes.data.success)
        setTrendContinuationEvents(trendRes.data.events);
    } catch (err) {
      console.error("Failed to fetch events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const renderEvents = (events, type) => {
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

    if (!events.length) {
      return (
        <p className="text-gray-500">
          No events found for the selected criteria.
        </p>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((e, i) => (
          <AlertCard event={e} type={type} key={i} />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold">Past Events</h2>
        <div className="flex flex-wrap gap-3 items-center">
          <Input
            placeholder="Filter Symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="max-w-[180px] uppercase"
          />
          <DatePicker mode="range" value={dateRange} onChange={setDateRange} />
          <Button onClick={fetchEvents} disabled={loading}>
            Apply Filter
          </Button>
        </div>
      </div>

      <Tabs defaultValue="macd">
        <TabsList className="h-12 my-4 mx-2">
          <TabsTrigger value="macd">MACD Events</TabsTrigger>
          <TabsTrigger value="price">Price Events</TabsTrigger>
          <TabsTrigger value="trend_continuation">
            Trend Continuation
          </TabsTrigger>
          <TabsTrigger value="high_low">High/Low Events</TabsTrigger>
        </TabsList>

        <TabsContent value="macd">
          {renderEvents(macdEvents, "macd_cycle")}
        </TabsContent>
        <TabsContent value="price">
          {renderEvents(priceEvents, "price_action")}
        </TabsContent>
        <TabsContent value="trend_continuation">
          {renderEvents(trendContinuationEvents, "trend_continuation")}
        </TabsContent>
        <TabsContent value="high_low">
          {renderEvents(highLowEvents, "high_low")}
        </TabsContent>
      </Tabs>
    </div>
  );
}
