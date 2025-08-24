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
import { Shield, Users, Bell, BarChart3, AlertTriangle } from "lucide-react";

export default function ApiDocs() {
  const authEndpoints = [
    {
      method: "POST",
      endpoint: "/auth/login",
      purpose: "User authentication",
      description: "Authenticate user with email and password",
      requestBody: {
        email: "user@example.com",
        password: "userpassword",
      },
      response: {
        success: true,
        email: "user@example.com",
      },
      notes: "Sets HTTP-only JWT token cookie",
    },
    {
      method: "POST",
      endpoint: "/auth/addUser",
      purpose: "User registration",
      description: "Create new user account",
      requestBody: {
        email: "newuser@example.com",
        password: "newpassword",
      },
      response: {
        success: true,
        message: "User created successfully",
      },
    },
    {
      method: "GET",
      endpoint: "/auth/verify",
      purpose: "Token verification",
      description: "Verify JWT token validity",
      headers: "JWT token in cookie",
      response: {
        success: true,
        user: {
          id: "user_id",
          email: "user@example.com",
        },
      },
    },
    {
      method: "POST",
      endpoint: "/auth/changePassword",
      purpose: "Password change",
      description: "Change user password",
      headers: "JWT token required",
      requestBody: {
        currentPassword: "oldpassword",
        newPassword: "newpassword",
      },
    },
  ];

  const userEndpoints = [
    {
      method: "GET",
      endpoint: "/user/profile",
      purpose: "Get user profile",
      description: "Retrieve user profile and settings",
      headers: "JWT token required",
      response: {
        success: true,
        user: {
          id: "user_id",
          email: "user@example.com",
          alertEmail: "alerts@example.com",
          allSymbols: ["AAPL", "GOOGL"],
          subscribedSymbolsForMACD: ["AAPL"],
        },
      },
    },
    {
      method: "PUT",
      endpoint: "/user/profile",
      purpose: "Update user profile",
      description: "Update user profile information",
      headers: "JWT token required",
      requestBody: {
        alertEmail: "newalerts@example.com",
      },
    },
    {
      method: "POST",
      endpoint: "/user/symbols",
      purpose: "Add trading symbol",
      description: "Add symbol to user watchlist",
      headers: "JWT token required",
      requestBody: {
        symbol: "TSLA",
      },
    },
    {
      method: "DELETE",
      endpoint: "/user/symbols",
      purpose: "Remove symbol",
      description: "Remove symbol from watchlist",
      headers: "JWT token required",
      requestBody: {
        symbol: "TSLA",
      },
    },
  ];

  const alertEndpoints = [
    {
      method: "GET",
      endpoint: "/alerts/config",
      purpose: "Get alert configurations",
      description: "Retrieve all alert configurations for user",
      headers: "JWT token required",
      response: {
        success: true,
        configs: [
          {
            id: "config_id",
            symbol: "AAPL",
            alertType: "macd",
            threshold: 5,
            enabled: true,
            notificationChannels: ["sse", "email"],
          },
        ],
      },
    },
    {
      method: "POST",
      endpoint: "/alerts/config",
      purpose: "Create alert configuration",
      description: "Create new alert configuration",
      headers: "JWT token required",
      requestBody: {
        symbol: "AAPL",
        alertType: "price",
        threshold: 150.0,
        enabled: true,
        notificationChannels: ["sse", "push", "email"],
      },
    },
    {
      method: "PUT",
      endpoint: "/alerts/config/:id",
      purpose: "Update alert configuration",
      description: "Update existing alert configuration",
      headers: "JWT token required",
      requestBody: {
        threshold: 160.0,
        enabled: false,
      },
    },
    {
      method: "DELETE",
      endpoint: "/alerts/config/:id",
      purpose: "Delete alert configuration",
      description: "Remove alert configuration",
      headers: "JWT token required",
    },
  ];

  const decisionEndpoints = [
    {
      method: "GET",
      endpoint: "/decisions/config",
      purpose: "Get decision configurations",
      description: "Retrieve all decision configurations for user",
      headers: "JWT token required",
      response: {
        success: true,
        configs: [
          {
            id: "decision_id",
            symbol: "AAPL",
            firstCondition: "macd_cycle",
            firstConditionThreshold: 3,
            priceCondition: "above_ema",
            priceConditionThreshold: 20,
            enabled: true,
          },
        ],
      },
    },
    {
      method: "POST",
      endpoint: "/decisions/config",
      purpose: "Create decision configuration",
      description: "Create new trading decision configuration",
      headers: "JWT token required",
      requestBody: {
        symbol: "GOOGL",
        firstCondition: "trend_continuation",
        firstConditionThreshold: 5,
        priceCondition: "volume_spike",
        priceConditionThreshold: 2.5,
        enabled: true,
      },
    },
  ];

  const errorCodes = [
    {
      code: "UNAUTHORIZED",
      description: "Invalid or missing authentication token",
      status: 401,
    },
    {
      code: "FORBIDDEN",
      description: "Insufficient permissions",
      status: 403,
    },
    {
      code: "NOT_FOUND",
      description: "Resource not found",
      status: 404,
    },
    {
      code: "VALIDATION_ERROR",
      description: "Invalid request data",
      status: 400,
    },
    {
      code: "INTERNAL_ERROR",
      description: "Server internal error",
      status: 500,
    },
  ];

  // eslint-disable-next-line no-unused-vars
  const renderEndpointTable = (endpoints, title, IconComponent, sectionId) => (
    <div className="mb-12" id={sectionId}>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
          <IconComponent className="h-5 w-5 text-foreground" />
        </div>
        <h3 className="text-2xl font-bold text-foreground">{title}</h3>
      </div>

      <div className="space-y-6">
        {endpoints.map((endpoint, index) => (
          <Card key={index} className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    endpoint.method === "GET"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      : endpoint.method === "POST"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : endpoint.method === "PUT"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }`}
                >
                  {endpoint.method}
                </div>
                <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                  {endpoint.endpoint}
                </code>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    {endpoint.purpose}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {endpoint.description}
                  </p>
                </div>

                {endpoint.headers && (
                  <div>
                    <h5 className="font-medium text-foreground mb-1">
                      Headers:
                    </h5>
                    <p className="text-muted-foreground text-sm">
                      {endpoint.headers}
                    </p>
                  </div>
                )}

                {endpoint.requestBody && (
                  <div>
                    <h5 className="font-medium text-foreground mb-1">
                      Request Body:
                    </h5>
                    <pre className="bg-muted p-3 rounded-md text-sm overflow-x-auto">
                      <code>
                        {JSON.stringify(endpoint.requestBody, null, 2)}
                      </code>
                    </pre>
                  </div>
                )}

                {endpoint.response && (
                  <div>
                    <h5 className="font-medium text-foreground mb-1">
                      Response:
                    </h5>
                    <pre className="bg-muted p-3 rounded-md text-sm overflow-x-auto">
                      <code>{JSON.stringify(endpoint.response, null, 2)}</code>
                    </pre>
                  </div>
                )}

                {endpoint.notes && (
                  <div>
                    <h5 className="font-medium text-foreground mb-1">Notes:</h5>
                    <p className="text-muted-foreground text-sm">
                      {endpoint.notes}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-muted/50">
        <div className="w-full mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              API Documentation
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              Complete REST API Reference for Screener
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full mx-auto px-6 py-12">
        {/* Authentication Endpoints */}
        {renderEndpointTable(
          authEndpoints,
          "Authentication Endpoints",
          Shield,
          "auth-endpoints"
        )}

        {/* User Management Endpoints */}
        {renderEndpointTable(
          userEndpoints,
          "User Management Endpoints",
          Users,
          "user-endpoints"
        )}

        {/* Alert System Endpoints */}
        {renderEndpointTable(
          alertEndpoints,
          "Alert System Endpoints",
          Bell,
          "alert-endpoints"
        )}

        {/* Decision Management Endpoints */}
        {renderEndpointTable(
          decisionEndpoints,
          "Decision Management Endpoints",
          BarChart3,
          "decision-endpoints"
        )}

        {/* Error Handling */}
        <div className="mb-12" id="error-handling">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <AlertTriangle className="h-5 w-5 text-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">
              Error Handling
            </h3>
          </div>

          <Card className="border-border mb-6">
            <CardContent className="p-6">
              <h4 className="font-semibold text-foreground mb-4">
                Standard Error Response Format
              </h4>
              <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                <code>{`{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": {
      "field": "email",
      "value": "invalid-email"
    }
  }
}`}</code>
              </pre>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-6">
              <h4 className="font-semibold text-foreground mb-4">
                Common Error Codes
              </h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/4">Error Code</TableHead>
                    <TableHead className="w-1/2">Description</TableHead>
                    <TableHead className="w-1/4">HTTP Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {errorCodes.map((error, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono text-sm font-medium text-foreground">
                        {error.code}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {error.description}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {error.status}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
