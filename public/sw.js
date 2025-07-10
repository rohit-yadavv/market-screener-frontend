self.addEventListener('push', event => {
  let data = {};
  try {
    data = event.data?.json() || {};
  } catch (err) {
    console.error('Failed to parse push data as JSON:', err);
  }

  const title = data.title || 'Notification';
  const options = {
    body: data.body || '',
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
