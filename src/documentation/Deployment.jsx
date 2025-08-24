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
  Rocket,
  Server,
  Globe,
  Shield,
  Database,
  Code,
  Terminal,
  Settings,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Github,
  Cloud,
  Zap,
  Monitor,
  FileText,
  Lock,
  Wrench,
  Activity,
  BarChart3,
  Download,
  Play,
  RefreshCw,
  Bell,
  Mail,
  DollarSign,
} from "lucide-react";

export default function Deployment() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-muted/50">
        <div className="w-full mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Deployment Guide
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              Setup & Deployment Instructions for Market Screener
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full mx-auto px-6 py-12">
        {/* Prerequisites */}
        <div id="prerequisites" className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <Settings className="h-5 w-5 text-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              Prerequisites
            </h2>
          </div>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
            System requirements and dependencies needed before deployment.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  System Requirements
                </h3>
                <ul className="space-y-2">
                  <li className="text-sm text-muted-foreground flex items-start gap-2">
                    <Code className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Node.js:</strong> Version 18+ (LTS recommended)
                    </span>
                  </li>
                  <li className="text-sm text-muted-foreground flex items-start gap-2">
                    <Database className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>MongoDB Atlas:</strong> Cloud database service
                    </span>
                  </li>
                  <li className="text-sm text-muted-foreground flex items-start gap-2">
                    <Zap className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Redis Cloud:</strong> Cloud cache service
                    </span>
                  </li>
                  <li className="text-sm text-muted-foreground flex items-start gap-2">
                    <Activity className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Memory:</strong> Minimum 2GB RAM
                    </span>
                  </li>
                  <li className="text-sm text-muted-foreground flex items-start gap-2">
                    <BarChart3 className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Storage:</strong> 10GB+ available space
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  API Keys Required
                </h3>
                <ul className="space-y-2">
                  <li className="text-sm text-muted-foreground flex items-start gap-2">
                    <Globe className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Twelve Data API:</strong> Market data access
                    </span>
                  </li>
                  <li className="text-sm text-muted-foreground flex items-start gap-2">
                    <DollarSign className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Alpaca Trading API:</strong> Trading execution
                    </span>
                  </li>
                  <li className="text-sm text-muted-foreground flex items-start gap-2">
                    <Bell className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>VAPID Keys:</strong> Push notifications
                    </span>
                  </li>
                  <li className="text-sm text-muted-foreground flex items-start gap-2">
                    <Mail className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>SMTP Credentials:</strong> Email notifications
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Network Requirements
                </h3>
                <ul className="space-y-2">
                  <li className="text-sm text-muted-foreground flex items-start gap-2">
                    <Lock className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>HTTPS:</strong> SSL certificate for production
                    </span>
                  </li>
                  <li className="text-sm text-muted-foreground flex items-start gap-2">
                    <Globe className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Domain:</strong> Registered domain name
                    </span>
                  </li>
                  <li className="text-sm text-muted-foreground flex items-start gap-2">
                    <Shield className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Firewall:</strong> Open ports 80, 443, 3000
                    </span>
                  </li>
                  <li className="text-sm text-muted-foreground flex items-start gap-2">
                    <Cloud className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>CDN:</strong> Optional for static assets
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Installation Steps */}
        <div id="installation" className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <Download className="h-5 w-5 text-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              Installation Steps
            </h2>
          </div>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
            Step-by-step guide to set up the Market Screener application.
          </p>

          <div className="space-y-8">
            {/* Step 1: Clone Repository */}
            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  1. Clone Repository
                </h3>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm text-muted-foreground font-mono">
                    {`# Clone the backend repository
git clone https://github.com/rohit-yadavv/market-screener-backend.git
cd market-screener-backend

# Clone the frontend repository
git clone https://github.com/rohit-yadavv/market-screener-frontend.git
cd market-screener-frontend`}
                  </pre>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Github className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Backend Repository:{" "}
                    <a
                      href="https://github.com/rohit-yadavv/market-screener-backend"
                      className="text-primary hover:underline"
                    >
                      market-screener-backend
                    </a>
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Github className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Frontend Repository:{" "}
                    <a
                      href="https://github.com/rohit-yadavv/market-screener-frontend"
                      className="text-primary hover:underline"
                    >
                      market-screener-frontend
                    </a>
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Backend Setup */}
            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  2. Backend Setup
                </h3>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm text-muted-foreground font-mono">
                    {`# Navigate to backend directory
cd market-screener-backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit environment variables
nano .env`}
                  </pre>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold text-foreground mb-2">
                    Required Environment Variables
                  </h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm text-muted-foreground font-mono">
                      {`# Database Configuration (Cloud Services)
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/market-screener
REDIS_URL=redis://username:password@redis-cloud-host:port

# Application Settings
NODE_ENV=development
PORT=3000
JWT_SECRET=your-super-secret-jwt-key

# External APIs
TWELVE_DATA_API_KEY=your-twelve-data-api-key
APCA_API_KEY_ID=your-alpaca-api-key-id
APCA_API_SECRET_KEY=your-alpaca-secret-key

# Push Notifications
VAPID_PUBLIC_KEY=your-vapid-public-key
VAPID_PRIVATE_KEY=your-vapid-private-key

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3: Frontend Setup */}
            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  3. Frontend Setup
                </h3>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm text-muted-foreground font-mono">
                    {`# Navigate to frontend directory
cd market-screener-frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit environment variables
nano .env`}
                  </pre>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold text-foreground mb-2">
                    Frontend Environment Variables
                  </h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm text-muted-foreground font-mono">
                      {`# API Configuration
VITE_API_URL=http://localhost:3000/api
VITE_SSE_URL=http://localhost:3000/sse

# Push Notifications
VITE_VAPID_PUBLIC_KEY=your-vapid-public-key

# Build Configuration
VITE_APP_NAME=Market Screener
VITE_APP_VERSION=1.0.0`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 4: Database Setup */}
            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  4. Database Setup (Cloud Services)
                </h3>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm text-muted-foreground font-mono">
                    {`# MongoDB Atlas Setup
# 1. Create account at https://cloud.mongodb.com
# 2. Create a new cluster
# 3. Get connection string from "Connect" button
# 4. Add to .env: MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/market-screener

# Redis Cloud Setup
# 1. Create account at https://redis.com/try-free/
# 2. Create a new database
# 3. Get connection string from "Connect" section
# 4. Add to .env: REDIS_URL=redis://username:password@redis-cloud-host:port

# No local database installation required!`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Step 5: Build and Start */}
            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  5. Build and Start
                </h3>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm text-muted-foreground font-mono">
                    {`# Backend build and start
cd market-screener-backend
npm run build
npm start

# Frontend development server (new terminal)
cd market-screener-frontend
npm run dev`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Development Commands */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <Terminal className="h-5 w-5 text-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              Development Commands
            </h2>
          </div>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
            Common commands for development and maintenance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Backend Commands
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Command</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-mono text-sm">
                        npm run dev
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        Start development server with hot reload
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">
                        npm run build
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        Build TypeScript to JavaScript
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">
                        npm start
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        Start production server
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-mono text-sm">
                        npm run lint
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        Run ESLint for code quality
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Frontend Commands
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Command</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-mono text-sm">
                        npm run dev
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        Start Vite development server
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">
                        npm run build
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        Build for production
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">
                        npm run preview
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        Preview production build
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-mono text-sm">
                        npm run lint
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        Run ESLint
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Production Deployment */}
        <div id="production" className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <Rocket className="h-5 w-5 text-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              Production Deployment
            </h2>
          </div>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
            Production deployment setup with Cloudflare tunnel and Vercel
            hosting.
          </p>

          {/* Backend Deployment - Cloudflare Tunnel */}
          <Card className="border-border mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Cloud className="h-5 w-5 text-foreground" />
                <h3 className="text-xl font-semibold text-foreground">
                  Backend Deployment (Cloudflare Tunnel)
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                The backend is deployed on a local Windows machine and exposed
                using Cloudflare tunnel for secure access.
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Backend URL
                  </h4>
                  <div className="bg-muted p-3 rounded-lg">
                    <code className="text-sm text-muted-foreground">
                      https://your-backend-domain.trycloudflare.com
                    </code>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Setup Cloudflare Tunnel
                  </h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm text-muted-foreground font-mono">
                      {`# Install cloudflared
# Download from: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/

# Authenticate with Cloudflare
cloudflared tunnel login

# Create a tunnel
cloudflared tunnel create market-screener-backend

# Configure the tunnel
cloudflared tunnel route dns market-screener-backend your-backend-domain.trycloudflare.com

# Start the tunnel
cloudflared tunnel run market-screener-backend`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Running Backend Locally
                  </h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm text-muted-foreground font-mono">
                      {`# Navigate to backend directory
cd market-screener-backend

# Install dependencies (if not done)
npm install

# Set environment variables
# Edit .env file with production values

# Build the application
npm run build

# Start the server
npm start`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Frontend Deployment - Vercel */}
          <Card className="border-border mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="h-5 w-5 text-foreground" />
                <h3 className="text-xl font-semibold text-foreground">
                  Frontend Deployment (Vercel)
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                The frontend is hosted on Vercel for optimal performance and
                global CDN distribution.
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Frontend URL
                  </h4>
                  <div className="bg-muted p-3 rounded-lg">
                    <code className="text-sm text-muted-foreground">
                      https://your-frontend-domain.vercel.app
                    </code>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Deploy to Vercel
                  </h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm text-muted-foreground font-mono">
                      {`# Install Vercel CLI
npm install -g vercel

# Navigate to frontend directory
cd market-screener-frontend

# Login to Vercel
vercel login

# Deploy to Vercel
vercel

# Set environment variables in Vercel dashboard
# VITE_API_URL=https://your-backend-domain.trycloudflare.com/api
# VITE_SSE_URL=https://your-backend-domain.trycloudflare.com/sse
# VITE_VAPID_PUBLIC_KEY=your-vapid-public-key

# For production deployment
vercel --prod`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Vercel Configuration
                  </h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm text-muted-foreground font-mono">
                      {`# vercel.json configuration
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Troubleshooting */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <Wrench className="h-5 w-5 text-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              Troubleshooting
            </h2>
          </div>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
            Common issues and their solutions.
          </p>

          <Card className="border-border">
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/3">Issue</TableHead>
                    <TableHead className="w-2/3">Solution</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium text-foreground">
                      Port already in use
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      Check for existing processes: lsof -i :3000
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-foreground">
                      MongoDB connection failed
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      Verify MongoDB Atlas connection string and network access
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-foreground">
                      Redis connection failed
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      Check Redis Cloud connection string and network access
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-foreground">
                      API key errors
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      Verify environment variables and API key validity
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-foreground">
                      SSL certificate issues
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      Check certificate validity: openssl x509 -in cert.crt
                      -text
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
