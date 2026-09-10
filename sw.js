const CACHE = 'stronger-v3-ali-weekly-cardio';
const ASSETS = [
  './','./index.html','./styles.css','./app.js','./data.js','./manifest.json',
  './assets/icon-192.png','./assets/icon-512.png',
  './assets/plans_skin.png','./assets/ali_skin.png','./assets/workout_skin.png','./assets/live_skin.png',
  './assets/lat_thumb.png','./assets/row_thumb.png','./assets/onearm_thumb.png','./assets/curl_thumb.png','./assets/hammer_thumb.png','./assets/generic_exercise.png'
];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r;})));
});
