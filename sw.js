const CACHE_NAME = 'v1_cache_matematicas_hector';
const urlsToCache = [
  './',
  './index.html',
  './index_basico.html',
  './index_agente.html',
  './index_maestro.html',
  './index_experto.html',
  './diploma.html',
  './style.css',
  './script.js',
  './manifest.json',
  './narciso.png'
];

// Instalación del Service Worker y almacenamiento en caché de los archivos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting());
      })
      .catch(err => console.log('Fallo registro de caché', err))
  );
});

// Activación y limpieza de cachés antiguas
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME];
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Estrategia de respuesta: Primero busca en caché, si no, va a la red
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      if (res) {
        return res;
      }
      return fetch(e.request);
    })
  );
});