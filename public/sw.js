const staticCache = 'amarmamurbate';
const dynamicCache = 'amarmamurbeta';
self.addEventListener('install', (evt) => {
  console.log('installed');
  evt.waitUntil(
    caches.open(staticCache).then((cache) => {
      return cache.addAll(['/index.html', 'favicon.ico']);
    })
  );
});

self.addEventListener('activate', (evt) => {
  console.log('activate');
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCache && key !== dynamicCache)
          .map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', (evt) => {
  console.log('start fetch');
  if (!(evt.request.url.indexOf('http') === 0)) console.log(evt.request);
});
