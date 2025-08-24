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

export default function TechnologyStack() {
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

  const frontendStack = [
    {
      technology: "React 19",
      purpose: "UI framework",
      rationale: "Used to create single page modern dashboard for the Screener",
    },
    {
      technology: "Tailwind CSS",
      purpose: "Styling",
      rationale: "Used for styling the UI of the Screener",
    },
    {
      technology: "shadcn/ui",
      purpose: "Component library",
      rationale: "Beautiful, accessible components built on Radix UI",
    },
    {
      technology: "Server-Sent Events",
      purpose: "Real-time updates",
      rationale: "Lightweight real-time data streaming from server to client",
    },
    {
      technology: "Lucide React",
      purpose: "Icons",
      rationale: "Beautiful, customizable icon library",
    },
    {
      technology: "Mermaid.js",
      purpose: "Diagrams",
      rationale: "Text-based diagram generation for documentation",
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-muted/50">
        <div className="w-full mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Technology Stack
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full mx-auto px-6 py-12">
        {/* Overview */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-border hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Backend Stack
                </h3>
                <p className="text-muted-foreground text-sm">
                  Node.js, TypeScript, Express.js, MongoDB, Redis, JWT
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Frontend Stack
                </h3>
                <p className="text-muted-foreground text-sm">
                  React 19, Vite, Tailwind CSS, Radix UI, Server-Sent Events
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  External APIs
                </h3>
                <p className="text-muted-foreground text-sm">
                  Twelve Data API, Alpaca Trading API, Web Push API
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Backend Stack */}
        <div id="backend-stack" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Backend Stack
            </h2>
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

        {/* Frontend Stack */}
        <div id="frontend-stack" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Frontend Stack
            </h2>
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
                  {frontendStack.map((tech, index) => (
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
        <div id="external-apis" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              External APIs
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Third-party services and APIs used in the Screener
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
      </div>
    </div>
  );
}
