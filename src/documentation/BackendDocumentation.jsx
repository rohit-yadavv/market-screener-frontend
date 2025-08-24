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
  FileText,
  Settings,
  Shield,
  Database,
  Route,
  Layers,
  Bell,
  Clock,
  Wrench,
  Code,
  Server,
  FolderOpen,
  Package,
  AlertTriangle,
  CheckCircle,
  Users,
  History,
  TrendingUp,
  Bot,
  Mail,
  Globe,
} from "lucide-react";

export default function BackendDocs() {
  const rootFiles = [
    {
      file: "app.ts",
      purpose: "Application entry point",
      description:
        "Main server setup, middleware configuration, and route registration",
    },
    {
      file: "package.json",
      purpose: "Dependencies and scripts",
      description: "Project dependencies, build scripts, and development tools",
    },
    {
      file: "tsconfig.json",
      purpose: "TypeScript configuration",
      description: "TypeScript compiler options and project settings",
    },
    {
      file: "eslint.config.js",
      purpose: "Code linting",
      description: "ESLint configuration for code quality and consistency",
    },
  ];

  const configurationFiles = [
    {
      file: "config/db.config.ts",
      purpose: "Database configuration",
      description: "MongoDB connection settings and database initialization",
    },
    {
      file: "config/redis.config.ts",
      purpose: "Redis configuration",
      description: "Redis connection settings and client initialization",
    },
    {
      file: "config/user.config.ts",
      purpose: "User settings",
      description: "User-related configuration and default values",
    },
    {
      file: "config/push.config.ts",
      purpose: "Push notification config",
      description: "Web push notification settings and configuration",
    },
  ];

  const controllers = [
    {
      file: "controllers/auth.controller.ts",
      purpose: "Authentication",
      description: "User login, logout, and session management",
    },
    {
      file: "controllers/user.controller.ts",
      purpose: "User management",
      description: "CRUD operations for user profile and settings",
    },
    {
      file: "controllers/alert.controller.ts",
      purpose: "Alert system",
      description: "Alert configuration and management",
    },
    {
      file: "controllers/decision.controller.ts",
      purpose: "Decision engine",
      description: "CRUD operations for decision configurations",
    },
    {
      file: "controllers/history.controller.ts",
      purpose: "History tracking",
      description: "Trade history and Alert History Provider",
    },
  ];

  const middleware = [
    {
      file: "middleware/auth.middleware.ts",
      purpose: "Authentication middleware",
      description: "Middleware for authentication",
    },
    {
      file: "middleware/error.middleware.ts",
      purpose: "Error handling",
      description: "Middleware for error handling",
    },
  ];

  const models = [
    {
      file: "models/user.model.ts",
      purpose: "User model",
      description:
        "To Store Information realted to user, thier settings, and preferences",
    },
    {
      file: "models/alertConfig.model.ts",
      purpose: "Alert configuration",
      description: "Stores Alert configurations",
    },
    {
      file: "models/decisionConfig.model.ts",
      purpose: "Decision configuration",
      description: "Stores Decision configurations",
    },
    {
      file: "models/tradeEvent.model.ts",
      purpose: "Trade events",
      description: "Stores Trade events",
    },
    {
      file: "models/macdEvent.model.ts",
      purpose: "MACD events",
      description: "Stores MACD Alert Events",
    },
    {
      file: "models/priceInstanceEvent.model.ts",
      purpose: "Price events",
      description: "Stores Price Action Events",
    },
    {
      file: "models/trendContinuation.model.ts",
      purpose: "Trend events",
      description: "Stores Trend Continuation Events",
    },
    {
      file: "models/highLowEvent.model.ts",
      purpose: "High/Low events",
      description: "Stores High/Low Events",
    },
    {
      file: "models/decisionEvent.model.ts",
      purpose: "Decision events",
      description: "Stores Decision Events",
    },
    {
      file: "models/decisionTrade.model.ts",
      purpose: "Decision trades",
      description: "Stores Decision Trade Events",
    },
  ];

  const routes = [
    {
      file: "routes/auth.routes.ts",
      purpose: "Authentication routes",
      description: "Login, logout, and session management endpoints",
    },
    {
      file: "routes/user.routes.ts",
      purpose: "User routes",
      description: "User management and profile endpoints",
    },
    {
      file: "routes/alert.routes.ts",
      purpose: "Alert routes",
      description: "Alert configuration and management endpoints",
    },
    {
      file: "routes/decision.routes.ts",
      purpose: "Decision routes",
      description: "Trading decision configuration endpoints",
    },
    {
      file: "routes/history.routes.ts",
      purpose: "History routes",
      description: "Trade and alert history endpoints",
    },
    {
      file: "routes/push.routes.ts",
      purpose: "Push notification routes",
      description: "Web push notification subscription endpoints",
    },
  ];

  const services = [
    {
      file: "services/scanner.service.ts",
      purpose: "Market scanner",
      description: "Continuous market data monitoring and processing",
    },
    {
      file: "services/twelvedata.service.ts",
      purpose: "Market data API",
      description: "TwelveData API integration for real-time market data",
    },
    {
      file: "services/email.service.ts",
      purpose: "Email service",
      description: "Email notification delivery system",
    },
    {
      file: "services/sse.service.ts",
      purpose: "Server-Sent Events",
      description: "Real-time data streaming to frontend",
    },
  ];

  const alertServices = [
    {
      file: "services/alert/alertConfigService.ts",
      purpose: "Alert configuration",
      description: "Alert settings management and validation",
    },
    {
      file: "services/alert/index.ts",
      purpose: "Alert system",
      description: "Main alert processing and coordination",
    },
  ];

  const tradingServices = [
    {
      file: "services/trading/trading.service.ts",
      purpose: "Trading execution",
      description: "Alpaca API integration for trade execution",
    },
    {
      file: "services/trading/index.ts",
      purpose: "Trading coordination",
      description: "Trading system coordination and management",
    },
  ];

  const decisionServices = [
    {
      file: "services/decision/decisionEngine.ts",
      purpose: "Decision engine",
      description: "Core decision-making logic and execution",
    },
    {
      file: "services/decision/decisionConfigService.ts",
      purpose: "Decision configuration",
      description: "Decision parameters management and validation",
    },
    {
      file: "services/decision/decisionStateManager.ts",
      purpose: "State management",
      description: "Decision state tracking and persistence",
    },
    {
      file: "services/decision/index.ts",
      purpose: "Decision coordination",
      description: "Decision system coordination and management",
    },
  ];

  const specializedServices = [
    {
      file: "services/macd/macdCycle.service.ts",
      purpose: "MACD cycles",
      description: "MACD cycle detection and analysis",
    },
    {
      file: "services/price/priceCandleService.ts",
      purpose: "Price candles",
      description: "Price candle pattern analysis and detection",
    },
    {
      file: "services/trend/trendContinuationService.ts",
      purpose: "Trend continuation",
      description: "Trend continuation pattern detection",
    },
    {
      file: "services/buy-sell/trade.service.ts",
      purpose: "Trade execution",
      description: "Buy/sell trade execution and management",
    },
  ];

  const alerts = [
    {
      file: "alerts/index.ts",
      purpose: "Alert coordination",
      description: "Main alert system coordination and processing",
    },
    {
      file: "alerts/macd.alert.ts",
      purpose: "MACD alerts",
      description: "MACD-based alert detection and triggering",
    },
    {
      file: "alerts/price.alert.ts",
      purpose: "Price alerts",
      description: "Price-based alert detection and triggering",
    },
    {
      file: "alerts/emaTouch.alert.ts",
      purpose: "EMA touch alerts",
      description: "EMA touch detection and alert triggering",
    },
    {
      file: "alerts/highlow.alert.ts",
      purpose: "High/Low alerts",
      description: "Market high and low alert detection",
    },
    {
      file: "alerts/trendContinuation.alert.ts",
      purpose: "Trend alerts",
      description: "Trend continuation alert detection",
    },
  ];

  const jobs = [
    {
      file: "jobs/scheduler.ts",
      purpose: "Job scheduling",
      description: "Cron-based job to reset Redis",
    },
  ];

  const utils = [
    {
      file: "utils/logger.util.ts",
      purpose: "Logging",
      description: "Pino-based logging configuration and utilities",
    },
    {
      file: "utils/date.util.ts",
      purpose: "Date utilities",
      description: "Date and time manipulation utilities",
    },
    {
      file: "utils/poll-processing.util.ts",
      purpose: "Poll processing",
      description: "Market data polling and processing utilities",
    },
  ];

  const types = [
    {
      file: "types/index.ts",
      purpose: "Type definitions",
      description: "Global TypeScript type definitions and interfaces",
    },
    {
      file: "types/express/index.d.ts",
      purpose: "Express types",
      description: "Express.js type extensions and custom types",
    },
  ];

  const constants = [
    {
      file: "constants/index.ts",
      purpose: "Application constants",
      description: "Global constants and configuration values",
    },
  ];

  const backendStack = [
    {
      technology: "Node.js",
      purpose: "Runtime environment",
      rationale:
        "Event-driven, non-blocking I/O perfect for real-time data streams",
    },
    {
      technology: "TypeScript",
      purpose: "Programming language",
      rationale: "Static typing for better code quality and maintainability",
    },
    {
      technology: "Express.js",
      purpose: "Web framework",
      rationale: "Minimal, flexible framework for building REST APIs quickly",
    },
    {
      technology: "MongoDB",
      purpose: "Primary database",
      rationale:
        "Flexible document structure, it is used for storing data permanently",
    },
    {
      technology: "Redis",
      purpose: "In-memory cache",
      rationale: "High-speed caching for user configs and real-time state",
    },
    {
      technology: "JWT",
      purpose: "Authentication",
      rationale: "Used for authentication via HTTP-only cookies",
    },
    {
      technology: "Pino",
      purpose: "Logging",
      rationale: "High-performance JSON logging",
    },
    {
      technology: "Node-cron",
      purpose: "Scheduling",
      rationale: "Cron-based job scheduling for market hours",
    },
  ];

  const externalApis = [
    {
      technology: "Twelve Data API",
      purpose: "Market data provider",
      rationale: "Used to get the real-time market data for the Screener",
    },
    {
      technology: "Alpaca Trading API",
      purpose: "Trading execution",
      rationale: "Used to execute trades for the Screener",
    },
    {
      technology: "Web Push API",
      purpose: "Push notifications",
      rationale: "Used to send push notifications to the users",
    },
    {
      technology: "Nodemailer",
      purpose: "Email service",
      rationale: "Used to send email notifications to the users",
    },
  ];

  // eslint-disable-next-line no-unused-vars
  const renderFileTable = (files, title, IconComponent, sectionId) => (
    <div className="mb-12" id={sectionId}>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
          <IconComponent className="h-5 w-5 text-foreground" />
        </div>
        <h3 className="text-2xl font-bold text-foreground">{title}</h3>
      </div>

      <Card className="border-border">
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4">File</TableHead>
                <TableHead className="w-1/4">Purpose</TableHead>
                <TableHead className="w-1/2">Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((file, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono text-sm font-medium text-foreground">
                    {file.file}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {file.purpose}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {file.description}
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
              Backend Documentation
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              File-by-file implementation guide for the Node.js/TypeScript
              backend
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full mx-auto px-6 py-12">
        {/* Backend Stack */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Backend Technology Stack
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Technologies and tools used in the backend implementation
            </p>
          </div>

          <Card className="border-border">
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/4">Technology</TableHead>
                    <TableHead className="w-1/4">Purpose</TableHead>
                    <TableHead className="w-1/2">Why Chosen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {backendStack.map((tech, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium text-foreground">
                        {tech.technology}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {tech.purpose}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {tech.rationale}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* External APIs */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              External APIs & Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Third-party services and APIs integrated with the backend
            </p>
          </div>

          <Card className="border-border">
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/4">API/Service</TableHead>
                    <TableHead className="w-1/4">Purpose</TableHead>
                    <TableHead className="w-1/2">Why Chosen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {externalApis.map((api, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium text-foreground">
                        {api.technology}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {api.purpose}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {api.rationale}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Root Files */}
        {renderFileTable(rootFiles, "Root Files", FileText, "root-files")}

        {/* Configuration */}
        {renderFileTable(configurationFiles, "Configuration", Settings, "configuration")}

        {/* Controllers */}
        {renderFileTable(controllers, "Controllers", Shield, "controllers")}

        {/* Middleware */}
        {renderFileTable(middleware, "Middleware", Shield, "middleware")}

        {/* Models */}
        {renderFileTable(models, "Models", Database, "models")}

        {/* Routes */}
        {renderFileTable(routes, "Routes", Route, "routes")}

        {/* Services */}
        {renderFileTable(services, "Core Services", Server, "services")}

        {/* Alert Services */}
        {renderFileTable(alertServices, "Alert Services", Bell, "alert-services")}

        {/* Trading Services */}
        {renderFileTable(tradingServices, "Trading Services", TrendingUp, "trading-services")}

        {/* Decision Services */}
        {renderFileTable(decisionServices, "Decision Services", Bot, "decision-services")}

        {/* Specialized Services */}
        {renderFileTable(specializedServices, "Specialized Services", Code, "specialized-services")}

        {/* Alerts */}
        {renderFileTable(alerts, "Alerts", Bell, "alerts")}

        {/* Jobs */}
        {renderFileTable(jobs, "Jobs", Clock, "jobs")}

        {/* Utils */}
        {renderFileTable(utils, "Utilities", Wrench, "utils")}

        {/* Types */}
        {renderFileTable(types, "Types", Code, "types")}

        {/* Constants */}
        {renderFileTable(constants, "Constants", Package, "constants")}
      </div>
    </div>
  );
}
