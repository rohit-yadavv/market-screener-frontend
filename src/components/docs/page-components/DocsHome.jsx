import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  BookOpen,
  Code,
  Database,
  Settings,
  Rocket,
  Sparkles,
  Layers,
  Server,
  Globe,
  Palette,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DocsHome() {
  const navigate = useNavigate();

  const documentationSections = [
    {
      title: "Technology Stack",
      description: "Technologies used in frontend and backend of the Screener",
      path: "/docs/technology-stack",
      icon: Layers,
    },
    {
      title: "System Architecture",
      description: "System design, data flow, and component interactions",
      path: "/docs/architecture",
      icon: Sparkles,
    },
    {
      title: "Backend Documentation",
      description: "File-by-file guide to the backend",
      path: "/docs/backend-docs",
      icon: Server,
    },
    {
      title: "Frontend Documentation",
      description: "File-by-file guide to the frontend",
      path: "/docs/frontend-docs",
      icon: Code,
    },
    {
      title: "API Documentation",
      description: "REST API endpoints, request/response formats",
      path: "/docs/api-docs",
      icon: Globe,
    },
    {
      title: "Database Schema",
      description: "MongoDB collections and Redis data structures",
      path: "/docs/database-schema",
      icon: Database,
    },
    {
      title: "Configuration",
      description: "Environment variables and configuration management",
      path: "/docs/configuration",
      icon: Settings,
    },
    {
      title: "Deployment Guide",
      description: "Step-by-step deployment instructions",
      path: "/docs/deployment",
      icon: Rocket,
    },
    {
      title: "Customization",
      description: "Extending the system with new features",
      path: "/docs/customization",
      icon: Palette,
    },
  ];

  return (
    <div className="min-h-screen bg-background w-full">
      {/* Header */}
      <div className="border-b border-border bg-muted/50">
        <div className="w-full mx-auto px-6 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>

            <h1 className="text-4xl font-bold text-foreground mb-4">
              Market Screener Documentation
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Technical documentation for the real-time market monitoring system
            </p>
          </div>
        </div>
      </div>

      {/* Documentation Sections */}
      <div className="py-16 bg-background">
        <div className="w-full mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Documentation Sections
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore the codebase structure and implementation details
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documentationSections.map((section, index) => (
              <Card
                key={index}
                className="border-border hover:shadow-md transition-shadow duration-200 cursor-pointer"
                onClick={() => navigate(section.path)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <section.icon className="h-5 w-5 text-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {section.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {section.description}
                  </p>
                  <div className="flex items-center text-primary text-sm font-medium">
                    View documentation <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
