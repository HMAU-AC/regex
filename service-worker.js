const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/regex/',
  '/regex/index.html',
  '/regex/regex.html',
  '/regex/sc.html',
  '/regex/yh.html',
  '/regex/st.html',
  '/regex/styles.css',
  '/regex/app.js',
  '/regex/theme-color.js',
  '/regex/manifest.json',
  '/regex/icons/google.png',
  '/regex/icons/bing.png',
  '/regex/icons/baidu.png',
  '/regex/icons/icon-192x192.png',
  '/regex/icons/icon-512x512.png'
];

// 安装事件
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 获取事件
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          // 检查缓存的响应是否过期
          const headers = response.headers;
          const cacheControl = headers.get('Cache-Control');
          const expires = headers.get('Expires');
          
          if (cacheControl || expires) {
            const now = new Date().getTime();
            const maxAge = cacheControl ? parseInt(cacheControl.split('=')[1]) * 1000 : null;
            const expiresTime = expires ? new Date(expires).getTime() : null;

            if ((maxAge && now - response.time > maxAge) || (expiresTime && now > expiresTime)) {
              // 如果缓存过期，从网络获取新的响应
              return fetch(event.request).then(networkResponse => {
                caches.open(CACHE_NAME).then(cache => {
                  cache.put(event.request, networkResponse.clone());
                });
                return networkResponse;
              });
            }
          }
          return response;
        }
        return fetch(event.request);
      })
  );
});

// 激活事件
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});
