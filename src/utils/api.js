export const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// ✅ Login - sets cookie via Set-Cookie header
export const login = async (username) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // ⬅️ Allow cookie to be stored
    body: JSON.stringify({ username }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message || 'Login failed');
  }

  return res.json(); // contains { success, username }
};

export const fetchPastEvents = async (filters) => {
  const query = new URLSearchParams(filters).toString();
  const res = await fetch(`${BASE_URL}/events?${query}`, {
    credentials: 'include', // ⬅️ Send auth cookie
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message || 'Failed to fetch events');
  }

  return res.json(); // contains { events }
};

// ✅ Subscribe to stock symbols
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

  return res.json(); // contains { success, symbols }
};
