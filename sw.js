const V='bv-v3',F=['./','index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!='GET'||new URL(r.url).origin!=location.origin)return;
if(r.mode=='navigate'){e.respondWith(fetch(r).then(n=>{const k=n.clone();caches.open(V).then(c=>c.put('index.html',k));return n}).catch(()=>caches.match('index.html')));return}
e.respondWith(caches.match(r,{ignoreSearch:true}).then(c=>c||fetch(r).then(n=>{const k=n.clone();caches.open(V).then(x=>x.put(r,k));return n})))});
