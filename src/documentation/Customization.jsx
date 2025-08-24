import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Bell,
  TrendingUp,
  Palette,
  Database,
  Globe,
  CheckCircle,
  Code,
  Cpu,
} from "lucide-react";

export default function Customization() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-muted/50">
        <div className="w-full mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Customization Guide
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              Extending & Customizing the Market Screener System
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full mx-auto px-6 py-12">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <Bell className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Alert Types
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Add custom alert conditions and triggers for market events
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Decision Engine
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Extend the decision engine with custom trading logic
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                  <Palette className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  UI Components
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Create custom React components and pages
              </p>
            </CardContent>
          </Card>
        </div>

        {/* New Alert Types */}
        <div id="new-alerts" className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <Bell className="h-5 w-5 text-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              Adding New Alert Types
            </h2>
          </div>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
            Create custom alert conditions by following the existing pattern:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  1. Create Alert File
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create a new alert file in the alerts directory following the
                  pattern of existing alerts like price.alert.ts.
                </p>
                <div className="bg-muted p-3 rounded-lg">
                  <code className="text-xs text-muted-foreground">
                    src/alerts/custom.alert.ts
                  </code>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  2. Implement Alert Logic
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Use the sendUserAlert function from alerts/index.ts to send
                  notifications to users.
                </p>
                <div className="bg-muted p-3 rounded-lg">
                  <code className="text-xs text-muted-foreground">
                    sendUserAlert(userId, symbol, event)
                  </code>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  3. Add to Alert Config
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Update the AlertConfigService to handle your new alert type
                  configuration.
                </p>
                <div className="bg-muted p-3 rounded-lg">
                  <code className="text-xs text-muted-foreground">
                    src/services/alert/alertConfigService.ts
                  </code>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Decision Engine Extension */}
        <div id="trading-strategies" className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <TrendingUp className="h-5 w-5 text-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              Extending Decision Engine
            </h2>
          </div>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
            Add custom decision logic to the existing DecisionEngine:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  1. Decision Engine
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Extend the DecisionEngine class in
                  src/services/decision/decisionEngine.ts with new static
                  methods.
                </p>
                <div className="bg-muted p-3 rounded-lg">
                  <code className="text-xs text-muted-foreground">
                    src/services/decision/decisionEngine.ts
                  </code>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  2. State Management
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Use DecisionStateManager to track decision states and
                  conditions for users and symbols.
                </p>
                <div className="bg-muted p-3 rounded-lg">
                  <code className="text-xs text-muted-foreground">
                    DecisionStateManager
                  </code>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  3. Configuration
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Add new decision types to DecisionConfigService for user
                  configuration management.
                </p>
                <div className="bg-muted p-3 rounded-lg">
                  <code className="text-xs text-muted-foreground">
                    src/services/decision/decisionConfigService.ts
                  </code>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* UI Components */}
        <div id="ui-extension" className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <Palette className="h-5 w-5 text-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              Creating UI Components
            </h2>
          </div>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
            Add custom React components following the existing patterns:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  1. Component Structure
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Follow the pattern of existing components like AlertConfig.jsx
                  with proper state management and API calls.
                </p>
                <div className="bg-muted p-3 rounded-lg">
                  <code className="text-xs text-muted-foreground">
                    src/components/
                  </code>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  2. API Integration
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Use axios with BASE_URL from utils/api.js and include
                  withCredentials for authentication.
                </p>
                <div className="bg-muted p-3 rounded-lg">
                  <code className="text-xs text-muted-foreground">
                    import {"{BASE_URL}"} from "../utils/api";<br/>
                    axios.get(\`\${"${BASE_URL}"}/api/endpoint\`)
                  </code>
                </div>
              </CardContent>
            </Card>   

            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  3. UI Components
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Use shadcn/ui components from src/components/ui/ for
                  consistent styling and functionality.
                </p>
                <div className="bg-muted p-3 rounded-lg">
                  <code className="text-xs text-muted-foreground">
                    src/components/ui/
                  </code>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Data Services */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <Database className="h-5 w-5 text-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              Data Services & APIs
            </h2>
          </div>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
            Extend data services and add new API endpoints:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="h-5 w-5 text-blue-500" />
                  <h3 className="text-lg font-semibold text-foreground">
                    Market Data Services
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Extend twelvedata.service.ts or create new services following
                  the same pattern with axios and proper error handling.
                </p>
                <div className="bg-muted p-3 rounded-lg">
                  <code className="text-xs text-muted-foreground">
                    src/services/twelvedata.service.ts
                  </code>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="h-5 w-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-foreground">
                    API Routes
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Add new routes in src/routes/ directory following the existing
                  pattern with authentication middleware.
                </p>
                <div className="bg-muted p-3 rounded-lg">
                  <code className="text-xs text-muted-foreground">
                    src/routes/
                  </code>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Cpu className="h-5 w-5 text-purple-500" />
                  <h3 className="text-lg font-semibold text-foreground">
                    Business Logic
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Create new services in src/services/ directory for custom
                  business logic and data processing.
                </p>
                <div className="bg-muted p-3 rounded-lg">
                  <code className="text-xs text-muted-foreground">
                    src/services/
                  </code>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Bell className="h-5 w-5 text-orange-500" />
                  <h3 className="text-lg font-semibold text-foreground">
                    Notifications
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Extend the existing notification system using sendUserAlert,
                  SSE, push notifications, and email services.
                </p>
                <div className="bg-muted p-3 rounded-lg">
                  <code className="text-xs text-muted-foreground">
                    src/alerts/index.ts
                  </code>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Best Practices */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <CheckCircle className="h-5 w-5 text-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              Best Practices
            </h2>
          </div>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
            Follow these guidelines for successful customization:
          </p>

          <Card className="border-border">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">
                        Follow Patterns
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Study existing implementations like price.alert.ts and
                        AlertConfig.jsx
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">
                        Error Handling
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Use try-catch blocks and proper error logging like
                        existing services
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">
                        Authentication
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Always include withCredentials for API calls and use
                        auth middleware
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">
                        State Management
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Use Redis for state management like DecisionStateManager
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">Logging</h4>
                      <p className="text-sm text-muted-foreground">
                        Use the logger utility for consistent logging across the
                        application
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">
                        TypeScript
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Define proper types and interfaces in src/types/
                        directory
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
