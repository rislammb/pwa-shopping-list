const staticCache = 'site-static-v1';
const dynamicCache = 'site-dynamic-v1';

const fileToCache = [
  '/',
  '/index.html',
  'https://fonts.googleapis.com/css?family=Titillium+Web&display=swap',
  'https://fonts.gstatic.com/s/titilliumweb/v10/NaPecZTIAOhVxoMyOr9n_E7fdMPmDQ.woff2',
];

self.addEventListener('install', (evt) => {
  console.log('install started');
  evt.waitUntil(
    caches.open(staticCache).then((cache) => {
      return cache.addAll(fileToCache);
    })
  );
});

self.addEventListener('activate', (evt) => {
  console.log('activate started');
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
  console.log('fetch started');
  if (!(evt.request.url.indexOf('http') === 0)) {
    console.log('if', evt.request);
    return;
  }
  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      console.log('evt.request', evt.request);
      return (
        cacheRes ||
        fetch(evt.request).then((fetchRes) => {
          console.log('fetch res', fetchRes);
          return caches.open(dynamicCache).then((cache) => {
            cache.put(evt.request.url, fetchRes.clone());
            // check cached items size
            // limitCacheSize(dynamicCache, 15);
            return fetchRes;
          });
        })
      );
    })
  );
});
