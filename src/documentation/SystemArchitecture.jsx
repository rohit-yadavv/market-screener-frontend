import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Bot,
  Bell,
  TrendingUp,
  Database,
  Globe,
  Smartphone,
  Layers,
  Network,
  Activity,
  Target,
  DollarSign,
  CheckCircle,
} from "lucide-react";
import MermaidDiagram from "./MermaidDiagram";

export default function Architecture() {
  const coreSystemFlow = `
    flowchart TD
        A[Market Data Input<br/>TwelveData API] --> B[Continuous Scanner<br/>1-min intervals]
        B --> C{US Market Open?<br/>9:30 AM - 4:00 PM EST}
        C -->|No| D[Wait for Market Open]
        C -->|Yes| E[Poll & Process Data<br/>MACD, SMA, EMA, Candles]
        
        E --> F[Data Validation<br/>Timestamp Consistency]
        F -->|Invalid| G[Retry Logic<br/>Max 3 attempts]
        F -->|Valid| H[Process Each Symbol]
        
        H --> I[Symbol-specific Alerts]
        I --> J[High/Low Detection<br/>All Subscribers]
        
        H --> K[User-specific Processing]
        K --> L[EMA Touch Detection]
        
        %% ALERT SYSTEM
        K --> M[Alert System]
        M --> N[MACD Alert]
        M --> O[Price Action Alert]
        M --> P[Trend Alert]
        
        N --> Q{MACD Threshold?}
        Q -->|Yes| R[Send MACD Alert]
        Q -->|No| S[Continue]
        
        O --> T{Price Threshold?}
        T -->|Yes| U[Send Price Alert]
        T -->|No| V[Continue]
        
        P --> W{Trend Threshold?}
        W -->|Yes| X[Send Trend Alert]
        W -->|No| Y[Continue]
        
        %% DECISION SYSTEM
        K --> Z[Decision Engine]
        Z --> AA{Decision Active?}
        AA -->|No| BB[Skip Decision]
        AA -->|Yes| CC[Check First Condition]
        
        CC --> DD{First Condition Type?}
        DD -->|MACD| EE[MACD Detection]
        DD -->|Trend| FF[Trend Detection]
        
        EE --> GG{First Condition Met?}
        FF --> GG
        
        GG -->|No| HH[Continue Counting]
        GG -->|Yes| II[Mark First Condition Met]
        
        II --> JJ[Check Price Candle<br/>Second Condition]
        JJ --> KK{Second Condition Met?}
        
        KK -->|No| LL[Continue Monitoring]
        KK -->|Yes| MM[Execute Buy Decision]
        
        MM --> NN[Trading Service]
        NN --> OO[Execute Buy Trade]
        OO --> PP[Record Position]
        
        %% SELLING LOGIC
        L --> SS{EMA Touch + Profit?}
        SS -->|Yes| TT[Execute Sell Trade]
        SS -->|No| UU[Continue Monitoring]
        
        %% NOTIFICATIONS
        R --> XX[Multi-channel Notifications]
        U --> XX
        X --> XX
        XX --> YY[SSE Real-time]
        XX --> ZZ[Push Notifications]
        XX --> AAA[Email Alerts]
        
        %% FLOW CONNECTIONS
        D --> B
        G --> B
        S --> N
        V --> O
        Y --> P
        HH --> GG
        LL --> KK
        UU --> SS
        
        style A fill:#ffd54f,stroke:#333,stroke-width:2px
        style B fill:#81c784,stroke:#333,stroke-width:2px
        style C fill:#ffb74d,stroke:#333,stroke-width:2px
        style E fill:#64b5f6,stroke:#333,stroke-width:2px
        style F fill:#f06292,stroke:#333,stroke-width:2px
        style H fill:#9c27b0,stroke:#333,stroke-width:2px,color:#fff
        style M fill:#795548,stroke:#333,stroke-width:2px,color:#fff
        style Z fill:#607d8b,stroke:#333,stroke-width:2px,color:#fff
        style MM fill:#e91e63,stroke:#333,stroke-width:2px,color:#fff
        style TT fill:#4caf50,stroke:#333,stroke-width:2px,color:#fff
        style XX fill:#ff9800,stroke:#333,stroke-width:2px
  `;

  const detailedDecisionFlow = `
    flowchart TD
        A[Decision Config<br/>User Setup] --> B[First Condition Type]
        B --> C{MACD or<br/>Trend Continuation?}
        
        C -->|MACD| D[MACD Cycle Detection]
        C -->|Trend| E[Trend Continuation Detection]
        
        D --> F[Count MACD Cycles<br/>Positive/Negative]
        E --> G[Count Trend Sequences<br/>Consecutive Patterns]
        
        F --> H{First Condition<br/>Threshold Met?}
        G --> H
        
        H -->|No| I[Continue Counting<br/>First Condition]
        H -->|Yes| J[Mark First Condition Met]
        
        J --> K[Start Second Condition<br/>Price Candle Analysis]
        K --> L[Price Action Detection<br/>MACD + Candle Patterns]
        
        L --> M{Second Condition<br/>Price Threshold Met?}
        
        M -->|No| N[Continue Price Monitoring<br/>Second Condition]
        M -->|Yes| O[Both Conditions Met<br/>Execute Buy Decision]
        
        O --> P[Reset MACD Count<br/>for Next Decision]
        O --> Q[Execute Buy Trade]
        O --> R[Record Position<br/>Redis List]
        
        R --> S[Position Management<br/>EMA-based Selling]
        S --> T{EMA Touch + Profit?}
        
        T -->|No| U[Continue Monitoring<br/>Position]
        T -->|Yes| V[Execute Sell Trade]
        
        I --> H
        N --> M
        U --> T
        
        style A fill:#ffd54f,stroke:#333,stroke-width:2px
        style C fill:#ffb74d,stroke:#333,stroke-width:2px
        style H fill:#f06292,stroke:#333,stroke-width:2px
        style J fill:#9c27b0,stroke:#333,stroke-width:2px,color:#fff
        style M fill:#795548,stroke:#333,stroke-width:2px,color:#fff
        style O fill:#e91e63,stroke:#333,stroke-width:2px,color:#fff
        style V fill:#4caf50,stroke:#333,stroke-width:2px,color:#fff
  `;

  const systemComponents = [
    {
      title: "Continuous Scanner",
      description:
        "Keeps an eye on the market every minute during trading hours (9:30 AM - 4:00 PM EST, Monday to Friday). It automatically retries if something goes wrong.",
      icon: Activity,
    },
    {
      title: "Alert System",
      description:
        "Watches for different types of market signals - MACD cycles, price movements, EMA touches, highs and lows, and trend patterns. Each user can set their own thresholds.",
      icon: Bell,
    },
    {
      title: "Decision Engine",
      description:
        "Uses a two-step process to make trading decisions. First, it checks for MACD or trend conditions, then looks for the right price action. When both meets threshold, it makes a trade.",
      icon: Bot,
    },
    {
      title: "Trading Service",
      description:
        "Handles the actual buying and selling of stocks. It tracks your positions and automatically sells when the price hits your EMA target or profit goal.",
      icon: DollarSign,
    },
    {
      title: "Notifications",
      description:
        "Sends instant alerts through multiple channels - real-time updates in the app, push notifications on browser, and email alerts.",
      icon: Smartphone,
    },
    {
      title: "Position Management",
      description:
        "Keeps track of all open trades in Redis. It monitors when price candle touch EMA and calculates profits then automatically sells.",
      icon: TrendingUp,
    },
    {
      title: "Data Validation",
      description:
        "Makes sure the market data is fresh and accurate. If the data looks wrong or old, it tries again up to <number> of times with smart delays between attempts.",
      icon: CheckCircle,
    },
    {
      title: "State Management",
      description:
        "Uses Redis to remember where you are in the decision process, count alerts, and track positions. Everything is saved safely and works even if the system restarts.",
      icon: Target,
    },
  ];

  const highLevelArchitecture = [
    {
      title: "API Layer",
      icon: Network,
      description:
        "Links the frontend to the backend. Handles user login, manages user settings",
    },
    {
      title: "Logic Layer",
      icon: Layers,
      description:
        "The brain of the system. Runs the scanner, makes decisions, handles trading, processes alerts.",
    },
    {
      title: "Data Layer",
      icon: Database,
      description:
        "Stores everything safely. MongoDB keeps user data, settings, and trade history. Redis handles real-time data and temporary states.",
    },
    {
      title: "External Services",
      icon: Globe,
      description:
        "Connects to outside services we need - TwelveData for market data, Alpaca for trading.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-muted/50">
        <div className="w-full mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              System Architecture
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              How market screener works - the design, data flow, and how all the
              pieces work together
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full mx-auto px-6 py-12">
        <div id="system-overview" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Core System Components
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemComponents.map((component, index) => (
              <Card
                key={index}
                className="border-border hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <component.icon className="h-5 w-5 text-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {component.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {component.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* System Flow Diagram */}
        <div id="system-flow" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Complete System Flow
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The complete flow from getting market data to sending alerts and
              executing trades.
            </p>
          </div>

          <div className="w-full overflow-hidden">
            <MermaidDiagram
              chart={coreSystemFlow}
              title="Core System Flow"
              className="mb-8"
            />
          </div>
        </div>

        {/* Decision Engine Flow */}
        <div id="decision-flow" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Decision Engine Flow
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              decision system working - from setting up conditions to executing
              trades
            </p>
          </div>

          <div className="w-full overflow-hidden">
            <MermaidDiagram
              chart={detailedDecisionFlow}
              title="Decision Engine Flow"
              className="mb-8"
            />
          </div>
        </div>

        {/* High-Level Architecture */}
        <div id="high-level-architecture" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              High-Level Architecture
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Overall System is divided into layers to keep things organized and
              easy to maintain
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highLevelArchitecture.map((layer, index) => (
              <Card
                key={index}
                className="border-border hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                      <layer.icon className="h-6 w-6 text-foreground" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {layer.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {layer.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
