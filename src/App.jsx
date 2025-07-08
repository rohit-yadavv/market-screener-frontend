import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth.js";

function ProtectedRoute({ children }) {
  const { loading, isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  if (loading) {
    return <div className="p-6">Checking authentication...</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
