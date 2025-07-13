"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/api";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function MacdPastEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPastEvents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/macd/history`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setEvents(res.data.events || []);
      }
    } catch (err) {
      console.error("Failed to fetch past events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPastEvents();
  }, []);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        MACD Past Events
      </h2>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4 space-y-4">
                <Skeleton className="h-6 w-1/3" />
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-24 rounded-full" />
                </div>
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : events.length === 0 ? (
        <p className="text-gray-500">No past events found yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((e, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold tracking-wide">
                  {e.symbol}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-2 text-sm">
                <Badge
                  variant={e.type === "bullish" ? "success" : "destructive"}
                  className="flex items-center gap-1 text-sm"
                >
                  {e.type === "bullish" ? (
                    <>
                      <ArrowUpRight className="w-4 h-4" /> Bullish
                    </>
                  ) : (
                    <>
                      <ArrowDownRight className="w-4 h-4" /> Bearish
                    </>
                  )}
                </Badge>

                <Badge variant="outline" className="capitalize">
                  {e.side}
                </Badge>

                <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-300">
                  Streak: {e.streakCount}
                </Badge>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground mt-2">
                  {new Date(e.createdAt).toLocaleString()}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
