// Installing service worker
const CACHE_NAME  = 'Disqordia';

/* Add relative URL of all the static content you want to store in
 * cache storage (this will help us use our app offline)*/
let resourcesToCache = ["/", "/static/font/css/fontello.css", "/static/font/css/animation.css", "/static/font/tiresias.css", "/static/font/css/lato.css", "/static/mfm.css", "/favicon.png", "/static/css/app.d7c75a48f7d627e0493f.css", "/static/js/vendors~app.4600ad9d6a3c807e6688.js", "/static/js/app.afaee31b8c11ba3c67aa.js"];

self.addEventListener("install", e=>{
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache =>{
            return cache.addAll(resourcesToCache);
        })
    );
});

// Cache and return requests
self.addEventListener("fetch", e=>{
    e.respondWith(
        caches.match(e.request).then(response=>{
            return response || fetch(e.request);
        })
    );
});

// Update a service worker
const cacheWhitelist = ['Disqordia'];
self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
