import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Zap,
  Bell,
  Bot,
  TrendingUp,
  FileText,
  Activity,
  Target,
  DollarSign,
  BarChart3,
  Key,
  Users,
} from "lucide-react";

export default function DatabaseSchema() {
  const redisStructures = [
    {
      key: "user:{userId}:config",
      type: "Hash",
      purpose: "User configuration cache",
      description: "Cached user settings and preferences for fast access",
      fields: [
        {
          field: "alertConfigs",
          type: "JSON",
          description: "Alert configuration data",
        },
        {
          field: "decisionConfigs",
          type: "JSON",
          description: "Decision configuration data",
        },
        {
          field: "lastUpdated",
          type: "String",
          description: "Last update timestamp",
        },
      ],
    },
    {
      key: "symbol:{symbol}:marketData",
      type: "Hash",
      purpose: "Real-time market data",
      description: "Current market data for each symbol",
      fields: [
        { field: "price", type: "String", description: "Current stock price" },
        { field: "change", type: "String", description: "Price change amount" },
        {
          field: "changePercent",
          type: "String",
          description: "Price change percentage",
        },
        { field: "volume", type: "String", description: "Trading volume" },
        {
          field: "lastUpdated",
          type: "String",
          description: "Last update timestamp",
        },
      ],
    },
    {
      key: "symbol:{symbol}:macd",
      type: "List",
      purpose: "MACD indicator data",
      description: "Recent MACD values for trend analysis",
      fields: [
        { field: "value", type: "Number", description: "MACD indicator value" },
        { field: "signal", type: "Number", description: "Signal line value" },
        { field: "histogram", type: "Number", description: "MACD histogram" },
        { field: "timestamp", type: "String", description: "Data timestamp" },
      ],
    },
    {
      key: "symbol:{symbol}:candles",
      type: "List",
      purpose: "Price candle data",
      description: "Recent price candles for pattern analysis",
      fields: [
        { field: "open", type: "Number", description: "Opening price" },
        { field: "high", type: "Number", description: "High price" },
        { field: "low", type: "Number", description: "Low price" },
        { field: "close", type: "Number", description: "Closing price" },
        { field: "volume", type: "Number", description: "Trading volume" },
        { field: "timestamp", type: "String", description: "Candle timestamp" },
      ],
    },
    {
      key: "user:{userId}:positions",
      type: "List",
      purpose: "User trading positions",
      description: "Current open trading positions",
      fields: [
        { field: "symbol", type: "String", description: "Stock symbol" },
        { field: "quantity", type: "Number", description: "Number of shares" },
        {
          field: "avgPrice",
          type: "Number",
          description: "Average purchase price",
        },
        {
          field: "currentPrice",
          type: "Number",
          description: "Current market price",
        },
        {
          field: "unrealizedPnl",
          type: "Number",
          description: "Unrealized profit/loss",
        },
        {
          field: "openedAt",
          type: "String",
          description: "Position opening time",
        },
      ],
    },
    {
      key: "user:{userId}:decisionState",
      type: "Hash",
      purpose: "Decision engine state",
      description: "Current state of decision engine for each user",
      fields: [
        {
          field: "symbol",
          type: "String",
          description: "Stock symbol being monitored",
        },
        {
          field: "firstConditionCount",
          type: "Number",
          description: "First condition counter",
        },
        {
          field: "firstConditionMet",
          type: "Boolean",
          description: "First condition status",
        },
        {
          field: "secondConditionCount",
          type: "Number",
          description: "Second condition counter",
        },
        {
          field: "lastUpdated",
          type: "String",
          description: "Last state update",
        },
      ],
    },
    {
      key: "alerts:pending",
      type: "List",
      purpose: "Pending alerts queue",
      description: "Alerts waiting to be sent to users",
      fields: [
        { field: "userId", type: "String", description: "Target user ID" },
        { field: "type", type: "String", description: "Alert type" },
        { field: "symbol", type: "String", description: "Stock symbol" },
        { field: "message", type: "String", description: "Alert message" },
        { field: "priority", type: "String", description: "Alert priority" },
        {
          field: "createdAt",
          type: "String",
          description: "Alert creation time",
        },
      ],
    },
    {
      key: "sessions:{sessionId}",
      type: "Hash",
      purpose: "User session data",
      description: "Active user sessions and authentication data",
      fields: [
        { field: "userId", type: "String", description: "User ID" },
        { field: "email", type: "String", description: "User email" },
        {
          field: "createdAt",
          type: "String",
          description: "Session creation time",
        },
        {
          field: "lastActivity",
          type: "String",
          description: "Last activity timestamp",
        },
        {
          field: "expiresAt",
          type: "String",
          description: "Session expiration time",
        },
      ],
    },
  ];

  const renderRedisTable = (structures) => (
    <div className="mb-12">
      <Card className="border-border">
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/6">Key Pattern</TableHead>
                <TableHead className="w-1/6">Type</TableHead>
                <TableHead className="w-1/6">Purpose</TableHead>
                <TableHead className="w-1/2">Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {structures.map((structure, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono text-sm font-medium text-foreground">
                    {structure.key}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {structure.type}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {structure.purpose}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {structure.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-muted/50">
        <div className="w-full mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Database Schema
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              MongoDB Collections & Redis Data Structures
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full mx-auto px-6 py-12">
        {/* Redis Structures */}
        <div id="redis-structures" className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <Zap className="h-5 w-5 text-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              Redis Data Structures
            </h2>
          </div>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
            High-performance in-memory data structures for real-time caching,
            sessions, and temporary state management.
          </p>
          {renderRedisTable(redisStructures)}
        </div>

        {/* Detailed Model Documentation */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <FileText className="h-5 w-5 text-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              Detailed Model Schemas
            </h2>
          </div>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
            Complete MongoDB model schemas with field types, validation rules,
            and relationships.
          </p>

          {/* User Model */}
          <div id="user-model" className="mb-12">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-5 w-5 text-foreground" />
                  <h3 className="text-xl font-semibold text-foreground">
                    User Model
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  User authentication, profile data, and notification
                  preferences
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Schema Fields
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">_id</span>
                        <span className="text-muted-foreground">
                          ObjectId (auto-generated)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">email</span>
                        <span className="text-muted-foreground">
                          String (required, unique, indexed)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          alertEmail
                        </span>
                        <span className="text-muted-foreground">
                          String (optional)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          password
                        </span>
                        <span className="text-muted-foreground">
                          String (hashed)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          allSymbols
                        </span>
                        <span className="text-muted-foreground">
                          [String] (default: [])
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          subscribedSymbolsForMACD
                        </span>
                        <span className="text-muted-foreground">
                          [String] (default: [])
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          pushSubscription
                        </span>
                        <span className="text-muted-foreground">
                          Object (optional)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          createdAt
                        </span>
                        <span className="text-muted-foreground">
                          Date (auto-generated)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          updatedAt
                        </span>
                        <span className="text-muted-foreground">
                          Date (auto-generated)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Push Subscription Structure
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          endpoint
                        </span>
                        <span className="text-muted-foreground">String</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          keys.p256dh
                        </span>
                        <span className="text-muted-foreground">String</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          keys.auth
                        </span>
                        <span className="text-muted-foreground">String</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AlertConfig Model */}
          <div id="alert-config-model" className="mb-12">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Bell className="h-5 w-5 text-foreground" />
                  <h3 className="text-xl font-semibold text-foreground">
                    AlertConfig Model
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  User-specific alert configurations and thresholds
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Schema Fields
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">_id</span>
                        <span className="text-muted-foreground">
                          ObjectId (auto-generated)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          userId
                        </span>
                        <span className="text-muted-foreground">
                          ObjectId (ref: User, required, indexed)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">name</span>
                        <span className="text-muted-foreground">
                          String (required)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          alertType
                        </span>
                        <span className="text-muted-foreground">
                          Enum: ["macd", "trend_continuation", "price_action",
                          "high_low"]
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          threshold
                        </span>
                        <span className="text-muted-foreground">
                          Number (required, min: 1)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          macdThreshold
                        </span>
                        <span className="text-muted-foreground">
                          Number (optional, min: 1)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          symbols
                        </span>
                        <span className="text-muted-foreground">
                          [String] (required, default: [])
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          isActive
                        </span>
                        <span className="text-muted-foreground">
                          Boolean (default: true)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Indexes
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Key className="h-4 w-4 text-muted-foreground" />
                        <span className="font-mono text-foreground">
                          userId: 1, alertType: 1, isActive: 1
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Key className="h-4 w-4 text-muted-foreground" />
                        <span className="font-mono text-foreground">
                          userId: 1, symbols: 1
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* DecisionConfig Model */}
          <div id="decision-config-model" className="mb-12">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Bot className="h-5 w-5 text-foreground" />
                  <h3 className="text-xl font-semibold text-foreground">
                    DecisionConfig Model
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Trading decision parameters and conditions
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Schema Fields
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">_id</span>
                        <span className="text-muted-foreground">
                          ObjectId (auto-generated)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          userId
                        </span>
                        <span className="text-muted-foreground">
                          ObjectId (ref: User, required, indexed)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">name</span>
                        <span className="text-muted-foreground">
                          String (required)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          firstCondition
                        </span>
                        <span className="text-muted-foreground">
                          Enum: ["macd", "trend_continuation"]
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          firstConditionThreshold
                        </span>
                        <span className="text-muted-foreground">
                          Number (required, min: 1)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          priceConditionThreshold
                        </span>
                        <span className="text-muted-foreground">
                          Number (required, min: 1)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          symbols
                        </span>
                        <span className="text-muted-foreground">
                          [String] (required, default: [])
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          isActive
                        </span>
                        <span className="text-muted-foreground">
                          Boolean (default: true)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Indexes
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Key className="h-4 w-4 text-muted-foreground" />
                        <span className="font-mono text-foreground">
                          userId: 1, isActive: 1
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* TradeEvent Model */}
          <div id="trade-event-model" className="mb-12">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="h-5 w-5 text-foreground" />
                  <h3 className="text-xl font-semibold text-foreground">
                    TradeEvent Model
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Trade execution history and status tracking
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Schema Fields
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">_id</span>
                        <span className="text-muted-foreground">
                          ObjectId (auto-generated)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          userId
                        </span>
                        <span className="text-muted-foreground">
                          ObjectId (ref: User, required)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          symbol
                        </span>
                        <span className="text-muted-foreground">
                          String (required, indexed)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">side</span>
                        <span className="text-muted-foreground">
                          Enum: ["buy", "sell"]
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          quantity
                        </span>
                        <span className="text-muted-foreground">
                          Number (required)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          status
                        </span>
                        <span className="text-muted-foreground">
                          String (submitted, filled, error)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          orderId
                        </span>
                        <span className="text-muted-foreground">
                          String (optional, Alpaca order ID)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          triggerEvent
                        </span>
                        <span className="text-muted-foreground">
                          Enum: ["price_action", "ema_touch"]
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          triggerPrice
                        </span>
                        <span className="text-muted-foreground">
                          Number (required)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          errorMessage
                        </span>
                        <span className="text-muted-foreground">
                          String (optional)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          timestamp
                        </span>
                        <span className="text-muted-foreground">
                          Date (default: Date.now)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* MACD Event Model */}
          <div id="macd-event-model" className="mb-12">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 className="h-5 w-5 text-foreground" />
                  <h3 className="text-xl font-semibold text-foreground">
                    MACD Event Model
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  MACD cycle detection and counting events
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Schema Fields
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">_id</span>
                        <span className="text-muted-foreground">
                          ObjectId (auto-generated)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          userId
                        </span>
                        <span className="text-muted-foreground">
                          String (required, indexed)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          symbol
                        </span>
                        <span className="text-muted-foreground">
                          String (required)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">cycle</span>
                        <span className="text-muted-foreground">
                          Enum: ["positive", "negative"]
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">count</span>
                        <span className="text-muted-foreground">
                          Number (required, min: 0)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          datetime
                        </span>
                        <span className="text-muted-foreground">
                          Date (required)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Price Instance Event Model */}
          <div id="price-instance-event-model" className="mb-12">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Activity className="h-5 w-5 text-foreground" />
                  <h3 className="text-xl font-semibold text-foreground">
                    Price Instance Event Model
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Price action pattern detection and counting
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Schema Fields
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">_id</span>
                        <span className="text-muted-foreground">
                          ObjectId (auto-generated)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          userId
                        </span>
                        <span className="text-muted-foreground">
                          String (required, indexed)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          symbol
                        </span>
                        <span className="text-muted-foreground">
                          String (required)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">count</span>
                        <span className="text-muted-foreground">
                          Number (required)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          datetime
                        </span>
                        <span className="text-muted-foreground">
                          Date (required)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trend Continuation Model */}
          <div id="trend-continuation-model" className="mb-12">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="h-5 w-5 text-foreground" />
                  <h3 className="text-xl font-semibold text-foreground">
                    Trend Continuation Model
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Trend continuation pattern detection and counting
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Schema Fields
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">_id</span>
                        <span className="text-muted-foreground">
                          ObjectId (auto-generated)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          userId
                        </span>
                        <span className="text-muted-foreground">
                          String (required, indexed)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          symbol
                        </span>
                        <span className="text-muted-foreground">
                          String (required)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">cycle</span>
                        <span className="text-muted-foreground">
                          Enum: ["positive", "negative"]
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">count</span>
                        <span className="text-muted-foreground">
                          Number (required, min: 0)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          datetime
                        </span>
                        <span className="text-muted-foreground">
                          Date (required)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* High Low Event Model */}
          <div id="high-low-event-model" className="mb-12">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="h-5 w-5 text-foreground" />
                  <h3 className="text-xl font-semibold text-foreground">
                    High Low Event Model
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Market high and low detection events
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Schema Fields
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">_id</span>
                        <span className="text-muted-foreground">
                          ObjectId (auto-generated)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          userId
                        </span>
                        <span className="text-muted-foreground">
                          ObjectId (ref: User, required)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          symbol
                        </span>
                        <span className="text-muted-foreground">
                          String (required, uppercase, trimmed)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          valueType
                        </span>
                        <span className="text-muted-foreground">
                          Enum: ["high", "low"]
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">value</span>
                        <span className="text-muted-foreground">
                          Number (required)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          datetime
                        </span>
                        <span className="text-muted-foreground">
                          String (required)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Decision Event Model */}
          <div id="decision-event-model" className="mb-12">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Bot className="h-5 w-5 text-foreground" />
                  <h3 className="text-xl font-semibold text-foreground">
                    Decision Event Model
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Trading decision execution tracking
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Schema Fields
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">_id</span>
                        <span className="text-muted-foreground">
                          ObjectId (auto-generated)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          userId
                        </span>
                        <span className="text-muted-foreground">
                          ObjectId (ref: User, required, indexed)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          symbol
                        </span>
                        <span className="text-muted-foreground">
                          String (required, indexed)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          decisionConfigId
                        </span>
                        <span className="text-muted-foreground">
                          ObjectId (ref: DecisionConfig, required)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          firstCondition
                        </span>
                        <span className="text-muted-foreground">
                          Enum: ["macd", "trend_continuation"]
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          firstConditionCount
                        </span>
                        <span className="text-muted-foreground">
                          Number (required)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          priceConditionCount
                        </span>
                        <span className="text-muted-foreground">
                          Number (required)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          datetime
                        </span>
                        <span className="text-muted-foreground">
                          Date (required, indexed)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Indexes
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Key className="h-4 w-4 text-muted-foreground" />
                        <span className="font-mono text-foreground">
                          userId: 1, symbol: 1, datetime: -1
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Decision Trade Model */}
          <div id="decision-trade-model" className="mb-12">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="h-5 w-5 text-foreground" />
                  <h3 className="text-xl font-semibold text-foreground">
                    Decision Trade Model
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Trades executed based on decision engine
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Schema Fields
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">_id</span>
                        <span className="text-muted-foreground">
                          ObjectId (auto-generated)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          userId
                        </span>
                        <span className="text-muted-foreground">
                          ObjectId (ref: User, required, indexed)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          symbol
                        </span>
                        <span className="text-muted-foreground">
                          String (required, indexed)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          decisionConfigId
                        </span>
                        <span className="text-muted-foreground">
                          ObjectId (ref: DecisionConfig, required)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          decisionEventId
                        </span>
                        <span className="text-muted-foreground">
                          ObjectId (ref: DecisionEvent, required)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">side</span>
                        <span className="text-muted-foreground">
                          Enum: ["buy", "sell"]
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          quantity
                        </span>
                        <span className="text-muted-foreground">
                          Number (required)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          triggerPrice
                        </span>
                        <span className="text-muted-foreground">
                          Number (required)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          orderId
                        </span>
                        <span className="text-muted-foreground">
                          String (optional)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          status
                        </span>
                        <span className="text-muted-foreground">
                          Enum: ["pending", "filled", "cancelled", "error"]
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-foreground">
                          errorMessage
                        </span>
                        <span className="text-muted-foreground">
                          String (optional)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Indexes
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Key className="h-4 w-4 text-muted-foreground" />
                        <span className="font-mono text-foreground">
                          userId: 1, symbol: 1, datetime: -1
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Key className="h-4 w-4 text-muted-foreground" />
                        <span className="font-mono text-foreground">
                          decisionConfigId: 1, datetime: -1
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
