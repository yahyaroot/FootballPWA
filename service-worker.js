const CACHE_NAME = "footballpwaSub2";
let urlsToCache = [
    "/",
    "/index.html",
    "/nav.html",
    "/team.html",
    "/pages/home.html",
    "/pages/standingsClub.html",
    "/pages/saved.html",
    "/css/materialize.css",
    "/css/materialize.min.css",
    "/js/api.js",
    "/js/db.js",
    "/js/idb.js",
    "./js/eventsave.js",
    "/js/materialize.min.js",
    "/js/materialize.js",
    "/js/nav.js",
    "/js/checkservice.js",
    "/images/LIGUE1.webp",
    "/images/2015.png",
    '/css/style.css',
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "/logos.png",
    "/logos72.png",
    "/logos96.png",
    "/logos128.png",
    "/logos144.png",
    "/logos192.png",
    "/logos256.png",
    "/logos384.png",
    '/favicon-32x32.png',
    "/manifest.json"
  
];

self.addEventListener("install", function(event) {
    event.waitUntil(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.addAll(urlsToCache);
      })
    );
  });
  
  self.addEventListener("fetch", function(event) {
    let base_url = "https://api.football-data.org/v2/";
  
    if (event.request.url.indexOf(base_url) > -1) {
      event.respondWith(
        caches.open(CACHE_NAME).then(function(cache) {
          return fetch(event.request).then(function(response) {
            cache.put(event.request.url, response.clone());
            return response;
          })
        })
      );
    } 

    else {
      event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then(function(response) {
          return response || fetch (event.request);
        })
      )
    }

  });

  self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName != CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });


  self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    if (!event.action) {
        console.log('Notification Clicked.');
        return;
    }
    switch (event.action) {
      default:
            console.log(`The selected action is unknown: '${event.action}'`);
            break;
        case 'no-action':
            break;
        case 'yes-action':
            clients.openWindow('/#saved');
            break;
        
    }
});

  self.addEventListener('push', function(event){
    let body;
    if (event.data){
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    let options = {
      body: body,
      icon: '/favicon-32x32.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });

