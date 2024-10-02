const CACHE_NAME = 'AnyAscii-v1';

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(CACHE_NAME).then(cache => {
			return cache.addAll([
				'/',
				'/index.js',
			]);
		}),
	);
});

self.addEventListener('fetch', event => {
	if (event.request.url.startsWith(self.location.origin)) {
		event.respondWith(
			caches.open(CACHE_NAME).then(cache => {
				return cache.match(event.request, {ignoreSearch: true}).then(response => {
					if (response) return response;
					return fetch(event.request).then(response => {
						cache.put(event.request, response.clone());
						return response;
					});
				});
			}),
		);
	}
});
