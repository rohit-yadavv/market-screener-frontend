import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/auth/verify`, {
          withCredentials: true,
        });
        setIsAuthenticated(res.data?.success ?? false);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, []);

  return (
    <AuthContext.Provider
      value={{ loading, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
