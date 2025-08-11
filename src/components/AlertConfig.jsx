/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Minus, Plus, BarChart3, LineChart, Bell, Repeat } from "lucide-react";

export default function AlertConfig() {
  const [allSymbols, setAllSymbols] = useState([]);
  const [subscribedSymbols, setSubscribedSymbols] = useState([]);
  const [localSelected, setLocalSelected] = useState([]);

  const [symbolsLoading, setSymbolsLoading] = useState(true);
  const [subscribedLoading, setSubscribedLoading] = useState(true);

  const [threshold, setThreshold] = useState(-1);
  const [inputThreshold, setInputThreshold] = useState(-1);
  const [loadingThreshold, setLoadingThreshold] = useState(true);

  const [priceThreshold, setPriceThreshold] = useState(-1);
  const [inputPriceThreshold, setInputPriceThreshold] = useState(-1);
  const [loadingPriceThreshold, setLoadingPriceThreshold] = useState(true);

  const [trendContinuationThreshold, setTrendContinuationThreshold] =
    useState(-1);
  const [inputTrendContinuationThreshold, setInputTrendContinuationThreshold] =
    useState(-1);
  const [
    loadingTrendContinuationThreshold,
    setLoadingTrendContinuationThreshold,
  ] = useState(true);

  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [symbolRes, subRes, macdRes, priceRes, trendRes] =
          await Promise.all([
            axios.get(`${BASE_URL}/user/symbols/all`, {
              withCredentials: true,
            }),
            axios.get(`${BASE_URL}/user/symbols/subscribe/macd`, {
              withCredentials: true,
            }),
            axios.get(`${BASE_URL}/macd/threshold`, { withCredentials: true }),
            axios.get(`${BASE_URL}/price/threshold`, { withCredentials: true }),
            axios.get(`${BASE_URL}/trend-continuation/threshold`, {
              withCredentials: true,
            }),
          ]);

        if (symbolRes.data.success) {
          setAllSymbols(symbolRes.data.allSymbols || []);
        }

        if (subRes.data.success) {
          setSubscribedSymbols(subRes.data.subscribedSymbolsForMACD);
          setLocalSelected(subRes.data.subscribedSymbolsForMACD);
        }

        if (macdRes.data?.macdThreshold != null) {
          setThreshold(macdRes.data.macdThreshold);
          setInputThreshold(macdRes.data.macdThreshold);
        }

        if (priceRes.data?.priceInstanceThreshold != null) {
          setPriceThreshold(priceRes.data.priceInstanceThreshold);
          setInputPriceThreshold(priceRes.data.priceInstanceThreshold);
        }

        if (trendRes.data?.trendContinuationThreshold != null) {
          setTrendContinuationThreshold(
            trendRes.data.trendContinuationThreshold
          );
          setInputTrendContinuationThreshold(
            trendRes.data.trendContinuationThreshold
          );
        }
      } catch (err) {
        toast.error("Failed to load alert configs");
      } finally {
        setSymbolsLoading(false);
        setSubscribedLoading(false);
        setLoadingThreshold(false);
        setLoadingPriceThreshold(false);
        setLoadingTrendContinuationThreshold(false);
      }
    };

    fetchAll();
  }, []);

  const toggleSelect = (symbol) => {
    setLocalSelected((prev) =>
      prev.includes(symbol)
        ? prev.filter((s) => s !== symbol)
        : [...prev, symbol]
    );
  };

  const saveThreshold = async () => {
    const value = Number(inputThreshold);
    if (isNaN(value) || value < 1 || value > 10) {
      toast.error("Threshold must be a number between 1 and 10");
      return;
    }

    setLoadingThreshold(true);
    try {
      await axios.post(
        `${BASE_URL}/macd/threshold`,
        { threshold: value },
        { withCredentials: true }
      );
      setThreshold(value);
      toast.success("MACD threshold updated!");
    } catch {
      toast.error("Failed to update threshold");
    } finally {
      setLoadingThreshold(false);
    }
  };

  const savePriceThreshold = async () => {
    const value = Number(inputPriceThreshold);
    if (isNaN(value) || value < 1 || value > 10) {
      toast.error("Price threshold must be a number between 1 and 10");
      return;
    }

    setLoadingPriceThreshold(true);
    try {
      await axios.post(
        `${BASE_URL}/price/threshold`,
        { threshold: value },
        { withCredentials: true }
      );
      setPriceThreshold(value);
      toast.success("Price candle threshold updated!");
    } catch {
      toast.error("Failed to update price threshold");
    } finally {
      setLoadingPriceThreshold(false);
    }
  };

  const saveTrendContinuationThreshold = async () => {
    const value = Number(inputTrendContinuationThreshold);
    if (isNaN(value) || value < 1 || value > 10) {
      toast.error("Threshold must be a number between 1 and 10");
      return;
    }

    setLoadingTrendContinuationThreshold(true);
    try {
      await axios.post(
        `${BASE_URL}/trend-continuation/threshold`,
        { threshold: value },
        { withCredentials: true }
      );
      setTrendContinuationThreshold(value);
      toast.success("Trend Continuation threshold updated!");
    } catch {
      toast.error("Failed to update trend continuation threshold");
    } finally {
      setLoadingTrendContinuationThreshold(false);
    }
  };

  const handleSave = async () => {
    if (localSelected.length === 0) {
      toast.error("Select at least one symbol.");
      return;
    }

    setSaving(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/user/symbols/subscribe/macd`,
        { symbols: localSelected },
        { withCredentials: true }
      );
      if (res.data.success) {
        setSubscribedSymbols(localSelected);
        toast.success("Subscription updated!");
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error("Could not save symbols.");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!confirm("Unsubscribe from all stocks?")) return;

    setSaving(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/user/symbols/subscribe/macd`,
        { symbols: [] },
        { withCredentials: true }
      );
      if (res.data.success) {
        setSubscribedSymbols([]);
        setLocalSelected([]);
        toast.success("All subscriptions removed.");
      }
    } catch {
      toast.error("Could not reset subscriptions.");
    } finally {
      setSaving(false);
    }
  };

  const filtered = allSymbols.filter((s) =>
    s.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold  mb-6">Alert Config</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* 1. Status Overview */}
        <Card className="col-span-1 lg:col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Overview
            </CardTitle>
            <CardDescription>
              Your current alert settings and tracked stocks.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-2">
            {loadingThreshold ? (
              <Skeleton className="h-6 w-48 rounded-md" />
            ) : (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground font-medium">
                  MACD Cycles Threshold:
                </span>
                <Badge>{threshold}</Badge>
              </div>
            )}
            {loadingPriceThreshold ? (
              <Skeleton className="h-6 w-48 rounded-md" />
            ) : (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground font-medium">
                  Price Instance Threshold:
                </span>
                <Badge>{priceThreshold}</Badge>
              </div>
            )}

            {loadingTrendContinuationThreshold ? (
              <Skeleton className="h-6 w-48 rounded-md" />
            ) : (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground font-medium">
                  Trend Continuation Threshold:
                </span>
                <Badge>{trendContinuationThreshold}</Badge>
              </div>
            )}

            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">
                Tracked Stocks{" "}
                {subscribedLoading ? null : `(${subscribedSymbols.length})`}
              </p>

              {subscribedLoading ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : subscribedSymbols.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {subscribedSymbols.map((sym) => (
                    <Badge
                      key={sym}
                      variant="secondary"
                      className="text-xs "
                    >
                      {sym}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm italic text-muted-foreground">
                  No stocks are being tracked.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 2. Subscribe to Stocks */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="w-5 h-5" />
              Subscribe to Stocks
            </CardTitle>
            <CardDescription>
              Select stock symbols to track MACD crossovers.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Search</Label>
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search stock symbol..."
                className="mt-1"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {symbolsLoading ? (
                <>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <Skeleton key={i} className="h-8 w-20 rounded-md" />
                  ))}
                </>
              ) : filtered.length > 0 ? (
                filtered.map((symbol) => {
                  const isActive = localSelected.includes(symbol);
                  return (
                    <Button
                      key={symbol}
                      variant={isActive ? "secondary" : "outline"}
                      className="w-24 text-xs font-semibold"
                      onClick={() => toggleSelect(symbol)}
                    >
                      {symbol}
                    </Button>
                  );
                })
              ) : (
                <p className="text-sm text-muted-foreground">
                  No symbols found, Go to Settings to Add.
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex gap-4">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save & Track"}
            </Button>
            <Button
              variant="destructive"
              onClick={handleReset}
              disabled={saving}
            >
              Reset
            </Button>
          </CardFooter>
        </Card>

        {/* 3. MACD Threshold Update Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              MACD Cycles Alert
            </CardTitle>
            <CardDescription>
              Set the number of MACD cycles needed to trigger an alert.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col items-center gap-6">
              <div className="text-sm text-muted-foreground">
                Current Cycles:{" "}
                {loadingThreshold ? (
                  <Skeleton className="w-12 h-5 inline-block ml-2" />
                ) : (
                  <span className="font-semibold text-foreground">
                    {threshold}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setInputThreshold(Math.max(1, inputThreshold - 1))
                  }
                >
                  <Minus className="w-4 h-4" />
                </Button>

                <Input
                  type="number"
                  min={1}
                  max={10}
                  value={inputThreshold}
                  onChange={(e) => setInputThreshold(Number(e.target.value))}
                  className="w-20 text-center text-lg font-bold"
                />

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setInputThreshold(Math.min(10, inputThreshold + 1))
                  }
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center">
            <Button
              onClick={saveThreshold}
              disabled={loadingThreshold || inputThreshold === threshold}
              className="w-full"
            >
              {loadingThreshold ? "Saving..." : "Save Cycles"}
            </Button>
          </CardFooter>
        </Card>

        {/* 4. Price Candle Threshold Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Price Candle Alert
            </CardTitle>
            <CardDescription>
              Number of consecutive candles in a trend (up or down) to trigger
              an alert.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col items-center gap-6">
              <div className="text-sm text-muted-foreground">
                Current Candle Count:{" "}
                {loadingPriceThreshold ? (
                  <Skeleton className="w-12 h-5 inline-block ml-2" />
                ) : (
                  <span className="font-semibold text-foreground">
                    {priceThreshold}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setInputPriceThreshold(Math.max(1, inputPriceThreshold - 1))
                  }
                >
                  <Minus className="w-4 h-4" />
                </Button>

                <Input
                  type="number"
                  min={1}
                  max={10}
                  value={inputPriceThreshold}
                  onChange={(e) =>
                    setInputPriceThreshold(Number(e.target.value))
                  }
                  className="w-20 text-center text-lg font-bold"
                />

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setInputPriceThreshold(
                      Math.min(10, inputPriceThreshold + 1)
                    )
                  }
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center">
            <Button
              onClick={savePriceThreshold}
              disabled={
                loadingPriceThreshold || inputPriceThreshold === priceThreshold
              }
              className="w-full"
            >
              {loadingPriceThreshold ? "Saving..." : "Save Price Threshold"}
            </Button>
          </CardFooter>
        </Card>

        {/* ***  Trend Continuation Threshold Card *** */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Repeat className="w-5 h-5" />
              Trend Continuation
            </CardTitle>
            <CardDescription>
              Sequence count for the Trend Continuation (N-P-N, P-N-P).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-6">
              <div className="text-sm text-muted-foreground">
                Current Sequence Count:{" "}
                {loadingTrendContinuationThreshold ? (
                  <Skeleton className="w-12 h-5 inline-block ml-2" />
                ) : (
                  <span className="font-semibold text-foreground">
                    {trendContinuationThreshold}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setInputTrendContinuationThreshold(
                      Math.max(1, inputTrendContinuationThreshold - 1)
                    )
                  }
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <Input
                  type="number"
                  min={1}
                  max={10}
                  value={inputTrendContinuationThreshold}
                  onChange={(e) =>
                    setInputTrendContinuationThreshold(Number(e.target.value))
                  }
                  className="w-20 text-center text-lg font-bold"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setInputTrendContinuationThreshold(
                      Math.min(10, inputTrendContinuationThreshold + 1)
                    )
                  }
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              onClick={saveTrendContinuationThreshold}
              disabled={
                loadingTrendContinuationThreshold ||
                inputTrendContinuationThreshold === trendContinuationThreshold
              }
              className="w-full"
            >
              {loadingTrendContinuationThreshold
                ? "Saving..."
                : "Save Sequence Count"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
