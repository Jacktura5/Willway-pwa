self.addEventListener('install', function (event) {
  console.log('✅ Service Worker: Installed');
});

self.addEventListener('activate', function (event) {
  console.log('✅ Service Worker: Activated');
});

self.addEventListener('fetch', function (event) {
  event.respondWith(fetch(event.request));
});

// ✅ Обработка входящего push-сообщения
self.addEventListener('push', function (event) {
  const data = event.data?.json?.() || {};

  const title = data.title || 'Уведомление';
  const options = {
    body: data.body || 'У вас новое сообщение.',
    icon: 'https://jacktura5.github.io/Willway-pwa/1-9.jpg',
    badge: 'https://jacktura5.github.io/Willway-pwa/1-9.jpg'
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
