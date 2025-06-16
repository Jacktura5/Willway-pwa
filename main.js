const vapidPublicKey = 'BJdxg2rWwFLv8L2V3oqd8hUV695iWQp36Ga-pqGSNshDFTRMdvX43pu7MKT9mx_lcSNIcl-Ywh1O7YJdzhP_X2k';

async function subscribe() {
  const registration = await navigator.serviceWorker.register('/Willway-pwa/service-worker.js', {
    scope: '/'
  });

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
  });

  console.log('🔔 Подписка создана:', JSON.stringify(subscription));
  alert('✅ Уведомления разрешены');

  // Тут ты можешь отправить subscription на сервер, если он будет
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.createElement('button');
  btn.innerText = 'Разрешить уведомления';
  btn.onclick = subscribe;
  btn.style = 'font-size:18px;padding:15px;margin:40px';
  document.body.appendChild(btn);
});
