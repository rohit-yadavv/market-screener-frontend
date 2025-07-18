"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Flame, Clock } from "lucide-react";

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
        const sortedEvents = (res.data.events || []).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setEvents(sortedEvents);
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
      <h2 className="text-2xl font-bold mb-4">MACD Past Events</h2>

      {loading ? (
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
      ) : events.length === 0 ? (
        <p className="text-gray-500">No past events found yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((e, i) => (
            <Card key={i} className="p-2 gap-0">
              <CardHeader className="py-2 flex justify-between items-center">
                <CardTitle>{e.symbol}</CardTitle>
                <CardDescription>
                  {new Date(e.createdAt).toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-2 p-2">
                <Badge
                  variant="outline"
                  className={`flex items-center gap-1 capitalize text-[11px] font-medium px-2.5 py-0.5 rounded-sm min-w-fit ${
                    e.cycle === "positive"
                      ? "text-green-700 border-green-300 bg-green-50"
                      : "text-red-700 border-red-300 bg-red-50"
                  }`}
                >
                  <Flame className="w-3 h-3" />
                  {e.cycle} cycle
                </Badge>

                <Badge className="flex items-center gap-1 bg-yellow-100 text-yellow-800 text-[11px] font-medium px-2.5 py-0.5 border border-yellow-300 rounded-sm min-w-fit">
                  <Clock className="w-3 h-3" />
                  Streak: {e.streak}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
