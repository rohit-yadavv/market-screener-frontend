import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  ChevronLeft,
  Search,
  BookOpen,
  Code,
  Database,
  Settings,
  Rocket,
  Home,
  Sparkles,
  Layers,
  Server,
  Globe,
  Palette,
} from "lucide-react";
import { cn } from "@/lib/utils";

import DocsHome from "@/documentation/DocsHome";
import Architecture from "@/documentation/SystemArchitecture";
import BackendDocs from "@/documentation/BackendDocumentation";
import FrontendDocs from "@/documentation/FrontendDocumentation";
import ApiDocs from "@/documentation/ApiDocs";
import DatabaseSchema from "@/documentation/DatabaseSchema";
import Configuration from "@/documentation/Configuration";
import Deployment from "@/documentation/Deployment";
import Customization from "@/documentation/Customization";

const navigationItems = [
  {
    id: "home",
    title: "Home",
    path: "/docs",
    icon: Home,
    component: DocsHome,
  },

  {
    id: "architecture",
    title: "System Architecture",
    path: "/docs/architecture",
    icon: Sparkles,
    component: Architecture,
    subsections: [
      { id: "system-overview", title: "System Components" },
      { id: "system-flow", title: "System Flow" },
      { id: "decision-flow", title: "Decision Flow" },
      { id: "high-level-architecture", title: "High-Level Architecture" },
    ],
  },
  {
    id: "backend-docs",
    title: "Backend Documentation",
    path: "/docs/backend-docs",
    icon: Server,
    component: BackendDocs,
    subsections: [
      { id: "backend-stack", title: "Backend Technology Stack" },
      { id: "external-apis", title: "External APIs & Services" },
      { id: "root-files", title: "Root Files" },
      { id: "configuration", title: "Configuration" },
      { id: "controllers", title: "Controllers" },
      { id: "middleware", title: "Middleware" },
      { id: "models", title: "Models" },
      { id: "routes", title: "Routes" },
      { id: "services", title: "Core Services" },
      { id: "alert-services", title: "Alert Services" },
      { id: "trading-services", title: "Trading Services" },
      { id: "decision-services", title: "Decision Services" },
      { id: "specialized-services", title: "Specialized Services" },
      { id: "alerts", title: "Alerts" },
      { id: "jobs", title: "Jobs" },
      { id: "utils", title: "Utilities" },
      { id: "types", title: "Types" },
      { id: "constants", title: "Constants" },
    ],
  },
  {
    id: "frontend-docs",
    title: "Frontend Documentation",
    path: "/docs/frontend-docs",
    icon: Code,
    component: FrontendDocs,
    subsections: [
      { id: "frontend-stack", title: "Frontend Technology Stack" },
      { id: "pages", title: "Pages" },
      { id: "components", title: "Components" },
      { id: "ui-components", title: "UI Components" },
      { id: "context", title: "Context" },
      { id: "hooks", title: "Hooks" },
      { id: "utilities", title: "Utilities" },
    ],
  },
  {
    id: "api-docs",
    title: "API Documentation",
    path: "/docs/api-docs",
    icon: Globe,
    component: ApiDocs,
    subsections: [
      { id: "auth-endpoints", title: "Authentication" },
      { id: "user-endpoints", title: "User Management" },
      { id: "alert-endpoints", title: "Alert System" },
      { id: "decision-endpoints", title: "Decisions" },
    ],
  },
  {
    id: "database-schema",
    title: "Database Schema",
    path: "/docs/database-schema",
    icon: Database,
    component: DatabaseSchema,
    subsections: [
      { id: "redis-structures", title: "Redis Structures" },
      { id: "user-model", title: "User Model" },
      { id: "alert-config-model", title: "AlertConfig Model" },
      { id: "decision-config-model", title: "DecisionConfig Model" },
      { id: "trade-event-model", title: "TradeEvent Model" },
      { id: "macd-event-model", title: "MACD Event Model" },
      { id: "price-instance-event-model", title: "Price Instance Event Model" },
      { id: "trend-continuation-model", title: "Trend Continuation Model" },
      { id: "high-low-event-model", title: "High Low Event Model" },
      { id: "decision-event-model", title: "Decision Event Model" },
      { id: "decision-trade-model", title: "Decision Trade Model" },
    ],
  },
  {
    id: "configuration",
    title: "Configuration",
    path: "/docs/configuration",
    icon: Settings,
    component: Configuration,
    subsections: [
      { id: "env-variables", title: "Environment Variables" },
      { id: "config-categories", title: "Config Categories" },
    ],
  },
  {
    id: "deployment",
    title: "Deployment Guide",
    path: "/docs/deployment",
    icon: Rocket,
    component: Deployment,
    subsections: [
      { id: "prerequisites", title: "Prerequisites" },
      { id: "installation", title: "Installation" },
      { id: "production", title: "Production" },
    ],
  },
  {
    id: "customization",
    title: "Customization",
    path: "/docs/customization",
    icon: Palette,
    component: Customization,
    subsections: [
      { id: "new-alerts", title: "New Alert Types" },
      { id: "trading-strategies", title: "Trading Strategies" },
      { id: "ui-extension", title: "UI Extension" },
    ],
  },
];

export default function Documentation() {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;
  const currentPage =
    navigationItems.find((item) => item.path === currentPath) ||
    navigationItems[0];

  const filteredItems = navigationItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subsections?.some((sub) =>
        sub.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handleNavigation = (path) => {
    navigate(path);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const CurrentPageComponent = currentPage.component;

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background">
        <Sidebar>
          <SidebarHeader className="border-b border-border">
            <div className="flex items-center gap-3 px-4 py-[7px]">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="text-sm font-semibold">Market Screener</div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <div className="px-3 py-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-8 text-sm"
                />
              </div>
            </div>

            <Separator />

            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {filteredItems.map((item) => (
                    <div key={item.id}>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          onClick={() => handleNavigation(item.path)}
                          className={cn(
                            "w-full justify-start gap-3 px-3 py-2",
                            currentPath === item.path &&
                              "bg-accent text-accent-foreground"
                          )}
                        >
                          <item.icon className="h-4 w-4 flex-shrink-0" />
                          <span className="text-sm font-medium">
                            {item.title}
                          </span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      {/* Subsections */}
                      {item.subsections && currentPath === item.path && (
                        <div className="ml-6 space-y-1">
                          {item.subsections.map((sub) => (
                            <SidebarMenuItem key={sub.id}>
                              <SidebarMenuButton
                                onClick={() => scrollToSection(sub.id)}
                                className="w-full justify-start text-xs px-3 py-1.5 text-muted-foreground hover:text-foreground"
                              >
                                {sub.title}
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-border">
            <div className="p-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/")}
                className="w-full justify-start gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <div className="flex h-full flex-col">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border px-4">
              <SidebarTrigger className="-ml-1" />
              <div className="text-sm font-semibold">{currentPage.title}</div>
            </header>

            <div className="flex-1 overflow-auto">
              <CurrentPageComponent />
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
