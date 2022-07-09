const files = [
    './',
    './res/icon.png',
    './index.html'
];

self.addEventListener('install', result => {
    result.waitUntil(
        caches.open('caches:11').then(cache => {
            return cache.addAll(files);
        }).then(response => {
            self.skipWaiting();
        })
    );
});

self.addEventListener("fetch", result => {
    result.respondWith(
        caches.match(result.request).then(res => {
            if(res){
                return res;
            } else {
                return fetch(result.request);
            }
        })
    );
});
