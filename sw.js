const CACHE='stronger-v4-static';
const LOCAL=['./','./index.html','./styles.css','./app.js','./data.js','./manifest.json','./assets/icon-192.png','./assets/icon-512.png','./assets/generated/hero_ali.jpg','./assets/generated/back_hero.jpg','./assets/generated/cardio.jpg','./assets/generated/cycling.jpg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(LOCAL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).catch(()=>caches.match('./index.html'))))});
