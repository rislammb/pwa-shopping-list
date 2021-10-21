const staticCache = 'site-static-v2';
const dynamicCache = 'site-dynamic-v2';

const fileToCache = [
  '/',
  '/index.html',
  '/day',
  '/contact',
  'https://fonts.googleapis.com/css?family=Titillium+Web&display=swap',
  'https://fonts.gstatic.com/s/titilliumweb/v10/NaPecZTIAOhVxoMyOr9n_E7fdMPmDQ.woff2',
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(staticCache).then((cache) => {
      return cache.addAll(fileToCache);
    })
  );
});

self.addEventListener('activate', (evt) => {
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

const limitCacheSize = (cacheName, size) => {
  caches.open(cacheName).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(cacheName, size));
      }
    });
  });
};

self.addEventListener('fetch', (evt) => {
  if (!(evt.request.url.indexOf('http') === 0)) {
    console.log('if', evt.request);
    return;
  }
  evt.respondWith(
    caches
      .match(evt.request)
      .then((cacheRes) => {
        console.log('cache res', cacheRes);
        return (
          cacheRes ||
          fetch(evt.request).then((fetchRes) => {
            console.log('fetch res', fetchRes);
            return caches.open(dynamicCache).then((cache) => {
              cache.put(evt.request.url, fetchRes.clone());
              // check cached items size
              limitCacheSize(dynamicCache, 15);
              return fetchRes;
            });
          })
        );
      })
      .catch(() => {
        if (evt.request.url.indexOf('/day') > -1) {
          return caches.match('/day');
        } else {
          return caches.match('/');
        }
      })
  );
});
