import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Documentation from "./pages/Documentation.jsx";
import { useAuth } from "./hooks/useAuth.js";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { initTheme } from "./lib/theme.js";
import { SSEProvider } from "./context/SSEContext.jsx";

function ProtectedRoute({ children, loading, isAuthenticated }) {
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted px-4">
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-40 w-full rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-3/4 rounded-lg" />
            <Skeleton className="h-6 w-2/3 rounded-lg" />
            <Skeleton className="h-6 w-1/2 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/" replace />;
  return children;
}

function LoginRoute({ loading, isAuthenticated }) {
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted px-4">
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-40 w-full rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-3/4 rounded-lg" />
            <Skeleton className="h-6 w-2/3 rounded-lg" />
            <Skeleton className="h-6 w-1/2 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <Login />;
}

export default function App() {
  useEffect(() => {
    initTheme();
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(() => {
        console.log("Service Worker registered");
      });
    }
  }, []);

  const { loading, isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LoginRoute loading={loading} isAuthenticated={isAuthenticated} />
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute loading={loading} isAuthenticated={isAuthenticated}>
            <SSEProvider>
              <Dashboard />
            </SSEProvider>
          </ProtectedRoute>
        }
      />
      <Route
        path="/docs/*"
        element={
          <ProtectedRoute loading={loading} isAuthenticated={isAuthenticated}>
            <Documentation />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
