self.addEventListener("push", (event) => {
  let data = {};

  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      try {
        const textData = event.data.text();

        data = JSON.parse(textData);
      } catch {
        data = {
          title: "Notification",
          body: event.data.text() || "New notification received",
        };
      }
    }
  } else {
    data = {
      title: "Notification",
      body: "New notification received",
    };
  }

  const title = data.title || "MACD Screener";
  const options = {
    body: data.body || "New alert received",
    icon: "/favicon.ico",
    badge: "/favicon.ico",
    tag: "macd-alert",
    requireInteraction: false,
    silent: false,
    vibrate: [200, 100, 200],
    data: data,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && "focus" in client) {
          return client.focus();
        }
      }

      if (self.clients.openWindow) {
        return self.clients.openWindow("/");
      }
    })
  );
});

self.addEventListener("notificationclose", (event) => {
  console.log("Notification closed:", event.notification.tag);
});
