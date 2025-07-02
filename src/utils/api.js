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

export const fetchPastEvents = async (filters) => {
  const query = new URLSearchParams(filters).toString();
  const res = await fetch(`${BASE_URL}/events?${query}`, {
    credentials: 'include',
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message || 'Failed to fetch events');
  }

  return res.json(); // contains { events }
};

export const subscribeStocks = async (symbols) => {
  const res = await fetch(`${BASE_URL}/subscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ symbols }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message || 'Failed to subscribe to stocks');
  }

  return res.json();
};
