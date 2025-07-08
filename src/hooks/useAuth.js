
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/api';

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/auth/verify`, {
          withCredentials: true,
        });
        setIsAuthenticated(res.data?.success ?? false);
      } catch (err) {
        console.log(err)
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, []);

  return { loading, isAuthenticated };
}
