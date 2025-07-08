
export const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const login = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),

  });
  if (!res.ok) throw new Error('Login failed');
  return await res.json();
};
