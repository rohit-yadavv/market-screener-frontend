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
  Settings,
  Shield,
  Globe,
  Database,
  Bell,
  Key,
  Lock,
  Server,
  Zap,
  Clock,
  AlertTriangle,
  CheckCircle,
  Wrench,
  FileText,
  Code,
  Mail,
  BellRing,
  Activity,
  BarChart3,
  DollarSign,
  Users,
  Bot,
} from "lucide-react";

export default function Configuration() {
  const environmentVariables = [
    {
      category: "Server Configuration",
      variables: [
        {
          name: "PORT",
          type: "Number",
          description:
            "The port number where your backend server will run. Common ports are 3000, 5000, or 8000.",
        },
        {
          name: "NODE_ENV",
          type: "String",
          description:
            "Environment mode (development, production, or test). Affects error messages, logging, and security settings.",
        },
        {
          name: "FRONTEND_URL",
          type: "String",
          description:
            "URL where your frontend is hosted. Used for CORS to allow frontend-backend communication. Usually http://localhost:5173 for development.",
        },
      ],
    },
    {
      category: "Database Configuration",
      variables: [
        {
          name: "MONGO_URI",
          type: "String",
          description:
            "Connection string to your MongoDB database. Stores all your data (users, alerts, trading history). Can be local or cloud service like MongoDB Atlas.",
        },
        {
          name: "REDIS_URL",
          type: "String",
          description:
            "Connection string to your Redis cache. Stores temporary data like user sessions and real-time market data. Usually runs on port 6379.",
        },
      ],
    },
    {
      category: "Authentication & Security",
      variables: [
        {
          name: "JWT_SECRET",
          type: "String",
          description:
            "Secret key to sign and verify user authentication tokens. Like a password only your server knows. Make it long and random for security.",
        },
      ],
    },
    {
      category: "Email Configuration",
      variables: [
        {
          name: "EMAIL_USER",
          type: "String",
          description:
            "Email address used to send notifications to users. Could be Gmail or dedicated app email. Users receive alerts from this email.",
        },
        {
          name: "EMAIL_PASS",
          type: "String",
          description:
            "Password for the email account above. For Gmail, use an 'App Password' from Google account settings.",
        },
      ],
    },
    {
      category: "External APIs",
      variables: [
        {
          name: "TWELVE_DATA_API_KEY",
          type: "String",
          description:
            "API key from TwelveData service for real-time stock market data (prices, charts, indicators). Sign up at twelvedata.com to get this key.",
        },
        {
          name: "APCA_API_KEY_ID",
          type: "String",
          description:
            "Alpaca Trading API key ID. Alpaca is a commission-free trading platform. This is the public key that identifies your trading account.",
        },
        {
          name: "APCA_API_SECRET_KEY",
          type: "String",
          description:
            "Alpaca Trading API secret key. Gives your app permission to place trades. Keep this secret and secure.",
        },
      ],
    },
    {
      category: "Push Notifications",
      variables: [
        {
          name: "VAPID_PUBLIC_KEY",
          type: "String",
          description:
            "Public key for web push notifications. Allows sending instant notifications to users' browsers. You'll generate this pair of keys.",
        },
        {
          name: "VAPID_PRIVATE_KEY",
          type: "String",
          description:
            "Private key for web push notifications. Signs notifications to prove they're from your app. Never share this key publicly.",
        },
      ],
    },
  ];

  const configurationFiles = [
    {
      file: "config/db.config.ts",
      purpose: "Database Configuration",
      description: "MongoDB and Redis connection settings and initialization",
      icon: Database,
    },
    {
      file: "config/redis.config.ts",
      purpose: "Redis Configuration",
      description: "Redis client setup, connection pooling, and key management",
      icon: Zap,
    },
    {
      file: "config/user.config.ts",
      purpose: "User Configuration",
      description: "Default user settings, preferences, and validation rules",
      icon: Users,
    },
    {
      file: "config/push.config.ts",
      purpose: "Push Notification Config",
      description: "Web push notification settings and VAPID key management",
      icon: BellRing,
    },
  ];

  const renderEnvVarTable = (variables) => (
    <Card className="border-border">
      <CardContent className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/4">Variable</TableHead>
              <TableHead className="w-1/6">Type</TableHead>
              <TableHead className="w-2/3">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {variables.map((variable, index) => (
              <TableRow key={index}>
                <TableCell className="font-mono text-sm font-medium text-foreground">
                  {variable.name}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {variable.type}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {variable.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-muted/50">
        <div className="w-full mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Configuration
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              Environment Variables & Configuration Management
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full mx-auto px-6 py-12">
        {/* Environment Variables */}
        <div id="env-variables" className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <Settings className="h-5 w-5 text-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              Environment Variables
            </h2>
          </div>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
            Complete list of environment variables with types, defaults, and
            descriptions.
          </p>

          <div className="space-y-8">
            {environmentVariables.map((category, index) => (
              <div key={index} className="mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {category.category}
                </h3>
                {renderEnvVarTable(category.variables)}
              </div>
            ))}
          </div>
        </div>

        {/* Configuration Files */}
        <div id="config-categories" className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <FileText className="h-5 w-5 text-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              Configuration Files
            </h2>
          </div>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
            Modular configuration files for different aspects of the system.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {configurationFiles.map((file, index) => (
              <Card
                key={index}
                className="border-border hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <file.icon className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {file.purpose}
                      </h3>
                      <p className="text-sm text-muted-foreground font-mono">
                        {file.file}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {file.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Configuration Examples */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <Code className="h-5 w-5 text-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              Configuration Example
            </h2>
          </div>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
            Complete .env file with all required environment variables.
          </p>

          <Card className="border-border">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Complete .env File
              </h3>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm text-muted-foreground font-mono text-wrap">
                  {`# Server Configuration
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database Configuration
MONGO_URI=mongodb://localhost:27017/market-screener
REDIS_URL=redis://localhost:6379

# Authentication & Security
JWT_SECRET=your-super-secure-jwt-secret-key

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# External APIs
TWELVE_DATA_API_KEY=your-twelvedata-api-key
APCA_API_KEY_ID=your-alpaca-api-key-id
APCA_API_SECRET_KEY=your-alpaca-secret-key

# Push Notifications
VAPID_PUBLIC_KEY=your-vapid-public-key
VAPID_PRIVATE_KEY=your-vapid-private-key`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
