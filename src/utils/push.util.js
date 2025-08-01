import axios from 'axios';
import { BASE_URL } from './api';

export async function subscribeToPushNotifications(vapidKey) {
  const registration = await navigator.serviceWorker.ready;

  const sub = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(vapidKey),
  });

  await axios.post(
    `${BASE_URL}/push/subscribe`,
    { subscription: sub },
    { withCredentials: true }
  );
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = window.atob(base64);
  return Uint8Array.from([...raw].map(c => c.charCodeAt(0)));
}
