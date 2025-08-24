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
  Code,
  Users,
  Bell,
  Smartphone,
  Palette,
  Shield,
  Wrench,
  Package,
  ArrowRight,
  Zap as Lightning,
  Eye,
  Home,
} from "lucide-react";

export default function FrontendDocs() {
  const pages = [
    {
      file: "src/pages/Dashboard.jsx",
      purpose: "Main dashboard",
      description:
        "Real-time market data display and alert management interface",
    },
    {
      file: "src/pages/DecisionPage.jsx",
      purpose: "Trading decisions",
      description: "Trading decision configuration and management interface",
    },
    {
      file: "src/pages/Documentation.jsx",
      purpose: "Documentation hub",
      description: "Central documentation navigation and content display",
    },
    {
      file: "src/pages/Login.jsx",
      purpose: "Authentication",
      description: "User login and authentication interface",
    },
  ];

  const components = [
    {
      file: "src/components/AlertConfig.jsx",
      purpose: "Alert configuration",
      description: "Alert settings and configuration management interface",
    },
    {
      file: "src/components/PastAlerts.jsx",
      purpose: "Alert history",
      description: "Historical alert display and management",
    },
    {
      file: "src/components/PastDecision.jsx",
      purpose: "Decision history",
      description: "Historical trading decision display and analysis",
    },
    {
      file: "src/components/RealTimeEvents.jsx",
      purpose: "Real-time events",
      description: "Live market events and data streaming display",
    },
    {
      file: "src/components/ThemeSwitcher.jsx",
      purpose: "Theme switching",
      description: "Dark/light theme toggle functionality",
    },
  ];

  const uiComponents = [
    {
      file: "src/components/ui/button.jsx",
      purpose: "Button component",
      description: "Reusable button component with variants",
    },
    {
      file: "src/components/ui/card.jsx",
      purpose: "Card component",
      description: "Container component for content sections",
    },
    {
      file: "src/components/ui/table.jsx",
      purpose: "Table component",
      description: "Data table component with sorting and pagination",
    },
    {
      file: "src/components/ui/dialog.jsx",
      purpose: "Dialog component",
      description: "Modal dialog component for overlays",
    },
    {
      file: "src/components/ui/input.jsx",
      purpose: "Input component",
      description: "Form input component with validation",
    },
    {
      file: "src/components/ui/select.jsx",
      purpose: "Select component",
      description: "Dropdown select component",
    },
    {
      file: "src/components/ui/tabs.jsx",
      purpose: "Tabs component",
      description: "Tabbed interface component",
    },
    {
      file: "src/components/ui/sidebar.jsx",
      purpose: "Sidebar component",
      description: "Navigation sidebar component",
    },
  ];

  const contextProviders = [
    {
      file: "src/context/AuthContext.jsx",
      purpose: "Authentication context",
      description: "Global authentication state management",
    },
    {
      file: "src/context/SSEContext.jsx",
      purpose: "SSE context",
      description: "Server-Sent Events state management for real-time data",
    },
  ];

  const hooks = [
    {
      file: "src/hooks/useAuth.js",
      purpose: "Authentication hook",
      description: "Custom hook for authentication state and methods",
    },
    {
      file: "src/hooks/useSSE.js",
      purpose: "SSE hook",
      description: "Custom hook for Server-Sent Events connection",
    },
    {
      file: "src/hooks/use-mobile.js",
      purpose: "Mobile detection",
      description: "Custom hook for mobile device detection",
    },
  ];

  const utilities = [
    {
      file: "src/utils/api.js",
      purpose: "API utilities",
      description: "HTTP request utilities and API configuration",
    },
    {
      file: "src/utils/push.util.js",
      purpose: "Push notifications",
      description: "Web push notification utilities",
    },
    {
      file: "src/documentation/",
      purpose: "Documentation components",
      description:
        "All documentation components and page components for the docs system",
    },
  ];

  const features = [
    {
      title: "Real-time Data Streaming",
      description: "Server-Sent Events for live market data updates",
      icon: Lightning,
      benefits: [
        "Instant market updates",
        "Low latency",
        "Efficient data transfer",
      ],
    },
    {
      title: "Responsive Design",
      description: "Mobile-first responsive design with Tailwind CSS",
      icon: Smartphone,
      benefits: [
        "Mobile optimized",
        "Desktop friendly",
        "Cross-device compatibility",
      ],
    },
    {
      title: "Modern UI Components",
      description: "Beautiful, accessible components built with shadcn/ui",
      icon: Palette,
      benefits: ["Consistent design", "Accessibility", "Customizable"],
    },
    {
      title: "Push Notifications",
      description: "Web push notifications for alert delivery",
      icon: Bell,
      benefits: ["Instant alerts", "Background delivery", "User engagement"],
    },
    {
      title: "Theme Switching",
      description: "Dark/light theme toggle with system preference detection",
      icon: Eye,
      benefits: ["User preference", "System sync", "Reduced eye strain"],
    },
    {
      title: "Authentication",
      description: "Secure JWT-based authentication with HTTP-only cookies",
      icon: Shield,
      benefits: ["Secure sessions", "Auto-login", "Session management"],
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
      rationale: "Accessible components built on Radix UI",
    },
    {
      technology: "Server-Sent Events",
      purpose: "Real-time updates",
      rationale: "Lightweight real-time data streaming from server to client",
    },
    {
      technology: "Lucide React",
      purpose: "Icons",
      rationale: "Customizable icon library",
    },
    {
      technology: "Mermaid.js",
      purpose: "Diagrams",
      rationale: "Text-based diagram generation for documentation",
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
              Frontend Documentation
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              React Components & User Interface Implementation Guide
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full mx-auto px-6 py-12">
        {/* Key Features */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Key Features
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-border hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <feature.icon className="h-5 w-5 text-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    {feature.description}
                  </p>
                  <ul className="space-y-1">
                    {feature.benefits.map((benefit, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-muted-foreground flex items-center gap-2"
                      >
                        <ArrowRight className="h-4 w-4 text-primary" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Frontend Technology Stack */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Frontend Technology Stack
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Technologies and tools used in the frontend implementation
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

        {/* Pages */}
        {renderFileTable(pages, "Pages", Home, "pages")}

        {/* Components */}
        {renderFileTable(components, "Components", Code, "components")}

        {/* UI Components */}
        {renderFileTable(
          uiComponents,
          "UI Components",
          Palette,
          "ui-components"
        )}

        {/* Context */}
        {renderFileTable(
          contextProviders,
          "Context Providers",
          Users,
          "context"
        )}

        {/* Hooks */}
        {renderFileTable(hooks, "Custom Hooks", Wrench, "hooks")}

        {/* Utilities */}
        {renderFileTable(utilities, "Utilities", Package, "utilities")}
      </div>
    </div>
  );
}
